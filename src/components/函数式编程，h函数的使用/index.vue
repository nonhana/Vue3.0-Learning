<template>
  <table>
    <thead>
      <tr>
        <th>姓名</th>
        <th>年龄</th>
        <th>性别</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in dataList">
        <td>{{ item.name }}</td>
        <td>{{ item.age }}</td>
        <td>{{ item.gender }}</td>
        <td>
          <!-- 调用h函数创建的组件 -->
          <Btn type="success">编辑</Btn>
          <Btn type="error">删除</Btn>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { h } from 'vue'
// vue组件的编写分为三种风格：1. template模板书写风格 2. tsx编写风格 3. 函数式编程风格（h函数）
// h函数的源码是createVNode函数，用于创建虚拟节点
// h函数的优势在于使用它的时候可以跳过模板的编译
// 一般组件的编译方式：parser -> ast抽象语法树 -> transform -> js api -> generator -> render函数，h函数直接跳过了parser和generator，直接使用h函数编写render
// h函数的缺点在于编写函数时过于繁琐，学习成本略高
// Vue3使用h函数较少了，但是在一些小组件的编写上还是很有用的，比如封装一些按钮组件或者弹框组件，可以使用h函数，如下所示。

const dataList = [
  { name: 'non_hana', age: 18, gender: '男' },
  { name: 'non_hana', age: 18, gender: '男' },
  { name: 'non_hana', age: 18, gender: '男' },
  { name: 'non_hana', age: 18, gender: '男' },
  { name: 'non_hana', age: 18, gender: '男' },
  { name: 'non_hana', age: 18, gender: '男' },
  { name: 'non_hana', age: 18, gender: '男' },
  { name: 'non_hana', age: 18, gender: '男' },
  { name: 'non_hana', age: 18, gender: '男' },
  { name: 'non_hana', age: 18, gender: '男' },
]

// 定义按钮的状态
interface Props {
  type: 'success' | 'error'
}

// 使用Vue的h函数创建按钮组件，可以传递参数。第一个参数写在组件的标签内进行传递，如：<Btn type="success">，传递type属性，用props进行接收
// 第二个ctx就是组件的上下文，比如：<Btn>按钮</Btn>，这个"按钮"就是传递的ctx参数，可以通过ctx.slots.default()获取内容其中的内容
const Btn = (props: Props, ctx: any) => {
  // h函数的第一个参数是标签名，第二个参数是标签的属性，第三个参数是标签的内容。
  // 标签的属性包括style，class，事件绑定等
  return h('button',
    {
      class: ['Btn', props.type],
      onClick: () => {
        console.log('click')
      },
      // 组件挂载到页面上时触发
      onVnodeMounted: () => {
        console.log('mounted')
      }
    },
    // 通过ctx.slots.default()获取组件的内容
    ctx.slots.default())
}
</script>

<style scoped lang="less">
table {
  border-collapse: collapse;
  /* 边框重叠 */
  width: 100%;
  max-width: 800px;
  /* 设置表格最大宽度 */
  margin: 0 auto;
  /* 居中对齐 */
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

thead {
  background-color: #f2f2f2;
}

/* 选择tr中的偶数行，even为偶数，odd为奇数 */
tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* 按钮样式 */
.Btn {
  display: inline-block;
  /* 行内块元素 */
  padding: 6px 12px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 6px;
}

.Btn.error {
  background-color: #f44336;
}

/* 鼠标悬停时的按钮样式 */
.Btn:hover {
  opacity: 0.8;
}
</style>