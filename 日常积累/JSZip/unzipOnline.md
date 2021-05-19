```html
<p>
  <label>请输入ZIP文件的线上地址：</label>
  <input type="text" id="zipUrl" />
</p>
<button id="unzipBtn" onclick="unzipOnline()">在线解压</button>
<p id="status"></p>
<ul id="fileList"></ul>
```

```js
const zipUrlEle = document.querySelector("#zipUrl");
const statusEle = document.querySelector("#status");
const fileList = document.querySelector("#fileList");
const exeJSZip = new ExeJSZip();

// 执行在线解压操作
async function unzipOnline() {
  fileList.innerHTML = "";
  statusEle.innerText = "开始下载文件...";
  const data = await exeJSZip.getBinaryContent(
    zipUrlEle.value,
    handleProgress
  );
  let items = "";
  await exeJSZip.iterateZipFile(data, (relativePath, zipEntry) => {
    items += `<li class=${zipEntry.dir ? "caret" : "indent"}>
      ${zipEntry.name}</li>`;
  });
  statusEle.innerText = "ZIP文件解压成功";
  fileList.innerHTML = items;
}

// 处理下载进度
function handleProgress(progressData) {
  const { percent, loaded, total } = progressData;
  if (loaded === total) {
    statusEle.innerText = "文件已下载，努力解压中";
  }
}
```

 JSZip 这个库为我们提供了 file API，通过这个 API 我们就可以读取指定文件中的内容。比如这样使用 `zip.file("amount.txt").async("arraybuffer")` ，之后我们就可以执行对应的操作来实现文件预览的功能。

 注意： 当解压较大的文件时，在 IE 10 以下的浏览器可能会出现闪退问题。