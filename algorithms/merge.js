let array = []
let arrayAccesses = 0
let comparisons = 0
onmessage = (e) => {
    array = e.data
    arrayAccesses++
    mergeSort(array,0,array.length - 1)
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

let lastColor = 0
let lastColor2 = 0

function merge(arr,left,middle,right){
    let n1 = middle - left + 1
    let n2 = right - middle
    let L = []
    let R = []
    for(let i = 0; i < n1; i++){
        arrayAccesses++
        L[i] = arr[left + i]
    }
    for(let j = 0; j < n2; j++){
        arrayAccesses++
        R[j] = arr[middle + 1 + j]
    }
    let i = 0
    let j = 0
    let k = left
    while(i < n1 && j < n2){
        comparisons++
        if(L[i] <= R[j]){
            arrayAccesses++
            arr[k] = L[i]
            i++
        }
        else{
            arrayAccesses++
            arr[k] = R[j]
            j++
        }
        postMessage({cmd: 'update', arr: array, lastColor: lastColor, currentColor: k, arrayAccesses: arrayAccesses, comparisons: comparisons})
        lastColor = k
        k++
    }
    while(i < n1){
        arrayAccesses++
        arr[k] = L[i]
        postMessage({cmd: 'update', arr: array, lastColor: lastColor2, currentColor: k, arrayAccesses: arrayAccesses, comparisons: comparisons})
        lastColor2 = k
        i++
        k++
    }
    while(j < n2){
        arrayAccesses++
        arr[k] = R[j]
        postMessage({cmd: 'update', arr: array, lastColor: lastColor2, currentColor: k, arrayAccesses: arrayAccesses, comparisons: comparisons})
        lastColor2 = k
        j++
        k++
    }
}

function mergeSort(arr,left,right){
    if(left < right){
        let middle = Math.floor(left + (right - left) / 2)
        mergeSort(arr,left,middle)
        mergeSort(arr,middle + 1,right)
        merge(arr,left,middle,right)
        if(isSorted(array)){
            postMessage({cmd: 'finished', arr: array})
            return
        }
    }
}








/*
function mergeSort(arr,start,end,aux){
    if(start === end) return
    const middle = Math.floor((start + end) / 2)
    arrayAccesses++
    arrayAccesses++
    arrayAccesses++
    mergeSort(aux,start,middle,arr)
    mergeSort(aux,middle + 1,end,arr)
    doMerge(arr,start,middle,end,aux)
    if(isSorted(array)){
        postMessage({cmd: 'finished', arr: array})
        return
    }
}
function doMerge(arr,start,middle,end,aux){
    let k = start
    let i = start
    let j = middle + 1
    while(i <= middle && j <= end){
        arrayAccesses++
        comparisons++
        if(aux[i] <= aux[j]){
            arrayAccesses++
            arr[k++] = aux[i++]
        }else{
            arrayAccesses++
            arr[k++] = aux[j++]
        }
        postMessage({cmd: 'update', arr: array, lastColor: lastColor, currentColor: k + 1, arrayAccesses: arrayAccesses, comparisons: comparisons})
        lastColor = k + 1
    }
    while(i <= middle){
        arrayAccesses++
        arr[k++] = aux[i++]
    }
    while(j <= end){
        arrayAccesses++
        arr[k++] = aux[j++]
    }
    postMessage({cmd: 'update', arr: array, lastColor: lastColor2, currentColor: k, arrayAccesses: arrayAccesses, comparisons: comparisons})
    lastColor2 = k
}
*/