let array = []
let arrayAccesses = 0
let comparisons = 0
onmessage = (e) => {
    array = e.data
    let lastColor = 0
    arrayAccesses++
    for(let loopI = 0; loopI < array.length; loopI++){
        arrayAccesses++
        for(let i = 0; i < array.length - loopI; i++){
            comparisons++
            arrayAccesses++
            if(array[i] > array[i + 1]){
                arrayAccesses++
                postMessage({cmd: 'color', lastColor: lastColor, currentColor: i + 1})
                lastColor = i + 1
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