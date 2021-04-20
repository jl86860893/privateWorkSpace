## strapi无头CMS的使用与自定义配置

### 无头CMS简介
无头CMS是从底层向上构建为内容储存库，使通过对在任何设备上显示一个RESTful API内容访问的后端仅内容管理系统（CMS）。

术语“无头”来自将“头”（前端，即网站）从“主体”（后端，即内容存储库）上切下的概念。无头CMS保留了用于添加内容的接口，以及RESTful API（JSON，XML）以在需要时交付内容。由于采用了这种方法，无头CMS并不关心内容的显示方式和位置。无头CMS仅关注一个重点：存储和交付结构化内容。

无头CMS的对应部分通常称为整体式，常规CMS或耦合式CMS，稍后我们将使用这些术语

一般的CMS系统结构图如下
![](https://img.storyblok.com/FYxbIsIqmOGJBSUUWnlHNkgPTUY=/840x0/filters:filters:fill(FFFFFF):filters:format(jpeg)/f/51376/4867x1562/fb7250cf1b/regular-and-monolithic-cms.jpg)

将上述内容转化为无头CMS，我们只需从堆栈中删除功能四。该CMS的负责人-实际的网站-被砍掉了。剩下的就是一个允许内容管理（Admin UI）和阅读（API：组合集成）的应用程序。

![](https://img.storyblok.com/s81JK_XdAyzWwyEC7bHNF3gDvEA=/840x0/filters:filters:fill(FFFFFF):filters:format(jpeg)/f/51376/4867x1562/8d59898080/headless-cms-explained-storyblok.jpg)

独自创建整个网站似乎是列表上的一项艰巨任务，但是通过将CMS与前端分离，开发人员可以选择他们已经熟悉的任何技术，而无需学习特定CMS的技术。另一大好处是事实，一个开发者也可以专注于自己的工作，而不处理技术已经存在栈的错误。

strapi是一款功能丰富的无头CMS开源项目，它100%基于javascript构建并且具有对开发人员友好和自定义的特性。

### strapi使用
1. 安装strapi并创建新项目
```
# Using Yarn
yarn create strapi-app my-project --quickstart

# Or using NPM
npx create-strapi-app my-project --quickstart
```

2. 配置数据库
strapi支持  
- MongoDB >= 3.6  
- MySQL >= 5.6  
- MariaDB >= 10.1  
- PostgreSQL >= 10  
- SQLite >= 3  

在strapi项目目录 /config/database.js配置使用的数据库
```js
module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        "client": "mysql",
        "database": env.DATABASE,
        "host": env.HOST,
        "port": env.PORT,
        "username": env.USERNAME,
        "password": env.PASSWORD
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
```
3. 创建内容  
具体观看strapi官网3min视频教程
https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html#_1-install-strapi-and-create-a-new-project

### strapi自定义插件
```
strapi generate:plugin import-content
```
执行上述命令后将会在strapi项目上生成一个import-content的插件，插件位于 /plugins/import-content目录下。目录结构如下  
--|admin/src 内部为admin插件面板上显示的内容  
--|controllers  控制层  
--|services  服务层  
--|.editorconfig  
--|.gitattributes  
--|.gitignore  
--|package.json  
--|README.md  

目录结构为MVC结构，视图调用控制层，即/admin/src下的页面（入口页面位于src下的containers/HomePage/index.js下）
```js
import {request} from "strapi-helper-plugin";
// preAnalyzeImportFile为控制层指定的控制器方法
const response = await request("/import-content/preAnalyzeImportFile", {
    method: "POST",
    body: {
        // 请求体
    }
});
```

controllers/import-content.js中的preAnalyzeImportFile方法为视图调用的方法 文件内容如下：
```js
'use strict';

/**
 * import-content.js controller
 *
 * @description: A set of functions called "actions" of the `import-content` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  preAnalyzeImportFile: async ctx => {
    // 获取服务
    const services = strapi.plugins["import-content"].services;
    try {
      // controller调用service服务中的import-content.js服务preAnalyzeImportFile方法，用于请求数据或其他操作
      const rightFile = await services["import-content"].preAnalyzeImportFile(ctx);
      ctx.send(rightFile);
    } catch (error) {
      console.log(error);
      ctx.response.status = 406;
      ctx.response.message = "could not parse: " + error;
    }
  },

  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  }
};
```

services/import-content.js 中的preAnalyzeImportFile方法执行操作
```js
'use strict';
const { upload } = require('./utils/oss.js')
/**
 * import-content.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
    preAnalyzeImportFile: async ctx => {
        // 执行上传操作
        const res = await upload(ctx);
        return res;
    }
};
```

至此自定义插件完成，并且在admin面板上的插件菜单上含有此自定义插件。点击后显示插件页面。

### 自定义provider
项目中上传文件默认上传到strapi所在位置。而项目要求上传到oss对象存储上。因此需要使用strapi扩展上传功能，strapi提供了strapi-provider-upload-aws-s3插件用于上传和获取Amazon S3上的文件图片。当使用其他方式时则需要进行改动，研究provider的执行过程可实现任意存储类型存储。

##### 自定义provider的执行过程
strapi根目录下存在config目录，config目录下的plugins.js提供了provider的能力（默认无此文件，需添加）。provider的代码如下：
```js
module.exports = ({ env }) => ({
    // 修改upload的方式
    upload: {
      provider: 'test',
      providerOptions: {
        endPoint: `string MINIO的地址`,
        port: `number 端口号`,
        useSSL: false,
        bucketName: 'bucketName‘,
        accessKey: 'accessKey',
        secretKey: 'secretKey',
        params: {  // 给provider提供的参数
          
        },
      },
    },
  });
```
provider为npm包的形式通过npm install的方式安装，因此需要注册npm账号，然后发布到npm上。

provider包的主体文件写法如下：
```js
'use strict';

/**
 * Module dependencies
 */

/* eslint-disable no-unused-vars */
// Public node modules.
const _ = require('lodash');
const Minio = require('minio');
const fs = require('fs')
const stream = require('stream')

module.exports = {
  init(config) {
    console.log(config)
    const minioClient = new Minio.Client({
      ...config,
    });

    return {
      async upload(file, customParams = {}) {
        const { name: fileName, mime: fileMime, size: fileSize, buffer: fileBuffer } = file;
        const { endPoint, bucketName, params: { target } } = config;
        const bufferStream = new stream.PassThrough();
        const readStream = bufferStream.end(fileBuffer);
        
        await minioClient.putObject(config.bucketName, `${target}/${fileName}`, readStream, fileSize);
        file.url = `http://${endPoint}/${bucketName}/${target}/${fileName}`
      },
    };
  },
};
```
package.json中必须含有以下配置，用以识别provider
```js
"strapi": {
    "isProvider": true
  },
```

自此通过配置plugins和自定义provider实现Minio的图片上传与读取对接上strapi内容管理。

### strapi的汉化
在strapi中每个插件的admin/src或者strapi的admin/src下均有translations目录，可以进行多语言配置。

使用方法如下：
```js
import { useIntl } from 'react-intl';

 const { formatMessage } = useIntl();

 const content = formatMessage({ id: 'id' });
```









