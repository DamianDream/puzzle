export function getMatrix(arr, matrixSize) {
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
    console.table(matrix)
    return matrix
}