let array = []
onmessage = (e) => {
    array = e.data
    array = array.sort((a,b) => {return a > b})
    postMessage({cmd: 'finished', arr: array})
}