class Btn extends HTMLElement {
  constructor() {
    super();
    const shaDom = this.attachShadow({ mode: "open" });
    this.template = this.h("template");
    this.template.innerHTML = `
    <style>
      div {
        width:200px;
        height:50px;
        border:1px solid #9e9e9e;
        background-color:#fff;
        cursor:pointer;
        display:flex;
        justify-content:center;
        align-items:center;
      }
    </style>
    <div>
      non_hana
    </div>
    `;
    shaDom.appendChild(this.template.content.cloneNode(true));
  }
  h(el) {
    return document.createElement(el);
  }
}

// 定义组件
window.customElements.define("t1", Btn);
