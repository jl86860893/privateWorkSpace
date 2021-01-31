import React, { Component } from 'react';
import init from './ApplicationTest.ts'

import styles from './canvas.less'

export default class Canvas extends Component {
  componentDidMount() {
    init();
  }

  render() {
    return (
      <>
        <div>
          <button id="start">start</button>
          <button id="stop">stop</button>
        </div>
        <canvas id="canvas" className={styles.canvas} width="300" height="300"></canvas>
      </>
    )
  }
}