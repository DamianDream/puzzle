function setPositionItems(o){var s=Array.from(document.querySelectorAll(".item"));for(let e=0;e<o.length;e++)for(let t=0;t<o[e].length;t++)setNodeStyles(s[o[e][t]-1],t,e)}function setNodeStyles(t,e,o){t.style.transform=`translate3D(${100*e}%, ${100*o}%, 0)`}export{setPositionItems,setNodeStyles};