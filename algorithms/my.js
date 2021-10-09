let array = []
let arrayAccesses = 0
let comparisons = 0
onmessage = (e) => {
    array = e.data
    let lastSorted = 0
    let lastColor = 0
    let lastColor2 = 0
    function bringToFront(index){
        arrayAccesses++
        let value = array[index]
        for(let i = index; i > 0; i--){
            arrayAccesses++
            array[i] = array[i - 1]
        }
        array[0] = value
        lastSorted++
    }
    arrayAccesses++
    while(array.length > lastSorted){
        arrayAccesses++
        let less = {value: array[lastSorted], index: lastSorted}
        arrayAccesses++
        for(let i = lastSorted; i < array.length; i++) {
            arrayAccesses++
            comparisons++
            if(array[i] > less.value){
                arrayAccesses++
                less.value = array[i]
                less.index = i
                postMessage({cmd: 'color', lastColor: lastColor, currentColor: i})
                lastColor = i
            }
        }
        bringToFront(less.index)
        postMessage({cmd: 'update', arr: array, lastColor: lastColor2, currentColor: lastSorted - 1,arrayAccesses: arrayAccesses, comparisons: comparisons})
        lastColor2 = lastSorted - 1
    }
    postMessage({cmd: 'finished', arr: array})
}