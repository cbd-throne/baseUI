<template>
  <transition name="nb-fade-in">
    <div
      v-if="visible"
      :style="{
        'right': styleRight,
        'bottom': styleBottom
      }"
      class="nb-backtop"
      @click.stop="handleClick"
    >
      <slot>
        <i class="nb-icon-caret-top"></i>
      </slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import throttle from 'lodash/throttle'
import { on, off } from '../../utils/dom'
import { easeInOutCubic } from '../../utils/animation'

interface IElBacktopProps {
  visibilityHeight: number
  target: string
  right: number
  bottom: number
}

export default defineComponent({
  name: 'NbBacktop',
  props: {
    visibilityHeight: {
      type: Number,
      default: 200
    },
    target: {
      type: String,
      default: ''
    },
    right: {
      type: Number,
      default: 40
    },
    bottom: {
      type: Number,
      default: 40
    }
  },
  emits: ['click'],
  setup(props: IElBacktopProps, ctx) {
    const el = ref(null)
    const container = ref(null)
    const visible = ref(false)
    const styleBottom = computed(() => `${props.bottom}px`)
    const styleRight = computed(() => `${props.right}px`)

    // 滚动到顶部
    const scorllToTop = () => {
      const beginTime = Date.now()
      const beginValue = el.value.scrollTop
      const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500
        if (progress < 1) {
          el.value.scrollTop = beginValue * (1 - easeInOutCubic(progress))
        } else {
          el.value.scrollTop = 0
        }
      }

      rAF(frameFunc)
    }

    // 滚动监听 是否展示
    const onScroll = () => {
      visible.value = el.value.scrollTop >= props.visibilityHeight
    }

    // 点击 返回到顶部
    const handleClick = () => {
      scorllToTop()
      ctx.emit('click', event)
    }

    const throttledScrollHandler = throttle(onScroll, 300)

    onMounted(() => {
      container.value = document
      el.value = document.documentElement
      if (props.target) {
        el.value = document.querySelector(props.target)
        if(!el.value) {
          throw new Error(`target is not existed: ${props.target}`)
        }
        container.value = el.value
      }
      on(container.value, 'scroll', throttledScrollHandler)
    })

    onBeforeUnmount(() => {
      // 卸载
      off(container.value, 'scroll', throttledScrollHandler)
    })

    return {
      el,
      container,
      visible,
      styleBottom,
      styleRight,
      handleClick
    }
  },
})
</script>

<style>

</style>