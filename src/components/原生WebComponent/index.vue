<script setup lang="ts">
import { defineCustomElement } from 'vue';
import customVueCe from './custom-vue.ce.vue';
const Btn = defineCustomElement(customVueCe);
window.customElements.define('custom-vue-ce', Btn);
const obj = {
  name: 'non_hana'
}
</script>

<template>
  <div>
    <custom-vue-ce :obj="JSON.stringify(obj)"></custom-vue-ce>
  </div>
</template>

<style scoped></style>
