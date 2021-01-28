```js
interface IPerson {
    readonly id: number,
    name: string,
    age?: number   // 非必填
}

let viking: IPerson = {
    name: 'viking'
}

viking.id = 23543563  //出错，不可编辑
```


```js
interface IRadio {
    switchRadio(): void;
}
interface IBattery {
    checkBatteryStatus();
}
interface IRadioWithBattery extends IRadio {
    checkBatteryStatus();
}

class Car implements IRadio {
    switchRadio() {
        
    }
}

class Cellphone implements IRadio, IBattery {
    switchRadio() {  }

    checkBatteryStatus() {}
}
// IRadioWithBattery是两接口合二为一
class Cellphone implements IRadioWithBattery {
    switchRadio() {  }

    checkBatteryStatus() {}
}
```