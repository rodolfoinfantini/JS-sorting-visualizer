let arrayAccesses = 0
let comparisons = 0
onmessage = (e) => {
    let array = e.data
    async function quickSort(arr,start,end){
        if(start >= end) return
        arrayAccesses++
        arrayAccesses++
        arrayAccesses++
        let index = quickPartition(arr,start,end)
        quickSort(arr,start,index - 1)
        quickSort(arr,index + 1,end)
    }
    function quickPartition(arr,start,end){
        let lastColor = 0
        arrayAccesses++
        let pivotValue = arr[end]
        let pivotIndex = start
        for(let i = start; i < end; i++){
            arrayAccesses++
            comparisons++
            postMessage({cmd: 'sound', value: arr[i], osc: 1})
            postMessage({cmd: 'sound', value: arr[pivotIndex], osc: 2})
            if(arr[i] < pivotValue){
                arrayAccesses++
                swap(arr,i,pivotIndex)
                postMessage({cmd: 'update', arr: array, lastColor: lastColor, currentColor: i, arrayAccesses: arrayAccesses, comparisons: comparisons})
                lastColor = i
                pivotIndex++
            }
            
        }
        postMessage({cmd: 'update', arr: array, lastColor: lastColor, arrayAccesses: arrayAccesses, comparisons: comparisons})
        arrayAccesses++
        /* postMessage({cmd: 'sound', value: arr[pivotIndex]})
        postMessage({cmd: 'sound', value: arr[end]}) */
        swap(arr,pivotIndex,end)
        return pivotIndex
    }
    quickSort(array,0,array.length - 1)
    postMessage({cmd: 'finished', arr: array})
}
function swap(arr, i1, i2){
    const temp = arr[i1]
    arr[i1] = arr[i2]
    arr[i2] = temp
}
function isSorted(arr){
    let notSorted = false
    for(let i = 0; i < arr.length; i++){
        if(arr[i] > arr[i + 1]) {
            notSorted = true
            break
        }
    }
    return !notSorted
}