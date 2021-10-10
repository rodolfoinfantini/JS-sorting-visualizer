let arrayAccesses = 0
let comparisons = 0
onmessage = (e) => {
    let array = e.data
    let lastColor = 0
    let lastColor2 = 0
    arrayAccesses++
    for(let loopI = 0; loopI < array.length; loopI++){
        arrayAccesses++
        for(let i = 0; i < array.length - loopI; i++){
            comparisons++
            arrayAccesses++
            postMessage({cmd: 'sound', value: array[i], osc: 1})
            postMessage({cmd: 'sound', value: array[i+1], osc: 2})
            postMessage({cmd: 'color', lastColor: lastColor, currentColor: i})
            lastColor = i
            postMessage({cmd: 'color', lastColor: lastColor2, currentColor: i+1})
            lastColor2 = i+1
            if(array[i] > array[i + 1]){
                arrayAccesses++
                swap(array, i, i + 1)
            }
        }
        postMessage({cmd: 'update', arr: array, arrayAccesses: arrayAccesses, comparisons: comparisons})
    }
    postMessage({cmd: 'finished', arr: array})
}
function swap(arr, i1, i2){
    const temp = arr[i1]
    arr[i1] = arr[i2]
    arr[i2] = temp
}