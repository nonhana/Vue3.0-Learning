<template>
  <div>
    <A>
      <div class="red">我是插槽内容</div>
    </A>
  </div>
  <span :class="[non_hana.span, non_hana.border]">module css</span>
</template>

<script setup lang="ts">
import A from './插槽选择器.vue';
</script>

<style module="non_hana">
.span {
  color: red;
}

.border {
  border: 1px solid #9e9e9e;
}
</style>