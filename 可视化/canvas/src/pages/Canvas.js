import React, { Component } from 'react';

export default class Canvas extends Component {
  componentDidMount() {
    const context = this.canvas.getContext('2d');
    const rectSize = [100, 100];
    context.fillStyle = 'red';
    context.save();
    context.translate(-0.5 * rectSize[0], -0.5 * rectSize[1])
    context.beginPath()
    context.rect(0.5 * this.canvas.width, 0.5 * this.canvas.height, ...rectSize)
    context.fill()
    context.restore()
  }

  render() {
    return (
      <div style={{ width: '512px', height: '512px' }}>
        <canvas ref={node => this.canvas = node} width="512" height="512"></canvas>
      </div>
    )
  }
}