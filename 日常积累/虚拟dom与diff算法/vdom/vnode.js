export default function vnode(type, key, props, children) {
  return {
    type,
    key,
    props,
    children,
    text
  }
}