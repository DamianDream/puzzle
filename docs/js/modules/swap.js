export function swap(coords1, coords2, matrix) {
    const swapNumber = matrix[coords1.y][coords1.x]
    matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x]
    matrix[coords2.y][coords2.x] = swapNumber
}