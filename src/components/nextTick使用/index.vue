<template>
  <div ref="box" class="wraps">
    <div class="item" v-for="item in chatList">
      <div>{{ item.name }}</div>
      <div>{{ item.message }}</div>
    </div>
  </div>
  <div class="ipt">
    <div>
      <textarea v-model="ipt" type="text"></textarea>
    </div>
    <div>
      <button @click="send">send</button>
    </div>
  </div>
</template>

<script setup lang="ts">
let chatList = reactive([
  { name: 'non_hana', message: '你好' },
])
let box = ref<HTMLDivElement>()
let ipt = ref('')
/*
  Vue更新dom是以异步方式进行的，但是本身数据的更新是同步进行的
  所以在数据更新后，dom并没有立即更新，而是等待下一次事件循环时更新
  我们本次执行的代码都是同步代码，所以需要使用nextTick去等待dom更新完成后再执行
  此处的box.value!.scrollTop = box.value!.scrollHeight就是在dom更新完成后执行，把滚动条拉到最底部
*/
const send = async () => {
  chatList.push({ name: 'non_hana', message: ipt.value })
  // 1. 回调函数模式
  /* nextTick(() => {
    box.value!.scrollTop = box.value!.scrollHeight
  }) */
  // 2. async/await模式，在await下面的代码都是异步的
  await nextTick()
  box.value!.scrollTop = box.value!.scrollHeight
  // ipt.value = ''
}
</script>

<style scoped>
.wraps {
  margin: 10px auto;
  width: 500px;
  height: 400px;
  overflow: auto;
  overflow-x: hidden;
  background-color: #fff;
  border: 1px solid #ccc;
}

.item {
  width: 100%;
  height: 50px;
  background-color: #ccc;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #fff;
}
</style>