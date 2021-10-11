let arrayAccesses = 0
let comparisons = 0
onmessage = (e) => {
    let array = e.data
    let isSorted = false
    let lastOddColor = 0
    let lastOddColor2 = 0
    let lastEvenColor = 0
    let lastEvenColor2 = 0
    arrayAccesses = 0
    comparisons = 0
    while(!isSorted){
        isSorted = true
        arrayAccesses++
        for(let i = 1; i < array.length; i = i + 2){
            comparisons++
            arrayAccesses++
            postMessage({cmd: 'sound', value: array[i], osc: 1})
            postMessage({cmd: 'sound', value: array[i + 1], osc: 2})

            postMessage({cmd: 'color', lastColor: lastOddColor, currentColor: i})
            lastOddColor = i
            postMessage({cmd: 'color', lastColor: lastOddColor2, currentColor: i + 1})
            lastOddColor2 = i + 1
            
            if(array[i] > array[i + 1]){
                arrayAccesses++
                swap(array,i,i+1)
                isSorted = false
            }
        }
        postMessage({cmd: 'update', arr: array, arrayAccesses: arrayAccesses, comparisons: comparisons})
        arrayAccesses++
        for(let i = 0; i < array.length; i = i + 2){
            comparisons++
            arrayAccesses++
            postMessage({cmd: 'sound', value: array[i], osc: 1})
            postMessage({cmd: 'sound', value: array[i + 1], osc: 2})

            postMessage({cmd: 'color', lastColor: lastEvenColor, currentColor: i})
            lastEvenColor = i
            postMessage({cmd: 'color', lastColor: lastEvenColor2, currentColor: i + 1})
            lastEvenColor2 = i + 1
            if(array[i] > array[i + 1]){
                arrayAccesses++
                swap(array,i,i+1)
                isSorted = false
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