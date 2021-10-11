let arrayAccesses = 0
let comparisons = 0
onmessage = (e) => {
    let array = e.data
    arrayAccesses = 0
    comparisons = 0
    arrayAccesses++
    mergeSort(array,0,array.length - 1)
    postMessage({cmd: 'finished', arr: array, arrayAccesses: arrayAccesses, comparisons: comparisons})
}

let lastColor = 0
let lastColor2 = 0
let lastColor3 = 0

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
        postMessage({cmd: 'sound', value: L[i], osc: 1})
        postMessage({cmd: 'sound', value: R[j], osc: 2})

      
        postMessage({cmd: 'update', arr: arr, lastColor: lastColor, currentColor: k, arrayAccesses: arrayAccesses, comparisons: comparisons})
        lastColor = k
        /* postMessage({cmd: 'color', lastColor: lastColor2, currentColor: left + i})
        lastColor2 = left + i
        postMessage({cmd: 'color', lastColor: lastColor3, currentColor: middle + 1 + j})
        lastColor3 = middle + 1 + j */
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
        k++
    }
    while(i < n1){
        arrayAccesses++
        postMessage({cmd: 'color', lastColor: lastColor2, currentColor: k})
        lastColor2 = k
        arr[k] = L[i]
        i++
        k++
    }
    while(j < n2){
        arrayAccesses++
        postMessage({cmd: 'color', lastColor: lastColor2, currentColor: k})
        lastColor2 = k
        arr[k] = R[j]
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
  }
}
