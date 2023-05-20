<template>
  <div>
    <button @click="change">切换</button>
  </div>
  <child v-if="flag" v-move:aaa.hana="{
    background: 'red',
    flag: flag
  }" />
</template>

<script setup lang="ts">
import child from '../自定义指令：Directive使用/child.vue';
import { Directive, DirectiveBinding, ref } from 'vue';
let flag = ref<boolean>(true)
// 给类型{ background: string }重命名为Dir
type Dir = {
  background: string
}
// 在父组件中，给子组件赋生命周期需要定义vMove:Directive
const vMove: Directive = {
  created() {
    console.log('========>created')
  },
  beforeMount() {
    console.log('========>beforeMount')
  },
  // 单纯的未结构的args为当前的子组件dom信息
  // 将args解构成一个数组后，该数组包含子组件的各种参数信息
  /* 
    args[1]内部便是父组件通过v-move传递给子组件的参数信息
    例如：在这个父组件中：v-move:aaa.hana="{background:'red'}"
    aaa：为v-move传递的参数，arg
    hana：为v-move传递的修饰符，modifiers，
    {background:'red'}：为v-move传递的值，value，为一个对象的形式
  */
  mounted(el: HTMLElement, dir: DirectiveBinding<Dir>) {
    console.log('========>mounted')
    console.log(dir.value.background)
    el.style.background = dir.value.background
  },
  beforeUpdate() {
    console.log('========>beforeUpdate')
  },
  updated() {
    console.log('========>updated')
  },
  beforeUnmount() {
    console.log('========>beforeUnmount')
  },
  unmounted() {
    console.log('========>unmounted')
  }
}
const change = () => {
  flag.value = !flag.value
}
</script>

<style scoped></style>