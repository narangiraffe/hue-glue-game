export default class Cell {
    constructor(isAnchor = false) {
        this.isAnchor = isAnchor
    }

    _color

    get color() {
        return this._color
    }
    set color(value) {
        this._color = value
    }
}