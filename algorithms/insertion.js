let arrayAccesses = 0
let comparisons = 0
onmessage = (e) => {
    let array = e.data
    let lastColor = 0
    let lastColor2 = 0
    arrayAccesses++
    for(let i = 1; i < array.length; i++){
        arrayAccesses++
        comparisons++
        if(array[i] <= array[i - 1]){
            arrayAccesses++
            swap(array, i, i - 1)
            for(let innerI = i - 1; innerI > 0; innerI--){
                comparisons++
                arrayAccesses++
                postMessage({cmd: 'sound', value: array[innerI], osc: 1})
                postMessage({cmd: 'sound', value: array[innerI-1], osc: 2})
                if(array[innerI] < array[innerI - 1]){
                    arrayAccesses++
                    swap(array, innerI, innerI - 1)
                    postMessage({cmd: 'color', lastColor: lastColor, currentColor: innerI})
                    lastColor = innerI
                }
            }
        }
        postMessage({cmd: 'update', arr: array, arrayAccesses: arrayAccesses, comparisons: comparisons, lastColor: lastColor2, currentColor: i})
        lastColor2 = i
    }
    postMessage({cmd: 'finished', arr: array})
}
function swap(arr, i1, i2){
    const temp = arr[i1]
    arr[i1] = arr[i2]
    arr[i2] = temp
}