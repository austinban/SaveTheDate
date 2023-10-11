<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
  buttonProps?: {
    onClick: () => void
    label: string
    hidden?: boolean
  }
}>()
</script>

<template>
  <div class="header-wrapper">
    <h1>{{ title }}</h1>
    <button v-if="buttonProps && !buttonProps.hidden" @click="buttonProps.onClick">
      {{ buttonProps.label }}
    </button>
  </div>
  <p>{{ subtitle }}</p>
</template>

<style scoped>
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
  @media (max-width: 992px) {
    flex-direction: column;
    align-items: flex-start;
  }
}
p {
  margin-bottom: 2em;
}
</style>
