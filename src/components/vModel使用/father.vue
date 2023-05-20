<template>
  <h1>我是vModel父组件</h1>
  <div>isShow:{{ isShow }}</div>
  <div>
    <button @click="isShow = !isShow">子组件开关</button>
  </div>
  <div>
    <span>内容：{{ text }}</span>
  </div>
  <!-- 给子组件传递多v-model，textVal后方加上自定义修饰符hana -->
  <child v-model:textVal.hana="text" v-model="isShow" />
</template>

<script setup lang="ts">
import child from './child.vue';
let isShow = ref<boolean>(true)
const text = ref<string>('这是一行字符串。')
</script>

<style scoped></style>