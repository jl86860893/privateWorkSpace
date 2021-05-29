## 脚手架执行过程

node的bin目录下创建软连接： ln -s cmdtest /Users/lujiang/Desktop/vue-test/test.js

test.js
```
#!/usr/bin/env node
// 注意：安装可能不在bin下因此找不到命令时执行：sudo ln -s which nodejs /usr/bin/node
...code...
```
使得 ./test.js可直接运行而不用 node test.js执行



为node脚手架创建别名：
> node执行文件所在目录：ln -s node2 ./node

步骤：
1. 输入：vue create vue-test-app
2. 在环境变量$PATH中查询vue命令-----相当于执行which vue
3. -> end

1. 输入：vue create vue-test-app
2. 在环境变量$PATH中查询vue命令-----相当于执行which vue
3. 查询实际链接文件
4. 通过/usr/bin/env node执行文件
5. end

## 脚手架开发流程
#### 开发流程
- 创建npm项目
- 创建脚手架入口文件，最上方添加
> #!/usr/bin/env/node
- 配置`package.json`添加`bin`属性
- 编写脚手架代码
- 发布到npm

#### 使用流程
- 安装脚手架
> npm install -g jiaoshoujia
- 使用脚手架
> jiaoshoujia

## 脚手架本地link标准流程
连接本地脚手架
```
cd your-cli-dir
npm link
```

链接本地库文件：
```
cd your-lib-dir
npm link
cd your-cli-dir
npm link your-lib
```

取消链接本地库文件
```
cd your-lib-dir
npm unlink
cd your-cli-dir
# link存在
npm unlink your-lib
# link不存在
rm -rf node_modules
npm install
```

理解npm link：
- npm link your-lib：将当前项目中node_modules下指定的库文件链接到node全局node_modules下的库文件
- npm link: 将当前项目链接到node_module中作为一个库文件，并解析bin配置创建可执行文件

