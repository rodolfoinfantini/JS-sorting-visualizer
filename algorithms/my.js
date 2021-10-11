let arrayAccesses = 0
let comparisons = 0
onmessage = (e) => {
    let array = e.data
    let lastSorted = 0
    let lastColor = 0
    let lastColor2 = 0
    arrayAccesses = 0
    comparisons = 0
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
            postMessage({cmd: 'sound', value: array[i], osc: 1})
            postMessage({cmd: 'sound', value: less.value, osc: 2})

            postMessage({cmd: 'color', lastColor: lastColor, currentColor: i})
            lastColor = i

            postMessage({cmd: 'color', lastColor: lastColor2, currentColor: less.index})
            lastColor2 = less.index

            if(array[i] > less.value){
                arrayAccesses++
                less.value = array[i]
                less.index = i
            }
        }
        bringToFront(less.index)
        postMessage({cmd: 'update', arr: array, arrayAccesses: arrayAccesses, comparisons: comparisons})
    }
    postMessage({cmd: 'finished', arr: array})
}