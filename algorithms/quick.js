let array = []
let arrayAccesses = 0
let comparisons = 0
onmessage = (e) => {
    array = e.data
    let finishedSort = false
    function quickSort(arr,start,end){
        if(start >= end){
            postMessage({cmd: 'update', arr: array, arrayAccesses: arrayAccesses, comparisons: comparisons})
            if(isSorted(array) && !finishedSort) {
                finishedSort = true
                postMessage({cmd: 'finished', arr: array})
            }
            return
        }
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
        // let pivotValue = arr[Math.floor((end - start) / 2)]
        let pivotValue = arr[end]
        let pivotIndex = start
        for(let i = start; i < end; i++){
            arrayAccesses++
            comparisons++
            if(arr[i] < pivotValue){
                arrayAccesses++
                swap(arr,i,pivotIndex)
                postMessage({cmd: 'update', arr: array, lastColor: lastColor, currentColor: i, arrayAccesses: arrayAccesses, comparisons: comparisons})
                lastColor = i
                pivotIndex++
                // console.log(pivotValue)
            }
        }
        postMessage({cmd: 'update', arr: array, lastColor: lastColor, arrayAccesses: arrayAccesses, comparisons: comparisons})
        arrayAccesses++
        // noSleepSwap(arr,pivotIndex,arr.indexOf(Math.floor((end - start) / 2)))
        swap(arr,pivotIndex,end)
        return pivotIndex
    }
    quickSort(array,0,array.length - 1)
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