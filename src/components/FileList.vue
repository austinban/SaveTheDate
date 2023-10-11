<script setup lang="ts">
import DownloadFileLink from '@/components/DownloadFileLink.vue'
import { useFileParserStore } from '@/stores/fileParser'
const fileParser = useFileParserStore()
</script>

<template>
  <div class="wrapper" v-for="f in fileParser.rawTextFiles" :key="f.file.name">
    <div class="header">
      <h2>{{ f.file.name }}</h2>
      <DownloadFileLink :file="f.file" />
    </div>
    <div class="list">
      <div class="item" v-for="date in f.dates" :key="date.originalString">
        <h4>{{ date.parsedDate.toDateString() }}</h4>

        <div class="context-wrapper">
          <div class="context-title">Context:</div>
          <div
            class="context"
            v-html="
              `...${date.contextString.replace(
                date.originalString,
                '<b>' + date.originalString + '</b>'
              )}...`
            "
          />
        </div>
      </div>
    </div>
  </div>
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
  padding: 0.5em 0;
  &:last-child {
    border-bottom: none;
  }
}

.context {
  font-size: 0.8em;
}

.context-title {
  font-size: 0.8em;
}

.context-wrapper {
  margin-top: 0.5em;
  display: flex;
}

.link {
  color: var(--color-secondary);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
