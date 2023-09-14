export function removeElementsFromDom(elements) {
    elements.forEach(el => {
        el.remove()
    })
}