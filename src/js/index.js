import { getMatrix } from './modules/getMatrix.js'
import { findCoordinatesByNumber } from './modules/findCoordinatesByNumber.js'
import { isValidForSwap } from './modules/isValidForSwap.js'
import { isWon } from './modules/isWon.js'
import { addWonClass } from './modules/addWonClass.js'
import { setPositionItems } from './modules/setPositionItems.js'
import { createPuzzleNodes } from './modules/createPuzzleNodes.js'
import { removeElementsFromDom } from './modules/removeElementsFromDom.js'
import { swap } from './modules/swap.js'
import { setPuzzleColor } from './modules/setPuzzleColor.js'
import { setPuzzlesSize } from './modules/setPuzzlesSize.js'

// Nodes
const gameNode = document.querySelector('.game')
const containerNode = document.querySelector('.puzzle')
const resetBtn = document.getElementById('reset')
const shuffleBtn = document.getElementById('shuffle')
const sizeBtn = document.getElementById('size')
const colorBtn = document.getElementById('color')

let isGameSmall = false
let matrixSize = null
let puzzleSize = null
let matrix = null
let maxShuffleCount = null
let shuffleSpeed = null

puzzleGameInit()

function puzzleGameInit() {

    if(!isGameSmall) {
        matrixSize = 4
        puzzleSize = 16
        maxShuffleCount = 80
        shuffleSpeed = 80
    } else {
        matrixSize = 3
        puzzleSize = 9
        maxShuffleCount = 20
        shuffleSpeed = 120
    }

    createPuzzleNodes(puzzleSize, containerNode)
    matrix = getMatrix(matrixSize)
    setPositionItems(matrix)
    setPuzzlesSize(isGameSmall)
    setPuzzleColor()
}

function removePuzzleItems(){
    const itemNodes = Array.from(document.querySelectorAll('.item'))
    removeElementsFromDom(itemNodes)
}

// SHUFFLE BTN
let timer;
let shuffled = false
const shuffledClassName = 'gameShuffle'

shuffleBtn.addEventListener('click', () => {
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
    }, shuffleSpeed)
})

// RESET BTN
resetBtn.addEventListener('click', () => {
    matrix = getMatrix(matrixSize)
    setPositionItems(matrix)
})

// SMALL
function changeInnerHtmlText(e) {
    let innerHTML

    if(isGameSmall) {
        innerHTML = "3x3"
    } else {
        innerHTML = "4x4"
    }
    e.target.firstChild.innerHTML = innerHTML
}

sizeBtn.addEventListener('click', (e) => {
    changeInnerHtmlText(e)
    isGameSmall = !isGameSmall
    removePuzzleItems()
    puzzleGameInit()
})

// COLOR
colorBtn.addEventListener('click', () => {
    setPuzzleColor()
})

// Create array with exception coordinates
let blokedCoords = null
function randomSwap(matrix) {
    const blankCoords = findCoordinatesByNumber(puzzleSize, matrix)
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
    const blankCoords = findCoordinatesByNumber(puzzleSize, matrix)

    const isValid = isValidForSwap(buttonCoords, blankCoords)

    if (isValid) {
        swapAndCheck(blankCoords, buttonCoords, matrix)
        setPositionItems(matrix)
    }
})

function keydownHandler(e, puzzleSize, matrix) {
    const blankCoords = findCoordinatesByNumber(puzzleSize, matrix)
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

    swapAndCheck(blankCoords, buttonCoords, matrix)
    setPositionItems(matrix)
}

// Change position by keydown
window.addEventListener('keydown', (e) => {
    if(shuffled) return

    if(!e.key.includes('Arrow')) {
        return
    }
    keydownHandler(e, puzzleSize, matrix)
})

function swapAndCheck(coords1, coords2, matrix) {
    swap(coords1, coords2, matrix)

    if (isWon(matrix)) {
        addWonClass(containerNode, 'puzzleWon')
    }
}
