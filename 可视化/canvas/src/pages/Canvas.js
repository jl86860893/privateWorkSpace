import React, { Component } from 'react';

export default class Canvas extends Component {
  componentDidMount() {
    this.draw(500, 500, 75, 80 )
  }

  // stroke,fill
  draw(x1, y1, r, percent) {
    const context = this.canvas.getContext('2d');

    context.beginPath();
    context.arc(x1, y1, 100, 0, 2 * Math.PI, false);
    context.lineWidth = 20;
    context.strokeStyle = 'red';
    context.stroke();

    const diffAngle = percent / 100 * Math.PI * 2;
    context.beginPath();
    context.lineWidth = 22;
    context.arc(x1, y1, 100, 0, diffAngle, false);
    context.strokeStyle = 'green';
    context.stroke()
  }

  render() {
    return (
      <div style={{ backgroundColor: 'grey' }}>
        <canvas ref={node => this.canvas = node} width="800" height="800"></canvas>
      </div>
    )
  }
}