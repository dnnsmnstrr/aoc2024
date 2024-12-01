// Math helpers
export const add = (...values: Array<number>) => values.reduce((sum, value) => sum + Number(value || 0), 0)
export const subtract = (...values: Array<number>) => values.reduce((sum, value) => sum - Number(value || 0), 0)
export const multiply = (...values: Array<number>) => values.reduce((sum, value) => sum * Number(value || 0), 1)
export const divide = (...values: Array<number>) => values.reduce((sum, value) => sum / Number(value || 1), 1)
