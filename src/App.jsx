import React, { useState, useEffect } from "react"
import Grid from "./components/Grid"
import { generateGrid } from "./utils/color"

function App() {
  const [cells, setCells] = useState([])

  useEffect(() => {
    const initialGrid = generateGrid(5, 5)
    setCells(initialGrid)
  }, [])

  return (
    <div className="app">
      <h1>Hue Glue</h1>
      <Grid cells={cells} />
    </div>
  )
}

export default App