export function addWonClass(node, value) {
    setTimeout(() => {
        node.classList.add(value)

        setTimeout(() => {
            node.classList.remove(value)
        }, 1000)
    }, 200)
}