// Alternative shuffle array method (could be impossible)
function shuffleArray(arr) {
    return arr
        .map(value => ({ value, sort: Math.random() }))
        .sort(( a, b ) => a.sort - b.sort)
        .map(({ value }) => value)
}