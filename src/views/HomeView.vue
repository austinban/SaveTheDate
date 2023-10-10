<script setup>
import { ref } from 'vue'
import { useFileParserStore } from '@/stores/fileParser'
const fileParser = useFileParserStore()
import BubbleWrapper from '@/components/BubbleWrapper.vue'
import FileUploader from '@/components/FileUploader.vue'
import CalendarComp from '@/components/CalendarComp.vue'
import FileList from '@/components/FileList.vue'
import AppHeader from '@/components/AppHeader.vue'

const showUpload = ref(false)

const toggleShowUpload = () => {
  showUpload.value = !showUpload.value
}
</script>

<template>
  <AppHeader
    title="Save the Date"
    subtitle="To get started, drag or select your DOCX file, and we'll do all the hard work for you to save the dates from your files."
    buttonProps="{onClick: toggleShowUpload, label: 'Add More Files'}"
  />
  <button @click="toggleShowUpload">Add More Files</button>
  <BubbleWrapper v-if="!fileParser.rawTextFiles.length | showUpload">
    <FileUploader />
  </BubbleWrapper>
  <BubbleWrapper v-if="fileParser.rawTextFiles.length">
    <FileList />
  </BubbleWrapper>
  <BubbleWrapper v-if="fileParser.rawTextFiles.length">
    <CalendarComp />
  </BubbleWrapper>
</template>
