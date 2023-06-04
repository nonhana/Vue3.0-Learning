class Btn extends HTMLElement {
  // constructor的作用是创建一个实例对象，this指向实例对象
  constructor() {
    // super的作用是将父类的this指向子类
    super();
    const shaDom = this.attachShadow({ mode: "open" });
    this.p = this.h("p");
    this.p.innerText = "我是一个按钮";
    this.p.setAttribute(
      "style",
      "cursor:pointer;width:200px;height:50px;background-color:blue;color:#fff;text-align:center;line-height:50px;"
    );
    shaDom.appendChild(this.p);
  }
  h(el) {
    return document.createElement(el);
  }
}

// 定义组件
window.customElements.define("my-btn", Btn);
