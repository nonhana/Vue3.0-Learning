<template>
  <div v-if="modelValue" class="main">
    <div>
      <span>我是vModel子组件</span>
    </div>
    <div>
      <span>isShow:{{ modelValue }}</span>
    </div>
    <div>
      <button @click="close">点击关闭</button>
    </div>
    <div>
      <input @input="change" :value="textVal" type="text">
    </div>
  </div>
</template>

<script setup lang="ts">
// 父组件通过v-model传给子组件值时
// 子组件接收用的props默认值:vue2-value;vue3-modelValue
const props = defineProps<{
  modelValue: boolean,
  textVal: string,
  // XXXModifiers：在父组件中，接收传递XXX参数的时候所指定的修饰符，可有可无
  textValModifiers?: {
    hana: boolean
  }
}>()
// 定义emit，update:后方跟父组件传递给子组件的参数，实现双向绑定。
const emit = defineEmits(['update:modelValue', 'update:textVal'])
const close = () => {
  emit('update:modelValue', false)
}
const change = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:textVal', props?.textValModifiers?.hana ? target.value + 'hana！' : target.value)
}
</script>

<style scoped>
.main {
  padding: 10px;
  border: 2px solid #9e9e9e;
  border-radius: 10px;
}
</style>