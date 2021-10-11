let arrayAccesses = 0
let comparisons = 0

onmessage = (e) => {
    arrayAccesses = 0
    comparisons = 0
    let array = e.data
    radixSort(array, array.length)
    postMessage({cmd: 'finished', arr: array, arrayAccesses: arrayAccesses, comparisons: comparisons})
}

function radixSort(arr,n){
	let m = getMax(arr,n)
	for(let exp = 1; Math.floor(m / exp) > 0; exp *= 10){
		countSort(arr,n,exp)
	}
}

function countSort(arr,n,exp)
{
    let output = []
    let count = []
    for(let i = 0;i<10;i++)
        count[i] = 0

    for (let i = 0; i < n; i++){
        arrayAccesses++
        count[Math.floor(arr[i] / exp) % 10]++
    }
    for (let i = 1; i < 10; i++)
        count[i] += count[i - 1]
    for (let i = n - 1; i >= 0; i--) {
        arrayAccesses++
        arrayAccesses++
        output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i]
        arrayAccesses++
        count[Math.floor(arr[i] / exp) % 10]--
    }
    let lastColor = 0
    for (let i = 0; i < n; i++){
        postMessage({cmd: 'sound', value: arr[i], osc: 1})
        postMessage({cmd: 'sound', value: output[i], osc: 2})
        arrayAccesses++
        arr[i] = output[i]
        postMessage({cmd: 'update', arr:arr, lastColor: lastColor, currentColor: i, arrayAccesses: arrayAccesses, comparisons: comparisons})
        lastColor = i
    }
    postMessage({cmd: 'color', lastColor: lastColor})
}

function getMax(arr,n){
    arrayAccesses++
	let max = arr[0]
	for(let i = 0; i < n; i++){
        arrayAccesses++
        comparisons++
		if(arr[i] > max) max = arr[i]
	}
	return max
}