const graph = document.querySelector('div.graph')
const comparisonsH1 = document.querySelector('h1.comparisons')
const accessesH1 = document.querySelector('h1.accesses')
const inputSize = document.querySelector('input[name="arraysize"]')
const inputMax = document.querySelector('input[name="maxvalue"]')
const inputBarh = document.querySelector('input[name="barh"]')
const inputDelay = document.querySelector('input[name="delay"]')
const newArrayBtn = document.querySelector('button.newarray')
const reversedArrayBtn = document.querySelector('button.reversedarray')
const startBtn = document.querySelector('button.start')
const type = document.querySelector('select[name="type"]')
const mode = document.querySelector('select[name="mode"]')
const inputVisualization = document.querySelector('input[name="visu"]')
const inputSound = document.querySelector('input[name="sound"]')

let highestValue
let lowestValue

// let sound = inputSound.checked
let sound = true
// inputSound.onchange = () => {
//     sound = inputSound.checked
// }
let visualization = inputVisualization.checked
inputVisualization.onchange = () => {
    visualization = inputVisualization.checked
}

mode.onchange = () => {
    document.body.className = mode.value
    updateBars()
}

let bars = []

let array = []

let colors = []

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
reversedArrayBtn.onclick = reversedArray
startBtn.onclick = startSorting


let startingTime
let endingTime


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


function startSorting(){
    if(finishAnim) clearInterval(finishAnim)
    startingTime = new Date()
    console.log(`------ ${type.value} ------`)
    console.log(`Started: ${startingTime.getHours()}:${startingTime.getMinutes()}:${startingTime.getSeconds()}`)
    comparisons = 0
    arrayAccesses = 0
    updateBars()
    if(type.value == "my") myOwn()
    else if(type.value == "bubble") bubble()
    else if(type.value == "insertion") insertion()
    else if(type.value == "bogo") bogo()
    else if(type.value == "js") js()
    else if(type.value == "quick") quick()
    else if(type.value == "oddeven") oddeven()
    else if(type.value == "cocktail") cocktail()
    else if(type.value == "comb") comb()
}

async function myOwn(){ // ANCHOR MY OWN
    let lastSorted = 0
    let lastColor = 0
    async function bringToFront(index){
        if(visualization) await sleep(delay)
        let value = array[index]
        for(let i = index; i > 0; i--){
            arrayAccesses++
            array[i] = array[i - 1]
        }
        array[0] = value
        lastSorted++
        arrayAccesses++
    }
    while(array.length > lastSorted){
        let less = {value: array[lastSorted], index: lastSorted}
        for(let i = lastSorted; i < array.length; i++) {
            if(array[i] > less.value){
                less.value = array[i]
                less.index = i
                arrayAccesses++
                clearColorForIndex(lastColor)
                setColor(i,'red')
                lastColor = i
            }
            comparisons++
            arrayAccesses++
        }
        await bringToFront(less.index)
        updateBars()
        arrayAccesses++
    }
    finished()
}

async function bubble(){ // ANCHOR BUBBLE
    let lastColor = 0
    arrayAccesses++
    for(let loopI = 0; loopI < array.length; loopI++){
        arrayAccesses++
        for(let i = 0; i < array.length - loopI; i++){
            comparisons++
            arrayAccesses++
            if(array[i] > array[i + 1]){
                arrayAccesses++
                noSleepSwap(array, i, i + 1)
                arrayAccesses++
            }
        }
        clearColorForIndex(lastColor)
        setColor((array.length - 1 - loopI),'red')
        lastColor = (array.length - 1 - loopI)
        updateBars()
        if(visualization) await sleep(delay)
    }
    finished()
}


async function insertion(){ // ANCHOR INSERTION
    arrayAccesses++
    let lastColor = 0
    for(let i = 1; i < array.length; i++){
        arrayAccesses++
        comparisons++
        if(array[i] <= array[i - 1]){
            arrayAccesses++
            noSleepSwap(array, i, i - 1)
            arrayAccesses++
            for(let innerI = i - 1; innerI > 0; innerI--){
                comparisons++
                arrayAccesses++
                if(array[innerI] < array[innerI - 1]){
                    arrayAccesses++
                    noSleepSwap(array, innerI, innerI - 1)
                    // updateBars()
                    clearColorForIndex(lastColor)
                    setColor(innerI,'red')
                    lastColor = innerI
                }
            }
        }
        updateBars()
        if(visualization) await sleep(delay)
    }
    finished()
}

