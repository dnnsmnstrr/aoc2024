# 🎄 Advent of Code 2024 - day 2 🎄

## Info

Task description: [link](https://adventofcode.com/2024/day/2)

![](./dampener.png)

## Notes


- Got stuck trying to include the dampening logic in my original report validation function
- Read some Reddit comments and didn't really get what everybody meant when they brute force part 2
- Finally got it after giving up on my first approach and just iterating through all possible dampened reports to look for potential safe reports

This didn't work:
```js
function validateReport(report: number[], enableProblemDampener = false) {
  let isSafe = true
  let dampeningApplied = false
  let dampeningJustApplied = false
  // The levels are either all increasing or all decreasing.
  // Any two adjacent levels differ by at least one and at most three.
  let isDecreasing = report[1] < report[0]
  for (let index = 1; index < report.length; index++) {
    
    const currentLevel = report[index];
    const previousLevel = report[index - (dampeningApplied && !dampeningJustApplied ? 2 : 1)];
    const difference = Math.abs(currentLevel - previousLevel)
    if (dampeningApplied && !dampeningJustApplied) {
      dampeningJustApplied = true
    }
    if (difference < 1 || difference > 3) {
      isSafe = enableProblemDampener && !dampeningApplied ? true : false
      dampeningApplied = enableProblemDampener ? true : false
    }
    if (isDecreasing && currentLevel > previousLevel) {
      isSafe = enableProblemDampener && !dampeningApplied ? true : false
      dampeningApplied = enableProblemDampener ? true : false
    } 
    if (!isDecreasing && currentLevel < previousLevel) {
      isSafe = enableProblemDampener && !dampeningApplied ? true : false
      dampeningApplied = enableProblemDampener ? true : false
    }
  }
  return isSafe
}
```