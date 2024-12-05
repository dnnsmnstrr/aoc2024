import run from "aocrunner"
import { add, splitLines } from "../utils/index.js"

function mapper(line: string) {
  return line.split('\n').map(pageRule => pageRule.split(pageRule.includes(',') ? ',' : '|').map(Number))
}

const part1 = (rawInput) => {
  const [orderingRules, pagesUpdates] = splitLines(rawInput, { mapper, delimiter: '\n\n' })
  const ruleMap = orderingRules.reduce((acc, currentRule) => {
    if (acc[currentRule[0]]) {
      acc[currentRule[0]].push(currentRule[1])
    } else {
      acc[currentRule[0]] = [currentRule[1]]
    }
    return acc
  }, {})
  // console.log(ruleMap)
  const filteredUpdates = pagesUpdates.filter(updates => {
    let isUpdateCorrect = true
    for (let index = 0; index < updates.length; index++) {
      const element = updates[index];
      const restUpdates = updates.slice(index + 1);
      const isRightOrder = restUpdates.every((update) => {
        
        return ruleMap[element] && ruleMap[element].includes(update)
      })
      if (!isRightOrder) isUpdateCorrect = false
    }
    return isUpdateCorrect
  })
  const middleNumbers = filteredUpdates.map((update) => {
    const middleIndex = Math.floor(update.length / 2)
    return update[middleIndex]
  })

  const result = add(...middleNumbers)
  return String(result)
}

const part2 = (rawInput) => {
  const [orderingRules, pagesUpdates] = splitLines(rawInput, { mapper, delimiter: '\n\n' })

  const ruleMap = orderingRules.reduce((acc, currentRule) => {
    if (acc[currentRule[0]]) {
      acc[currentRule[0]].push(currentRule[1])
    } else {
      acc[currentRule[0]] = [currentRule[1]]
    }
    return acc
  }, {})

  const filteredUpdates = pagesUpdates.filter(updates => {
    let isUpdateCorrect = true
    for (let index = 0; index < updates.length; index++) {
      const element = updates[index];
      const restUpdates = updates.slice(index + 1);
      const isRightOrder = restUpdates.every((update) => {
        return ruleMap[element] && ruleMap[element].includes(update)
      })
      if (!isRightOrder) isUpdateCorrect = false
    }
    return !isUpdateCorrect // get the incorrectly-ordered updates
  })

  const middleNumbers = filteredUpdates.map((update) => {
    const updateRules = []
    for (let i = 0; i < update.length; i++) {
      if (update[i] && ruleMap[update[i]]) {
        updateRules.push({
          update: update[i],
          rules: ruleMap[update[i]],
          ruleCount: ruleMap[update[i]].length
        })
      }
    }
    const sortedUpdateRules = updateRules.sort((a, b) => b.ruleCount - a.ruleCount)
    const offset = sortedUpdateRules[sortedUpdateRules.length - 1].rules.some(rule => update.includes(rule)) ? 1 : 0
    const middleIndex = Math.floor((sortedUpdateRules.length + offset) / 2)
    console.log(update, sortedUpdateRules, offset, middleIndex)
    return sortedUpdateRules[middleIndex].update
  })
  console.log(middleNumbers)

  const result = add(...middleNumbers)
  return String(result)
}

const exampleInput = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "143",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: "123",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})