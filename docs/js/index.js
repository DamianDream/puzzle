import { getMatrix } from './modules/getMatrix.js'
import { findCoordinatesByNumber } from './modules/findCoordinatesByNumber.js'
import { isValidForSwap } from './modules/isValidForSwap.js'
import { isWon } from './modules/isWon.js'
import { addWonClass } from './modules/addWonClass.js'
import  { setPositionItems } from './modules/setPositionItems.js'

// Nodes
const gameNode = document.querySelector('.game')
const containerNode = document.querySelector('.puzzle')
const itemNodes = Array.from(containerNode.querySelectorAll('.item'))
const resetBtn = document.getElementById('reset')
const shuffleBtn = document.getElementById('shuffle')

// Variables
const GAME_CANVAS_SIZE = itemNodes.length
const countItems = GAME_CANVAS_SIZE
const blankNumber = GAME_CANVAS_SIZE
let matrixSize = 4

// Hide last elementNode
itemNodes[countItems -1].style.display = 'none'

// POSITION
let matrix = getMatrix(
    itemNodes.map(item => Number(item.dataset.matrixId)),
    matrixSize
)

setPositionItems(matrix, itemNodes)

// SHUFFLE BTN
const  maxShuffleCount = 100
let timer;
let shuffled = false
const shuffledClassName = 'gameShuffle'

shuffleBtn.addEventListener('click', () => {
    let shuffleCount = 0
    clearInterval(timer)

    if(shuffled) return

    timer = setInterval(() => {
        randomSwap(matrix)
        setPositionItems(matrix, itemNodes)

        gameNode.classList.add(shuffledClassName)
        shuffled = true

        shuffleCount += 1

        if(shuffleCount >= maxShuffleCount) {
            clearInterval(timer)
            gameNode.classList.remove(shuffledClassName)
            shuffled = false
        }
    }, 60)
})

// RESET BTN
resetBtn.addEventListener('click', () => {
    const sortArr = getMatrix(matrix.flat().sort((a,b) => a -b), matrixSize)
    matrix = [...sortArr]
    setPositionItems(matrix, itemNodes)
})

// Create array with exception coordinates
let blokedCoords = null
function randomSwap(matrix) {
    const blankCoords = findCoordinatesByNumber(blankNumber, matrix)
    const validCoords = findValidCoords(blankCoords, matrix, blokedCoords)
    const swapCoords = validCoords[Math.floor(Math.random() * validCoords.length)]
    swap(blankCoords, swapCoords, matrix)
    blokedCoords = blankCoords
}

function findValidCoords(blankCoords, matrix, blokedCoords) {
    const validCoords = []

    for(let y = 0; y < matrix.length; y++) {
        for(let x = 0; x < matrix[y].length; x++) {
            if(isValidForSwap({x, y}, blankCoords)) {
                if(!blokedCoords || !(blokedCoords.x === x && blokedCoords.y === y)) {
                    validCoords.push({x, y})
                }
            }
        }
    }
    return validCoords
}

// Change position by click
containerNode.addEventListener('click', (e) => {
    const buttonNode = e.target.closest('button')
    if (!buttonNode) return

    const buttonNumber = Number(buttonNode.dataset.matrixId)
    const buttonCoords = findCoordinatesByNumber(buttonNumber, matrix)
    const blankCoords = findCoordinatesByNumber(blankNumber, matrix)

    const isValid = isValidForSwap(buttonCoords, blankCoords)

    if (isValid) {
        swap(blankCoords, buttonCoords, matrix)
        setPositionItems(matrix, itemNodes)
    }
})

// Change position by keydown
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
    setPositionItems(matrix, itemNodes)
})

function swap(coords1, coords2, matrix) {
    const swapNumber = matrix[coords1.y][coords1.x]
    matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x]
    matrix[coords2.y][coords2.x] = swapNumber

    if (isWon(matrix)) {
        addWonClass(containerNode, 'puzzleWon')
    }
}