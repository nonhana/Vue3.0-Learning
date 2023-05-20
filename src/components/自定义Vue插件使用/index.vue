<template>
  <div v-if="isShow" class="loading">
    少女折寿中...
  </div>
</template>

<script setup lang="ts">
const isShow = ref<boolean>(false)
const show = () => isShow.value = true
const hide = () => isShow.value = true

// 把vue组件内部的函数暴露出来，
// 能够被其他引用该组件的ts通过VNode.component?.exposed?.调用到。
defineExpose({
  show,
  hide
})
</script>

<style scoped>
.loading {
  background-color: #000;
  opacity: 0.8;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #fff;
}
</style>