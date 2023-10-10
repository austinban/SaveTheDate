<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
  buttonProps?: {
    onClick: () => void
    label: string
  }
}>()
</script>

<template>
  <h1>{{ title }}</h1>
  <p>{{ subtitle }}</p>
  <button v-if="buttonProps" @click="buttonProps.onClick">{{ buttonProps.label }}</button>
</template>

<style scoped>
h1 {
  margin-bottom: 0;
}
</style>
