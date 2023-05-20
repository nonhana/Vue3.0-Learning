<template>
  <div>{{ $env }}</div>
  <div>{{ $filter.format('奶奶滴！！') }}</div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const app = getCurrentInstance()
console.log(app?.proxy?.$filter.format('123213123'))
</script>

<style scoped></style>