async function bogo(){ // ANCHOR BOGO
    while(!isSorted()){
        arrayAccesses++
        comparisons++
        for(let i = array.length - 1; i > 0; i--){
            arrayAccesses++
            noSleepSwap(array, i, Math.floor(Math.random() * (i + 1)))
        }
        updateBars()
        if(visualization) await sleep(delay)
    }
    finished()
}

function js(){ // ANCHOR JS
    arrayAccesses++
    comparisons++
    array = array.sort((a,b) => {return a > b})
    finished()
}

function quick(){ // ANCHOR QUICK
    let finishedSort = false
    async function quickSort(arr,start,end){
        if(start >= end){
            updateBars()
            if(isSorted() && !finishedSort) {
                finishedSort = true
                finished()
            }
            return
        }
        arrayAccesses++
        arrayAccesses++
        arrayAccesses++
        let index = await quickPartition(arr,start,end)
        await Promise.all([
            quickSort(arr,start,index - 1),
            quickSort(arr,index + 1,end)
        ])
    }
    async function quickPartition(arr,start,end){
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
                await swap(arr,i,pivotIndex)
                updateBars()
                clearColorForIndex(lastColor)
                setColor(i,'red')
                lastColor = i
                pivotIndex++
                // console.log(pivotValue)
            }
        }
        clearColorForIndex(lastColor)
        arrayAccesses++
        // noSleepSwap(arr,pivotIndex,arr.indexOf(Math.floor((end - start) / 2)))
        noSleepSwap(arr,pivotIndex,end)
        return pivotIndex
    }
    quickSort(array,0,array.length - 1)
}

async function oddeven(){ // ANCHOR ODD EVEN
    let isSorted = false
    let lastOddColor = 0
    let lastEvenColor = 0
    while(!isSorted){
        isSorted = true
        arrayAccesses++
        for(let i = 1; i < array.length; i = i + 2){
            comparisons++
            arrayAccesses++
            if(array[i] > array[i + 1]){
                arrayAccesses++
                noSleepSwap(array,i,i+1)
                isSorted = false
                clearColorForIndex(lastOddColor)
                setColor(i + 1,'red')
                lastOddColor = i + 1
            }
        }
        arrayAccesses++
        for(let i = 0; i < array.length; i = i + 2){
            comparisons++
            arrayAccesses++
            if(array[i] > array[i + 1]){
                arrayAccesses++
                noSleepSwap(array,i,i+1)
                isSorted = false
                clearColorForIndex(lastEvenColor)
                setColor(i,'red')
                lastEvenColor = i
            }
        }
        updateBars()
        if(visualization) await sleep(delay)
    }
    finished()
}

async function cocktail(){ // ANCHOR COCKTAIL
    arrayAccesses++
    let lastColor = 0
    let lastBackColor = 0
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
                noSleepSwap(array, i, i + 1)
                arrayAccesses++
                clearColorForIndex(lastColor)
                setColor(i + 1,'red')
                lastColor = i + 1
            }
        }
        if(visualization) await sleep(0)
        arrayAccesses++
        for(backI = array.length - 1 - loopI; backI >= loopI; backI--){
            arrayAccesses++
            comparisons++
            if(array[backI] < array[backI - 1]){
                noSleepSwap(array, backI, backI - 1)
                arrayAccesses++
                clearColorForIndex(lastBackColor)
                setColor(backI - 1,'red')
                lastBackColor = backI - 1
            }
        }
        updateBars()       
        if(isSorted(array)) break
        if(visualization) await sleep(delay)
    }
    finished()
}

async function comb(){ // ANCHOR COMB
    let gap = array.length
    let swapped = true
    let lastColor = 0

    while(gap > 1 || swapped){
        gap = Math.max(Math.floor(gap / 1.3),1)
        swapped = false
        arrayAccesses++
        for(let i = 0; i < array.length - gap; i++){
            arrayAccesses++
            comparisons++
            if(array[i] > array[i + gap]){
                arrayAccesses++
                noSleepSwap(array,i,i + gap)
                swapped = true
            }
            clearColorForIndex(lastColor)
            setColor(i,'red')
            lastColor = i
        }
        updateBars()
        if(visualization) await sleep(delay)
    }
    finished()
}

