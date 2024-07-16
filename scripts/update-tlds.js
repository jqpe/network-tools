import { writeFileSync } from 'node:fs'

const res = await fetch('https://data.iana.org/rdap/dns.json')
const json = await res.json()

if (json && json.services) {
  writeFileSync('./src/tlds.json', JSON.stringify(json.services))
  console.log('Updated public/tlds.json')
} else {
  console.error("Couldn't get tlds")
}
