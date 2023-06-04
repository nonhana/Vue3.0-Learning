<script setup lang="ts">
import { useTestStore } from '../../store'
import { storeToRefs } from 'pinia'
const Test = useTestStore()

// 解构store
// 原始的pinia解构出来是不支持响应式的，所以需要使用storeToRefs进行解构
const { name, count } = storeToRefs(Test)

const singleChange = () => {
  // 修改store里面的值，直接进行调用修改就可以
  Test.count++
}
const multipleChange = () => {
  // $patch可以修改多个值
  Test.$patch({
    name: 'pinia',
    count: 100
  })
}
const functionChange = () => {
  Test.$patch((state) => {
    state.count = 123123321;
    state.name = "阿萨德到";
  })
}
const stateChange = () => {
  // 使用$state修改值的时候，必须全部覆盖在./store/index.ts中所定义的state的全部值
  Test.$state = {
    name: 'state',
    count: 21232131,
    user: {
      name: 'user',
      age: 18
    }
  }
}
const selfChange = () => {
  // 直接调用store里面的方法进行值的修改
  // 可以进行传参，若传参，则在actions当中要接收
  Test.setCount(3248203825702)
}

// subscribe监听store的值的变化
Test.$subscribe((arg, state) => {
  console.log("==========>", arg)
  console.log("==========>", state)
}, {
  detached: true,
  deep: true,
  // flush的作用是在监听的时候，是否立即执行一次
  flush: 'post'
})

// onAction监听actions的调用
Test.$onAction((arg) => {
  console.log("==========>", arg)
  arg.after(() => {
    console.log("after")
  })
}, true)
</script>

<template>
  <div>
    <div>
      <span>Pinia中Store的值：</span>
    </div>
    <div>
      <span>name:{{ Test.name }}</span>
    </div>
    <div>
      <span>count:{{ Test.count }}</span>
    </div>
    <div>
      <span>user:{{ Test.user }}</span>
    </div>
  </div>
  <br>
  <hr>
  <br>
  <div>
    singleChange:
    <button class="button primary-button" @click="singleChange">changeCount</button>
  </div>
  <br>
  <hr>
  <br>
  <div>
    multipleChange:
    <button class="button primary-button" @click="multipleChange">multipleChange</button>
  </div>
  <br>
  <hr>
  <br>
  <div>
    functionChange:
    <button class="button primary-button" @click="functionChange">functionChange</button>
  </div>
  <br>
  <hr>
  <br>
  <div>
    stateChange:
    <button class="button primary-button" @click="stateChange">stateChange</button>
  </div>
  <br>
  <hr>
  <br>
  <div>
    selfChange:
    <button class="button primary-button" @click="selfChange">selfChange</button>
  </div>
  <br>
  <hr>
  <br>
  <div>
    调用storeToRefs进行解构后的值：
    {{ name }} - {{ count }}
  </div>
  <br>
  <hr>
  <br>
  <div>
    <div>
      调用actions内部的方法对store的值进行修改（同步）：
      <button class="button primary-button" @click="Test.setUser()">setUser</button>
    </div>
    <div>
      调用actions内部的方法对store的值进行修改（异步）：
      <button class="button primary-button" @click="Test.setUserPromise()">setUserPromise</button>
    </div>
  </div>
  <br>
  <hr>
  <br>
  <div>
    调用getters内部经过修饰后的值：
    {{ Test.newName }}
    {{ Test.newAge }}
    {{ Test.newUserInfo }}
  </div>
  <br>
  <hr>
  <br>
  <div>
    <button class="button primary-button" @click="Test.$reset">点击恢复到原始值</button>
  </div>
</template>

<style scoped lang="less">
// 主色调
@primary-color: #ff4081;
// 辅助色调
@secondary-color: #3f51b5;

.button {
  display: inline-block;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary-button {
  color: #fff;
  background-color: @primary-color;
  border: none;

  &:hover {
    background-color: darken(@primary-color, 10%);
  }
}

.secondary-button {
  color: @secondary-color;
  background-color: transparent;
  border: 2px solid @secondary-color;

  &:hover {
    background-color: @secondary-color;
    color: #fff;
  }
}
</style>
