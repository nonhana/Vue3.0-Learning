import { defineStore } from "pinia";
import { Names } from "./store-name";

type User = {
  name: string;
  age: number;
};

let result: User = {
  name: "test",
  age: 18,
};

// 模拟异步方法
const Login = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "异步方法",
        age: 18000,
      });
    }, 2000);
  });
};
// 测试实例
export const useTestStore = defineStore(Names.Test, {
  // state来存储数据
  state: () => {
    return {
      count: 0,
      name: "test",
      user: <User>{},
    };
  },
  // 类似于computed，用来修饰在state中的数据，可以对数据进行一些处理，然后返回给调用处
  getters: {
    newName(): string {
      return `名字为：${this.user.name}`;
    },
    newAge(): string {
      return `${this.user.age}岁`;
    },
    // getters之间也可以相互调用
    newUserInfo(): string {
      return `${this.newName}，${this.newAge}`;
    },
  },
  // 类似于methods，用来写一些方法，异步同步都可以做，提交state的修改
  actions: {
    // 可以接收调用处传来的参数进行修改，相当于是向外暴露了一个修改自身值的方法，外界只用传入参数即可
    setCount(num: number) {
      // 此处的this指向的是当前store里面的state
      this.count = num;
    },
    // 同步修改user
    setUser() {
      this.user = result;
    },
    // 异步修改user，并调用内部的方法修改name
    async setUserPromise(name?: string) {
      const result = await Login();
      this.user = result;
      this.setName(name ?? "non_hana");
    },
    setName(name: string) {
      this.name = name;
    },
  },
});
// 基础实例
export const useStore = defineStore(Names.Base, {});
