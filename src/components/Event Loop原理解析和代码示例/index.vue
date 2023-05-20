<template></template>

<script setup lang="ts">
async function Prom() {
  console.log('Y');
  await Promise.resolve();
  console.log('X');
}
setTimeout(() => {
  console.log(1);
  Promise.resolve().then(() => {
    console.log(2);
  })
}, 0)
setTimeout(() => {
  console.log(3);
  Promise.resolve().then(() => {
    console.log(4);
  })
}, 0)
Promise.resolve().then(() => {
  console.log(5);
})
Promise.resolve().then(() => {
  console.log(6);
})
Promise.resolve().then(() => {
  console.log(7);
})
Promise.resolve().then(() => {
  console.log(8);
})
Prom();
console.log(0);
/* 
  输出结果：
  Y
  0
  5
  6
  7
  8
  X
  1
  2
  3
  4
  首先，函数Prom()被调用，它会按顺序执行以下操作：
  1. 打印出Y。
  2. 使用await等待一个已解析的Promise（Promise.resolve()）。
  3. 打印出X。
  4. 然后，setTimeout函数被调用两次，指定时间为0。但是由于JavaScript的事件循环机制，它们并不会立即执行，而是会在当前任务队列执行完毕后尽快执行。
  5. 然后，连续的Promise.resolve().then()调用会立即执行，并按顺序打印出5、6、7和8。
  6. 当前任务队列执行完毕后，开始执行setTimeout回调函数：
  7. 第一个setTimeout回调函数执行，打印出1。
  8. 然后，立即执行Promise.resolve().then()回调函数，打印出2。
  9. 第二个setTimeout回调函数执行，打印出3。
  10. 然后，立即执行Promise.resolve().then()回调函数，打印出4。
  11. 最后的输出顺序是按照代码中的顺序打印的，因此最后打印出0。 
*/
/* 
  有关于事件循环的一些知识：
  在JavaScript中，事件循环（event loop）是一种机制，用于管理代码的执行顺序和处理异步操作。
  事件循环机制是基于单线程的JavaScript执行环境的一种运行方式。它由一个事件循环线程负责，在这个线程中，JavaScript引擎会不断地从任务队列中获取任务，并执行这些任务。
  事件循环的一个迭代包括以下几个阶段：
  1. 执行同步任务（同步代码）：按照代码的顺序执行同步任务，即顺序执行JavaScript代码中的同步操作。
  2. 执行微任务：执行所有微任务（microtask），包括Promise的then和catch回调函数、async/await等。微任务会在当前任务执行完成后立即执行，而且在同一迭代中会一直执行，直到微任务队列为空。
  3. 执行宏任务（macrotask）：执行下一个宏任务，宏任务包括setTimeout、setInterval、DOM事件处理程序等。宏任务会在当前任务执行完成后添加到任务队列中，在下一个事件循环迭代中执行。
  4. 更新渲染（重绘与重排）：如果需要更新页面的渲染，例如修改了DOM样式或布局等，此阶段会触发浏览器的重绘与重排操作。
  5. 等待新的事件触发：在当前事件循环迭代结束后，等待新的事件触发，例如用户交互事件、网络请求返回等。
  如果宏任务中有嵌套的同步代码、微任务和宏任务，那么执行的顺序是：
  1. 执行同步代码。
  2. 执行微任务。
  3. 执行宏任务。
  4. 更新渲染。
  5. 等待新的事件触发。
  以此类推，直到任务队列中没有任务为止。
*/
</script>

<style scoped></style>