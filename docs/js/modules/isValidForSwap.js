export function isValidForSwap(coords1, coords2) {
    const difX = Math.abs(coords1.x - coords2.x)
    const difY = Math.abs(coords1.y - coords2.y)

    return (difX === 1 || difY === 1) && (coords1.x === coords2.x || coords1.y === coords2.y)
}