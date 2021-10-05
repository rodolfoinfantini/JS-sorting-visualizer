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
    lastSorted = 0
    comparisons = 0
    arrayAccesses = 0
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

async function myOwn(){
    let lastSorted = 0
    
    async function bringToFront(index){
        await sleep(delay)
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
                clearColors()
                setColor(i,'red')
            }
            comparisons++
            arrayAccesses++
        }
        await bringToFront(less.index)
        updateBars()
        clearColors()
        setColor(less.index,'red')
        arrayAccesses++
    }
    finished()
}

async function bubble(){
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
        clearColors()
        setColor((array.length - 1 - loopI),'red')
        updateBars()
        await sleep(delay)
    }
    finished()
}


async function insertion(){
    arrayAccesses++
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
                    updateBars()
                    clearColors()
                    setColor(innerI,'red')
                }
            }
        }
        updateBars()
        await sleep(delay)
    }
    finished()
}

async function bogo(){
    while(!isSorted()){
        arrayAccesses++
        comparisons++
        for(let i = array.length - 1; i > 0; i--){
            arrayAccesses++
            noSleepSwap(array, i, Math.floor(Math.random() * (i + 1)))
        }
        updateBars()
        await sleep(delay)
    }
    finished()
}

function js(){
    arrayAccesses++
    comparisons++
    array = array.sort((a,b) => {return a > b})
    finished()
}

function quick(){
    async function quickSort(arr,start,end){
        if(start >= end){
            updateBars()
            if(isSorted()) finished()
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
        arrayAccesses++
        let pivotValue = arr[end]
        let pivotIndex = start
        for(let i = start; i < end; i++){
            arrayAccesses++
            comparisons++
            if(arr[i] < pivotValue){
                arrayAccesses++
                await swap(arr,i,pivotIndex)
                updateBars()
                clearColors()
                setColor(i,'red')
                pivotIndex++
            }
        }
        arrayAccesses++
        await swap(arr,pivotIndex,end)
        return pivotIndex
    }
    quickSort(array,0,array.length - 1)
}

async function oddeven(){
    let isSorted = false
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
                clearColors()
                setColor(i + 1,'red')
            }
        }
        await sleep(0)
        arrayAccesses++
        for(let i = 0; i < array.length; i = i + 2){
            comparisons++
            arrayAccesses++
            if(array[i] > array[i + 1]){
                arrayAccesses++
                noSleepSwap(array,i,i+1)
                isSorted = false
                clearColors()
                setColor(i,'red')
            }
        }
        updateBars()
        await sleep(delay)
    }
    finished()
}

async function cocktail(){
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
                noSleepSwap(array, i, i + 1)
                arrayAccesses++
                clearColors()
                setColor(i + 1,'red')
            }
        }
        await sleep(0)
        arrayAccesses++
        for(backI = array.length - 1 - loopI; backI >= loopI; backI--){
            arrayAccesses++
            comparisons++
            if(array[backI] < array[backI - 1]){
                noSleepSwap(array, backI, backI - 1)
                arrayAccesses++
                clearColors()
                setColor(backI - 1,'red')
            }
        }
        updateBars()       
        if(isSorted(array)) break
        await sleep(delay)
    }
    finished()
}

async function comb(){
    let gap = array.length
    let swapped = true

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
            clearColors()
            setColor(i,'red')
        }
        updateBars()
        await sleep(delay)
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
        i = i + sum
        if(i > bars.length) {
            clearInterval(finishAnim)
            clearColorsGreen()
        }
    }
    finishAnim = setInterval(loop,0)
}

function makeGraph(){
    bars = []
    const highest = getHighestValue(array)
    for(let i = 0; i < array.length; i++){
        const newBar = document.createElement('progress')
        newBar.value = array[i]
        newBar.min = 0
        newBar.style = `width: ${barHeight}px`
        newBar.max = highest
        graph.appendChild(newBar)
        bars.push(newBar)
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

// ANCHOR CLEAR COLORS

function clearColors(){
    const redBars = document.querySelectorAll('.red')
    for(let i = 0; i < redBars.length; i++) redBars[i].className = ''
}
function clearColorsGreen(){
    const greenBars = document.querySelectorAll('.green')
    for(let i = 0; i < greenBars.length; i++) greenBars[i].className = ''
}

function setColor(i,color){
    bars[i].className = color
}

async function swap(arr, i1, i2){
    await sleep(delay)
    const temp = arr[i1]
    arr[i1] = arr[i2]
    arr[i2] = temp
}
function noSleepSwap(arr, i1, i2){
    const temp = arr[i1]
    arr[i1] = arr[i2]
    arr[i2] = temp
}

makeGraph()

function randomArray(){
    if(finishAnim) clearInterval(finishAnim)
    array = []
    for(let i = 0; i < arraySize; i++) array.push(Math.floor(Math.random() * maxSize))
    graph.innerHTML = ''
    bars = []
    makeGraph()
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

randomArray()
