import run from "aocrunner"
import { splitLines } from "../utils/index.js"

function parseDiskMap(input: string) {
  let currentId = 0
  let freeSpace = 0
  const diskRepresentation = []
  const fileBlocks: number[] = []
  input.split('').forEach((digit, index) => {
    const isFile = index % 2 === 0
    const digitNumber = Number(digit)
    if (isFile) {
      const newFileBlocks = Array(digitNumber).fill(currentId)
      diskRepresentation.push(...newFileBlocks)
      fileBlocks.push(...newFileBlocks)
      currentId++
    } else {
      diskRepresentation.push(...Array(digitNumber).fill('.'))
      freeSpace += digitNumber
    }
  })
  return { diskRepresentation, freeSpace, fileBlocks }
}

function compactFiles(diskRepresentation: Array<string|number>, fileBlocks: number[], freeSpace: number): number[] {
  const totalFileSize = diskRepresentation.length - freeSpace
  let newDiskRepresentation = [...diskRepresentation]
  diskRepresentation.forEach((block, index) => {
    if (block === '.') {
      const lastFileBlock = fileBlocks.pop()
      newDiskRepresentation[index] = lastFileBlock
      return
    }

  })
  return newDiskRepresentation.slice(0, totalFileSize).map(Number)
}

function calculateChecksum(fileIds: number[]) {
  let checksum = 0
  fileIds.forEach((id, index) => {
    checksum += id * index
  })
  return checksum
}

const part1 = (rawInput) => {
  const { diskRepresentation, freeSpace, fileBlocks } = parseDiskMap(rawInput)
  const compactedFileBlocks = compactFiles(diskRepresentation, fileBlocks, freeSpace)
  const filesystemChecksum = calculateChecksum(compactedFileBlocks)
  return String(filesystemChecksum)
}

const part2 = (rawInput) => {

  const result = ''
  return String(result)
}

const exampleInput = `
2333133121414131402
`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "1928",
      },
      {
        input: '12345',
        expected: "60",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: "1928",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})