import run from "aocrunner"
import { makeMatrix, splitLines } from "../utils/index.js"

function searchForXMAS(grid: string[][], xCoord: number, yCoord: number) {
  let xmasCount = 0
  const visited = new Set<string>()
  const directions = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
    [-1, -1], // up-left
    [-1, 1], // up-right
    [1, -1], // down-left
    [1, 1], // down-right
  ];

  for (const [dx, dy] of directions) {
    let nx = xCoord;
    let ny = yCoord;
    let xmasIndex = 1
    let positions = [`${xCoord},${yCoord}`];

    while (nx + dx >= 0 && nx + dx < grid.length && ny + dy >= 0 && ny + dy < grid[0].length) {
      nx += dx;
      ny += dy;
      const pos = `${nx},${ny}`;
      
      if (grid[nx][ny] === 'XMAS'[xmasIndex]) {
        positions.push(pos);
        xmasIndex++;
        if (xmasIndex === 4) {
          const posKey = positions.sort().join('|');
          if (!visited.has(posKey)) {
            xmasCount++;
            visited.add(posKey);
          }
          break;
        }
      } else {
        break;
      }
    }
  }
  return xmasCount;
}

const part1 = (rawInput) => {
  const input = splitLines(rawInput, { mapper: makeMatrix() })

  let totalCount = 0
  for (let x = 0; x < input.length; x++) {
    const row = input[x];
    for (let y = 0; y < row.length; y++) {
      const element = row[y];
      if (element === 'X') {
        const foundCount = searchForXMAS(input, x, y)
        totalCount += foundCount
      }
    }
    
  }
  return String(totalCount)
}

function checkForX_MAS(grid: string[][], xCoord: number, yCoord: number) {
  const topLeft = xCoord - 1 >= 0 && yCoord - 1 >= 0 ? grid[xCoord - 1][yCoord - 1] : null;
  const topRight = xCoord - 1 >= 0 && yCoord + 1 < grid[0].length ? grid[xCoord - 1][yCoord + 1] : null;
  const bottomLeft = xCoord + 1 < grid.length && yCoord - 1 >= 0 ? grid[xCoord + 1][yCoord - 1] : null;
  const bottomRight = xCoord + 1 < grid.length && yCoord + 1 < grid[0].length ? grid[xCoord + 1][yCoord + 1] : null;
  
  const firstChar = 'M'
  const secondChar = 'S'

  return (topLeft === firstChar && bottomRight === secondChar && topRight === firstChar && bottomLeft === secondChar) 
    || (topRight === firstChar && bottomLeft === secondChar && topLeft === firstChar && bottomRight === secondChar)
    || (topLeft === firstChar && bottomRight === secondChar && bottomLeft === firstChar && topRight === secondChar)
    || (bottomLeft === firstChar && topRight === secondChar && topLeft === firstChar && bottomRight === secondChar)
    || (bottomLeft === firstChar && topRight === secondChar && bottomRight === firstChar && topLeft === secondChar)
    || (bottomRight === firstChar && topLeft === secondChar && topRight === firstChar && bottomLeft === secondChar)
    || (bottomRight === firstChar && topLeft === secondChar && bottomLeft === firstChar && topRight === secondChar)
}

const part2 = (rawInput) => {
  const input = splitLines(rawInput, { mapper: makeMatrix() })

  let totalCount = 0
  for (let x = 0; x < input.length; x++) {
    const row = input[x];
    for (let y = 0; y < row.length; y++) {
      const element = row[y];
      if (element === 'A' && checkForX_MAS(input, x, y)) {
        totalCount++
      }
    }
    
  }
  return String(totalCount)
}

const exampleInput = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`

run({
  part1: {
    tests: [
      {
        input: `
..X...
.SAMX.
.A..A.
XMAS.S
.X....`,
          expected: '4'
      },
      {
        input: exampleInput,
        expected: "18",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
M.S
.A.
M.S`,
        expected: "1",
      },
      {
        input: `
MMSS
.AA.
MMSS`,
        expected: "2",
      },
      {
        input: exampleInput,
        expected: "9",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})