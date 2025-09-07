import React from "react"
import Cell from "./Cell"
import "../styles/Grid.css"

function Grid({ cells }) {
  return (
    <div className="grid">
      {cells.flat().map((color, idx) => (
        <Cell key={idx} color={color} />
      ))}
    </div>
  )
}

export default Grid
