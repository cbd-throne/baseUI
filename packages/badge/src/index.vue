<template>
  <div class="nb-badge">
    <slot></slot>
    <transition name="nb-zoom-in-center">
      
    </transition>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
export default {
  name: 'nb-badge',
}
</script>

<style>

</style>