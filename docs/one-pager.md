# Hue Glue game
Browser puzzle-game about recreating harmony in the color grid by hue.

## The goal
A game in which the player uses the mouse to interact with a grid in order to arrange the mixed-up cells by color.

## MVP
* There must always be at least two fixed cells in the grid, which must be used as a starting point for restoring order.
* Cells are rearranged by sequentially interacting with two cells.
* The player receives notification of the win in some way.

## PoC
* Generate a 5x5 grid of cells of different colors, such that:
    * Corner cells are initialized with random colors.
    * For the remaining cells, the color is determined by uniform interpolation between the corner cells: horizontally — between the left and right colors of the row, vertically — between the upper and lower boundaries.
* “Shuffle” the generated 5x5 grid, while keeping the color of the 4 corner cells, meaning, “leave them in place.”
* Generate a 5x5 grid in which cells can be “swapped”. Possible approaches:
    * Change the color of cells directly via DOM / internal color field.
    * Change the coordinates of grid elements by updating their position on the screen.
* Status verification against a reference
* Notification that the puzzle has been solved
