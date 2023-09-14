export function createPuzzleNodes(size, parentNode) {
    for(let i = 1; i <= size; i++) {
        const puzzleElement = document.createElement('button')
        puzzleElement.classList.add('item')
        puzzleElement.dataset.matrixId = i

        const spanElement = document.createElement('span')
        spanElement.classList.add('itemVal')
        spanElement.textContent = i

        puzzleElement.append(spanElement)
        parentNode.append(puzzleElement)
    }

    const itemNodes = Array.from(document.querySelectorAll('.item'))
    itemNodes[itemNodes.length -1].style.display = 'none' // Hide last elementNode
}