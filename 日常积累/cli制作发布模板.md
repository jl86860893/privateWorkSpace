## 第一步 配置环境

> 创建一个文件夹作为你写CLI脚手架的目录

然后执行以下命令: 

```
$ npm init -y
```

生成了自己的package.json之后修改如下 

> package.json

```
{
  "name": "ded-cli",
  "version": "0.0.3",
  "description": "DED脚手架工具",
  "main": "index.js",
  "bin": {
    "ded": "./bin/index.js"
  },
  "scripts": {
    "test": "test"
  },
  "keywords": [],
  "author": "wangyuchao",
  "license": "ISC",
  "dependencies": {
    "chalk": "^3.0.0",
    "fs-extra": "^8.1.0"
  }
}

```

**bin** 这个字段标识了当你运行控制台的时候，会触发某个文件入口。

我们这里的入口文件就是bin/index.js

## 第二步 创建入口文件并增加逻辑。

bin/index.js

```
#!/usr/bin/env node
const curPath = process.cwd();
const argv = process.argv.slice(2);
const { createReactComponent } = require('../src/createFiles/createReactComponent');
const { createAntModle } = require('../src/createFiles/createAntModle');
const { createAntService } = require('../src/createFiles/createService');
const { parseArgv } = require('../src/kit/utils');
const { helpInfo } = require('../src/kit/help');

const { crc, cmf, csf, help, h } = parseArgv(argv);


if (!argv.length || h || help) {
  helpInfo();
}

if (crc) {
  createReactComponent(curPath, crc);
}

if (cmf) {
  createAntModle(curPath, cmf);
}

if (csf) {
  createAntService(curPath, csf);
}
```

**#!/usr/bin/env node 这条命令是告诉控制台用node 的环境来运行， 不加会报错。**

## 第三步 创建源码项目

创建如下文件夹及文件

```
src
|
----componentsTemplate
    |
    ----js
    |   |
    |   ----antModel.txt
    |   |
    |   ----antService.txt
    |   |
    |   ----antService.txt
    |
    ----less
|
----createFiles
    |
    ----antService.txt.js
    |
    ----createReactComponent.js
    |
    ----createService.js
|
----kit 
    |
    ----files.js
    |
    ----help.js
    |
    ----utils.js

```

## 第四步 增加模板文件内容

- antModel.txt

```
import { <%fileName%> } from '@/services/<%fileName%>';

const <%fileName%>Model = {
  namespace: '<%fileName%>',
  state: {},
  effects: {
    *getList(_, { call, put }) {
      const response = yield call(<%fileName%>);
      yield put({
        type: 'save<%fileName%>',
        payload: response.datas,
      });
    }
  },
  reducers: {
    save<%fileName%>(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  }

}

export default <%fileName%>Model;

```

- antService.txt

```
import request from '@/utils/request';

export async function get<%fileName%>() {
  return request('/v1/<%fileName%>/');
}
```

- reactTemplate.txt
```
import React from 'react';
import styles from './index.less';

class <%fileName%> extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {

  }

  return () {
    render(
      <div className={styles.<%cssFileName%>Wrap}>
        <%fileName%>
      </div>
    )
  }
}

export default <%fileName%>;

```

**<%fileName%> 我们通过<%变量%> 来完成模板内容替换工作**  

好了，现在我们就拥有了模板。

## 第五步 增加创建文件的逻辑内容

- createAntModle.js

```
const fs = require('fs-extra');
const { tempaltePath } = require('../kit/files');

const replateStr = function (fileName, buffer) {
  let val = buffer;
  val = val.replace(/\<\%fileName\%\>/g, fileName);
  return val;
}

const createAntModle = function (curPath, fileName) {
  const targetJsPath = [
    curPath,
    fileName + '.js',
  ].join('\\');

  const temPath = tempaltePath();
  const antModelTemplate = fs.readFileSync(`${temPath}\\antModel.txt`, 'utf-8');
  const antModelTemplateRelust = replateStr(fileName, antModelTemplate);
  try {
    fs.outputFileSync(targetJsPath, antModelTemplateRelust);
    console.log('Create Ant Model Success!');
  }
  catch (e) {
    console.log(e);
  }
}

module.exports = {
  createAntModle,
}
```

