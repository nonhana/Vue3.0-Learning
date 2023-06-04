import { toRaw } from "vue"; // 引入toRaw
import { PiniaPluginContext } from "pinia"; // 引入pinia

type Options = {
  key?: string;
};

const __piniaKey__: string = "non_hana"; // 默认key值

// 定义存储本地空间的函数
const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// 定义读取本地空间的函数
const getStorage = (key: string) => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) as string)
    : {};
};

// 定义pinia插件函数
const piniaPlugin = (options: Options) => {
  // 此处return是函数科里化的写法，经常用于解构函数参数，也就是参数降维
  // 当store.use(piniaPlugin())时，会自动传入context，而我们此处需要自定义传入的options，所以需要返回一个函数来接收这个自动传入的context
  return (context: PiniaPluginContext) => {
    const { store } = context; // 将context解构出来
    // 调用getStorage读取存在本地的已有数据
    const data = getStorage(`${options?.key ?? __piniaKey__}-${store.$id}`); // 读取本地空间的数据
    store.$subscribe(() => {
      console.log("changed");
      setStorage(
        `${options?.key ?? __piniaKey__}-${store.$id}`,
        toRaw(store.$state)
      );
    });
    console.log(store, "store");
    // 返回值覆盖pinia state里面的原始值
    return {
      ...data,
    };
  };
};

// 导出pinia插件
export default piniaPlugin;
