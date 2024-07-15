import { parseDelegationRecordPage } from '~/services/iana.ts'
import html from './fixtures/iana-gtld.html?raw'

import { describe, expect, test } from 'vitest'

describe(parseDelegationRecordPage.name, () => {
  test('expected properties', () => {
    expect(parseDelegationRecordPage(html)).toStrictEqual({ isGTLD: true })
  })
})
