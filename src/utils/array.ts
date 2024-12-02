// Array helper methods
export const sorting = {
  ascending: <T>(a: T, b: T) => Number(a) - Number(b),
  descending: <T>(a: T, b: T) => Number(b) - Number(a),
  alphabetically: (a: string, b: string) => a.localeCompare(b),
}

export function sortByKey(values: any[], key: string) {
  return values.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1
    }

    if (a[key] > b[key]) {
      return 1
    }

    return 0
  })
}

/**
 * @typedef {Object} SplitOptions
 * @property {string|false} [delimiter='\n'] - a delimiter to split the input by (false will omit the splitting and return the entire input)
 * @property {funcion(string, number, string[]): *|false} [mapper=Number] - a function that will be used to map the splitted input (false will omit the mapping and return the splitted input)
 */
interface SplitOptions<T> {
  delimiter?: string;
  disableTrim?: boolean;
  mapper?: ((e: string, i: number, a: string[]) => T) | false;
}

export const splitLines = <T = string>(input: string, options?: SplitOptions<T>): T[] => {
  let resultLines = input.split(options?.delimiter ?? '\n')
  if (!options?.disableTrim) {
    const trimmedLines = resultLines.map((line) => line.trim())
    const filteredLines = trimmedLines.filter(Boolean)
    resultLines = filteredLines
  }
  const mapper = options?.mapper || (<T>(value): T => value)
  return resultLines.map<T>((...args) => mapper(...args))
}

export const  makeMatrix = (delimiter: string = '') => (line: string): string[] => {
  return line.split(delimiter)
}

export const splitIntoChunks = (array: Array<any>, chunkSize: number) => {
  const chunks = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }
  return chunks
}

export function hasDuplicates<T>(array: Array<T>) {
    return (new Set(array)).size !== array.length;
}

export function countOccurrences<T>(array: Array<T>, element: T): number {
  return array.reduce((count, current) => (current === element ? count + 1 : count), 0)
}

export function countOccurrencesWhere<T>(array: Array<T>, callback: (element: T) => boolean ): number {
  return array.reduce((count, current) => (callback(current) ? count + 1 : count), 0)
}

