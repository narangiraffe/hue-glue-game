import React from "react"

function Cell({ color }) {
  const bg =
    typeof color === "string"
      ? color
      : color && typeof color.rgb === "function"
      ? color.rgb
      : color?.rgb || "transparent"

  return (
    <div
      className="cell"
      style={{
        backgroundColor: bg,
      }}
    ></div>
  )
}

export default Cell