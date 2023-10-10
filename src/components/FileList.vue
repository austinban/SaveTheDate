<script setup lang="ts">
import { useFileParserStore } from '@/stores/fileParser'
const fileParser = useFileParserStore()
</script>

<template>
  <div v-for="f in fileParser.rawTextFiles" :key="f.file.name">
    <h1>{{ f.file.name }}:</h1>
    <div v-for="date in f.dates" :key="date.originalString">
      <h3>{{ date.originalString }}:</h3>
      <p>{{ date.parsedDate }}:</p>
    </div>
  </div>
</template>

<style scoped></style>
