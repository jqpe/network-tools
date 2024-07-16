import { useCallback } from 'react'

/**
 * Run `callback` if `value` is truthy and not a zero-byte string
 */
export const useIfDefined = <T, R>(
  callback: (value: T) => R,
  value: T | undefined
): R | undefined => {
  return useCallback(() => {
    return value && value !== '' ? callback(value) : undefined
  }, [value, callback])()
}
