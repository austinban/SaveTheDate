<script setup lang="ts">
import { Calendar } from 'v-calendar'
import { useFileParserStore } from '@/stores/fileParser'
const fileParser = useFileParserStore()
import 'v-calendar/style.css'
import DownloadFileLink from '@/components/DownloadFileLink.vue'
</script>

<template>
  <Calendar :attributes="fileParser.getDates()" expanded>
    <template #day-popover="{ attributes }">
      <div class="wrapper">
        <div v-for="{ key, customData } in attributes" :key="key">
          {{ console.log(customData) }}
          <div class="header">
            <h2>
              {{ customData.file.name }}
            </h2>
            <DownloadFileLink :file="customData.file" />
          </div>
          <div
            class="context"
            v-html="
              `...${customData.date.contextString.replace(
                customData.date.originalString,
                '<b>' + customData.date.originalString + '</b>'
              )}...`
            "
          />
        </div>
      </div>
    </template>
  </Calendar>
</template>

<style scoped>
.wrapper {
  padding: 1em;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5em;
}
</style>
