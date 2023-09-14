export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function setPuzzleColor() {
    const hue = getRandomIntInclusive(0, 360)

    const itemNodes = Array.from(document.querySelectorAll('.itemVal'))
    const decrement = Math.trunc(70 / itemNodes.length)
    let saturation = 96

    itemNodes.forEach(item => {
        item.style.backgroundColor = `hsla(${hue}, ${saturation}%, 40%)`
        saturation -= Math.floor(decrement)
    })
}