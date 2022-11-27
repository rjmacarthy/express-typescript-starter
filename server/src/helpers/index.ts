import { sync } from 'glob'
import { union } from 'lodash'
import * as path from 'path'
import { forEach } from 'lodash'

export const globFiles = (location: string): string[] => {
  return union([], sync(location))
}
