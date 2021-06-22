## import-local
本地和global同时存在learn脚手架，优先从本地node_modules中的lerna/cli.js执行

## pkg-dir
Find the root directory of a Node.js project or npm package

/
└── Users
    └── sindresorhus
        └── foo
            ├── package.json
            └── bar
                ├── baz
                └── example.js
```js
// example.js
const pkgDir = require('pkg-dir');
 
(async () => {
    const rootDir = await pkgDir(__dirname);
 
    console.log(rootDir);
    //=> '/Users/sindresorhus/foo'
})();
```
pkg-dir内部使用find-up库

/
└── Users
    └── sindresorhus
        ├── unicorn.png
        └── foo
            └── bar
                ├── baz
                └── example.js
```js
// example.js
const path = require('path');
const findUp = require('find-up');
 
(async () => {
    console.log(await findUp('unicorn.png'));
    //=> '/Users/sindresorhus/unicorn.png'
 
    console.log(await findUp(['rainbow.png', 'unicorn.png']));
    //=> '/Users/sindresorhus/unicorn.png'
 
    console.log(await findUp(async directory => {
        const hasUnicorns = await findUp.exists(path.join(directory, 'unicorn.png'));
        return hasUnicorns && directory;
    }, {type: 'directory'}));
    //=> '/Users/sindresorhus'
})();
```



path.resolve('/users', '/tom', '..')
path.resolve('.') // 当前路径转绝对路径
path.parse(path.resolve('.'))  // 解析路径

## locate-path
```js
const locatePath = require('locate-path');
 
const files = [
    'unicorn.png',
    'rainbow.png', // Only this one actually exists on disk
    'pony.png'
];
 
(async () => {
    console(await locatePath(files));
    //=> 'rainbow'
})();
```

`locatePath(paths, options?)`
Returns a Promise<string> for the first path that exists or undefined if none exists.

`locatePath.sync(paths, options?)`
Returns the first path that exists or undefined if none exists.


内部使用path-exists
-------
### path-exists
判断一个路径是否存在
```js
// foo.js
const pathExists = require('path-exists');
 
(async () => {
    console.log(await pathExists('foo.js'));
    //=> true
})();
```
`pathExists(path)`
Returns a Promise<boolean> of whether the path exists.

`pathExists.sync(path)`
Returns a boolean of whether the path exists.
------
判断文件存在的另一个nodejs方法
fs.accessSync(filePath)
```js
import { accessSync, constants } from 'fs';

try {
  accessSync('etc/passwd', constants.R_OK | constants.W_OK);
  console.log('can read/write');
} catch (err) {
  console.error('no access!');
}
```