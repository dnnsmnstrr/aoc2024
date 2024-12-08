import run from "aocrunner"
import { add, splitLines } from "../utils/index.js"

function mapper(line: string): [number, number[]] {
  const [result, values] = line.split(': ')
  return [Number(result), values.split(' ').map(Number)]
}

const part1 = (rawInput) => {
  const equations = splitLines(rawInput, { mapper })
  const operators = ['+', '*']

  const possibleEquations = equations.filter(equations => {
    const [result, values] = equations
    const combinations = Math.pow(operators.length, values.length)
    for (let i = 0; i < combinations; i++) {
      let expression = values.map((value, index) => {
        if (index === values.length - 1) return value
        const operatorIndex = Math.floor(i / Math.pow(operators.length, index)) % operators.length
        return `${value}${operators[operatorIndex]}`
      }).join('')
      const expressionParts = expression.split(/(\+|\*)/g);
      let currentResult = Number(expressionParts[0]);
      for (let i = 1; i < expressionParts.length; i += 2) {
        const operator = expressionParts[i];
        const operand = Number(expressionParts[i + 1]);
        if (operator === '+') {
          currentResult += operand;
        } else if (operator === '*') {
          currentResult *= operand;
        }
      }
      if (currentResult === Number(result)) {
        return true
      }
    }
    return false
  })

  const result = add(...possibleEquations.map(equation => equation[0]))
  return String(result)
}

const part2 = (rawInput) => {
  const input = splitLines(rawInput, { mapper })

  const result = ''
  return String(result)
}

const exampleInput = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "3749",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: "11387",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})