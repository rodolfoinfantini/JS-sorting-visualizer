const graph = document.querySelector('div.graph')
const comparisonsH1 = document.querySelector('h1.comparisons')
const accessesH1 = document.querySelector('h1.accesses')
const inputSize = document.querySelector('input[name="arraysize"]')
const inputMax = document.querySelector('input[name="maxvalue"]')
const inputBarh = document.querySelector('input[name="barh"]')
const inputDelay = document.querySelector('input[name="delay"]')
const newArrayBtn = document.querySelector('button.newarray')
const startBtn = document.querySelector('button.start')
let bars = []

let array = []

let lastSorted = 0

let comparisons = 0
let arrayAccesses = 0

let delay = parseInt(inputDelay.value)

inputDelay.oninput = () => {
    if(!isNaN(inputDelay.value)) delay = parseInt(inputDelay.value)
}

let arraySize = parseInt(inputSize.value)

let maxSize = parseInt(inputMax.value)

inputMax.oninput = () => {
    if(!isNaN(inputMax.value)) maxSize = parseInt(inputMax.value)
}

inputSize.oninput = () => {
    if(!isNaN(inputSize.value)) arraySize = inputSize.value
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

newArrayBtn.onclick = () => {
    randomArray(arraySize)
}

startBtn.onclick = () => {
    startSorting()
}

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

function startSorting(){
    lastSorted = 0
    comparisons = 0
    arrayAccesses = 0
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
        setToGreen(lastSorted - 1)
        arrayAccesses++
        if(array.length > lastSorted) setTimeout(loop,delay)
        else finished()
    }
    loop()
}


function finished(){
    console.log(array)
    console.log(comparisons)
    console.log(arrayAccesses)
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
    /* for(let i = bars.length - 1; i >= 0; i--){
        bars[i].max = highest
        graph.appendChild(bars[i])
    } */
    for(let i = 0; i < bars.length; i++){
        bars[i].max = highest
        graph.appendChild(bars[i])
    }
}

function getHighestValue(arr){
    let highest = arr[0]
    for(let i = 1; i < arr.length; i++){
        if(arr[i] > highest) highest = arr[i]
    }
    return highest
}

function updateBars(){
    for(let i =0; i < array.length; i++){
        bars[i].value = array[i]
        arrayAccesses++
    }
    accessesH1.innerText = arrayAccesses
    comparisonsH1.innerText = comparisons
}

function clearColors(){
    bars.forEach(e => {
        e.className = ''
    })
}

function setToRed(index){
    bars[index].className = 'red'
}

function setToGreen(index){
    bars[index].className = 'green'
}

makeGraph()



function randomArray(size){
    array = []
    for(let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * maxSize))
    }
    graph.innerHTML = ''
    bars = []
    makeGraph()
}

randomArray(arraySize)