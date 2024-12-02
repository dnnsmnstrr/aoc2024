import run from "aocrunner"
import { countOccurrencesWhere, splitLines } from "../utils/index.js"

function validateReport(report: number[]) {
  let isSafe = true
  // The levels are either all increasing or all decreasing.
  // Any two adjacent levels differ by at least one and at most three.
  let isDecreasing = report[1] < report[0]
  for (let index = 1; index < report.length; index++) {
    const currentLevel = report[index];
    const previousLevel = report[index - 1];
    const difference = Math.abs(currentLevel - previousLevel)

    if (difference < 1 || difference > 3) {
      isSafe = false
    }
    if (isDecreasing && currentLevel > previousLevel) {
      isSafe = false
    } 
    if (!isDecreasing && currentLevel < previousLevel) {
      isSafe = false
    }
  }
  return isSafe
}

function mapper(line: string) {
  const report = line.split(' ').map(Number)
  const isSafe = validateReport(report)
  return {
    report,
    isSafe
  }
}

const part1 = (rawInput) => {
  const reports = splitLines(rawInput, { mapper })
  const result = countOccurrencesWhere(reports, (report) => report.isSafe)
  return String(result)
}

function validateReportWithDampener(report: number[]) {
  let isSafe = validateReport(report)
  if (!isSafe) {
    report.forEach((_, index) => {
      const dampenedReport = report.slice(0, index).concat(report.slice(index + 1))
      const isSafeWhenDampened = validateReport(dampenedReport)
      if (isSafeWhenDampened) {
        isSafe = true
      }
    });
  }
  return isSafe
}

function mapperWithDampener(line: string, ) {
  const report = line.split(' ').map(Number)
  const isSafe = validateReportWithDampener(report)
  return {
    report,
    isSafe
  }
}
const part2 = (rawInput) => {
  const reports = splitLines(rawInput, { mapper: mapperWithDampener })
  const result = countOccurrencesWhere(reports, (report) => report.isSafe)
  return String(result)
}

const exampleInput = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`



run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "2",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: "4",
      },
      {
        input: '1 2 7 8 9',
        expected: "0",
      },
      {
        input: `
        48 46 47 49 51 54 56
        1 1 2 3 4 5
        1 2 3 4 5 5
        5 1 2 3 4 5
        1 4 3 2 1
        1 6 7 8 9
        1 2 3 4 3
        9 8 7 6 7
        7 10 8 10 11
        29 28 27 25 26 25 22 20`,
        expected: '10'
      } // https://www.reddit.com/r/adventofcode/comments/1h4shdu/2024_day_2_part2_edge_case_finder/
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})