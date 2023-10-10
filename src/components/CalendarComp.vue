<script setup lang="ts">
import { Calendar } from 'v-calendar'
import { useFileParserStore } from '@/stores/fileParser'
const fileParser = useFileParserStore()
import 'v-calendar/style.css'

// data: () => ({
//   fileParser,
//   attributes: [
//     {
//       key: 'key',
//       content: 'red', // Boolean, String, Object
//       bar: true, // Boolean, String, Object
//       dates: new Date(),
//       customData: {
//         title: 'This is a title',
//         description: 'This is a description'
//       },
//       popover: true,
//       order: 0
//     }
//   ]
// }),
</script>

<template>
  <button @click="fileParser.getCalendarData()">CalendarData</button>
  <Calendar :attributes="fileParser.calendarFormattedData">
    <template #day-popover="{ attributes }">
      <div class="px-2">
        <div v-for="{ key, customData } in attributes" :key="key">
          <h1>
            {{ customData.title }}
          </h1>
          <p>
            {{ customData.description }}
          </p>
          <a>Link to download</a>
        </div>
      </div>
    </template>
  </Calendar>
</template>

<style scoped></style>
