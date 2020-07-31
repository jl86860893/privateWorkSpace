## pdf预览
```js
import React from 'react';
import { Document, Page } from 'react-pdf';

import styles from './index.less';

class PdfView extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          numPages: null,
        };
    }

    componentDidMount() {

    }

    componentDidUpdate() {
      this.appendWaterMark();
    }

    appendWaterMark = () => {
      if (this.refPages && this.refPages.length) {
        this.refPages.forEach(ele => {
          const { id, ref } = ele;
          if (ref && !ref.querySelector(`#${id}`)) {
            const node = this.createWaterMark(id);
            ref.appendChild(node);
          }
        });
      }
    }

    createWaterMark = id => {
      const waterMark = document.createElement('div');
      waterMark.key = id;
      waterMark.id = id;
      waterMark.className = styles.waterMark;
      let fontHtml = '';
      for (let i = 0; i < 48; i += 1) {
        fontHtml += '<p>王余超</p>';
      }
      waterMark.innerHTML = fontHtml;
      return waterMark;
    }

    onDocumentLoadSuccess = ({ numPages }) => {
      this.setState({ numPages });
    }

    renderPages = () => {
      const { numPages } = this.state;
      const result = [];
      if (numPages) {
        this.refPages = [];
        for (let i = 0; i < 10; i += 1) {
          const node = (
            <Page
              key={`page${i}`}
              inputRef={ref => {
                if (ref) {
                  this.refPages.push({
                    id: `pageRef${i + 1}`,
                    ref,
                  })
                }
              }}
              className={styles.pages}
              pageNumber={i + 1}
              height={800 * Math.SQRT2}
            />
          )
          result.push(node)
        }
      }
      return result;
    }

    render () {
      const pageNodes = this.renderPages();
      return (
        <>
          <Document
            className={styles.document}
            file="/abd.pdf"
            onLoadSuccess={this.onDocumentLoadSuccess}
            error="liangliang"
            inputRef={ref => { this.myDocument = ref; }}
            loading="加载中。。。。"
            // onItemClick={({ pageNumber }) => alert(`Clicked an item from page ${pageNumber}!`)}
            // onPassword={callback => callback('s3cr3t_p4ssw0rd')}
            // onSourceSuccess={() => alert('Document source retrieved!')}
          >
            {pageNodes}
          </Document>
        </>
      )
    }
}

export default PdfView;

```