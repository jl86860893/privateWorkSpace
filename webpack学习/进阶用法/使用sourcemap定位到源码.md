## 使用source map
**作用： 通过source map 定位到源代码**
- source map科普文: <a href="www.ruanyifeng.com/blog/2013/01/javascript_source_map.html">www.ruanyifeng.com/blog/2013/01/javascript_source_map.html</a>

**开发环境开启，线上环境关闭**
- 线上排查问题的时候可以将sourcemap上传到错误监控系统

## source map关键字
- `eval`： 使用eval包裹模块代码
- `source map`： 产生.map文件
```js
webpackJsonp([1],[  
function(e,t,i){...},  
function(e,t,i){...},  
function(e,t,i){...},  
function(e,t,i){...},
  ...
])//# sourceMappingURL=index.js.map
```
- `cheap`：产生.map文件,不包含列信息
- `inline`：将.map作为DataURI嵌入，不单独生成.map文件
```js
webpackJsonp([1],[  
function(e,t,i){...},  
function(e,t,i){...},  
function(e,t,i){...},  
function(e,t,i){...},
  ...
])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9...
```
- `module`：包含loader的sourcemap
## 使用
```js
module.exports = {
  ...
  devtool: 'source-map',
}
```

### 在不同的环境中如何选择sourcemap的类型
（1）首先在源代码的列信息是没有意义的，只要有行信息就能完整的建立打包前后代码之间的依赖关系。因此不管是开发环境还是生产环境，我们都会选择增加cheap基本类型来忽略模块打包前后的列信息关联。

（2）其次，不管在生产环境还是开发环境，我们都需要定位debug到最最原始的资源，比如定位错误到jsx，coffeeScript的原始代码处，而不是编译成js的代码处，因此，不能忽略module属性

（3）再次我们希望通过生成.map文件的形式，因此要增加source-map属性

总结：

在`开发环境`中我们使用：cheap-module-eval-source-map

在`生产环境`中我们使用：cheap-module-source-map。

这里需要补充说明的是，eval-source-map组合使用是指将.map以DataURL的形式引入到打包好的模块中，类似于inline属性的效果，我们在生产中，使用eval-source-map会使打包后的文件太大，因此在生产环境中不会使用eval-source-map。但是因为eval的rebuild速度快，因此我们可以在本地环境中增加eval属性。
