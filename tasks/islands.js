function numIslands(grid) {
    let number = 0;
    const map = {};

    const makeIsland = (j, i) => {
        map[`${j},${i}`] = number;

        if (j - 1 >= 0 && grid[j - 1][i] === '1' && !map[`${j - 1},${i}`]) {
            makeIsland(j - 1, i);
        }

        if (j + 1 < grid.length && grid[j + 1][i] === '1' && !map[`${j + 1},${i}`]) {
            makeIsland(j + 1, i);
        }

        if (i - 1 >= 0 && grid[j][i - 1] === '1' && !map[`${j},${i - 1}`]) {
            makeIsland(j, i - 1);
        }

        if (i + 1 < grid[0].length && grid[j][i + 1] === '1' && !map[`${j},${i + 1}`]) {
            makeIsland(j, i + 1);
        }
    };

    for (let i = 0; i < grid[0].length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid[j][i] === '1' && !map[`${j},${i}`]) {
                const adjacentIsland =
                    map[`${j},${i - 1}`] || map[`${j},${i + 1}`] || map[`${j - 1},${i}`] || map[`${j + 1},${i}`];

                if (!adjacentIsland) {
                    number += 1;
                }

                makeIsland(j, i);
            }
        }
    }

    return number;
}

const grid = [
    ['1', '1', '0', '0'],
    ['1', '1', '0', '0'],
    ['0', '0', '1', '1'],
    ['0', '0', '1', '1'],
];

console.log(numIslands(grid));
