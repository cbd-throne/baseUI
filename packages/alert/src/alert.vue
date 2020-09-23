<template>
  <transition name="nb-alert-fade">
    <div
      v-show="visible"
      class="nb-alert"
      :class="[typeClass, center ? 'is-center' : '', 'is-' + effect]"
      role="alert"
    >
      <i v-if="showIcon" class="nb-alert__icon" :class="[ iconClass, isBigIcon]"></i>
      <div class="nb-alert__content">
        <span v-if="title || $slots.title" class="nb-alert__title" :class="[ isBoldTitle ]">
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="nb-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <i
          v-if="closeable"
          class="nb-alert__closebtn"
          :class="{'is-customed': closeText != '', 'nb-icon-close': closeText == ''}"
          @click="close"
        >
          {{ closeText }}
        </i>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref } from 'vue'

const TYPE_CLASSMAP = {
  'success': 'nb-icon-success',
  'warning': 'nb-icon-warning',
  'error': 'nb-icon-error'
}

export default defineComponent({
  name: "NbAlert",
  emits: ['click'],
  props: {
    type: {
      type: String as PropType<'success' | 'info' | 'error' | 'warning'>,
      default: 'info'
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    closeable: {
      type: Boolean,
      default: true
    },
    closeText: {
      type: String,
      default: ''
    },
    showIcon: Boolean,
    center: Boolean,
    effect: {
      type: String,
      default: 'light',
      validator: (value: string): boolean => ['light', 'dark'].indexOf(value) > -1
    }
  },
  setup(props, ctx) {
    const visible = ref(true)

    const typeClass = computed(() => `nb-alert--${ props.type }`)
    const iconClass = computed(() => TYPE_CLASSMAP[props.type] || 'nb-icon-info')
    const isBigIcon = computed(() => props.description || ctx.slots.default ? 'is-big' : '')
    const isBoldTitle = computed(() => props.description || ctx.slots.default ? 'is-bold' : '')

    const close = evt => {
      visible.value = false
      ctx.emit('click', evt)
    }

    return {
      visible,
      typeClass,
      iconClass,
      isBigIcon,
      isBoldTitle,
      close
    }
  }
})
</script>

<style>

</style>