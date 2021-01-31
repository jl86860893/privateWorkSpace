/**
 * 渲染
 * @param {*} vnode 用户写的虚拟节点
 * @param {*} container 要渲染到哪个容器中
 */
export default function render(vnode, container) {
  let ele = createDomElementFromVnode(vnode); // 通过此方法将虚拟节点转化成真实节点
  container.appendChild(ele)
}

function createDomElementFromVnode(vnode) {
  let { type, key, props, children, text } = vnode;
  if (type) { // 标签
    // 建立虚拟节点与真实dom之间的关系
    vnode.domElement = document.createElement(type);
    // 根据当前的虚拟节点属性更新真实的dom元素
    updateProperties(vnode)
    // children中也是vnode
    // 递归渲染子虚拟节点
    children.forEach(childVnode => render(childVnode, vnode.domElement))
  } else {
    vnode.domElement = document.createTextNode(text)
  }
  return vnode.domElement;
}

// 后续比对的时候  会根据老的属性 和 新的属性  重新更新节点
function updateProperties(newVnode, oldProps={}) {
  let domElement = newVnode.domElement;
  let newProps = newVnode.props;
  // 如果老的里面有  新的里面没有  这个属性  被移除了
  for (let oldPropName in oldProps) {
    if (!newProps[oldPropName]) {
      delete domElement[oldPropName]
    }
  }
  // 如果老的里面没有  新的里面有
  for(let newPropName in newProps) {  // 用新节点的属性直接覆盖掉老节点的属性即可
    if (newPropName === 'style') {
      let styleObj = newProps.style;
      for(let s in styleObj) {
        domElement.style[s] = styleObj[s]
      }
    } else {
      domElement[newPropName] = newProps[newPropName]
    }
  }

  // 对newStyle(newProps.style)和oldStyle(oldProps.style)同上处理，新旧比对
  // ......

}