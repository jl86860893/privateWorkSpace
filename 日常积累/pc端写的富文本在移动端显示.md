移动端的容器设置以下属性
```html
<div class="rich_media_content" v-html="html"></div>
```


```css
.rich_media_content {
  position: relative;
  overflow: hidden;
}

.rich_media_content * {
  max-width: 100%!important;
  box-sizing: border-box!important;
  -webkit-box-sizing: border-box!important;
  word-wrap: break-word!important;
}

.rich_media_content table {
    margin-bottom: 10px;
    border-collapse: collapse;
    display: table;
    width: 100%!important
}

.rich_media_content td,th {
    word-wrap: break-word;
    word-break: break-all;
    padding: 5px 10px;
    border: 1px solid #DDD
}

.rich_media_content caption {
    border: 1px dashed #DDD;
    border-bottom: 0;
    padding: 3px;
    text-align: center
}

.rich_media_content th {
    border-top: 2px solid #BBB;
    background: #f7f7f7
}

.rich_media_content td p {
    margin: 0;
    padding: 0
}

.rich_media_content form {
    display: none!important
}

@media screen and (min-width: 0\0) and (min-resolution:72dpi) {
    .rich_media_content table {
        table-layout:fixed!important
    }

    .rich_media_content td,.rich_media_content th {
        width: auto!important
    }
}

.rich_media_content .tc {
    text-align: center
}

.rich_media_content .tl {
    text-align: left
}

.rich_media_content .tr {
    text-align: right
}
```