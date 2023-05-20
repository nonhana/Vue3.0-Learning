<template>
  <div class="btns">
    <button v-has-show="'shop:edit'">创建</button>

    <button v-has-show="'shop:create'">编辑</button>

    <button v-has-show="'shop:delete'">删除</button>
  </div>
</template>

<script setup lang="ts">
import type { Directive } from 'vue'
// 模拟permission鉴权
localStorage.setItem('userId', 'non_hana') // 存入用户id到本地
// mock后台返回的权限数据字符串数组
// 格式：用户id:当前页面信息:相关权限字符串
const permission = [
  'non_hana:shop:edit',
  'non_hana:shop:create',
  'non_hana:shop:delete',
]
const userId = localStorage.getItem('userId') as string
// Directive指定自定义指令时，最好用的函数名是vXxYy形式的驼峰命名
// 用在对应的dom上：v-xx-yy，和Vue内部指令形式类似，有更良好的可读性
const vHasShow: Directive<HTMLElement, string> = (el, binding) => {
  console.log(el, binding)
  // userId + ':' + binding.value拼接用户权限字符串，对应上述Array↑
  if (!permission.includes(userId + ':' + binding.value)) {
    // 如果检测到用户没有上述的权限，把对应的按钮给隐藏
    el.style.display = 'none'
  }
}
</script>

<style scoped lang="less">
.btns {
  button {
    margin: 10px;
  }
}
</style>