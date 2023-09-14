export function setPuzzlesSize(isGameSmall) {
    if(!isGameSmall) return
    const itemNodes = Array.from(document.querySelectorAll('.item'))

    const size = (isGameSmall) ? "33.3%" : "25%"

    itemNodes.forEach(item => {
        item.style.width = size
        item.style.height = size
    })
}