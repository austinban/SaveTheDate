<script setup lang="ts">
defineProps<{
  dateObject: DateObject
}>()

import type { DateObject } from '@/stores/fileParser'
</script>

<template>
  <div class="item" :key="dateObject.originalString">
    <h4>{{ dateObject.parsedDate.toDateString() }}</h4>
    <div
      class="context"
      v-html="
        `...${dateObject.contextString.replace(
          dateObject.originalString,
          '<b>' + dateObject.originalString + '</b>'
        )}...`
      "
    />
  </div>
</template>

<style scoped>
.item {
  border-bottom: 1px solid var(--color-secondary);
  padding: 1em 0;
  &:last-child {
    border-bottom: none;
  }
}

.context {
  margin-top: 0.5em;
  font-size: 0.8em;
}
</style>
