<template>
  <div class="about">
    <button @click="fileParser.parseDates()">Parse Dates</button>
    {{ console.log(fileParser.parsedDates) }}
    <input type="file" @change="uploadFiles" ref="file" multiple />
    <div v-for="file in fileParser.rawTextFiles" :key="file.value">
      <div>{{ file.name }}:</div>
      <div>{{ file.value }}</div>
    </div>
    <div v-for="file in fileParser.parsedDates" :key="file.fileName">
      <div>{{ file.fileName }}:</div>
      <div v-for="date in file.dates" :key="date.originalString">
        <div>{{ date.originalString }}:</div>
        <div>{{ date.parsedDate }}:</div>
      </div>
    </div>
    <Calendar :attributes="attributes">
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
  </div>
</template>

<script>
import { useFileParserStore } from '@/stores/fileParser'
const fileParser = useFileParserStore()
import { Calendar } from 'v-calendar'
import 'v-calendar/style.css'

export default {
  data: () => ({
    fileParser,
    attributes: [
      {
        key: 'key',
        content: 'red', // Boolean, String, Object
        bar: true, // Boolean, String, Object
        dates: new Date(),
        customData: {
          title: 'This is a title',
          description: 'This is a description'
        },
        popover: true,
        order: 0
      }
    ]
  }),
  components: {
    Calendar
  },
  methods: {
    uploadFiles: async function () {
      Object.values(this.$refs.file.files).forEach((file) => {
        fileParser.addFile(file)
      })
    }
  }
}
</script>

<style scoped>
.about {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
