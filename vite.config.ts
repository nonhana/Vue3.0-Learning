import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { visualizer } from "rollup-plugin-visualizer"; // 可视化打包分析
import { VitePWA } from "vite-plugin-pwa"; // 引入PWA插件

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // reactivityTransform开启实验性功能
      reactivityTransform: true,
      // template选项用于配置vue模板编译器选项
      template: {
        compilerOptions: {
          // isCustomElement用来配置自定义元素的标签名
          isCustomElement: (tag) => tag.includes("hana-"),
        },
      },
    }),
    AutoImport({
      imports: ["vue"],
      dts: "src/auto-import.d.ts",
    }),
    visualizer({
      // open必须配置为true，否则不会自动打开浏览器
      open: true,
    }),
    // 配置PWA
    VitePWA({
      workbox: {
        cacheId: "non_hana", //缓存名称
        runtimeCaching: [
          {
            urlPattern: /.*\.js.*/, //缓存文件
            handler: "StaleWhileRevalidate", //重新验证时失效
            options: {
              cacheName: "hana-js", //缓存js，名称
              expiration: {
                maxEntries: 30, //缓存文件数量 LRU算法
                maxAgeSeconds: 30 * 24 * 60 * 60, //缓存有效期
              },
            },
          },
        ],
      },
    }),
  ],
  // vite性能优化选项
  build: {
    // chunkSizeWarningLimit用于设置chunk文件的大小警告阈值，单位为kb，默认为500kb
    chunkSizeWarningLimit: 2000,
    // cssCodeSplit用于设置是否将css代码拆分为单独的文件，默认为true
    cssCodeSplit: true,
    // sourcemap用于设置是否构建sourcemap，默认为false
    sourcemap: false,
    // minify用于设置构建后是否压缩代码，可选值为esbuild、terser、false，默认为terser
    minify: "terser",
    // assetsInlineLimit用于设置是否将小于指定大小的文件转换为base64编码的data url，单位为byte，默认为4096byte
    assetsInlineLimit: 4096,
  },
  server: {
    // proxy用于配置开发服务器的代理规则，只是解决dev的跨域问题
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
