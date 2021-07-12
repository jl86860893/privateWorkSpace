在传统的请求模型里，一个请求的完整流程是这样的：
- 用户点击，触发请求流程
- 设置相关视图的状态为 loading
- 发起请求
- 处理响应结果，关闭视图的 loading 状态

# 状态更简单：Effect 状态封装
在代码层面，现在的请求库基本已经将 loading 状态封装到 hooks 中。只要你触发了请求，只需要关心 hooks 中暴露出的 data 和 error 以及 loading 状态。这一点，无论是 useRequest 和 swr 都做了通用的封装：

```js
// ahooks 的 useRequest
const { data, error, loading } = useRequest(fetcher);

// swr
const { data, error, isValidating } = useSwr('/getList', fetcher);
```