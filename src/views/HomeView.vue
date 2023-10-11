<script setup>
import { ref } from 'vue'
import { useFileParserStore } from '@/stores/fileParser'
const fileParser = useFileParserStore()
import BubbleWrapper from '@/components/BubbleWrapper.vue'
import FileUploader from '@/components/FileUploader.vue'
import CalendarComp from '@/components/CalendarComponent.vue'
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
    :buttonProps="{
      onClick: toggleShowUpload,
      label: showUpload ? 'Hide Uploader' : 'Add Files',
      hidden: fileParser.processedFileObjects.length === 0
    }"
  />
  <BubbleWrapper v-if="!fileParser.processedFileObjects.length | showUpload">
    <FileUploader />
  </BubbleWrapper>
  <div class="grid-wrapper">
    <div>
      <BubbleWrapper v-if="fileParser.processedFileObjects.length">
        <FileList />
      </BubbleWrapper>
    </div>
    <div>
      <BubbleWrapper v-if="fileParser.processedFileObjects.length">
        <CalendarComp />
      </BubbleWrapper>
    </div>
  </div>
</template>

<style scoped>
.grid-wrapper {
  display: grid;
  grid-template-columns: 1.2fr 2fr;
  grid-gap: 2em;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}
</style>
