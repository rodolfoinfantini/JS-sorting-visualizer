let array = []
let arrayAccesses = 0
let comparisons = 0
onmessage = (e) => {
    array = e.data
    let lastColor = 0
    let lastBackColor = 0
    arrayAccesses++
    for(let loopI = 0; loopI < array.length; loopI++){
        let i = 0
        arrayAccesses++
        let backI = array.length - 1 - loopI
        arrayAccesses++
        for(i = 0; i < array.length - loopI; i++){
            arrayAccesses++
            comparisons++
            if(array[i] > array[i + 1]){
                arrayAccesses++
                swap(array, i, i + 1)
                postMessage({cmd: 'update', arr: array, lastColor: lastColor, currentColor: i + 1, arrayAccesses: arrayAccesses, comparisons: comparisons})
                lastColor = i + 1
            }
        }
        postMessage({cmd: 'update', arr: array, lastColor: lastColor})
        // if(visualization) await sleep(0)
        arrayAccesses++
        for(backI = array.length - 1 - loopI; backI >= loopI; backI--){
            arrayAccesses++
            comparisons++
            if(array[backI] < array[backI - 1]){
                swap(array, backI, backI - 1)
                arrayAccesses++
                postMessage({cmd: 'update', arr: array, lastColor: lastBackColor, currentColor: backI - 1, arrayAccesses: arrayAccesses, comparisons: comparisons})
                lastBackColor = backI - 1
            }
        }
        postMessage({cmd: 'update', arr: array, lastColor: lastBackColor, arrayAccesses: arrayAccesses, comparisons: comparisons})
        // updateBars()
        // if(isSorted(array)) break
    }
    // finished()
    postMessage({cmd: 'finished', arr: array})
}
function swap(arr, i1, i2){
    const temp = arr[i1]
    arr[i1] = arr[i2]
    arr[i2] = temp
}