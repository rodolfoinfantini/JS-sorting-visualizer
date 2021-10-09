const subWorkers = {
    my: new Worker('my.js'),
    bubble: new Worker('bubble.js'),
    insertion: new Worker('insertion.js'),
    bogo: new Worker('bogo.js'),
    js: new Worker('js.js'),
    quick: new Worker('quick.js'),
    oddeven: new Worker('oddeven.js'),
    cocktail: new Worker('cocktail.js'),
    comb: new Worker('comb.js'),
    merge: new Worker('merge.js'),
}

for(const [key, value] of Object.entries(subWorkers)){
    value.onmessage = (e) => {
        postMessage(e.data)
    }
}

onmessage = (e) => {
    subWorkers[e.data.method].postMessage(e.data.arr)
}