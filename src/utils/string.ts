// String helpers

export const splitInHalf = (value: string) => {
  if (!value || !value.length) return ['', '']
  if (value.length === 1) return [value, '']
  const half = value.length / 2
  return [value.slice(0, half), value.slice(half)]
}

export const isUpperCase = (value: string) => /^[A-Z]*$/.test(value)

export function isNumeric(value: string){
  return /^\d+$/.test(value);
}

export function extractNumbers<T extends boolean = true> (stringWithNumbers: string, parseToNumber?: T): Array<T extends true ? number : string> {
  let numbers: Array<string|number> = stringWithNumbers.match(/\d+/g) as Array<string>
  if (parseToNumber && numbers.length) {
    numbers = numbers.map(Number)
  }
  return numbers as Array<T extends true ? number : string>
}