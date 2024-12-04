import run from "aocrunner"
import { splitLines } from "../utils/index.js"

function mapper(line: string) {
  return line
}

const part1 = (rawInput) => {
  const input = splitLines(rawInput.replaceAll('\n', ''), { mapper, delimiter: 'mul' })
  const validInstructions = input.filter(instruction => {
    return instruction.startsWith('(') && /\(([^)]+)\)/.test(instruction)
  }).map(instruction => {
    const regex = /\(([^)]+)\)/;
    const match = instruction.match(regex);
    return match ? match[1].split(',').map(Number) : [];
  })
  
  const result = validInstructions.reduce((acc, currentInstruction) => {
    if (!currentInstruction || !currentInstruction[0] || !currentInstruction[1]) return acc
    const product = currentInstruction[0] * currentInstruction[1]
    return acc + product
  }, 0)
  return String(result)
}

const part2 = (rawInput) => {
  const input = splitLines(rawInput.replaceAll('\n', ''), { mapper, delimiter: 'mul' })
  
  const regex = /^\((\d+),(\d+)\)/;
  const result = input.reduce((acc, instruction) => {
    const match = instruction.match(regex);
    const currentInstruction = match ? match.slice(1).map(Number) : [];
    
    if (acc.instructionsEnabled && currentInstruction.length === 2) {
      const product = currentInstruction[0] * currentInstruction[1];
      acc.sum += product;
    }
    
    if (instruction.includes(`don't()`)) {
      acc.instructionsEnabled = false;
    } else if (instruction.includes(`do()`)) {
      acc.instructionsEnabled = true;
    }
    
    return acc;
  }, { sum: 0, instructionsEnabled: true });
  
  return String(result.sum);
}

const exampleInput = `
xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "161",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `don't()don't()do()mul(1,2)`,
        expected: "2",
      },
      {
        input: `mul(1,2)don't()mul(3,4)do()mul(5,6)`,
        expected: "32",  // 1*2 + 5*6 = 2 + 30
      },
      {
        input: `don't()mul(1,2)mul(3,4)do()mul(5,6)`,
        expected: "30",  // Only 5*6 should count
      },
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: "48",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})