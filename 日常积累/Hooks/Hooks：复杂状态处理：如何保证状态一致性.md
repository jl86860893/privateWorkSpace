# 原则一：保证状态最小化

```js
function FilterList({ data }) {
  // 设置关键字的 State
  const [searchKey, setSearchKey] = useState('');
  // 设置最终要展示的数据状态，并用原始数据作为初始值
  const [filtered, setFiltered] = useState(data);

  // 处理用户的搜索关键字
  const handleSearch = useCallback(evt => {
    setSearchKey(evt.target.value);
    setFiltered(data.filter(item => {
      return item.title.includes(evt.target.value)));
    }));
  }, [filtered])
  return (
    <div>
      <input value={searchKey} onChange={handleSearch} />
      {/* 根据 filtered 数据渲染 UI */}
    </div>
  );
}
```
使用useMemo减少中间状态
```js
import React, { useState, useMemo } from "react";

function FilterList({ data }) {
  const [searchKey, setSearchKey] = useState("");
  
  // 每当 searchKey 或者 data 变化的时候，重新计算最终结果
  const filtered = useMemo(() => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(searchKey.toLowerCase())
    );
  }, [searchKey, data]);

  return (
    <div className="08-filter-list">
      <h2>Movies</h2>
      <input
        value={searchKey}
        placeholder="Search..."
        onChange={(evt) => setSearchKey(evt.target.value)}
      />
      <ul style={{ marginTop: 20 }}>
        {filtered.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

# 原则二：避免中间状态，确保唯一数据源

场景： 通过“http://www.baidu.com/s?wd=极客时间”就可以看到极客时间的搜索结果

通常思路：直观的思路都是：首先把 URL 上的参数数据保存在一个 State 中，当URL 变化时，就去改变这个 State。然后在组件中再根据这个 State 来实现搜索的业务逻辑

```js
// getQuery 函数用户获取 URL 的查询字符串
import getQuery from './getQuery';
// history 工具可以用于改变浏览器地址
import history from './history';

function SearchBox({ data }) {
  // 定义关键字这个状态，用 URL 上的查询参数作为初始值
  const [searchKey, setSearchKey] = useState(getQuery('key'));
  // 处理用户输入的关键字
  const handleSearchChange = useCallback(evt => {
    const key = evt.target.value;
    // 设置当前的查询关键状态
    setSearchKey(key);
    // 改变 URL 的查询参数
    history.push(`/movie-list?key=${key}`);
  })
  // ....
  return (
    <div className="08-search-box">
      <input
        value={searchKey}
        placeholder="Search..."
        onChange={handleSearchChange}
      />
      {/* 其它渲染逻辑*/}
    </div>
  );
}
```
handleSearchChange内部不仅改变state参数值（初始state从url获取），还history.push()方法改变url参数值  
问题： 从 URL 参数到内部 State 的同步只有组件第一次渲染才会发生。而后面的同步则是由输入框的 onChange 事件保证的，那么一致性就很容易被破坏

```js
import React, { useCallback, useMemo } from "react";
import { useSearchParam } from "react-use";

function SearchBox({ data }) {
  // 使用 useSearchParam 这个 Hook 用于监听查询参数变化
  const searchKey = useSearchParam("key") || "";
  const filtered = useMemo(() => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(searchKey.toLowerCase())
    );
  }, [searchKey, data]);

  const handleSearch = useCallback((evt) => {
    // 当用户输入时，直接改变 URL
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?key=${evt.target.value}`
    );
  }, []);
  return (
    <div className="08-filter-list">
      <h2>Movies (Search key from URL)</h2>
      <input
        value={searchKey}
        placeholder="Search..."
        onChange={handleSearch}
      />
      <ul style={{ marginTop: 20 }}>
        {filtered.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
```
URL 变化的时候，使用了 useSearchParam 第三方的 Hook 去绑定查询参数，并将其显示在输入框内，从而实现了输入框内容和查询关键字这个状态的同步。



