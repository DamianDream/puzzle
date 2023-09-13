export function findCoordinatesByNumber(number, matrix) {
    for(let y = 0; y < matrix.length; y++) {
        for(let x = 0; x < matrix[y].length; x++) {
            if(matrix[y][x] === number){
                return {x, y}
            }
        }
    }
    return null
}