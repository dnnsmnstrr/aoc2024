import run from "aocrunner"
import { countOccurrences, splitLines } from "../utils/index.js"

function mapper(line: string) {
  return line.split('   ').map(Number)
}

function separateAndSort(array: number[][]) {
  const { left, right } = array.reduce<{ left: number[], right: number[]}>((acc, current) => {
    acc.left.push(current[0])
    acc.right.push(current[1])
    return acc
  }, { left: [], right: [] })
  return {
    left: left.sort(),
    right: right.sort()
  }
}

const part1 = (rawInput) => {
  const input = splitLines(rawInput, { mapper })
  const sortedLists = separateAndSort(input)
  const distances = []
  let totalDistance = 0
  for (let index = 0; index < sortedLists.left.length; index++) {
    const distance = Math.abs(sortedLists.right[index] - sortedLists.left[index]);
    distances.push(distance)
    totalDistance += distance
  }
  const result = totalDistance
  return String(result)
}

const part2 = (rawInput) => {
  const input = splitLines(rawInput, { mapper })
  const sortedLists = separateAndSort(input)
  let similarityScore = 0
  for (let index = 0; index < sortedLists.left.length; index++) {
    const currentLocationId = sortedLists.left[index];
    const occurrencess = countOccurrences(sortedLists.right, currentLocationId)
    similarityScore += currentLocationId * occurrencess
  }
  const result = similarityScore
  return String(result)
}

const exampleInput = `
3   4
4   3
2   5
1   3
3   9
3   3
`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "11",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: "31",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: !true,
})