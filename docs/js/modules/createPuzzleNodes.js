function createPuzzleNodes(t,n){for(let e=1;e<=t;e++){const a=document.createElement("button");a.classList.add("item"),a.dataset.matrixId=e;const o=document.createElement("span");o.classList.add("itemVal"),o.textContent=e,a.append(o),n.append(a)}const e=Array.from(document.querySelectorAll(".item"));e[e.length-1].style.display="none"}export{createPuzzleNodes};