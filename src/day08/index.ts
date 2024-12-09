import run from "aocrunner"
import { makeMatrix, splitLines } from "../utils/index.js"


const part1 = (rawInput) => {
  const frequencies = new Set()
  function mapper(line: string) {
    const row = line.split('')
    row.forEach(point => {
      if (point !== '.') frequencies.add(point)
    })
    return row
  }
  const antennaMap = splitLines(rawInput, { mapper })
  console.log(frequencies, antennaMap)
  const result = ''
  return String(result)
}

const part2 = (rawInput) => {
  const input = splitLines(rawInput, { mapper: makeMatrix() })

  const result = ''
  return String(result)
}

const exampleInput = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: "",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})