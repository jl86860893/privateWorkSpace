import { vec2 } from './math2D'

interface EventListenerObject {
  handleEvent(evt : Event) : void
}

export class Application implements EventListenerObject {
  // _start 成员变量用于标记当前类是否进入不间断地循环状态
  protected _start : boolean = false;
  // 由window对象的requestAnimationFrame 返回的大于0的id号
  // 可以使用cancelAnimationFrame ( this ._requestId )来取消动画循环
  protected _requestId : number = -1;
  // 用于基于时间的物理更新，这些成员变量类型前面使用了!， 可以进行延迟赋值操作
  protected _lastTime ! : number;
  protected _startTime ! : number;

  public isSuportMouseMove : boolean;
  protected _isMouseDown : boolean;

  public canvas : HTMLCanvasElement  ;

  public constructor ( canvas : HTMLCanvasElement ) {
    this.canvas = canvas;
    // canvas元素能够监听鼠标事件
    this.canvas.addEventListener('mousedown', this, false)
    this.canvas.addEventListener('mouseup', this, false)
    this.canvas.addEventListener('mousemove', this, false)

    // 很重要的一点，键盘事件不能在canvas中触发，但是能在全局的window对象中触发
    // 因此能在window对象中监听键盘事件
    window.addEventListener('keydown', this, false);
    window.addEventListener('keyup', this, false);
    window.addEventListener('keypress', this, false);

    // 初始化时，mousedown为false
    this._isMouseDown = false;
    // 默认状态下，不支持mousemove事件
    this.isSuportMouseMove = false;
  }

  public start() : void {
    if(!this._start) {
      this._start = true;
      this._requestId = -1;
      // 在 start 和 stop函数中， _lastTime _startTime都设置为-1
      this._startTime = -1;
      this._lastTime = -1;
      // 启动更新渲染循环
      this._requestId = requestAnimationFrame((elapsedMsec : number) : void => {
        // 启动step方法
        this.step(elapsedMsec);
      })
    }
  }

  public stop() : void {
    if(this._start) {
      /** cancelAnimationFrame函数用于：
       *  取消一个先前通过调用window.requestAnimationFrame() 方法添加到计划中的动画帧请求
      */
     cancelAnimationFrame(this._requestId);
     this._requestId = -1;
     // 在start与stop函数中， _startTime和_lastTime都设置成 -1
     this._startTime = -1;
     this._lastTime = -1;
     this._start = false;
    }
  }

  public isRunning() : boolean {
    return this._start;
  }

  protected step(timeStamp : number) : void {
    // 第一次调用本函数时，设置startTime和lastTime为timeStamp
    if (this._startTime === -1) this._startTime = timeStamp;
    if (this._lastTime === -1) this._lastTime = timeStamp;
    // 计算当前时间点与第一次调用step时间点的差，以毫秒为单位
    let elapsedMsec : number = timeStamp - this._startTime;
    // 计算当前时间点与上一次调用step时间点的差（可以理解为两帧之间的时间差）,以秒为单位
    let intervalSec : number = (timeStamp - this._lastTime) / 1000.0;
    // 记录上一次的时间戳
    this._lastTime = timeStamp;

    console.log(`elapsedTime = ${elapsedMsec} intervalSec = ${intervalSec}`)

    // 先更新
    this.update(elapsedMsec, intervalSec);
    // 后渲染
    this.render();
    // 递归调用，形成周而复始地循环操作
    requestAnimationFrame((elapsedMsec : number) : void => {
      this.step(elapsedMsec)
    })
  }

  // 虚方法，子类能覆写
  public update(elapsedMsec : number, intervalSec : number) : void {}
  public render() : void {}
  public dispatchMouseDown(canvasMouseEvent : CanvasMouseEvent) : void {}
  public dispatchMouseUp(canvasMouseEvent : CanvasMouseEvent) : void {}
  public dispatchMouseMove(canvasMouseEvent : CanvasMouseEvent) : void {}
  public dispatchMouseDrag(canvasMouseEvent : CanvasMouseEvent) : void {}
  public dispatchKeyPress(canvasKeyBoardEvent : CanvasKeyBoardEvent) : void {}
  public dispatchKeyDown(canvasKeyBoardEvent : CanvasKeyBoardEvent) : void {}
  public dispatchKeyUp(canvasKeyBoardEvent : CanvasKeyBoardEvent) : void {}

  private _viewportToCanvasCoordinate(evt : MouseEvent) : vec2 {
    if (this.canvas) {
      let rect : ClientRect = this.canvas.getBoundingClientRect();
      // 作为测试，每次mousedown时，打印出当前canvas的boundClientRect的位置和尺寸
      // 同时打印出MouseEvent的clientX / clientY属性
      if (evt.type === "mousedown") {
        console.log("boundingClientRect : "+JSON.stringify(rect));
        console.log("clientX : "+evt.clientX, "clientY : "+evt.clientY);
        let x : number = evt.clientX - rect.left;
        let y : number = evt.clientY - rect.top;
        return vec2.create(x, y)
      }
    }
    alert("canvas 为 null");
    throw new Error("canvas 为 null")
  }

