let arrayAccesses = 0
let comparisons = 0
onmessage = (e) => {
    let array = e.data
    let lastColor = 0
    let lastColor2 = 0
    let lastBackColor = 0
    let lastBackColor2 = 0
    arrayAccesses++
    for(let loopI = 0; loopI < array.length; loopI++){
        let i = 0
        arrayAccesses++
        let backI = array.length - 1 - loopI
        arrayAccesses++
        for(i = 0; i < array.length - loopI; i++){
            arrayAccesses++
            comparisons++
            postMessage({cmd: 'sound', value: array[i], osc: 1})
            postMessage({cmd: 'sound', value: array[i+1], osc: 2})

            
            if(array[i] > array[i + 1]){
                postMessage({cmd: 'color', lastColor: lastColor, currentColor: i})
                lastColor = i
                postMessage({cmd: 'color', lastColor: lastColor2, currentColor: i + 1})
                lastColor2 = i + 1
                arrayAccesses++
                swap(array, i, i + 1)
            }
        }
        postMessage({cmd: 'color', lastColor: lastColor})
        postMessage({cmd: 'color', lastColor: lastColor2})
        arrayAccesses++
        for(backI = array.length - 1 - loopI; backI >= loopI; backI--){
            arrayAccesses++
            comparisons++
            postMessage({cmd: 'sound', value: array[backI], osc: 1})
            postMessage({cmd: 'sound', value: array[backI-1], osc: 2})
            if(array[backI] < array[backI - 1]){
                postMessage({cmd: 'color', lastColor: lastBackColor, current: backI})
                lastBackColor = backI
                postMessage({cmd: 'color', lastColor: lastBackColor2, current: backI - 1})
                lastBackColor2 = backI - 1
                swap(array, backI, backI - 1)
                arrayAccesses++
            }
        }
        postMessage({cmd: 'color', lastColor: lastBackColor})
        postMessage({cmd: 'color', lastColor: lastBackColor2})
        postMessage({cmd: 'update', arr: array, arrayAccesses: arrayAccesses, comparisons: comparisons})
        if(isSorted(array)) break
    }
    postMessage({cmd: 'finished', arr: array})










    /* const animations = []
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
            animations.push([i,i])
            animations.push([i,i])
            arrayAccesses++
            comparisons++
            if(array[i] > array[i + 1]){
                arrayAccesses++
                animations.push([i,array[i + 1]])
                animations.push([i,i])
                animations.push([i,i])
                animations.push([i + 1,array[i]])
                swap(array, i, i + 1)
                // postMessage({cmd: 'update', arr: array, lastColor: lastColor, currentColor: i + 1, arrayAccesses: arrayAccesses, comparisons: comparisons})
                lastColor = i + 1
            }else{
                animations.push([])
            }
        }
        // postMessage({cmd: 'update', arr: array, lastColor: lastColor})
        // if(visualization) await sleep(0)
        arrayAccesses++
        for(backI = array.length - 1 - loopI; backI >= loopI; backI--){
            animations.push([backI,backI])
            animations.push([backI,backI])
            arrayAccesses++
            comparisons++
            if(array[backI] < array[backI - 1]){
                animations.push([backI,array[backI - 1]])
                animations.push([backI,backI])
                animations.push([backI,backI])
                animations.push([backI - 1,array[backI]])
                swap(array, backI, backI - 1)
                arrayAccesses++
                // postMessage({cmd: 'update', arr: array, lastColor: lastBackColor, currentColor: backI - 1, arrayAccesses: arrayAccesses, comparisons: comparisons})
                lastBackColor = backI - 1
            }else{
                animations.push([])
            }
        }
        // postMessage({cmd: 'update', arr: array, lastColor: lastBackColor, arrayAccesses: arrayAccesses, comparisons: comparisons})
        // updateBars()
        if(isSorted(array)) break
    }
    // finished()
    postMessage({cmd: 'finished', arr: array, animations: animations, arrayAccesses: arrayAccesses, comparisons: comparisons}) */
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