<template>
  <div>
    <button @click="add">增长数字</button>
  </div>
  <div>
    {{ count }}
  </div>

  <div>
    响应性解构：{{ name }}
  </div>

  <div>
    响应性解构：{{ age }}
  </div>
</template>

<script setup lang="ts">
import { $ref, $$, $ } from 'vue/macros'
import { watch, reactive } from 'vue'

// $ref的作用是可以在编译的时候直接在响应式数据后面添上.value来获取到其中的值
let count = $ref<number>(0)
// 通过$$把count.value转换成响应式数据
watch($$(count), (newVal, oldVal) => {
  console.log(newVal, oldVal)
})
// 通过$ref获取响应式数据，不用加.value来获取值了
const add = () => {
  count++
}

const obj = reactive({
  name: '张三',
  age: 18
})

// $的作用是可以直接把响应式数据解构出来
let { name, age } = $(obj)
// 之后就可以直接对结构出来的值进行响应性赋值
name = '123123'
</script>

<style scoped></style>