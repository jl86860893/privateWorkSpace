function heapSort(arr) {
    if (arr.length < 2) {
        return
    }
    for(var i = 0; i < arr.length; i++) {
        heapInsert(arr, i)
        console.log(arr)
    }

    // for(let i = arr.length - 1; i >= 0; i--) {
    //     heapify(arr, i, arr.length)
    // }
    let heapSize = arr.length;
    swap(arr, 0, --heapSize)
    while(heapSize > 0) {
        heapify(arr, 0, heapSize)
        heapSize -= 1;
        swap(arr, 0, heapSize)
    }
}

function heapInsert(arr, index) {
    while(arr[index] > arr[Math.floor((index - 1) / 2)]) {
        swap(arr, index, Math.floor((index - 1) / 2))
        index = Math.floor((index - 1) / 2);
    }
}

function heapify(arr, start, heapSize) {
    let left = start * 2 + 1;
    while(left < heapSize) {
        let largest = left + 1 < heapSize && arr[left] < arr[left + 1] ? left + 1: left;
        largest = arr[largest] > arr[start] ? largest : start;
        if (largest === start) {
            break;
        }
        swap(arr, start, largest);
        start = largest;
        left = start * 2 + 1;
    }
}

function swap(arr, a, b) {
    let temp = arr[a]
    arr[a]= arr[b]
    arr[b] = temp;
}

let arr = [3,7,4,5,21,0]
heapSort(arr)
console.log(arr)