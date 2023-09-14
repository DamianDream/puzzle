import{getMatrix}from"./modules/getMatrix.js";import{findCoordinatesByNumber}from"./modules/findCoordinatesByNumber.js";import{isValidForSwap}from"./modules/isValidForSwap.js";import{isWon}from"./modules/isWon.js";import{addWonClass}from"./modules/addWonClass.js";import{setPositionItems}from"./modules/setPositionItems.js";import{createPuzzleNodes}from"./modules/createPuzzleNodes.js";import{removeElementsFromDom}from"./modules/removeElementsFromDom.js";import{swap}from"./modules/swap.js";import{setPuzzleColor}from"./modules/setPuzzleColor.js";import{setPuzzlesSize}from"./modules/setPuzzlesSize.js";const gameNode=document.querySelector(".game"),containerNode=document.querySelector(".puzzle");let isGameSmall=!1,matrixSize=null,puzzleSize=null,matrix=null;function puzzleGameInit(e){e<16&&(isGameSmall=!0),puzzleSize=isGameSmall?(matrixSize=3,9):(matrixSize=4,16),createPuzzleNodes(puzzleSize,containerNode),matrix=getMatrix(matrixSize),setPositionItems(matrix),setPuzzlesSize(isGameSmall),setPuzzleColor()}function removePuzzleItems(){var e=Array.from(document.querySelectorAll(".item"));removeElementsFromDom(e)}puzzleGameInit(16);let timer,shuffled=!1;const shuffledClassName="gameShuffle",maxShuffleCount=20,shuffleSpeed=120,shuffleBtn=document.getElementById("shuffle");shuffleBtn.addEventListener("click",()=>{let e=0;clearInterval(timer),shuffled||(timer=setInterval(()=>{randomSwap(matrix),setPositionItems(matrix),gameNode.classList.add(shuffledClassName),shuffled=!0,e+=1,e>=maxShuffleCount&&(clearInterval(timer),gameNode.classList.remove(shuffledClassName),shuffled=!1)},shuffleSpeed))});const resetBtn=document.getElementById("reset");resetBtn.addEventListener("click",()=>{matrix=getMatrix(matrixSize),setPositionItems(matrix)});const sizeBtn=document.getElementById("small");sizeBtn.addEventListener("click",()=>{removePuzzleItems(),puzzleGameInit(9)});const colorBtn=document.getElementById("color");colorBtn.addEventListener("click",()=>{setPuzzleColor()});let blokedCoords=null;function randomSwap(e){var t=findCoordinatesByNumber(puzzleSize,e),o=findValidCoords(t,e,blokedCoords),o=o[Math.floor(Math.random()*o.length)];swap(t,o,e),blokedCoords=t}function findValidCoords(o,s,r){const l=[];for(let t=0;t<s.length;t++)for(let e=0;e<s[t].length;e++)isValidForSwap({x:e,y:t},o)&&(r&&r.x===e&&r.y===t||l.push({x:e,y:t}));return l}function keydownHandler(e,t,o){var s=findCoordinatesByNumber(t,o);const r={x:s.x,y:s.y};t=e.key.split("Arrow")[1].toLowerCase(),e=o.length;switch(t){case"up":r.y+=1;break;case"down":--r.y;break;case"left":r.x+=1;break;case"right":--r.x}r.y>=e||r.y<0||r.x>=e||r.x<0||(swapAndCheck(s,r,o),setPositionItems(o))}function swapAndCheck(e,t,o){swap(e,t,o),isWon(o)&&addWonClass(containerNode,"puzzleWon")}containerNode.addEventListener("click",e=>{var t=e.target.closest("button");t&&(e=Number(t.dataset.matrixId),t=findCoordinatesByNumber(e,matrix),e=findCoordinatesByNumber(puzzleSize,matrix),isValidForSwap(t,e)&&(swapAndCheck(e,t,matrix),setPositionItems(matrix)))}),window.addEventListener("keydown",e=>{shuffled||e.key.includes("Arrow")&&keydownHandler(e,puzzleSize,matrix)});