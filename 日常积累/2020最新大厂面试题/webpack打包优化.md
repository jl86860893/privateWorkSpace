# 优化 Webpack 的构建速度
### 1.使用高版本的 Webpack （使用webpack4）
V8 带来的优化：
- for of代替forEach
- Map和Set替代Object
- includes替代indexOf

默认使用更快的 md4 hash 算法

webpacks AST 可以直接从loader传递给AST，减少解析时间

使用字符串方法替代正则表达式
### 2.多线程/多实例构建：HappyPack(不维护了)、thread-loader