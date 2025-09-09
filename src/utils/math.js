export function lerp(start, end, interpolant) {
    return Math.round(start + (end - start) * interpolant)
}

export function randomByte() {
    return Math.floor(Math.random() * 256)
}
