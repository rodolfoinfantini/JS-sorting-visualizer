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
    if(e.data.method == 'my'){
        subWorkers.my.postMessage(e.data.arr)
    }
    else if(e.data.method == 'bubble'){
        subWorkers.bubble.postMessage(e.data.arr)
    }
    else if(e.data.method == 'insertion'){
        subWorkers.insertion.postMessage(e.data.arr)
    }
    else if(e.data.method == 'bogo'){
        subWorkers.bogo.postMessage(e.data.arr)
    }
    else if(e.data.method == 'js'){
        subWorkers.js.postMessage(e.data.arr)
    }
    else if(e.data.method == 'quick'){
        subWorkers.quick.postMessage(e.data.arr)
    }
    else if(e.data.method == 'oddeven'){
        subWorkers.oddeven.postMessage(e.data.arr)
    }
    else if(e.data.method == 'cocktail'){
        subWorkers.cocktail.postMessage(e.data.arr)
    }
    else if(e.data.method == 'comb'){
        subWorkers.comb.postMessage(e.data.arr)
    }
    else if(e.data.method == 'merge'){
        subWorkers.merge.postMessage(e.data.arr)
    }
    else if(e.data.method == 'merge'){
        subWorkers.merge.postMessage(e.data.arr)
    }
}