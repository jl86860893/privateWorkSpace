

```js
import React from 'react';
import * as codemirror from 'codemirror/lib/codemirror'

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css';

import styles from './index.less';

class ShowCode extends React.Component {
  editConfig = {
    mode: 'javascript', // 编辑器语言
    theme: 'monokai', // 编辑器主题
    lineNumbers: true, // 显示行号
    tabSize: 2,
    smartIndent: true,
    readOnly: true,
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.createEdit();
    this.setVaule();
  }

  createEdit = () => {
    const { mode } = this.props;
    if (mode) {
      this.editConfig.mode = mode;
    }
    this.CodeMirrorEditor = codemirror.fromTextArea(this.edit, this.editConfig);
  }

  setVaule = () => {
    const { value = '' } = this.props;
    this.CodeMirrorEditor.setValue(value);
    this.CodeMirrorEditor.setSize('auto', (this.CodeMirrorEditor.lastLine() + 2) * 21);
  }

  render() {
    return (
      <div className={styles.editWrap}>
        <textarea
          className={styles.edit}
          ref={ el => { this.edit = el }}
        />
      </div>
    )
  }
}

export default ShowCode;
```