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

# lerna
脚手架项目初始化
```
初始化npm项目

安装lerna

lerna init初始化项目
```

创建package
```
lerna create创建package

lerna add安装依赖

lerna link链接依赖
```
脚手架开发测试
```
lerna exec -- 执行shell脚本

lerna run执行npm命令： 
lerna run build
lerna run --scope @jianglu/utils build

lerna clean 清空依赖

lerna bootstrap重装依赖
```

脚手架发布上线
```
lerna version
bump version

lerna changed查看上版本以来的所有变更

lerna diff查看diff

lerna publish项目发布
```

publish时需要注意
因为发布到@jianglu的Group上，需要在每个package.json下添加
```
"publishConfig": {
    "access": "public"
  },
```

# lerna源码学习
yargs库：
```js
#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers');
const dedent = require('dedent')
const pkg = require('../package.json')
const context = {
  jlversion: pkg.version,
}

// const arg = hideBin(process.argv)  有了parse后可不用
const cli = yargs(arg)
const argv = process.argv.slice(2)
cli
  .usage('usage: $0 [command] <options>')
  .recommandCommand()  // 输入lz， 提示是否输入ls
  .demandCommand(1, 'A command is required')  // 最少需要输入一个命令
  .strict()
  .fail((err, message) => {
    console.log(err)
  })
  .alias("h", "help")  // 取别名
  .alias("v", "version")
  .wrap(cli.terminalWidth())  // 沾满窗口。设置为200则宽度为200
  .epilogue(dedent`   111
  111`)  // epilogue加尾标。npm i -S dedent  dedent作用取消掉缩进.``模板字符串前面的函数可以省略括号
  .options({
    debug: {
      type: 'boolean',
      describe: 'Bootstrap debug mode',
      alias: 'd'
    },
    {...}
  })
  .option('registry', {
    type: 'string',
    describe: 'Define global registry',  // hidden: true可隐藏
    alias: 'r'
  })
  .group(['debug'], 'Dev options')
  .group(['registry'], 'Extra options')
  .command('init [name]', 'Do init a project', (yarns) => {
    // yarns执行得到该command的私有命令option或者其它，主要为options
    yarns.option('name', {
      type: 'string',
      describe: 'Name a project',
      alias: 'n'
    })
  }, argv => {
    // 执行的controller
    console.log(argv)
  })
  .command({
    command: "list",
    aliases: ['ls', 'll', 'la'],
    describe: "List local packages",
    builder: yargs => {
      // 定义一系列list的options
    },
    handler: function handler(argv) {
      console.log(argv)
    }
  })
  .parse(argv, context)  // argv和自定义的context合并
  // .argv;  有了parse可不用
```

补充小知识点：
```js
new Promise(() => {
  let chain = Promise.resolve();
  chain.then(() => {console.log(1)})
  chain.then(() => {console.log(2)})
  chain.then(() => {console.log(3)})
  chain.then(() => {console.log(4)})
})
```