- createAntModle.js
```
const fs = require('fs-extra');
const { tempaltePath } = require('../kit/files');
const { pascalFormat } = require('../kit/utils');

const replateStr = function (fileName, buffer) {
  let val = buffer;
  val = val.replace(/\<\%fileName\%\>/g, pascalFormat(fileName));
  val = val.replace(/\<\%cssFileName\%\>/g, fileName);
  return val;
}

const createReactComponent = function (curPath, fileName) {
  const pascalName = pascalFormat(fileName);
  const targetJsPath = [
    curPath,
    pascalName,
    'index.js',
  ].join('\\');
  const targetLessPath = [
    curPath,
    pascalName,
    'index.less',
  ].join('\\');

  const temPath = tempaltePath();
  const reactTemplate = fs.readFileSync(`${temPath}\\reactTemplate.txt`, 'utf-8');
  const reactTemplateRelust = replateStr(fileName, reactTemplate);
  try {
    fs.outputFileSync(targetJsPath, reactTemplateRelust);
    fs.outputFileSync(targetLessPath,`.${fileName}Wrap {}`);
    console.log('Create React Component Success!');
  } 
  catch (e) {
    console.log(e);
  }
}

module.exports = {
  createReactComponent,
}
```

- createService.js

```
const fs = require('fs-extra');
const { tempaltePath } = require('../kit/files');
const { pascalFormat } = require('../kit/utils');

const replateStr = function (fileName, buffer) {
  let val = buffer;
  val = val.replace(/\<\%fileName\%\>/g, fileName);
  return val;
}

const createAntService = function (curPath, fileName) {
  const targetJsPath = [
    curPath,
    fileName + '.js',
  ].join('\\');

  const temPath = tempaltePath();
  const antServiceTemplate = fs.readFileSync(`${temPath}\\antService.txt`, 'utf-8');
  const antServiceTemplateRelust = replateStr(pascalFormat(fileName), antServiceTemplate);

  try {
    fs.outputFileSync(targetJsPath, antServiceTemplateRelust);
    console.log('Create Ant service Success!');
  }
  catch (e) {
    console.log(e);
  }
}

module.exports = {
  createAntService,
}
```

**fs-extra 用来创建文件夹文件及输出文件的**

## 第六步 完善我们的工具类

- files.js 

```
const tempaltePath = function () {
  const curPath = __dirname.split('\\');
  const templatePath = [];
  for (let i = 0; i < curPath.length - 1; i++) {
    templatePath[i] = curPath[i];
  }
  return [...templatePath, 'componentsTemplate', 'js'].join('\\');
}

module.exports = {
  tempaltePath,
}
```

- help.js
```
const chalk = require('chalk');
const { log } = console;
const SPACE = ' ';

const helpInfo = function () {
  log(`${chalk.green('--help 或 -h')} ${SPACE} 帮助信息`);
  log(`${chalk.green('--crc <filename>')} ${chalk.blue('create react component')} ${SPACE} 创建一个React组件`);
  log(`${chalk.green('--cmf <filename>')} ${chalk.blue('create model file')} ${SPACE} 创建一个ant数据模型文件`);
  log(`${chalk.green('--csf <filename>')} ${chalk.blue('create service file')} ${SPACE} 创建一个ant服务模型文件`);
};

module.exports = {
  helpInfo,
};
```

- utils.js
```
/**
 * 解析Unix、BSD和GNU参数风格
 * @param {Array} argv 命令行参数数组
 * @returns
 */
function parseArgv(argv) {
  const max = argv.length
  const result = {
    _: []
  }
  for (let i = 0; i < max; i++) {
    const arg = argv[i]
    const next = argv[i + 1]
    if (/^--.+/.test(arg)) {
      // GNU风格
      const key = arg.match(/^--(.+)/)[1]
      if (next != null && !/^-.+/.test(next)) {
        result[key] = next
        i++
      } else {
        result[key] = true
      }
    } else if (/^-[^-]+/.test(arg)) {
      // Unix风格
      const items = arg.match(/^-([^-]+)/)[1].split('')
      for (let j = 0, max = items.length; j < max; j++) {
        const item = items[j]
        // 非字母不解析
        if (!/[a-zA-Z]/.test(item)) {
          continue
        }
        if (next != null && !/^-.+/.test(next) && j === max - 1) {
          result[item] = next
          i++
        } else {
          result[item] = true
        }
      }
    } else {
      // BSD风格
      result._.push(arg)
    }
  }
  return result
};


const pascalFormat = function (str) {
  return str[0].toLocaleUpperCase() + str.substring(1);
}

module.exports = {
  parseArgv,
  pascalFormat,
}
```

以上就是全部代码。

## 第七步 创建软链并测试

```
$ npm link

$ ded
```

## 第八步 发布

```
$ npm publish
```
