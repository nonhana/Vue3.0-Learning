<template>
  <div v-move class="box">
    <div class="header"></div>
    <div>内容</div>
  </div>
</template>

<script setup lang="ts">
import { Directive } from 'vue'
// 自定义指令，主要实现：鼠标指针在header中时，按下时能够将整个box进行拖动
// 定义一个名为vMove的自定义指令
const vMove: Directive<any, void> = (el: HTMLElement) => {
  // 获取需要拖动的子元素
  let moveElement: HTMLDivElement = el.firstElementChild as HTMLDivElement;

  console.log(moveElement);

  // 鼠标按下事件回调函数
  const mouseDown = (e: MouseEvent) => {
    // 计算鼠标在元素内的偏移值
    let X = e.clientX - el.offsetLeft;
    let Y = e.clientY - el.offsetTop;

    // 鼠标移动事件回调函数
    const move = (e: MouseEvent) => {
      console.log(e);
      // 根据鼠标位置修改元素的样式，实现拖动效果
      el.style.left = e.clientX - X + 'px';
      el.style.top = e.clientY - Y + 'px';
    };

    // 绑定鼠标移动事件和鼠标松开事件的监听器
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', () => {
      // 鼠标松开时移除鼠标移动事件的监听器
      document.removeEventListener('mousemove', move);
    });
  };

  // 给子元素添加鼠标按下事件的监听器，实现拖动效果
  moveElement.addEventListener('mousedown', mouseDown);
};
</script>

<style scoped>
.box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 3px solid #000;

  .header {
    height: 20px;
    background: #000;
  }
}
</style>