
export function getMatrix(matrixSize) {
    const itemNodes = Array.from(document.querySelectorAll('.item'))
    let arr = itemNodes.map(item => Number(item.dataset.matrixId))

    let size = 0
    const matrix = []

    while(size <= matrixSize -1) {
        matrix.push([])
        size++
    }

    let y = 0
    let x = 0

    for (let i = 0; i < arr.length; i++) {
        if (x >= matrixSize) {
            y++
            x = 0
        }
        matrix[y][x] = arr[i]
        x++
    }
    return matrix
}