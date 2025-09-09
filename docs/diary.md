# 09.09.2025
After the first attempt to write code for the first PoC using AI, it was decided to rewrite the code independently. The blocks proposed by the text model, although functional, were very difficult to read and overloaded.

In combination with related changes, the main points of the latest commit can be highlighted:
1. The Color class was created for color operations.
2. The Cell class was created for cell operations.
3. The color.js utility file was significantly reworked.
4. Abstract mathematical functions were moved to a separate math.js file.

At the moment, the concept of “coloring the grid” has been implemented in the project.

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