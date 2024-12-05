import run from "aocrunner"
import { add, splitLines } from "../utils/index.js"

function mapper(line: string) {
  return line.split('\n').map(pageRule => pageRule.split(pageRule.includes(',') ? ',' : '|').map(Number))
}

type RuleBook = Record<number, number[]>

function checkRightOrder(updates: number[], ruleBook: RuleBook) {
  const firstUpdate = updates[0];
  const restUpdates = updates.slice(1);
  const isRightOrder = restUpdates.every((update) => {
    return ruleBook[firstUpdate] && ruleBook[firstUpdate].includes(update)
  })
  return isRightOrder
}

function createRuleBook(rules: number[][]) {
  const ruleBook = rules.reduce((acc, currentRule) => {
    if (acc[currentRule[0]]) {
      acc[currentRule[0]].push(currentRule[1])
    } else {
      acc[currentRule[0]] = [currentRule[1]]
    }
    return acc
  }, {})
  return ruleBook
}

const part1 = (rawInput) => {
  const [orderingRules, pagesUpdates] = splitLines(rawInput, { mapper, delimiter: '\n\n' })
  const ruleBook = createRuleBook(orderingRules)
  const filteredUpdates = pagesUpdates.filter(updates => {
    let isUpdateCorrect = true
    for (let index = 0; index < updates.length; index++) {
      if (!checkRightOrder(updates.slice(index), ruleBook)) isUpdateCorrect = false
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

const insert = (arr: number[], index: number, newItem: number) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
];

const part2 = (rawInput) => {
  const [orderingRules, pagesUpdates] = splitLines(rawInput, { mapper, delimiter: '\n\n' })

  const ruleBook = createRuleBook(orderingRules)

  const invalidUpdates = pagesUpdates.filter(updates => {
    let isUpdateCorrect = true
    for (let index = 0; index < updates.length; index++) {
      if (!checkRightOrder(updates.slice(index), ruleBook)) isUpdateCorrect = false
    }
    return !isUpdateCorrect // get the incorrectly-ordered updates
  })

  
  let fixedLines = [];
  // stole this from https://github.com/Trifall/advent-of-code-2024/blob/main/src/day5/day5.ts
  for (let update of invalidUpdates) {
    let values = update;
    for (let i = 0; i < values.length; i++) {
      for (let j = i + 1; j < values.length; j++) {
        if (ruleBook[values[j]]?.includes(values[i])) {
          values = insert(values, i, values.splice(j, 1)[0]);
        }
      }
    }
    fixedLines.push(values);
  }
  
  const middleNumbers = fixedLines.map((update) => {
    const middleIndex = Math.floor(update.length / 2)
    return update[middleIndex]
  })

  return String(add(...middleNumbers))
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