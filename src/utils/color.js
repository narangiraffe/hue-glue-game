//get random number from 0 to 255
function getRandomByte() {
    return Math.floor(Math.random() * 256)
}

//get random color object {r, g, b, rgb}
export function randomColor() {
    return {
        r: getRandomByte(),
        g: getRandomByte(),
        b: getRandomByte(),

        get rgb() {
            return `rgb(${this.r}, ${this.g}, ${this.b})`
        }
    }
}

//get euclidean distance between two colors
function colorDistance(color1, color2) {
    return Math.sqrt(
        (color1.r - color2.r) ** 2 +
        (color1.g - color2.g) ** 2 +
        (color1.b - color2.b) ** 2
    )
}

//check if distance between two colors is at least minDistance
function isColorDistanceOK(color1, color2, minDistance) {
    return colorDistance(color1, color2) >= minDistance
}

//create a validator function based on rules and current colors
function makeValidator(rules, colors) {
    return function isValid(anchor, color) {
        //check all rules
        for (const [a, b, dist] of rules) {
            //only check rules involving the current anchor and already set colors
            if ((a === anchor && colors[b]) || (b === anchor && colors[a])) {
                if (!isColorDistanceOK(color, colors[a] || colors[b], dist)) {
                    return false
                }
            }
        }
        return true
    }
}

//try to pick a valid color for the given anchor using the isValid function
function pickValidColor(anchor, isValid, maxAttempts = 1000) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const color = randomColor()
        if (isValid(anchor, color)) {
            return color
        }
    }
    throw new Error(`Unable to find a valid color for anchor "${anchor}" after ${maxAttempts} attempts.`)
}

//generate colors for the anchors
function colorAnchors(rows, cols) {
    //define anchors positions
    const anchors = {
        topleft: [0, 0],
        topright: [0, cols - 1],
        bottomright: [rows - 1, cols - 1],
        bottomleft: [rows - 1, 0]
    }

    //define color distance rules between anchors
    const rules = [
        ["topleft", "topright", 100],
        ["topright", "bottomright", 100],
        ["bottomright", "bottomleft", 100],
        ["bottomleft", "topleft", 100],
        ["topleft", "bottomright", 150],
        ["topright", "bottomleft", 150]
    ]

    //pick colors for anchors
    const colors = {}
    //pick first color randomly
    const isValid = makeValidator(rules, colors)

    //ensure all anchors have different colors
    for (const anchor of Object.keys(anchors)) {
        colors[anchor] = pickValidColor(anchor, isValid)
    }

    return { anchors: anchors, colors }
}

//linear interpolation between a and b by t (0 <= t <= 1)
function lerp(a, b, t) {
    return a + (b - a) * t
}

//mix two colors by t (0 <= t <= 1)
function mixColors(color1, color2, t) {
    const c = {
        r: Math.round(lerp(color1.r, color2.r, t)),
        g: Math.round(lerp(color1.g, color2.g, t)),
        b: Math.round(lerp(color1.b, color2.b, t))
    }
    Object.defineProperty(c, "rgb", {
        get() { return `rgb(${this.r}, ${this.g}, ${this.b})` },
        enumerable: true
    })
    return c
}

//bilinear interpolation between four colors (for grids only)
function bilerp(topleft, topright, bottomleft, bottomright, tx, ty) {
    const top = mixColors(topleft, topright, tx)
    const bottom = mixColors(bottomleft, bottomright, tx)

    return mixColors(top, bottom, ty)
}

//color the rest of the grid based on anchor colors (for grids only)
function colorRest(grid, cornerAnchors) {
    const rows = grid.length
    const cols = grid[0].length

    const { topleft, topright, bottomleft, bottomright } = cornerAnchors

    //denominators for interpolation
    const denomX = cols > 1 ? cols - 1 : 1
    const denomY = rows > 1 ? rows - 1 : 1

    //fill in the rest of the grid
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            //only fill empty cells
            if (grid[i][j] === null) {
                const tx = cols > 1 ? j / denomX : 0
                const ty = rows > 1 ? i / denomY : 0
                const color = bilerp(
                    topleft,
                    topright,
                    bottomleft,
                    bottomright,
                    tx, ty
                )
                grid[i][j] = color
            }
        }
    }

    return grid
}

//generate a grid of given dimensions with colored corners and interpolated colors in between
export function generateGrid(rows, cols) {
    if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows <= 0 || cols <= 0) {
        throw new Error(`generateGrid: invalid dimensions rows=${rows}, cols=${cols}`)
    }

    //initialize empty grid
    const grid = Array.from({ length: rows }, () => Array(cols).fill(null))

    //generate anchor colors
    let anchors, colors
    try {
        const result = colorAnchors(rows, cols)
        anchors = result.anchors
        colors = result.colors
    } catch (e) {
        throw new Error(`generateGrid: failed to generate corner colors: ${e.message}`)
    }

    //set anchor colors in the grid
    for (const [corner, [i, j]] of Object.entries(anchors)) {
        grid[i][j] = colors[corner]
    }

    //fill in the rest of the grid
    return colorRest(grid, colors)
}
