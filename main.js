const graph = document.querySelector('div.graph')
const comparisonsH1 = document.querySelector('h1.comparisons')
const accessesH1 = document.querySelector('h1.accesses')
const inputSize = document.querySelector('input[name="arraysize"]')
const inputMax = document.querySelector('input[name="maxvalue"]')
const inputBarh = document.querySelector('input[name="barh"]')
const inputDelay = document.querySelector('input[name="delay"]')
const newArrayBtn = document.querySelector('button.newarray')
const startBtn = document.querySelector('button.start')
const type = document.querySelector('select[name="type"]')

let bars = []

let array = []

let comparisons = 0
let arrayAccesses = 0

let delay = parseInt(inputDelay.value)
inputDelay.oninput = () => {
    if(!isNaN(inputDelay.value)) delay = parseInt(inputDelay.value)
}

let arraySize = parseInt(inputSize.value)
inputSize.oninput = () => {
    if(!isNaN(inputSize.value)) arraySize = inputSize.value
}

let maxSize = parseInt(inputMax.value)
inputMax.oninput = () => {
    if(!isNaN(inputMax.value)) maxSize = parseInt(inputMax.value)
}

let barHeight = parseInt(inputBarh.value)
graph.style = `width: ${barHeight}px`
inputBarh.oninput = () => {
    if(!isNaN(inputBarh.value)) {
        barHeight = parseInt(inputBarh.value)
        for(let i = 0; i < bars.length; i++){
            bars[i].style = `width: ${barHeight}px`
        }
        graph.style = `width: ${barHeight}px`
    }
}

newArrayBtn.onclick = randomArray
startBtn.onclick = startSorting


let startingTime
let endingTime
function startSorting(){
    startingTime = new Date()
    console.log(`------ ${type.value} ------`)
    console.log(`Started: ${startingTime.getHours()}:${startingTime.getMinutes()}:${startingTime.getSeconds()}`)
    lastSorted = 0
    comparisons = 0
    arrayAccesses = 0
    if(type.value == "my") myOwn()
    else if(type.value == "bubble") bubble()
    else if(type.value == "insertion") insertion()
    else if(type.value == "bogo") bogo()
    else if(type.value == "js") js()
    else if(type.value == "quick") quick()
    else if(type.value == "merge") merge()
}

function myOwn(){
    let lastSorted = 0
    
    function bringToFront(index){
        let value = array[index]
        for(let i = index; i > 0; i--){
            arrayAccesses++
            array[i] = array[i - 1]
        }
        array[0] = value
        lastSorted++
        arrayAccesses++
    }

    function loop(){
        let less = {value: array[lastSorted], index: lastSorted}
        for(let i = lastSorted; i < array.length; i++) {
            if(array[i] > less.value){
                less.value = array[i]
                less.index = i
                arrayAccesses++
            }
            comparisons++
            arrayAccesses++
        }
        bringToFront(less.index)
        updateBars()
        clearColors()
        setColor(less.index,'red')
        arrayAccesses++
        if(array.length > lastSorted) setTimeout(loop,delay)
        else finished()
    }
    loop()
}

function bubble(){
    let stop = true
    let loopI = 0
    function loop(){
        let i = 0
        loopI++
        function innerLoop(){
            comparisons++
            arrayAccesses++
            if(array[i] > array[i + 1]){
                array = swap(array, i, i + 1)
                arrayAccesses++
                stop = false
                updateBars()
            }
            i++
            clearColors()
            setColor(i,'red')
            if(i < array.length - loopI){
                setTimeout(innerLoop,delay)
            }else if(stop){
                finished()
                return
            }else{
                loop()
            }
        }
        if(loopI >= array.length){
            finished()
            return
        }
        innerLoop()
    }
    loop()
}


