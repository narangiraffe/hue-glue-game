function Cell({ color }) {
  return (
    <div
      className="cell"
      style={{
        backgroundColor: color.rgb
      }}
    ></div>
  )
}

export default Cell