<template>
  <span :class="avatarClass" :style="sizeStyle">
    <img
      v-if="(src | srcSet) && !hasLoadError"
      :src="src"
      :alt="alt"
      :srcset="srcSet"
      :style="fitStyle"
      @error="handleError"
    >
    <i v-else-if="icon" :class="icon" />
    <slot v-else></slot>
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'
const ERROR_EVENT = 'error'
export default defineComponent({
  name: 'NbAvatar',
  props: {
    size: {
      type: [Number, String] as PropType<number | string>,
      default: 'large'
    },
    shape: {
      type: String,
      default: 'circle'
    },
    icon: String,
    src: String,
    alt: String,
    srcSet: String,
    fit: {
      type: String,
      default: 'cover'
    }
  },
  emits: [ERROR_EVENT],
  setup(props, { emit }) {
    const hasLoadError = ref(false);

    const avatarClass = computed(() => {
      const { size, icon, shape } = props;
      let classList = ['nb-avatar']
      if(size && typeof size == 'string') {
        classList.push(`nb-avatar--${size}`)
      }
      if(icon) {
        classList.push(`nb-avatar--icon`)
      }
      if(shape) {
        classList.push(`nb-avatar--${shape}`)
      }
      return classList
    })

    const sizeStyle = computed(() => {
      const { size } = props;
      return typeof size == 'number' ? {
        height: `${size}px`,
        width: `${size}px`,
        lineHeight: `${size}px`
      } : {}
    })

    const fitStyle = computed(() => {
      objectFit: props.fit
    })

    function handleError(e: Event) {
      hasLoadError.value = true
      emit(ERROR_EVENT, e)
    }

    return {
      hasLoadError, avatarClass, sizeStyle, handleError, fitStyle
    }
  }
})
</script>

<style>

</style>