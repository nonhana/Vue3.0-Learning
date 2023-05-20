import type { App, VNode } from "vue";
import Loading from "./index.vue";
import { createVNode, render } from "vue";
export default {
  // 编写vue插件，必须使用如下的方式：
  // install(app: App){}，然后在app内部进行各种挂载的操作！
  install(app: App) {
    // 将引入的vue组件进行VNode转码
    const VNode: VNode = createVNode(Loading);
    // 用render函数将转码后的组件挂载到页面的body上
    render(VNode, document.body);
    // 在app上注册全局函数$loading
    app.config.globalProperties.$loading = {
      show: VNode.component?.exposed?.show,
      hide: VNode.component?.exposed?.hide,
    };
    // app.config.globalProperties.$loading.show();
    // console.log(app, VNode.component?.exposed);
  },
};
