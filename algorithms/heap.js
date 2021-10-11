let arrayAccesses = 0
let comparisons = 0
let lastColor = 0
let lastColor2 = 0
let lastColor3 = 0
let lastColor4 = 0
let lastColor5 = 0
let lastColor6 = 0
let lastColor7 = 0
let lastColor8 = 0
onmessage = (e) => {
    arrayAccesses = 0
    comparisons = 0
    const array = e.data
    heapSort(array)
    postMessage({cmd: 'finished', arr: array})
}

function heapSort(arr) {
    arrayAccesses++
    let n = arr.length
    for(let i = Math.floor(n/2)-1; i>= 0; i--) {
        heapify(arr,n,i)
    }
    for(let i = n - 1; i > 0; i--) {
        swap(arr,0,i)
        postMessage({cmd: 'update', arr: arr, lastColor: lastColor5, currentColor: 0})
        lastColor5 = 0
        postMessage({cmd: 'color', lastColor: lastColor6, currentColor: i})
        lastColor6 = i
        heapify(arr,i,0)
    }
}

function heapify(arr,n,i){
    let high = i
    let left = 2 * i + 1
    let right = 2 * i + 2

    postMessage({cmd: 'color',lastColor: lastColor, currentColor: left})
    lastColor = left
    postMessage({cmd: 'color',lastColor: lastColor2, currentColor: high})
    lastColor2 = high
    postMessage({cmd: 'sound', value: arr[left], osc: 1})
    postMessage({cmd: 'sound', value: arr[high], osc: 2})
    arrayAccesses++
    comparisons++
    if(left < n && arr[left] > arr[high]){
        high = left
    }
    postMessage({cmd: 'color',lastColor: lastColor3, currentColor: right})
    lastColor3 = right
    postMessage({cmd: 'color',lastColor: lastColor4, currentColor: high})
    lastColor4 = high
    postMessage({cmd: 'sound', value: arr[right], osc: 1})
    postMessage({cmd: 'sound', value: arr[high], osc: 2})
    arrayAccesses++
    comparisons++
    if(right < n && arr[right] > arr[high]){
        high = right
    }
    if(high != i){
        arrayAccesses++
        swap(arr,i,high)
        postMessage({cmd: 'color', lastColor: lastColor7, currentColor: high})
        lastColor7 = high
        postMessage({cmd: 'color', lastColor: lastColor8, currentColor: i})
        lastColor8 = i
        postMessage({cmd: 'update', arr: arr, arrayAccesses: arrayAccesses, comparisons: comparisons})
        heapify(arr,n,high)
    }
}

function swap(arr,a,b){
    const temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp
}