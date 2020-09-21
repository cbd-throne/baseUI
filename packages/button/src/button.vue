<template>
  <button
    :class="[
      'nb-button',
      type ? 'nb-button--' + type : '',
      buttonSize ? 'nb-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    @click="handleClick"
  >
    <i v-if="loading" class="nb-icon-loading"></i>
    <i v-if="!loading && icon" :class="icon"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from 'vue'

type IButtonType = PropType<'primary' | 'success' | 'danger' | 'warning' | 'info' | 'text' | 'default'>
type IButtonSize = PropType<'small' | 'mini' | 'medium'>
type IButtonNativeType = PropType<'button' | 'submit' | 'reset'>

const ELEMENT: {
  size?: number
} = {}

interface IButtonProps {
  type: string,
  size: string,
  icon: string,
  nativeType: string,
  loading: boolean,
  disabled: boolean,
  plain: boolean,
  autofocus: boolean,
  round: boolean,
  circle: boolean
}


type EmitFn = (evt: Event) => void;

export default defineComponent ({
  name: 'NbButton',
  props: {
    type: {
      type: String as IButtonType,
      defualt: 'default'
    },
    size: {
      type: String as IButtonType,
      default: 'small'
    },
    icon: {
      type: String,
      default: ''
    },
    loading: Boolean,
    nativeType: {
      type: String as IButtonNativeType,
      default: 'button'
    },
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean
  },
  emits: ['click'],
  setup(props, ctx) {

    // computed
    const buttonSize = computed(() => {
      return props.size || 'small'
    })

    const buttonDisabled = computed(() => {
      return props.disabled || false
    })

    const handleClick = evt => {
      ctx.emit('click', evt)
    }

    return {
      buttonSize,
      buttonDisabled,
      handleClick
    }
  }
})
</script>