let array = []
let arrayAccesses = 0
let comparisons = 0
onmessage = (e) => {
    array = e.data
    let gap = array.length
    let swapped = true
    let lastColor = 0
    let lastGapColor = 0
    while(gap > 1 || swapped){
        gap = Math.max(Math.floor(gap / 1.3),1)
        swapped = false
        arrayAccesses++
        for(let i = 0; i < array.length - gap; i++){
            arrayAccesses++
            comparisons++
            if(array[i] > array[i + gap]){
                arrayAccesses++
                postMessage({cmd: 'sound', value: array[i]})
                postMessage({cmd: 'sound', value: array[i+gap]})
                swap(array,i,i + gap)
                swapped = true
            }
            postMessage({cmd: 'color', lastColor: lastColor, currentColor: i})
            postMessage({cmd: 'color', lastColor: lastGapColor, currentColor: i + gap})
            lastColor = i
            lastGapColor = i + gap
        }
        // JUST TO SLOW DOWN A BIT
        postMessage({cmd: 'update', arr: array, arrayAccesses: arrayAccesses, comparisons: comparisons})
        postMessage({cmd: 'update', arr: array, arrayAccesses: arrayAccesses, comparisons: comparisons})
        postMessage({cmd: 'update', arr: array, arrayAccesses: arrayAccesses, comparisons: comparisons})
        postMessage({cmd: 'update', arr: array, arrayAccesses: arrayAccesses, comparisons: comparisons})
        postMessage({cmd: 'update', arr: array, arrayAccesses: arrayAccesses, comparisons: comparisons})
        postMessage({cmd: 'update', arr: array, arrayAccesses: arrayAccesses, comparisons: comparisons})
        postMessage({cmd: 'update', arr: array, arrayAccesses: arrayAccesses, comparisons: comparisons})
        postMessage({cmd: 'update', arr: array, arrayAccesses: arrayAccesses, comparisons: comparisons})
        postMessage({cmd: 'update', arr: array, arrayAccesses: arrayAccesses, comparisons: comparisons})
    }
    postMessage({cmd: 'finished', arr: array})
}
function swap(arr, i1, i2){
    const temp = arr[i1]
    arr[i1] = arr[i2]
    arr[i2] = temp
}