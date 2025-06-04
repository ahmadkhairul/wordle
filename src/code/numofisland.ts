function numIslands(grid: string[][]): number {
    // get the length of grid top to bottom
    let m: number = grid.length
    // get the length of grid left to right
    let n: number = grid[0].length

    // marked found island as 0
    function dfs(i: number, j: number) {
        // prevent to check outside of boundary and an island (1)
        if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] !== '1') {
            return;
        } else {
            // marked the founded island as 0 and also check top, bottom, left, right
            grid[i][j] = '0';
            dfs(i, j + 1)
            dfs(i, j - 1)
            dfs(i - 1, j)
            dfs(i + 1, j)
        }
    }

    // total island had been found
    let island: number = 0;
    // loop through top to bottom
    for (let i = 0; i < m; i++) {
        // loop throug left to right
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                dfs(i, j)
                island += 1
            }
        }
    }

    return island
};