import React, { Component } from 'react';

export default class Canvas extends Component {
  componentDidMount() {
    const data = [
      {productTypeName:"CT",percentage:0.0053,},
      {productTypeName:"MI",percentage:0.0351,},
      {productTypeName:"MR",percentage:0.0056,},
      {productTypeName:'PMR',percentage:0.0909,},
      {productTypeName:'RT',percentage:0.0,},
      {productTypeName:'UCloud',percentage:0.0,},
      {productTypeName:'WS',percentage:0.0,},
      {productTypeName:'XR',percentage:0.0556,}
    ]
    this.draw(800, 800, 75, data)
  }

  draw(cw, ch, percent, data) {
    const ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, cw, ch);
    const PI = Math.PI
    const center = [cw / 2, ch / 2];

    const R = 200;
    const apRad = - Math.PI / 2
    const afRad = percent / 100 * 2 * Math.PI - Math.PI / 2

    ctx.beginPath();
    ctx.arc(cw / 2, ch / 2, R, apRad + PI/18, afRad);
    ctx.lineWidth = 25;
    ctx.lineCap = 'round'

    const xp = cw / 2 + R * Math.cos(apRad);
    const yp = ch / 2 + R * Math.sin(apRad);
    const xf = cw / 2 + R * Math.cos(afRad);
    const yf = ch / 2 + R * Math.sin(afRad);

    let grd = ctx.createLinearGradient(xp, yp, xf, yf);
    grd.addColorStop(0, "#4ED4FF");
    grd.addColorStop(1, "#4A6DFF");

    ctx.strokeStyle = grd;

    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cw / 2, ch / 2, R, afRad + PI/18, - Math.PI/2);
    ctx.strokeStyle = '#B9C5D7';
    ctx.lineWidth = 15;
    ctx.stroke();

    ctx.beginPath();
    ctx.font = "bold 80px MicrosoftYaHei-bold";
    ctx.textAlign="center";
    ctx.fillStyle ="#3D8EFF";
    ctx.fillText(percent+"%", center[0], center[1]);

    ctx.beginPath();
    ctx.font = "48px MicrosoftYaHei";
    ctx.textAlign="center";
    ctx.fillStyle ="#5C6280";
    ctx.fillText("整体开机率", center[0], center[1]+70);

    ctx.beginPath();
    ctx.moveTo(650, 400);
    ctx.lineTo(850, 0);
    ctx.lineTo(850, 800);
    const grad=ctx.createLinearGradient(650, 400, 850, 400)
    grad.addColorStop(0,'#CCE1FF');                  //定义渐变色颜色
    grad.addColorStop(1,'rgba(204,225,255,0)');
    ctx.fillStyle = grad;
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.rect(900, 0, 950, 800)
    const grad1=ctx.createLinearGradient(900, 0, 900, 800)
    grad1.addColorStop(0, '#4973FF')
    grad1.addColorStop(1, '#4DD3FF')
    ctx.fillStyle = grad1
    ctx.fill()

    const gap = 10
    const height =  ch / data.length
    data.forEach((item, index) => {
      this.drawLine(ctx, index, height, item)
    })
  }

  drawLine = (ctx, i, height, item) => {
    ctx.beginPath();
    ctx.lineWidth = 10;
    if(i) {
      ctx.moveTo(900, height * i)
      ctx.lineTo(1850, height * i)
      ctx.strokeStyle = '#ffffff'
      ctx.stroke()
    }


    if (i === 0) {
      ctx.beginPath()
      ctx.font = "36px MicrosoftYaHei";
      ctx.textAlign="left";
      ctx.fillStyle ="#ffffff";
      ctx.fillText(item.productTypeName, 1000, height * i + 60);

      ctx.beginPath()
      ctx.font = "bold 36px MicrosoftYaHei";
      ctx.textAlign="left";
      ctx.fillStyle ="#ffffff";
      ctx.fillText((item.percentage * 100).toFixed(2) + '%', 1400, height * i + 60);
    } else {
      ctx.beginPath()
      ctx.font = "36px MicrosoftYaHei";
      ctx.textAlign="left";
      ctx.fillStyle ="#fff";
      ctx.fillText(item.productTypeName, 1000, height * i + 65);

      ctx.beginPath()
      ctx.font = "bold 36px MicrosoftYaHei";
      ctx.textAlign="left";
      ctx.fillStyle ="#fff";
      ctx.fillText((item.percentage * 100).toFixed(2) + '%', 1400, height * i + 65);
    }
  }

  render() {
    return (
      <div style={{ backgroundColor: 'white' }}>
        <canvas ref={node => this.canvas = node} width="1600" height="800"></canvas>
      </div>
    )
  }
}