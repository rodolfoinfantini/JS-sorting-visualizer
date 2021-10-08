let array = []
let arrayAccesses = 0
let comparisons = 0
onmessage = (e) => {
    array = e.data
    let isSorted = false
    let lastOddColor = 0
    let lastEvenColor = 0
    while(!isSorted){
        isSorted = true
        arrayAccesses++
        for(let i = 1; i < array.length; i = i + 2){
            comparisons++
            arrayAccesses++
            if(array[i] > array[i + 1]){
                arrayAccesses++
                swap(array,i,i+1)
                isSorted = false
                postMessage({cmd: 'update', arr: array, lastColor: lastOddColor, currentColor: i + 1, arrayAccesses: arrayAccesses, comparisons: comparisons})
                lastOddColor = i + 1
            }
        }
        postMessage({cmd: 'update', arr: array, lastColor: lastOddColor, arrayAccesses: arrayAccesses, comparisons: comparisons})
        arrayAccesses++
        for(let i = 0; i < array.length; i = i + 2){
            comparisons++
            arrayAccesses++
            if(array[i] > array[i + 1]){
                arrayAccesses++
                swap(array,i,i+1)
                isSorted = false
                postMessage({cmd: 'update', arr: array, lastColor: lastEvenColor, currentColor: i, arrayAccesses: arrayAccesses, comparisons: comparisons})
                lastEvenColor = i
            }
        }
        postMessage({cmd: 'update', arr: array, lastColor: lastEvenColor, arrayAccesses: arrayAccesses, comparisons: comparisons})
    }
    postMessage({cmd: 'finished', arr: array})
}
function swap(arr, i1, i2){
    const temp = arr[i1]
    arr[i1] = arr[i2]
    arr[i2] = temp
}