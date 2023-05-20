<template>
  <div>
    <div>
      <img v-for="item in arr" v-lazy-load="item" width="800" :src="item" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Directive } from 'vue'
// import.meta：一次性导入一个文件夹下的所有内容，适用于导入一系列图片等静态资源进行后续处理
/* 
  glob是懒加载的模式，类似于下方的模块引入：
  let modules = {
    'xxxx': () => import('xxxx')
  }
*/
/* 
  globEager是默认静态加载的模式，或者携程glob后面加上{ eager: true }参数。
  import xxxx from 'xxxx'
*/
// Record<KeyType, ValueType> 是 TypeScript 提供的一种泛型类型，用于定义一个键值对集合的类型。
// KeyType 表示键的类型，ValueType 表示值的类型，也就是说用Record可以自定义一个对象类型。
let imageList: Record<string, { default: string }> = import.meta.glob('../../static/images/*', { eager: true })
let arr = Object.values(imageList).map(v => v.default)
let vLazyLoad: Directive<HTMLImageElement, string> = async (el, binding) => {
  const def = await import('../../static/default.jpg')
  el.src = def.default
  const observer = new IntersectionObserver((entry) => {
    console.log(entry[0], binding.value)
    if (entry[0].intersectionRatio > 0) {
      el.src = binding.value
      observer.unobserve(el)
    }
  })
  observer.observe(el)
}
</script>

<style scoped></style>