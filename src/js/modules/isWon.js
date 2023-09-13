export function isWon(matrix) {
    const winFlatArr = new Array(16).fill(0).map((_item, i) => i + 1)
    const flatMatrix = matrix.flat()
    for(let i = 0; i < winFlatArr.length; i++) {
        if(flatMatrix[i] !== winFlatArr[i]) {
            return false
        }
    }
    return true
}