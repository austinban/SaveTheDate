<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="body-wrapper">
    <RouterView />
  </div>
</template>

<style scoped>
.body-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2em 4em;
}
</style>
