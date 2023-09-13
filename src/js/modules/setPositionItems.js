export function setPositionItems(matrix, arr) {

    for(let y = 0; y < matrix.length; y++) {
        for(let x = 0; x < matrix[y].length; x++){
            const value = matrix[y][x]
            const node = arr[value -1]
            setNodeStyles(node, x ,y)
        }
    }
}

export function setNodeStyles(node, x, y) {
    const shiftPs = 100;
    node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`
}