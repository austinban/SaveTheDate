<script>
import { useFileParserStore } from '@/stores/fileParser'
const fileParser = useFileParserStore()
import BouncingArrow from '@/components/BouncingArrow.vue'
export default {
  data() {
    return {
      isDragging: false,
      files: [],
      fileParser
    }
  },
  components: {
    BouncingArrow
  },
  methods: {
    onChange: async function () {
      Object.values(this.$refs.file.files).forEach((file) => {
        fileParser.addFile(file)
      })
    },
    dragover(e) {
      e.preventDefault()
      this.isDragging = true
    },
    dragleave() {
      this.isDragging = false
    },
    drop(e) {
      e.preventDefault()
      this.$refs.file.files = e.dataTransfer.files
      this.onChange()
      this.isDragging = false
    }
  }
}
</script>

<template>
  <div class="dropzone-container" @dragover="dragover" @dragleave="dragleave" @drop="drop">
    <input
      type="file"
      multiple
      name="file"
      id="fileInput"
      class="hidden-input"
      @change="onChange"
      ref="file"
      accept=".docx"
    />
    <label for="fileInput" class="file-label">
      <div class="arrow-wrapper">
        <BouncingArrow />
      </div>
      <h2 v-if="isDragging">Release to drop files here.</h2>
      <h2 v-else>Drop files here or <u>click here</u> to upload.</h2>
    </label>
  </div>
</template>

<style scoped>
.dropzone-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px dashed var(--color-accent-2);
  border-radius: 1em;
  transition: all 0.2s;
  background: var(--color-accent-lightest);

  &:hover {
    background: var(--color-accent-light);
    .file-label {
      transform: scale(1.05);
    }
  }
}

.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.file-label {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  cursor: pointer;
  padding: 4rem;
  text-align: center;
  flex-wrap: wrap;
  transition: all 0.2s;
}

.arrow-wrapper {
  display: flex;
  align-content: center;
  justify-content: center;
  margin-bottom: 2em;
}
</style>
