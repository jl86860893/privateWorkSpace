import { Canvas2D } from "./canvas2D.js";
var canvas = document.getElementById('canvas');
if (canvas === null) {
    alert("无法获取HTMLCanvasElement !!! ");
    throw new Error("无法获取HTMLCanvasElement !!! ");
}
var canvas2d = new Canvas2D(canvas);
canvas2d.drawText("Hello World");
