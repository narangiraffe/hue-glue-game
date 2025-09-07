# 07.09.2025
React+Vite is deployed on the project.

The first concept has been implemented: draw a 5x5 grid such that:
* the corner cells (anchors) are initialized with random different colors
* the remaining cells are colored using bilinear interpolation

To implement the concept, the project structure was enriched with components such as
- Cell, which draws cells
- Grid, which draws the entire grid

A color.js utility was also created, which described the functions necessary for generating random colors, coloring anchors, and filling the remaining cells of the grid with color.

Perhaps in the future, the utility should be divided into several different ones, for example, moving interpolation functions into a separate file.

# 03.09.2025
A repository has been created for the project, and the one-pager.md file describes the goal and initial concepts for implementation.