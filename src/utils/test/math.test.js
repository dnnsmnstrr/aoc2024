import { expect, test } from 'vitest'
import { add } from '../math'

test('should add numbers', (t) => {
  expect(add(0)).toBe(0)
  expect(add(1, 2)).toBe(3)
  expect(add(1, 2, 3)).toBe(6)
  expect(add(1, 2, 3, 4)).toBe(10)
  expect(add(1, 2, 3, 4, -5)).toBe(5)
})
