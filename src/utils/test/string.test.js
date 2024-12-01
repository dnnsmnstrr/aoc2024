import { expect, test } from 'vitest'
import { splitInHalf, isUpperCase } from '../string'

test('Should split string in half', () => {
  expect(splitInHalf('ab')).toStrictEqual(['a', 'b'])
  expect(splitInHalf('abcd')).toStrictEqual(['ab', 'cd'])
  expect(splitInHalf('')).toStrictEqual(['', ''])
  expect(splitInHalf('abc')).toStrictEqual(['a', 'bc'])
})

test('Should handle edge cases for splitInHalf', () => {
  expect(splitInHalf(null)).toStrictEqual(['', ''])
  expect(splitInHalf(undefined)).toStrictEqual(['', ''])
  expect(splitInHalf('a')).toStrictEqual(['a', ''])
})

test('Should check if string is uppercase', () => {
  expect(isUpperCase('AB')).toBe(true)
  expect(isUpperCase('Ab')).toBe(false)
  expect(isUpperCase('aB')).toBe(false)
  expect(isUpperCase('')).toBe(true)
  expect(isUpperCase('A')).toBe(true)
})

test('Should handle edge cases for isUpperCase', () => {
  expect(isUpperCase(null)).toBe(false)
  expect(isUpperCase(undefined)).toBe(false)
  expect(isUpperCase(' ')).toBe(false)
  expect(isUpperCase('!@#')).toBe(false)
})
