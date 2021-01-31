const EventEmitter = require('events').EventEmitter;

class MyGeek extends EventEmitter {
    constructor() {
        super();
        setInterval(() => {
            this.emit('customEvent', {optionsOne: '123', optionsTwo: '222'})
        }, 3000)
    }
}

const myGeek = new MyGeek;
myGeek.addListener('customEvent', res => {
    // res 为带回的参数
    console.log('上面每三秒发出customEvent事件，这边监听并做出事情', res)
})