import { getMatrix } from './modules/getMatrix.js'

// Nodes
const gameNode = document.querySelector('.puzzle')
const containerNode = document.querySelector('.fifteen')
const itemNodes = Array.from(containerNode.querySelectorAll('.item'))

// Variables
const GAME_CANVAS_SIZE = 16
const countItems = GAME_CANVAS_SIZE
const blankNumber = GAME_CANVAS_SIZE

// Hide last elementNode
itemNodes[countItems -1].style.display = 'none'

// 1 POSITION

let matrix = getMatrix(
    itemNodes.map(item => Number(item.dataset.matrixId))
)

const position = setPositionItems(matrix)

// 2 Shuffle
const  maxShuffleCount = 20
let timer;
let shuffled = false
const shuffledClassName = 'puzzleShuffle'

document.getElementById('shuffle').addEventListener('click', () => {
    let shuffleCount = 0
    clearInterval(timer)

    if(shuffled) return

    timer = setInterval(() => {
        randomSwap(matrix)
        setPositionItems(matrix)

        gameNode.classList.add(shuffledClassName)
        shuffled = true

        shuffleCount += 1

        if(shuffleCount >= maxShuffleCount) {
            clearInterval(timer)
            gameNode.classList.remove(shuffledClassName)
            shuffled = false
        }
    }, 100)
})

let blokedCoords = null
function randomSwap(matrix) {
    const blankCoords = findCoordinatesByNumber(blankNumber, matrix)
    const validCoords = findValidCoords(blankCoords, matrix, blokedCoords)
    const swapCoords = validCoords[Math.floor(Math.random() * validCoords.length)]

    // TODO Join Swap and setPossition => SwapAndUpdate()
    swap(blankCoords, swapCoords, matrix)
    blokedCoords = blankCoords
}

function findValidCoords(blankCoords, matrix, blokedCoords) {
    const validCoords = []

    for(let y = 0; y < matrix.length; y++) {
        for(let x = 0; x < matrix[y].length; x++) {
            // TODO check swap count in console before and after adding blockedCoords
            if(isValidForSwap({x, y}, blankCoords)) {
                if(!blokedCoords || !(blokedCoords.x === x && blokedCoords.y === y)) {
                    validCoords.push({x, y})
                }
            }
        }
    }
    return validCoords
}

// 3 Change position by click

containerNode.addEventListener('click', (e) => {
    const buttonNode = e.target.closest('button')
    if (!buttonNode) return

    const buttonNumber = Number(buttonNode.dataset.matrixId)
    const buttonCoords = findCoordinatesByNumber(buttonNumber, matrix)
    const blankCoords = findCoordinatesByNumber(blankNumber, matrix)

    const isValid = isValidForSwap(buttonCoords, blankCoords)

    if (isValid) {
        swap(blankCoords, buttonCoords, matrix)
        setPositionItems(matrix)
    }
})

// 4 Change position by keydown
window.addEventListener('keydown', (e) => {
    if(shuffled) return

    if(!e.key.includes('Arrow')) {
        return
    }
    const blankCoords = findCoordinatesByNumber(blankNumber, matrix)
    const buttonCoords = {
        x: blankCoords.x,
        y: blankCoords.y
    }
    const direction = e.key.split('Arrow')[1].toLowerCase()
    const maxIndexMatrix = matrix.length

    switch(direction) {
        case "up":
            buttonCoords.y +=1
            break
        case "down":
            buttonCoords.y -=1
            break
        case "left":
            buttonCoords.x +=1
            break
        case "right":
            buttonCoords.x -=1
            break
    }

    if(buttonCoords.y >= maxIndexMatrix || buttonCoords.y < 0 ||
        buttonCoords.x >= maxIndexMatrix || buttonCoords.x < 0) {
        return
    }

    swap(blankCoords, buttonCoords, matrix)
    setPositionItems(matrix)
})

// 5 Show final result

/* Helpers */
// function getMatrix(arr) {
//     const matrix = [[], [], [], []]
//     let y = 0
//     let x = 0
//
//     for (let i = 0; i < arr.length; i++) {
//         if (x >= 4) {
//             y++
//             x = 0
//         }
//         matrix[y][x] = arr[i]
//         x++
//     }
//     return matrix
// }

function setPositionItems(matrix) {
    for(let y = 0; y < matrix.length; y++) {
        for(let x = 0; x < matrix[y].length; x++){
            const value = matrix[y][x]
            const node = itemNodes[value -1]
            setNodeStyles(node, x ,y)
        }
    }
}

function setNodeStyles(node, x, y) {
    const shiftPs = 100;
    node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`
}

function shuffleArray(arr) {
    return arr
        .map(value => ({ value, sort: Math.random() }))
        .sort(( a, b ) => a.sort - b.sort)
        .map(({ value }) => value)
}

function findCoordinatesByNumber(number, matrix) {
    for(let y = 0; y < matrix.length; y++) {
        for(let x = 0; x < matrix[y].length; x++) {
            if(matrix[y][x] === number){
                return {x, y}
            }
        }
    }
    return null
}

function isValidForSwap(coords1, coords2) {
    const difX = Math.abs(coords1.x - coords2.x)
    const difY = Math.abs(coords1.y - coords2.y)

    return (difX === 1 || difY === 1) && (coords1.x === coords2.x || coords1.y === coords2.y)
}

function swap(coords1, coords2, matrix) {
    const swapNumber = matrix[coords1.y][coords1.x]
    matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x]
    matrix[coords2.y][coords2.x] = swapNumber

    if (isWon(matrix)) {
        addWonClass()
    }
}

const winFlatArr = new Array(16).fill(0).map((_item, i) => i + 1)
function isWon(matrix) {
    const flatMatrix = matrix.flat()
    for(let i = 0; i < winFlatArr.length; i++) {
        if(flatMatrix[i] !== winFlatArr[i]) {
            return false
        }
    }
    return true
}

const wonClass = 'fifteenWon'
function addWonClass() {
    setTimeout(() => {
        containerNode.classList.add(wonClass)

        setTimeout(() => {
            containerNode.classList.remove(wonClass)
        }, 1000)
    }, 200)
}