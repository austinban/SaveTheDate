<script setup lang="ts">
defineProps<{
  file: File
}>()

const downloadFile = (f: File) => {
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(f)
  link.download = f.name
  link.click()
}
</script>

<template>
  <a @click="downloadFile(file)" class="link">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30" x="0px" y="0px">
      <title>Download: {{ file.name }}</title>
      <g data-name="Layer 2">
        <path
          d="M22,15.75A1.252,1.252,0,0,0,20.75,17v3a.752.752,0,0,1-.75.75H4A.752.752,0,0,1,3.25,20V17a1.25,1.25,0,0,0-2.5,0v3A3.254,3.254,0,0,0,4,23.25H20A3.254,3.254,0,0,0,23.25,20V17A1.252,1.252,0,0,0,22,15.75Z"
        />
        <path
          d="M12,.75A1.252,1.252,0,0,0,10.75,2V13.331L6.8,10.04A1.251,1.251,0,0,0,5.04,10.2,1.251,1.251,0,0,0,5.2,11.96l6,5a1.269,1.269,0,0,0,.2.116,1.179,1.179,0,0,0,.143.082,1.174,1.174,0,0,0,.911,0,1.3,1.3,0,0,0,.14-.081,1.279,1.279,0,0,0,.2-.116l6-5A1.25,1.25,0,0,0,18,9.75a1.255,1.255,0,0,0-.8.29L13.25,13.331V2A1.252,1.252,0,0,0,12,.75Z"
        />
      </g>
    </svg>
  </a>
</template>

<style scoped>
.link {
  color: var(--color-secondary);
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.2s;
  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
}

svg {
  width: 1.2em;
  height: 1.2em;
}
</style>
