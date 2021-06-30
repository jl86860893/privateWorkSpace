- [1. events](#1-events)
- [2. utils](#2-utils)
  - [1. <a name='promisify'></a>2.1. promisify](#1-21-promisify)
  - [2. <a name='Promise'></a>2.2. 自定义 Promise 化处理函数](#2-22-自定义-promise-化处理函数)
- [3. stream](#3-stream)
  - [3. <a name=''></a>3.1. 理解流](#3-31-理解流)
  - [4. <a name='-1'></a>3.2. 流的类型](#4-32-流的类型)
- [4. 使用内建流 API](#4-使用内建流-api)
- [5. 使用流基类](#5-使用流基类)
  - [5. <a name='JSON'></a>5.1. 可读流 - JSON 行解析器](#5-51-可读流---json-行解析器)
  - [6. <a name='-1'></a>5.2. 可写流 - 文字变色](#6-52-可写流---文字变色)
  - [7. <a name='-1'></a>5.3. 双工流 - 接受和转换数据](#7-53-双工流---接受和转换数据)
  - [8. <a name='-1'></a>5.4. 转换流 - 解析数据](#8-54-转换流---解析数据)
- [6. 文件系统](#6-文件系统)
  - [](#)

在某些老项目中，我们可能看到这样的代码片段

```js
const getGlobalThis = () => {
  // 在 webworker 或 service worker 中
  if (typeof self !== "undefined") return self;

  // 在浏览器中
  if (typeof window !== "undefined") return window;

  // 在 Node.js 中
  if (typeof global !== "undefined") return global;

  // 独立的 JavaScript shell
  if (typeof this !== "undefined") return this;

  throw new Error("Unable to locate global object");
};

const theGlobalThis = getGlobalThis();

if (typeof theGlobalThis.setTimeout !== "function") {
  // 此环境中没有 setTimeout 方法！
}
```

这是因为各个 JS 环境获取全局对象的方式都是不同的，所以通过封装了一个getGlobalThis来统一获取所有环境的全局对象

但是自从 `ES13` 特性出现后，支持使用`globalThis` 这种标准的方式来获取不同环境下的全局 this 对象（也就是全局对象自身）

```js
if (typeof globalThis.setTimeout !== "function") {
  // 此环境中没有 setTimeout 方法！
}
```

```js
// 当前代码所运行的脚本位置
console.log(__filename);
// D:\MyCode\Gitee\Learning.Node\geek-nodejs\08\index.js

// 当前代码所运行的脚本目录
console.log(__dirname);
// D:\MyCode\Gitee\Learning.Node\geek-nodejs\08
```
```js
console.log(process);
```

- `version`: Node.js 版本号
- `platform , arch`: 运行环境的操作系统
- `kill , exit `: 用于管理，或者杀进程的操作
- `hrtime`: 用于统计时间，可以精确到微秒级
- `cpuUsage`: CPU 占用率
- `resourceUsage`: 内存占用率
- `env`: Node 的环境变量，作用:可以设置环境变量，以便在不同的开发中使用
- `argv`:用户在启动程序时，敲击的命令是怎样的， 作用:命令行程序中使用
......

**nextTick**
```js
const EventEmitter = require('events').EventEmitter;

function complexOperations() {
  const events = new EventEmitter();

  process.nextTick(function () {
    events.emit('success');
  });

  return events;
}

complexOperations().on('success', function () {
  console.log('success!');
});
```

**Buffer toString dataURI**  
默认转为 UTF-8 格式，还支持 ascii、base64 等
```js
// 生成 data URI
const fs = require('fs');
const mime = 'image/png';
const encoding = 'base64';
const base64Data = fs.readFileSync(`${__dirname}/monkey.png`).toString(encoding);
const uri = `data:${mime};${encoding},${base64Data}`;
console.log(uri);

// data URI 转文件
const fs = require('fs');
const uri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA...';
const base64Data = uri.split(',')[1];
const buf = Buffer(base64Data, 'base64');
fs.writeFileSync(`${__dirname}/secondmonkey.png`, buf);
```

# 1. events
```js
const EventEmitter = require('events').EventEmitter;

const AudioDevice = {
  play: function (track) {
    console.log('play', track);
  },
  stop: function () {
    console.log('stop');
  },
};

class MusicPlayer extends EventEmitter {
  constructor() {
    super();
    this.playing = false; 
  }
}

const musicPlayer = new MusicPlayer();
musicPlayer.on('play', function (track) {
  this.playing = true;
  AudioDevice.play(track);
});
musicPlayer.on('stop', function () {
  this.playing = false;
  AudioDevice.stop();
});

musicPlayer.emit('play', 'The Roots - The Fire');
setTimeout(function () {
  musicPlayer.emit('stop');
}, 1000);

// 处理异常
// EventEmitter 实例发生错误会发出一个 error 事件
// 如果没有监听器，默认动作是打印一个堆栈并退出程序
musicPlayer.on('error', function (err) {
  console.err('Error:', err);
});
```
在REACT程序中也有事件总线机制
```js
此机制可用于 react 中兄弟组件中的通信

npm install events -S
事件总线：

// eventBus.js

import {EventEmitter} from 'events';
export default new EventEmitter();
监听：

import Bus from './eventBus'

Bus.addListener('changeSiblingsData', (msg) => {
  this.setState({
    bus: msg,
  });
  console.log(msg);
});
触发：

import Bus from './eventBus'

Bus.emit('changeSiblingsData', msg);
```

# 2. utils
##  1. <a name='promisify'></a>2.1. promisify
util.promisify() 这个方法，方便我们快捷的把原来的异步回调方法改成返回 Promise 实例的方法，接下来，想继续用队列，还是 await 就看需要了

```js
const util = require('util');
const fs = require('fs');
const readAsync = util.promisify(fs.readFile);

async function init() {
  try {
    let data = await readAsync('./package.json');

    data  =JSON.parse(data);

    console.log(data.name);
  } catch (err) {
    console.log(err);
  }
}

```

只要符合 Node.js 的回调风格，所有函数都可以转换：
1. 最后一个参数是函数（callback）
2. 回调函数的参数为(err, result)

##  2. <a name='Promise'></a>2.2. 自定义 Promise 化处理函数
不符合以上两个条件的需要
给函数增加一个属性，`util.promisify.custom` ，指定一个函数作为 Promise 化处理函数

```js
const util = require('util');

function doSomething(foo, callback) {
 // ...
}

doSomething[util.promisify.custom] = function(foo) {
 return getPromiseSomehow();
};

const promisified = util.promisify(doSomething);
console.log(promisified === doSomething[util.promisify.custom]);
// prints 'true'
```

# 3. stream

##  3. <a name=''></a>3.1. 理解流
理解流的最好方式就是想象一下没有流的时候怎么处理数据
- fs.readFileSync 同步读取文件，程序会阻塞，所有数据被读到内存  
- fs.readFile 阻止程序阻塞，但仍会将文件所有数据读取到内存中  
- 希望少内存读取大文件，读取一个数据块到内存处理完再去索取更多的数据

##  4. <a name='-1'></a>3.2. 流的类型
- 内置：许多核心模块都实现了流接口，如 fs.createReadStream
- HTTP：处理网络技术的流
- 解释器：第三方模块 XML、JSON 解释器
- 浏览器：Node 流可以被拓展使用在浏览器
- Audio：流接口的声音模块
- RPC（远程调用）：通过网络发送流是进程间通信的有效方式
- 测试：使用流的测试库

# 4. 使用内建流 API
场景：想要通过网络高效且支持大文件的发送一个文件到一个客户端。
**不使用流**
```js
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  fs.readFile(`${__dirname}/index.html`, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end(String(err));
      return;
    }

    res.end(data);
  });
}).listen(3000);

```
**使用流**
```js
// 更少代码，更加高效
// 提供一个缓冲区发送到客户端
const http = require('http')
const fs = require('fs')
http.createServer((req, res) => {
  fs.createReadStream(`${__dirname}/index.html`).pipe(res);
}).listen(3000)
```
**使用流 + gzip**
```js
const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

http.createServer((req, res) => {
  res.writeHead(200, {
    'content-encoding': 'gzip',
  });
  fs.createReadStream(`${__dirname}/index.html`)
    .pipe(zlib.createGzip())
    .pipe(res);
}).listen(3000);
```
**流的错误处理**
```js
const fs = require('fs')
// 任意读文件错误
const stream = fs.createReadStream('not-found')

stream.on('error', (err) => {
  console.trace()
  console.error('stack:' err.stack)
  console.error('The error raised was:', err)
})
```
# 5. 使用流基类

##  5. <a name='JSON'></a>5.1. 可读流 - JSON 行解析器
可读流被用来为 I/O 源提供灵活的 API，也可以被用作解析器：
- 继承自 `steam.Readable` 类
- 并实现一个 `_read(size)` 方法


json-lines.txt
```js
{ "position": 0, "letter": "a" }
{ "position": 1, "letter": "b" }
{ "position": 2, "letter": "c" }
{ "position": 3, "letter": "d" }
{ "position": 4, "letter": "e" }
{ "position": 5, "letter": "f" }
{ "position": 6, "letter": "g" }
{ "position": 7, "letter": "h" }
{ "position": 8, "letter": "i" }
{ "position": 9, "letter": "j" }
```
JSONLineReader.js
```js
const stream = require('stream');
const fs = require('fs');
const util = require('util');

class JSONLineReader extends stream.Readable {
  constructor(source) {
    super();
    this._source = source;
    this._foundLineEnd = false;
    this._buffer = '';

    source.on('readable', () => {
      this.read();
    });
  }

  // 所有定制 stream.Readable 类都需要实现 _read 方法
  _read(size) {
    let chunk;
    let line;
    let result;

    if (this._buffer.length === 0) {
      chunk = this._source.read();
      this._buffer += chunk;
    }

    const lineIndex = this._buffer.indexOf('\n');

    if (lineIndex !== -1) {
      line = this._buffer.slice(0, lineIndex); // 从 buffer 的开始截取第一行来获取一些文本进行解析
      if (line) {
        result = JSON.parse(line);
        this._buffer = this._buffer.slice(lineIndex + 1);
        this.emit('object', result); // 当一个 JSON 记录解析出来的时候，触发一个 object 事件
        this.push(util.inspect(result)); // 将解析好的 SJON 发回内部队列
      } else {
        this._buffer = this._buffer.slice(1);
      }
    }
  }
}

const input = fs.createReadStream(`${__dirname}/json-lines.txt`, {
  encoding: 'utf8',
});
const jsonLineReader = new JSONLineReader(input); // 创建一个 JSONLineReader 实例，传递一个文件流给它处理

jsonLineReader.on('object', (obj) => {
  console.log('pos:', obj.position, '- letter:', obj.letter);
});
```
##  6. <a name='-1'></a>5.2. 可写流 - 文字变色
可写的流可用于输出数据到底层 I/O:
- 继承自 stream.Writable
- 实现一个 _write 方法向底层源数据发送数据
```
cat json-lines.txt | node stram_writable.js
```

stram_writable.js

```js
const stream = require('stream');

class GreenStream extends stream.Writable {
  constructor(options) {
    super(options);
  }

  _write(chunk, encoding, cb) {
    process.stdout.write(`\u001b[32m${chunk}\u001b[39m`);
    cb();
  }
}

process.stdin.pipe(new GreenStream());
```

##  7. <a name='-1'></a>5.3. 双工流 - 接受和转换数据

双工流允许发送和接受数据：

- 继承自 `stream.Duplex`
- 实现 `_read` 和 `_write` 方法

##  8. <a name='-1'></a>5.4. 转换流 - 解析数据
使用流改变数据为另一种格式，并且高效地管理内存：

- 继承自 `stream.Transform`
- 实现 `_transform` 方法

# 6. 文件系统
## 
   


