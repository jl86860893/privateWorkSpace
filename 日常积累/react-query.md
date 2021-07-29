## 配置全局实例
```js
import { QueryClientProvider, QueryClient } from 'react-query'
// 对于每个请求的 key、新鲜度、是否过期，以及每个请求的配置，都可以在此处查看，十分强大。该工具不会被打包到生产环境，可以放心使用。
import { ReactQueryDevtools } from 'react-query/devtools'

// ↓ 初始化全局实例，通过该全局实例可以传入默认配置，这里本文不做详述
const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* ↓ 主应用节点 */}
      <App />
      {/* ↓ 可视化开发工具 */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

```

## 基础应用
```js
import { useState } from 'react';
import { useQuery } from 'react-query'

function App() {

  const [status, setStatus] = useState(false)

  const request = ({ queryKey }) => {
    // 为了模拟实际中 api 的时长随机性，随机 1.5s 或 3s 后得到响应
    const time = Math.random() > .5 ? 3000 : 1500
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(time)
      }, time)
    })
  }

   const {
     isLoading,
     isFetching,
     // 状态为isSuccess，存在值data
     isSuccess,
     data,
     isIdle,
     // 状态位isError，存在值error
     isError,
     error,
     refetch
   } = useQuery([status, 'ss', 2], request)
  
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isFetching && <div>Fetching...</div>}
      {isError && <div>Error</div>}
      {data && <div>{data}</div>}
      <button onClick={() =>{
        // 同 swr，可以通过改变 key 重新获取数据
        setStatus((pre) => !pre)
      }}>click</button>
    </>
  );
}

export default App;

```

```js
// 多种使用方式
useQuery(['todos'], fetchAllTodos)
useQuery(['todos', todoId], () => fetchTodoById(todoId))
useQuery(['todos', todoId], async () => {
  const data = await fetchTodoById(todoId)
  return data
})
useQuery(['todos', todoId], ({ queryKey }) => fetchTodoById(queryKey[1]))
```

使用fetch请求时不会默认抛异常，需要手动抛异常
```js
useQuery(['todos', todoId], async () => {
   const response = await fetch('/todos/' + todoId)
   if (!response.ok) {
     throw new Error('Network response was not ok')
   }
   return response.json()
 })
```

## 并发请求（useQuery：不开启suspense模式，useQueries）
```js
 function App () {
   // The following queries will execute in parallel
   const usersQuery = useQuery('users', fetchUsers)
   const teamsQuery = useQuery('teams', fetchTeams)
   const projectsQuery = useQuery('projects', fetchProjects)
   ...
 }
```

```js
 function App({ users }) {
   const userQueries = useQueries(
     users.map(user => {
       return {
         queryKey: ['user', user.id],
         queryFn: () => fetchUserById(user.id),
       }
     })
   )
 }
```

## 前一请求决定后续请求能否执行
```js
 // Get the user
 const { data: user } = useQuery(['user', email], getUserByEmail)
 
 const userId = user?.id
 
 // Then get the user's projects
 const { isIdle, data: projects } = useQuery(
   ['projects', userId],
   getProjectsByUser,
   {
     // The query will not execute until the userId exists
     enabled: !!userId,
   }
 )
 
 // isIdle will be `true` until `enabled` is true and the query begins to fetch.
 // It will then go to the `isLoading` stage and hopefully the `isSuccess` stage :)
```

## Window Focus Refetching 
使用refetchOnWindowFocus false禁用
```js
 const queryClient = new QueryClient({
   defaultOptions: {
     queries: {
       refetchOnWindowFocus: false,
     },
   },
 })
 
 function App() {
   return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
 }
```

## 禁止后台自动请求。手动请求
```js
 function Todos() {
   const {
     isIdle,
     isLoading,
     isError,
     data,
     error,
     refetch,
     isFetching,
   } = useQuery('todos', fetchTodoList, {
     enabled: false,
   })
 
   return (
     <>
       <button onClick={() => refetch()}>Fetch Todos</button>
 
       {isIdle ? (
         'Not ready...'
       ) : isLoading ? (
         <span>Loading...</span>
       ) : isError ? (
         <span>Error: {error.message}</span>
       ) : (
         <>
           <ul>
             {data.map(todo => (
               <li key={todo.id}>{todo.title}</li>
             ))}
           </ul>
           <div>{isFetching ? 'Fetching...' : null}</div>
         </>
       )}
     </>
   )
 }
```
## 重试
```js
 import { useQuery } from 'react-query'
 
 // Make a specific query retry a certain number of times
 const result = useQuery(['todos', 1], fetchTodoListPage, {
   retry: 10, // Will retry failed requests 10 times before displaying an error
 })
```
设置重试间隔  
1. 全局设置
```js
// Configure for all queries
 import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
 
 const queryClient = new QueryClient({
   defaultOptions: {
     queries: {
       retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
     },
   },
 })
 
 function App() {
   return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
 }
```
2. 单独设置
```js
  const result = useQuery('todos', fetchTodoList, {
   retryDelay: 1000, // Will always wait 1000ms to retry, regardless of how many retries
 })
```

## 更好的翻页请求

点击下一页。可以保持上一页的数据。直到下一页数据到来

keyword： `keepPreviousData`, `isPreviousData`
```js
function Todos() {
   const [page, setPage] = React.useState(0)
 
   const fetchProjects = (page = 0) => fetch('/api/projects?page=' + page).then((res) => res.json())
 
   const {
     isLoading,
     isError,
     error,
     data,
     isFetching,
     // 判断是不是上一页的数据
     isPreviousData,
   } = useQuery(['projects', page], () => fetchProjects(page), { keepPreviousData : true })
 
   return (
     <div>
       {isLoading ? (
         <div>Loading...</div>
       ) : isError ? (
         <div>Error: {error.message}</div>
       ) : (
         <div>
           {data.projects.map(project => (
             <p key={project.id}>{project.name}</p>
           ))}
         </div>
       )}
       <span>Current Page: {page + 1}</span>
       <button
         onClick={() => setPage(old => Math.max(old - 1, 0))}
         disabled={page === 0}
       >
         上一页
       </button>{' '}
       <button
         onClick={() => {
           if (!isPreviousData && data.hasMore) {
             setPage(old => old + 1)
           }
         }}
         // Disable下一页的按钮直到下一页有数据
         disabled={isPreviousData || !data?.hasMore}
       >
         下一页
       </button>
       {isFetching ? <span> Loading...</span> : null}{' '}
     </div>
   )
 }
```




