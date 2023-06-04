import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./tailwind.css";
import { createPinia } from "pinia"; // 引入pinia
import piniaPlugin from "./store/localStoragePlugin"; // 引入自定义的pinia插件

export const app = createApp(App);
app.use(ElementPlus);

// 用store接收createPinia()返回的对象
const store = createPinia();
// 将piniaPlugin注册到store上
store.use(
  piniaPlugin({
    key: "pinia",
  })
);

// 将store挂载到app上，相当于一个插件
app.use(store);
/* 
  通过createApp返回一个app对象，
  并在其config.globalProperties属性上挂载全局函数与全局变量，
  可以用在vue组件的任何位置。
*/
app.config.globalProperties.$env = "dev";
app.config.globalProperties.$filter = {
  format<T>(str: T) {
    return `non_hana~${str}`;
  },
};
/* 
  在上述通过app.config.globalProperties挂载好全局变量和全局函数之后，
  需要通过declare将挂载好的变量和函数进行全局声明，
  具体格式如下。
*/
type Filter = {
  format<T>(str: T): string;
};
type Loading = {
  show: () => void;
  hide: () => void;
};
declare module "vue" {
  export interface ComponentCustomProperties {
    $filter: Filter;
    $env: string;
    $loading: Loading;
  }
}

/*
  引入插件，并通过app.use进行注册。
  此处的import是'引入./components/自定义Vue插件使用'文件夹下面的index.ts文件，
  Loading是为index.ts中的export default后的对象起的别名。
  app.use内部注册插件，调用该插件内部的install函数并传入app作为参数，
  之后在插件代码内部接收到这个app，然后对这个app做各种挂载的操作就可以了。
 */
import Loading from "./components/自定义Vue插件使用";
app.use(Loading);

app.mount("#app");