function insertion(){
    let i = 1
    function loop(){
        comparisons++
        arrayAccesses++
        if(array[i] <= array[i - 1]){
            array = swap(array, i, i - 1)
            arrayAccesses++
            updateBars()
            let innerI = i - 1
            if(i >= array.length){
                finished()
                return
            }
            i++
            function innerLoop(){
                comparisons++
                arrayAccesses++
                if(array[innerI] < array[innerI - 1]){
                    arrayAccesses++
                    array = swap(array, innerI, innerI - 1)
                    updateBars()
                    innerI--
                    clearColors()
                    setColor(innerI,'red')
                    if(innerI > 0) setTimeout(innerLoop,delay)
                    else loop()
                }else{
                    loop()
                }
            }
            innerLoop()
        }else{
            if(i >= array.length){
                finished()
                return
            }
            i++
            loop()
        }
    }
    loop()
}

function isSorted(){
    let notSorted = false
    for(let i = 0; i < array.length; i++){
        arrayAccesses++
        if(array[i] > array[i + 1]) {
            arrayAccesses++
            comparisons++
            notSorted = true
            break
        }
    }
    return !notSorted
}

function bogo(){
    function loop(){
        if(isSorted()) {
            finished()
            return
        }
        for(let i = array.length - 1; i > 0; i--){
            let random = Math.floor(Math.random() * (i + 1))
            array = swap(array, i, random)
        }
        updateBars()
        setTimeout(loop,delay)
    }
    loop()
}

function js(){
    array = array.sort((a,b) => {
        return a > b
    })
    updateBars()
    finished()
}

function quick(){
    let stop = false
    function loop(low, high){
        if(stop) return
        if(low < high){
            let p = partition(low,high)
            updateBars()
            clearColors()
            setColor(p,'red')
            setTimeout(() => {
                loop(low, p - 1)
                loop(p + 1, high)
            },delay)
        }else if(isSorted(array)){
            stop = true
            finished()
        }
    }
    function partition(low,high){
        const pivot = array[high]
        arrayAccesses++
        let i = low - 1
        for(let j = low; j < high; j++){
            comparisons++
            arrayAccesses++
            if(array[j] <= pivot){
                i++
                arrayAccesses++
                array = swap(array,i,j)
            }
        }
        arrayAccesses++
        array = swap(array,i + 1,high)
        return i + 1
    }
    loop(0, array.length - 1)
}

function merge(){
    function mergeSort(a){
        let arrayOne = []
        let arrayTwo = []
    }




    mergeSort(array)
}



function finished(){
    endingTime = new Date()
    console.log(`Finished: ${endingTime.getHours()}:${endingTime.getMinutes()}:${endingTime.getSeconds()}`)

    let correctTime = new Date(null)
    correctTime.setSeconds((endingTime - startingTime) / 1000)
    console.log(`Elapsed: ${correctTime.toISOString().substr(11, 8)}`)

    console.log(isSorted(array))
    console.log('------------')

    clearColors()

    let i = 0
    function loop(){
        setColor(i,'green')
        i++
        if(i < bars.length) setTimeout(loop, 0)
        else{
            clearColors()
        }
    }
    loop()
}

function makeGraph(){
    bars = []
    for(let i = 0; i < array.length; i++){
        const newBar = document.createElement('progress')
        newBar.value = array[i]
        newBar.min = 0
        newBar.style = `width: ${barHeight}px`
        bars.push(newBar)
    }
    const highest = getHighestValue(array)
    for(let i = 0; i < bars.length; i++){
        bars[i].max = highest
        graph.appendChild(bars[i])
    }
}

function getHighestValue(arr){
    let highest = arr[0]
    for(let i = 1; i < arr.length; i++) if(arr[i] > highest) highest = arr[i]
    return highest
}

function updateBars(){
    for(let i =0; i < array.length; i++) bars[i].value = array[i]
    accessesH1.innerText = arrayAccesses
    comparisonsH1.innerText = comparisons
}

function clearColors(){
    for(let i = 0; i < bars.length; i++) bars[i].className = ''
}

function setColor(i,color){
    bars[i].classList.add(color)
}

function swap(arr, i1, i2){
    const temp = arr[i1]
    arr[i1] = arr[i2]
    arr[i2] = temp
    return arr
}

makeGraph()

function randomArray(){
    array = []
    for(let i = 0; i < arraySize; i++) array.push(Math.floor(Math.random() * maxSize))
    graph.innerHTML = ''
    bars = []
    makeGraph()
}

randomArray()