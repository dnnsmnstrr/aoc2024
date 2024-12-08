import run from "aocrunner"
import { makeMatrix, splitLines } from "../utils/index.js"

const directions = ['up', 'right', 'down', 'left'] as const
const directionCoords = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
} as const

type Direction = typeof directions[number]
type Position = {
  x: number,
  y: number,
  direction: Direction
}

function findGuard(map: string[][]): Position {
  let x, y = 0
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '^') {
        x = j;
        y = i;
        break;
      }
    }
    if (x !== undefined && y !== undefined) break;
  }
  return { x, y, direction: directions[0] }
}

function checkForObstruction(nextX: number, nextY: number, map: string[][]) {
  return map[nextY] && map[nextY][nextX] && map[nextY][nextX] === '#'
}

function rotateDirection(direction: Direction) {
  return directions[(directions.indexOf(direction) + 1) % 4]
}

const part1 = (rawInput) => {
  const map = splitLines(rawInput, { mapper: makeMatrix() })
  let guardPosition = findGuard(map)

  const visitedPositions = new Set();
  const visitedPositionsWithDirection = new Set();
  visitedPositions.add(`${guardPosition.x},${guardPosition.y}`)

  while (true) {
    const newX = guardPosition.x + directionCoords[guardPosition.direction][1]
    const newY = guardPosition.y + directionCoords[guardPosition.direction][0]
    if (!map[newY]?.[newX]) {
      break;
  }
    if (checkForObstruction(newX, newY, map)) {
      guardPosition.direction = rotateDirection(guardPosition.direction)
    } else {
      if (!visitedPositions.has(`${newX},${newY}`)) {
        visitedPositions.add(`${newX},${newY}`)
      };
      if (visitedPositionsWithDirection.has(`${newX},${newY},${guardPosition.direction}`)) {
        console.log('loop detected')
        break
      }
      guardPosition.x = newX
      guardPosition.y = newY
      visitedPositionsWithDirection.add(`${newX},${newY},${guardPosition.direction}`)
    }
  }
  const result = visitedPositions.size
  return String(result)
}

function checkForLoopWithObstacleAt(x, y, map) {
  if (map[y][x] === "#") {
      return false;
  }

  map[y][x] = "#";
  let guardPosition = findGuard(map)

  const visitedPositions = new Set();
  while (true) {
    const newX = guardPosition.x + directionCoords[guardPosition.direction][1]
    const newY = guardPosition.y + directionCoords[guardPosition.direction][0]
    if (!map[newY]?.[newX]) {
      map[y][x] = ".";
      return false
    }
    if (checkForObstruction(newX, newY, map)) {
      guardPosition.direction = rotateDirection(guardPosition.direction)
    } else {
      if (visitedPositions.has(`${newX},${newY},${guardPosition.direction}`)) {
        map[y][x] = ".";
        return true
      }
      if (!visitedPositions.has(`${newX},${newY},${guardPosition.direction}`)) {
        visitedPositions.add(`${newX},${newY},${guardPosition.direction}`)
      };
      guardPosition.x = newX
      guardPosition.y = newY
    }
  }
}

const part2 = (rawInput) => {
  const map = splitLines(rawInput, { mapper: makeMatrix() })
  let guardPosition = findGuard(map)

  const visitedPositions = new Set();
  visitedPositions.add(`${guardPosition.x},${guardPosition.y}`)

  let possibleLoops = 0
  while (true) {
    const newX = guardPosition.x + directionCoords[guardPosition.direction][1]
    const newY = guardPosition.y + directionCoords[guardPosition.direction][0]
    if (!map[newY]?.[newX]) {
      break;
  }
    if (checkForObstruction(newX, newY, map)) {
      guardPosition.direction = rotateDirection(guardPosition.direction)
    } else {
      if (!visitedPositions.has(`${newX},${newY}`)) {
        visitedPositions.add(`${newX},${newY}`)
        if (checkForLoopWithObstacleAt(newX, newY, map)) {
          possibleLoops++
        }
      };

      guardPosition.x = newX
      guardPosition.y = newY
    }
  }

  return String(possibleLoops)
}

const exampleInput = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "41",
      },
      {
        input: `
.#.....
......#
.......
.......
.......
#^.....
.....#.`,
        expected: '16'
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: "6",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})