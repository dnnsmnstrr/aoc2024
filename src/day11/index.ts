import run from "aocrunner"
import { splitInHalf, splitLines } from "../utils/index.js"

// If the stone is engraved with the number 0, 
// it is replaced by a stone engraved with the number 1.
// If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. 
// The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. 
// (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
// If none of the other rules apply, the stone is replaced by a new stone; 
// the old stone's number multiplied by 2024 is engraved on the new stone.
function applyRules(stone: string) {
  if (stone === '0') {
    return ['1']
  } else if (stone.length % 2 === 0) {
    return splitInHalf(stone).map(stone => stone.replace(/^0+/, '') || '0')
  } else {
    return [String(Number(stone) * 2024)]
  }
}

const part1 = (rawInput) => {
  const stones = splitLines(rawInput, { delimiter: ' ' })
  const iterations = []
  const blinks = 25
  let currentStones = [...stones]
  for (let blink = 0; blink < blinks; blink++) {
    const nextIteration = currentStones.reduce((acc, currentStone) => {
      acc.push(...applyRules(currentStone))
      return acc
    }, [])
    iterations.push(nextIteration)
    currentStones = [...nextIteration]
  }
  const result = currentStones.length
  return String(result)
}

const part2 = (rawInput) => {
  const stones = splitLines(rawInput, { delimiter: ' ' })
  const blinks = 75
  const bag = new Map()
  let currentStones = [...stones]
  for (let blink = 0; blink < blinks; blink++) {
    console.log(blink)
    const nextIteration = currentStones.reduce((acc, currentStone) => {
      const cacheKey = `${currentStone},${blink}`;
  
      if (bag.has(cacheKey)) {
        return [...acc, bag.get(cacheKey)];
      }
      const newStones = applyRules(currentStone)
      newStones.forEach(stone => {
        const currentKey = `${stone},${blink}`;
        bag.set(currentKey, stone);
      })
      acc.push(...newStones)
      return acc
    }, [])
    currentStones = [...nextIteration]
  }
  const result = currentStones.length
  return String(result)
}

const exampleInput = `
125 17
`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "55312",
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
  // onlyTests: true,
})