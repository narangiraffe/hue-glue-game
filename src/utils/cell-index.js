export default class CellIndex {
    constructor(row, col) {
        this.x = row
        this.y = col
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