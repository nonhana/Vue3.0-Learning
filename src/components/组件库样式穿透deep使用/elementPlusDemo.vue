<template>
  <div>
    <el-row>
      <el-input class="ipt" placeholder="测试代码"></el-input>
    </el-row>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.ipt {
  width: 300px;
  margin: 100px 400px;
  // 通过 :deep() 穿透到组件内部元素
  :deep(.el-input__inner) {
    background-color: red;
  }
}
</style>