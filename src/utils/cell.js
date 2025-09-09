export default class Cell {
    constructor(x, y, isAnchor = false) {
        this.x = x
        this.y = y
        this.isAnchor = isAnchor
    }

    _color = {}

    get color() {
        return this._color
    }
    set color(value) {
        this._color = value
    }

    distanceTo(otherPoint) {
        return Math.sqrt(
            (this.x - otherPoint.x) ** 2 +
            (this.y - otherPoint.y) ** 2
        )
    }

    static distance(pointA, pointB) {
        return Math.sqrt(
            (pointA.x - pointB.x) ** 2 +
            (pointA.y - pointB.y) ** 2
        )
    }
}