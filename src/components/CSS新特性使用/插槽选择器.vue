<template>
  <div>
    我是插槽
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
::slotted(.red) {
  color: red;
}
</style>