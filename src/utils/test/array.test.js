import { expect, test } from 'vitest'
import { makeMatrix, sorting, splitIntoChunks, splitLines, countOccurrences } from '../array'

test('should sort numbers ascending', () => {
  expect([5, 4, 3, 2, 1].sort(sorting.ascending)).toStrictEqual([1, 2, 3, 4, 5])
  expect([5, 1, 4, 2, 3].sort(sorting.ascending)).toStrictEqual([1, 2, 3, 4, 5])
  expect([1, -1, 0].sort(sorting.ascending)).toStrictEqual([-1, 0, 1])
})

test('should sort numbers descending', () => {
  expect([1, 2, 3].sort(sorting.descending)).toStrictEqual([3, 2, 1])
  expect([1, 4, 2, 3].sort(sorting.descending)).toStrictEqual([4, 3, 2, 1])
})

test('should sort strings', () => {
  expect(['a', 'b', 'c'].sort(sorting.alphabetically)).toStrictEqual(['a', 'b', 'c'])
  expect(['c', 'b', 'a'].sort(sorting.alphabetically)).toStrictEqual(['a', 'b', 'c'])
  expect(['a', 'c', 'b'].sort(sorting.alphabetically)).toStrictEqual(['a', 'b', 'c'])
})

test('should split array into chunks', () => {
  expect(splitIntoChunks([1, 2, 3, 4, 5], 2)).toStrictEqual([[1, 2], [3, 4], [5]])
  expect(splitIntoChunks([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)).toStrictEqual([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
  expect(splitIntoChunks([1, 2, 3, 4, 5], 5)).toStrictEqual([[1, 2, 3, 4, 5]])
  expect(splitIntoChunks([1, 2, 3, 4, 5], 6)).toStrictEqual([[1, 2, 3, 4, 5]])
})

test('should split lines', () => {
  expect(splitLines('')).toStrictEqual([])
  expect(splitLines(`a`)).toStrictEqual(['a'])
  expect(
    splitLines(`a
  b`),
  ).toStrictEqual(['a', 'b'])
  expect(
    splitLines(`
  a
  b
  c
  `),
  ).toStrictEqual(['a', 'b', 'c'])
})

test('should split lines with options', () => {
  const multipleLines = 'a\nb\nc'
  expect(splitLines(multipleLines, { trim: true })).toStrictEqual(['a', 'b', 'c'])

  expect(splitLines(`a,b,c`, { delimiter: ',' })).toStrictEqual(['a', 'b', 'c'])
  expect(splitLines(`a, b,c `, { delimiter: ',', trim: true})).toStrictEqual(['a', 'b', 'c'])
})

test('should support trim option for splitLines', () => {
  expect(splitLines(' ')).toStrictEqual([]) // trims by default
  expect(splitLines(' ', { disableTrim: false })).toStrictEqual([])
  expect(splitLines(`a `, { disableTrim: true })).toStrictEqual(['a '])
})

test('should allow passing mapper function in splitLines options', () => {
  const multipleLines = `
    1
    2
    3
  `
  const mapper = (value) => Number(value) + 1
  expect(splitLines(multipleLines, { trim: true, mapper })).toStrictEqual([2,3,4])
})

test('should split grid of text into matrix', () => {
  const multipleLines = `
    123
    456
    789
  `
  const matrix = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9']
  ]
  expect(splitLines(multipleLines, { mapper: makeMatrix() })).toStrictEqual(matrix)
})

test('should count occurrences of elements in array', () => {
  expect(countOccurrences([1, 2, 2, 3, 2], 2)).toBe(3)
  expect(countOccurrences(['a', 'b', 'a', 'c'], 'a')).toBe(2)
  expect(countOccurrences([1, 2, 3], 4)).toBe(0)
  expect(countOccurrences([], 1)).toBe(0)
})

