import { sync } from 'glob'
import { union } from 'lodash'

export const globFiles = (location: string): string[] => {
  return union([], sync(location))
}
