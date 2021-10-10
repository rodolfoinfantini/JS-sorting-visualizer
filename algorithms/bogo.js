let arrayAccesses = 0
let comparisons = 0
onmessage = (e) => {
    let array = e.data
    while(!isSorted(array)){
        arrayAccesses++
        comparisons++
        for(let i = array.length - 1; i > 0; i--){
            arrayAccesses++
            swap(array, i, Math.floor(Math.random() * (i + 1)))
        }
        postMessage({cmd: 'update', arr: array, arrayAccesses: arrayAccesses, comparisons: comparisons})
    }
    postMessage({cmd: 'finished', arr: array})
}
function isSorted(arr){
    let notSorted = false
    for(let i = 0; i < arr.length; i++){
        arrayAccesses++
        comparisons++
        postMessage({cmd: 'sound', value: arr[i], osc: 1})
        postMessage({cmd: 'sound', value: arr[i+1], osc: 2})
        lastColor = i
        if(arr[i] > arr[i + 1]) {
            notSorted = true
            break
        }
    }
    return !notSorted
}
function swap(arr, i1, i2){
    const temp = arr[i1]
    arr[i1] = arr[i2]
    arr[i2] = temp
}