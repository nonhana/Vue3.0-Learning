<template>
  <div>
    <img id="img" src="../../static/images/0 (1).jpg" alt="">
  </div>
</template>

<script setup lang="ts">
import useBase64 from './index'

useBase64({
  el: '#img'
}).then((res: any) => {
  console.log(res.baseUrl)
})
</script>

<style scoped></style>