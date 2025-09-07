function getRandomInt() {
    return Math.floor(Math.random() * 256)
}

export function randomColor() {
  const r = getRandomInt()
  const g = getRandomInt()
  const b = getRandomInt()
  return `rgb(${r}, ${g}, ${b})`
}

export function generateGrid(rows, cols) {
  const grid = []
  for (let i = 0; i < rows; i++) {
    const row = []
    for (let j = 0; j < cols; j++) {
      row.push(randomColor())
    }
    grid.push(row)
  }
  return grid
}
