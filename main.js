const sortWorker = new Worker('algorithms/main.js')
sortWorker.onmessage = (e) => {
    if(e.data.cmd === 'update'){
        array = e.data.arr
        updateBars()
        if(e.data.arrayAccesses != undefined) arrayAccesses = e.data.arrayAccesses
        if(e.data.comparisons != undefined) comparisons = e.data.comparisons
        if(e.data.lastColor != undefined) clearColorForIndex(Math.min(e.data.lastColor,array.length - 1))
        if(e.data.currentColor != undefined) setColor(Math.min(e.data.currentColor,array.length - 1),'red')
    }else if(e.data.cmd === 'finished'){
        array = e.data.arr
        if(e.data.animations == undefined){
            finished()
            return
        }
    }else if(e.data.cmd === 'color'){
        if(e.data.lastColor != undefined) clearColorForIndex(Math.min(e.data.lastColor,array.length - 1))
        if(e.data.currentColor != undefined) setColor(Math.min(e.data.currentColor,array.length - 1),'red')
    }else if(e.data.cmd === 'sound'){
        // console.log(e.data.value)
        playSound(e.data.value,e.data.osc == 1 ? osc : osc2)
    }
    else{
        console.log('Something is wrong!')
    }
}

const graph = document.querySelector('div.graph')
const comparisonsH1 = document.querySelector('h1.comparisons')
const accessesH1 = document.querySelector('h1.accesses')
const inputSize = document.querySelector('input[name="arraysize"]')
const inputMax = document.querySelector('input[name="maxvalue"]')
const inputBarh = document.querySelector('input[name="barh"]')
// const inputDelay = document.querySelector('input[name="delay"]')
const newArrayBtn = document.querySelector('button.newarray')
const reversedArrayBtn = document.querySelector('button.reversedarray')
const startBtn = document.querySelector('button.start')
const type = document.querySelector('select[name="type"]')
const mode = document.querySelector('select[name="mode"]')
const inputSound = document.querySelector('input[name="sound"]')
const inputVolume = document.querySelector('input[name="volume"]')
// const inputVisualization = document.querySelector('input[name="visu"]')
// const inputSound = document.querySelector('input[name="sound"]')


const audioCtx = new AudioContext()
const gain = audioCtx.createGain()
const convolver = audioCtx.createConvolver()
convolver.buffer = impulse(0.1,10)
let osc = audioCtx.createOscillator()
let osc2 = audioCtx.createOscillator()
// osc.connect(convolver)
// convolver.connect(audioCtx.destination)
osc.connect(gain)
osc2.connect(gain)
gain.connect(audioCtx.destination)

if(localStorage.getItem('settings') != null){
    inputVolume.value = JSON.parse(localStorage.getItem('settings')).volume
}

let volume = inputVolume.value
gain.gain.value = volume / 100
inputVolume.oninput = () => {
    volume = inputVolume.value
    localStorage.setItem('settings',JSON.stringify({volume: volume}))
    gain.gain.value = volume / 100
}

let defaultF = 700
let f = inputSound.checked ? defaultF : 0
let minF = 120
let maxF = 1212
// let minF = 400
// let maxF = 900
osc.frequency.value = f
osc2.frequency.value = f


function impulse(duration,decay,reverse){
    let sampleRate = audioCtx.sampleRate
    let length = sampleRate * duration
    let impulse = audioCtx.createBuffer(2,length,sampleRate)
    let impulseL = impulse.getChannelData(0)
    let impulseR = impulse.getChannelData(1)
    if(!decay) decay = 2.0
    for(let i = 0; i < length; i++){
        let n = reverse ? length - i : i
        impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay)
        impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay)
    }
    return impulse
}

function playSound(value,oscillator){
    try{
        oscillator.frequency.value = Math.abs(((maxF-minF) * ((value - lowestValue)/(highestValue - lowestValue))) + minF)
    }catch(e){
        
    }
    // osc.frequency.value = Math.abs(f * ((value / (highestValue-lowestValue) * 1.7) + 0.2))
    // if(inputSound.checked) osc.frequency.value = f * (Math.pow(2, ((value / (highestValue-lowestValue) * 1.7)+0.2)))
    // if(inputSound.checked) osc.frequency.value = f * (Math.pow(2, ((value / (highestValue-lowestValue) * 1.5)+0.2))/10)
}

