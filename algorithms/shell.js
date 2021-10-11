let arrayAccesses = 0
let comparisons = 0

let lastColor = 0
let lastColor2 = 0
let lastColor3 = 0

onmessage = (e) => {
    arrayAccesses = 0
    comparisons = 0
    let array = e.data
    shellSort(array)
    postMessage({cmd: 'finished', arr: array, arrayAccesses: arrayAccesses, comparisons: comparisons})
}

function shellSort(arr) {
    let n = arr.length
    for(let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)){
        for(let i = gap; i < n; i++){
            let temp = arr[i]
            let j
            for(j = i; j >= gap && arr[j - gap] > temp; j -= gap){
                postMessage({cmd: 'sound', value: arr[j], osc: 1})
                postMessage({cmd: 'sound', value: arr[j - gap], osc: 2})
                arr[j] = arr[j - gap]
                postMessage({cmd: 'color', lastColor: lastColor, currentColor: j})
                lastColor = j
                postMessage({cmd: 'color', lastColor: lastColor2, currentColor: j - gap})
                lastColor2 = j - gap
            }
            arr[j] = temp
            postMessage({cmd: 'update', arr: arr, lastColor: lastColor3, currentColor: j})
            lastColor3 = j
        }
    }
}