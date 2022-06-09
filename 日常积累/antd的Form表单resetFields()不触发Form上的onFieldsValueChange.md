我也遇到了这个问题，两个 Form 联动，同一个FormItem 有多种修改方式，被卡了一会儿，看了一下源码。如果手动修改 form 触发 form 的 onValuesChange，有两种方法：

1. 通过模拟输入组件的输入事件来触发：拿到 FormItem 包裹的输入组件的 ref， 调用 ref.current.handleChange 来模拟输入, 如： inputRef.current.handleChange({ target: { value: exampleValue } })

2. 拿到 rcForm 的 dispatch 方法，通过发送 updateValue 的消息来触发 form 的更新 ：const formDispatch = (form as any).getInternalHooks('RC_FORM_INTERNAL_HOOKS').dispatch；formDispatch({ type: 'updateValue', namePath: examplePath, value: exampleValue })

第二种方式比较通用。由于用了比较 hack 的方式，建议封装一个 hooks 来做这件事情。