  private _toCanvasMouseEvent(evt : Event) : CanvasMouseEvent {
    // 向下转型，将Event转换成MouseEvent
    let event : MouseEvent = evt as MouseEvent;
    // 将客户区的鼠标pos变换到canvas坐标系中表示
    let mousePosition : vec2 = this._viewportToCanvasCoordinate(event);
    // 将Event一些要用到的信息传递给CanvasMouseEvent并返回
    let canvasMouseEvent : CanvasMouseEvent = new CanvasMouseEvent(mousePosition, event.button, event.altKey, event.ctrlKey, event.shiftKey);
    return canvasMouseEvent;
  }

  private _toCanvasKeyboardEvent(evt : Event) : CanvasKeyBoardEvent {
    let event : KeyboardEvent = evt as KeyboardEvent;
    let canvasKeyboardEvent : CanvasKeyBoardEvent = new CanvasKeyBoardEvent(event.key, event.keyCode, event.repeat, event.altKey, event.ctrlKey, event.shiftKey);
    return canvasKeyboardEvent;
  }

  // 调用dispatchXXXX虚方法进行事件分发
  // handleEvent 是接口 EventListenerObject 定义的接口方法，必须要实现
  public handleEvent(evt : Event) : void {
    // 根据事件的类型，调用对应的 dispatchXXXX虚方法
    switch(evt.type) {
      case "mousedown":
        this._isMouseDown = true;
        this.dispatchMouseDown(this._toCanvasMouseEvent(evt));
        break;
      case "mouseup":
        this._isMouseDown = false;
        this.dispatchMouseUp(this._toCanvasMouseEvent(evt))
        break;
      case "mousemove":
        // 如果isSupportMouseMove为true，则每次鼠标移动会触发mouseMove事件
        if (this.isSuportMouseMove) {
          this.dispatchMouseMove(this._toCanvasMouseEvent(evt))
        }
        // 同时，如果当前鼠标任意一个键处于按下状态并拖动时，触发drag事件
        if (this._isMouseDown) {
          this.dispatchMouseDrag(this._toCanvasMouseEvent(evt))
        }
        break;
      case "keypress":
        this.dispatchKeyPress(this._toCanvasKeyboardEvent(evt))
        break;
      case "keydown":
        this.dispatchKeyDown(this._toCanvasKeyboardEvent(evt))
        break;
      case "keyup":
        this.dispatchKeyUp(this._toCanvasKeyboardEvent(evt))
        break;
    }
  }
}

export enum EInputEventType {
  MOUSEEVENT,
  MOUSEDOWN,
  MOUSEUP,
  MOUSEMOVE,
  MOUSEDRAG,
  KEYBOARDEVENT,
  KEYUP,
  KEYDOWN,
  KEYPRESS,
}

export class CanvasInputEvent {
  // 3个boolean变量，用来指示Alt、Ctrl、Shift键是否被按下
  public altKey : boolean;
  public ctrlKey : boolean;
  public shiftKey : boolean;
  // type 是一个枚举对象，用来表示当前事件类型，枚举类型定义在下面的代码中
  public type : EInputEventType;
  // 构造函数，使用了 default 参数，初始化时3个组合键都是false状态
  public constructor(altKey : boolean = false, ctrlKey : boolean = false, shiftKey : boolean = false, type : EInputEventType = EInputEventType.MOUSEEVENT) {
    this.altKey = altKey;
    this.ctrlKey = ctrlKey;
    this.shiftKey = shiftKey;
    this.type = type;
  }
}

export class CanvasMouseEvent extends CanvasInputEvent {
  // button 表示当前按下的哪个键
  // [ 0 : 鼠标左键, 1 : 鼠标中键, 2 : 鼠标右键]
  public button : number;
  // 基于canvas坐标系的表示
  public canvasPosition : vec2;

  public localPosition : vec2;
  public constructor(canvasPos : vec2, button : number, altKey : boolean = false, ctrlKey : boolean = false, shiftKey : boolean = false) {
    super(altKey, ctrlKey, shiftKey);
    this.canvasPosition = canvasPos;
    this.button = button;

    // 暂时创建一个vec2对象
    this.localPosition = vec2.create();
  }
}

export class CanvasKeyBoardEvent extends CanvasInputEvent {
  // 当前按下的键的ASCII字符
  public key : string;
  // 当前按下的键的ASCII码（数字）
  public keyCode : number;
  // 当前按下的键是否不断触发事件
  public repeat : boolean;
  public constructor(key : string, keyCode : number, repeat : boolean, altKey : boolean=false, ctrlKey : boolean=false, shiftKey : boolean=false) {
    super(altKey, ctrlKey, shiftKey, EInputEventType.KEYBOARDEVENT);
    this.key = key;
    this.keyCode = keyCode;
    this.repeat = repeat;
  }
}

export class Canvas2DApplication extends Application {
  public context2D : CanvasRenderingContext2D | null;
  public constructor(canvas : HTMLCanvasElement) {
    super(canvas);
    this.context2D = this.canvas.getContext('2d')
  }
}

export class WebGLApplication extends Application {
  public context3D : WebGLRenderingContext | null ;
  public constructor ( canvas : HTMLCanvasElement , contextAttributes ? : WebGLContextAttributes ) {
      super( canvas ) ;
      this.context3D = this.canvas.getContext( "webgl" , contextAttributes ) ;
      if ( this.context3D === null ) {
          this.context3D = this.canvas.getContext( "experimental-webgl" , contextAttributes ) ;
          if ( this . context3D === null ) {
              alert ( " 无法创建WebGLRenderingContext上下文对象 " ) ;
              throw new Error ( " 无法创建WebGLRenderingContext上下文对象 " ) ;
          }
      }
  }
}