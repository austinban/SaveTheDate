<script setup>
import { ref } from 'vue'
import DownloadFileLink from '@/components/DownloadFileLink.vue'
import { useFileParserStore } from '@/stores/fileParser'
import FileListItem from '@/components/FileListItem.vue'
const fileParser = useFileParserStore()
const showFilePreview = ref(false)
</script>

<template>
  <div
    class="wrapper"
    v-for="fileObject in fileParser.processedFileObjects"
    :key="fileObject.file.name"
  >
    <div class="header">
      <h2>{{ fileObject.file.name }}</h2>
      <DownloadFileLink :file="fileObject.file" />
    </div>
    <div class="list">
      <FileListItem v-for="dateObject in fileObject.dates" :dateObject="dateObject" />
    </div>
  </div>
  <div class="" v-if="showFilePreview"></div>
</template>

<style scoped>
.wrapper {
  margin-bottom: 2rem;
  &:last-child {
    margin-bottom: 0;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list {
  max-height: 30vh;
  overflow-y: auto;
  margin-top: 1em;
}

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
