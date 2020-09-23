import { values } from "lodash";

<template>
  <i :class="`nb-icon-${type}`" :style="{color: color, fontSize: fontSize}" @click="handleClick"></i>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'NbIcon',
  props: {
    type: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#666666'
    },
    fontSize: {
      type: String,
      default: '12px'
    }
  },
  setup(props, ctx) {
    const handleClick = evt => {
      ctx.emit('click', evt)
    }
    return {
      handleClick
    }
  }
})
</script>

<style>

</style>