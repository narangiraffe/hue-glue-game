import Cell from "./cell.js"
import { randomByte, lerp as lerpMath } from "./math.js"

class Color {
    constructor(r, g, b) {
        this.r = r
        this.g = g
        this.b = b
    }

    _a = 1.0

    get a() {
        return this._a
    }

    set a(value) {
        if (value < 0 || value > 1) {
            throw new Error("Alpha value must be between 0 and 1")
        }
        this._a = value
    }
    
    get rgb() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`
    }

    get rgba() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this._a})`
    }

    distanceTo(otherColor) {
        return distance(this, otherColor)
    }

    static distance(colorA, colorB) {
        return Math.sqrt(
            (colorA.r - colorB.r) ** 2 +
            (colorA.g - colorB.g) ** 2 +
            (colorA.b - colorB.b) ** 2
        )
    }

    static lerp(colorL, colorR, interpolant) {
        return new Color(
            lerpMath(colorL.r, colorR.r, interpolant),
            lerpMath(colorL.g, colorR.g, interpolant),
            lerpMath(colorL.b, colorR.b, interpolant)
        )
    }

    static bilerp(colorTL, colorTR, colorBL, colorBR, tx, ty) {
        const top = Color.lerp(colorTL, colorTR, tx)
        const bottom = Color.lerp(colorBL, colorBR, tx)
        return Color.lerp(top, bottom, ty)
    }

    static random() {
        return new Color(
            randomByte(),
            randomByte(),
            randomByte()
        )
    }
}

function makeListOfAnchorCells(rows, cols) {
    return [
        new Cell(0, 0, true),
        new Cell(cols - 1, 0, true),
        new Cell(0, rows - 1, true),
        new Cell(cols - 1, rows - 1, true),
    ]
}

function makeListOfAnchorColors(anchorCount, minDistance) {
    let colors = [Color.random()]

    while (colors.length < anchorCount) {
        const randomColor = Color.random()
        if (colors.every(c => Color.distance(c, randomColor) >= minDistance)) {
            colors.push(randomColor)
        }
    }

    return colors
}

function fillAnchorsWithColors(anchors, minDistance){
    let anchorColors = makeListOfAnchorColors(anchors.length, minDistance)
    for (const anchor of anchors) {
        anchor.color = anchorColors.pop()
    }
    return anchors
}

function colorRest(grid, anchors) {
    const rows = grid.length
    const cols = grid[0].length

    const [topleft, topright, bottomleft, bottomright] = anchors

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === null) {
                const tx = cols > 1 ? j / (cols - 1) : 0
                const ty = rows > 1 ? i / (rows - 1) : 0
                grid[i][j] = Color.bilerp(topleft.color, topright.color, bottomleft.color, bottomright.color, tx, ty)
            }
        }
    }

    return grid
}

//generate a grid of given dimensions with colored anchors and interpolated colors in between
export function generateGrid(rows, cols) {
    if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows <= 0 || cols <= 0) {
        throw new Error(`generateGrid: invalid dimensions rows=${rows}, cols=${cols}`)
    }

    const grid = Array.from({ length: rows }, () => Array(cols).fill(null))

    let anchors = fillAnchorsWithColors(makeListOfAnchorCells(rows, cols), 100)
        
    for (const a of anchors) {
        grid[a.y][a.x] = a.color
    }

    //fill in the rest of the grid
    return colorRest(grid, anchors)
}