let finishAnim

function finished(){
    if(finishAnim) clearInterval(finishAnim)
    updateBars()
    if(!isSorted(array)){
        console.log("Not sorted!")
        return
    }
    endingTime = new Date()
    console.log(`Finished: ${endingTime.getHours()}:${endingTime.getMinutes()}:${endingTime.getSeconds()}`)
    let correctTime = new Date(null)
    correctTime.setSeconds((endingTime - startingTime) / 1000)
    console.log(`Elapsed: ${correctTime.toISOString().substr(11, 8)}`)
    console.log('-----------------')

    clearColors()

    let i = 0
    let sum = 5
    function loop(){
        for(let j = 0; j < sum; j++){
            if(!!bars[i + j]) setColor(i + j,'green')
        }
        playSoundByIndex(i)
        i = i + sum
        if(i > bars.length) {
            clearInterval(finishAnim)
            clearColorsGreen()
        }
    }
    if(mode.value == 'bars') finishAnim = setInterval(loop,0)
}

function makeGraph(){
    bars = []
    for(let i = 0; i < array.length; i++){
        const newBar = document.createElement('progress')
        newBar.value = array[i]
        newBar.min = 0
        newBar.style = `width: ${barHeight}px`
        newBar.max = highestValue
        graph.appendChild(newBar)
        bars.push(newBar)
    }
    document.body.className = mode.value
    updateBars()
}

function getHighestValue(arr){
    let highest = arr[0]
    for(let i = 1; i < arr.length; i++) if(arr[i] > highest) highest = arr[i]
    return highest
}
function getLowestValue(arr){
    let lowest = arr[0]
    for(let i = 1; i < arr.length; i++) if(arr[i] < lowest) lowest = arr[i]
    return lowest
}



function updateBars(){
    for(let i =0; i < array.length; i++){
        bars[i].value = array[i]
        if(mode.value == 'colors') bars[i].style = `background-color: hsl(${getHueFromIndex(bars[i].value)} 100% 50%)`
        else bars[i].style = ''
    } 
    accessesH1.innerText = arrayAccesses
    comparisonsH1.innerText = comparisons
}

// ANCHOR CLEAR COLORS

function clearColors(){
    const redBars = document.querySelectorAll('.red')
    for(let i = 0; i < redBars.length; i++) redBars[i].className = ''
}
function clearColorForIndex(i){
    bars[i].className = ''
}
function clearColorsGreen(){
    const greenBars = document.querySelectorAll('.green')
    for(let i = 0; i < greenBars.length; i++) greenBars[i].className = ''
}

function setColor(i,color){
    if(mode.value == 'bars') bars[i].className = color
}

async function swap(arr, i1, i2){
    if(visualization) await sleep(delay)
    const temp = arr[i1]
    arr[i1] = arr[i2]
    arr[i2] = temp
}
function noSleepSwap(arr, i1, i2){
    const temp = arr[i1]
    arr[i1] = arr[i2]
    arr[i2] = temp
}

function randomArray(){
    if(finishAnim) clearInterval(finishAnim)
    array = []
    for(let i = 0; i < arraySize; i++) array.push(Math.floor(Math.random() * maxSize))
    graph.innerHTML = ''
    bars = []
    highestValue = getHighestValue(array)
    lowestValue = getLowestValue(array)
    makeGraph()
}
function reversedArray(){
    if(finishAnim) clearInterval(finishAnim)
    array = []
    for(let i = arraySize - 1; i >= 0; i--) array.push(i)
    graph.innerHTML = ''
    bars = []
    highestValue = getHighestValue(array)
    lowestValue = getLowestValue(array)
    makeGraph()
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

randomArray()

const audio = new(window.AudioContext || window.webkitAudioContext)()
async function playSound(f){
    const oscillator = audio.createOscillator()
    oscillator.type = 'square'
    oscillator.frequency.value = f
    oscillator.connect(audio.destination)
    oscillator.start()
    await sleep(0)
    oscillator.stop()
}

const fRange = {from: 300, to: 1000}

function playSoundByIndex(i){
    //if(sound) playSound((fRange.to - fRange.from) * ((i - lowestValue) / (getHighestValue(array) - lowestValue)) + fRange.from)
}

function getHueFromIndex(i){
    return 255 * (i / highestValue)
}