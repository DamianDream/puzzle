export function isWon(matrix) {
    const flatMatrix = matrix.flat()
    const winFlatArr = new Array(flatMatrix.length).fill(0).map((_item, i) => i + 1)

    for(let i = 0; i < winFlatArr.length; i++) {
        if(flatMatrix[i] !== winFlatArr[i]) {
            return false
        }
    }
    return true
}