function stopSound(oscillator){
    oscillator.frequency.value = 0
}

function stopAllSounds(){
    try{
        osc.stop()
        osc = audioCtx.createOscillator()
        osc.connect(gain)
        osc2.stop()
        osc2 = audioCtx.createOscillator()
        osc2.connect(gain)
        gain.connect(audioCtx.destination)
    }catch(e){

    }
}

inputSound.onchange = () => {
    f = inputSound.checked ? defaultF : 0
    if(!inputSound.checked && isRunning) {
        stopAllSounds()
    }else if(inputSound.checked && isRunning) {
        osc.start()
        osc2.start()
    }
}

let isRunning = false


let highestValue
let lowestValue

document.body.className = mode.value
mode.onchange = () => {
    document.body.className = mode.value
    updateBars()
}

let bars = []

let array = []

let colors = []

let comparisons = 0
let arrayAccesses = 0


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
        graph.style = `width: ${barHeight}px`
    }
}

newArrayBtn.onclick = randomArray
reversedArrayBtn.onclick = reversedArray
startBtn.onclick = startSorting


let startingTime
let endingTime


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


function startSorting(){
    if(isRunning) return
    if(inputSound.checked) osc.start()
    if(inputSound.checked) osc2.start()
    isRunning = true
    if(finishAnim) clearInterval(finishAnim)
    startingTime = new Date()
    console.log(`------ ${type.value} ------`)
    console.log(`Started: ${startingTime.getHours()}:${startingTime.getMinutes()}:${startingTime.getSeconds()}`)
    comparisons = 0
    arrayAccesses = 0
    updateBars()
    sortWorker.postMessage({method: type.value, arr: array})
}

let finishAnim

function finished(){
    isRunning = false
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
    let lastColors = []
    const redBarSize = 2
    stopSound(osc2)
    function loop(){
        for(let j = 0; j < sum; j++){
            lastColors = []
            for(let k = 0; k < redBarSize; k++){
                if(lastColors[k] != undefined) clearColorForIndex(k)
                if(!!bars[i + j + k]) {
                    if(mode.value === 'colors') bars[i + j + k].value = highestValue
                    setColor(i + j + k,'red')
                    lastColors.push(i + j + k)
                }
            }
            if(!!bars[i + j - redBarSize]){
                setColor(i + j - redBarSize,'green')
                playSound(array[i + j - redBarSize],osc)
            }
        }
        i = i + sum
        if(i > bars.length) {
            clearInterval(finishAnim)
            clearColorsGreen()
            stopAllSounds()
        }
    }
    finishAnim = setInterval(loop,0)
}

function makeGraph(){
    bars = []
    for(let i = 0; i < array.length; i++){
        const newBar = document.createElement('progress')
        newBar.value = array[i]
        newBar.min = 0
        newBar.max = highestValue
        graph.appendChild(newBar)
        bars.push(newBar)
    }
    if(bars.length > 400 && bars.length <= 610) graph.className = 'graph small'
    else if(bars.length > 610) graph.className = 'graph smallest'
    else graph.className = 'graph'
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
    for(let i = 0; i < array.length; i++){
        bars[i].value = array[i]
        if(mode.value == 'colors') bars[i].style.background = `hsl(${getHueFromIndex(bars[i].value)} 100% 50%)`
        else bars[i].style.background = `transparent`
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
    bars[i].className = color
}


function randomArray(){
    if(isRunning) return
    stopAllSounds()
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
    if(isRunning) return
    stopAllSounds()
    if(finishAnim) clearInterval(finishAnim)
    array = []
    for(let i = arraySize - 1; i >= 0; i--) array.push(i)
    graph.innerHTML = ''
    bars = []
    highestValue = getHighestValue(array)
    lowestValue = getLowestValue(array)
    makeGraph()
}

randomArray()

function getHueFromIndex(i){
    return 359 * (i / highestValue)
}