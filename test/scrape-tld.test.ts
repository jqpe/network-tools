import { parseDelegationRecordPage } from '~/services/iana.ts'
import html from './fixtures/iana-gtld.html?raw'

import { describe, expect, test } from 'vitest'

describe(parseDelegationRecordPage.name, () => {
  test('expected properties', () => {
    const page = parseDelegationRecordPage(html)

    expect(page.type).toMatch(/generic/i)
  })
})
