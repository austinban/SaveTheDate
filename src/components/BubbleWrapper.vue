<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(1em);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.wrapper {
  background: white;
  border-radius: 2em;
  padding: 2em;
  margin-bottom: 2em;
  animation: fadeIn 1s;
  filter: drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.05));
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
