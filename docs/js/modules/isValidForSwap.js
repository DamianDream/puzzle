function isValidForSwap(a,r){var i=Math.abs(a.x-r.x),t=Math.abs(a.y-r.y);return!(1!==i&&1!==t||a.x!==r.x&&a.y!==r.y)}export{isValidForSwap};