import { onMounted } from "vue";

type Options = {
  el: string;
};

type Base64 = {
  baseUrl: string;
};

// 将图片转Base64的函数封装为一个Promise对象，方便后续的调用
export default function (options: Options): Promise<Base64> {
  return new Promise((resolve) => {
    // 因为是在.vue文件中引用，因此可以使用vue的生命周期钩子
    onMounted(() => {
      let img: HTMLImageElement = document.querySelector(
        options.el
      ) as HTMLImageElement;
      console.log(img);
      // img.onload能够在图片加载完成时，再进行函数的调用，相当于一种异步
      img.onload = () => {
        resolve({
          baseUrl: base64(img),
        });
      };
    });
    // 定义一个函数，用于将给定的 HTMLImageElement 转换为 base64 编码的图像
    const base64 = (el: HTMLImageElement) => {
      // 创建一个 canvas 元素
      const canvas = document.createElement("canvas");
      // 获取 2D 绘图上下文
      const ctx = canvas.getContext("2d");

      // 设置 canvas 的宽度和高度与给定的图片元素相同
      canvas.width = el.width;
      canvas.height = el.height;

      // 将图片绘制到 canvas 上下文中
      // 参数解释：drawImage(image, dx, dy, dWidth, dHeight)
      // image: 要绘制的图片元素
      // dx, dy: 在 canvas 上绘制的起始位置
      // dWidth, dHeight: 绘制的宽度和高度（可以与原始图片的宽度和高度不同，进行缩放）
      ctx?.drawImage(el, 0, 0, canvas.width, canvas.height);

      // 将 canvas 的内容转换为 base64 编码的图像数据
      // toDataURL(type, encoderOptions)
      // type: 图像的 MIME 类型
      // encoderOptions: 可选参数，用于指定图像质量，例如 JPEG 的质量值（0-1）
      return canvas.toDataURL("image/jpg");
    };
  });
}
