# Promise

```js
function loadScript(src) {
  // 1.pending,undefined
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.src = src;
    script.onload = () => resolve(src); // 2.fulfilled, result
    script.onerror = err => reject(err); // 2.rejected, error
    document.head.append(script)
  })
}

// promise.then(onFulfilled, onRejected)
loadScript('./1.js')
  .then(() => loadScript('./2.js'), err => console.log(err))
  .then(loadScript('./3.js'))
```

```js
function test (bool) {
  if(bool) {
    return new Promise((resolve, reject) => {
      resolve(30)
    });
  } else {
    return Promise.resolve(42);
  }
}
test(1).then(val => console.log(val), err => console.log(err))
```

## Promise.all
等待所有的请求（都在异步）完毕。
```js
async componentDidMount() {
    const { deviceId } = this.props;
    const [
      { data: deviceArchiveFormInitValues },
      { data: deviceInstallFormInitValues },
      { data: devicePatientTreatFormInitValues },
      { data: deviceRepairFormInitValues },
      { data: deviceMaintainFormInitValues },
      { data: deviceMetrologicalFormInitValues },
      { data: devicePatrolFormInitValues },
      { data: deviceCirculationFormInitValues },
      { data: deviceScrapFormInitValues },
    ] = await Promise.all([
      DeviceApi.getDeviceArchiveForm(deviceId),
      DeviceApi.getDeviceInstallForm(deviceId),
      DeviceApi.getDevicePatientTreatForm(deviceId),
      DeviceApi.getDeviceRepairForm(deviceId),
      DeviceApi.getDeviceMaintainForm(deviceId),
      DeviceApi.getDeviceMetrologicalForm(deviceId),
      DeviceApi.getDevicePatrolForm(deviceId),
      DeviceApi.getDeviceCirculationForm(deviceId),
      DeviceApi.getDeviceScrapForm(deviceId),
    ]);

    this.setState({
      deviceArchiveFormInitValues: tranferBooleanToString(deviceArchiveFormInitValues),
      deviceInstallFormInitValues: tranferBooleanToString(deviceInstallFormInitValues),
      devicePatientTreatFormInitValues: tranferBooleanToString(devicePatientTreatFormInitValues),
      deviceRepairFormInitValues: tranferBooleanToString(deviceRepairFormInitValues),
      deviceMaintainFormInitValues: tranferBooleanToString(deviceMaintainFormInitValues),
      deviceMetrologicalFormInitValues: tranferBooleanToString(deviceMetrologicalFormInitValues),
      devicePatrolFormInitValues: tranferBooleanToString(devicePatrolFormInitValues),
      deviceCirculationFormInitValues: tranferBooleanToString(deviceCirculationFormInitValues),
      deviceScrapFormInitValues: tranferBooleanToString(deviceScrapFormInitValues),
    })
  }
```

## Promise.race()
```js
const p1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
}

const p1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2)
    }, 3000)
  })
}

Promise.race([p1(), p2()]).then(value => {
  console.log(value)
})
```