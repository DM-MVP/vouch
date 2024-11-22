import { message, result, createDataItemSigner } from './lib/ao.js'
import fs from 'fs'

const processId = process.env.VOUCH_DAO_PROCESS_ID || 'L1CWfW_LAWA7UY_zf9CFwbnt3wLuVMEueylFi_1YACo'

// use command line args
const address = process.argv[2]
const handle = process.argv[3]
console.log('address: ', address)
console.log('handle: ', handle)

if (!address || !handle) {
  console.error('Usage: node manual-vouch.js <address> <handle>')
  process.exit(1)
}

const key = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'))
// vouch for address
const messageId = await message({
  process: processId,
  signer: createDataItemSigner(key),
  tags: [
    { name: 'Data-Protocol', value: 'Vouch' },
    { name: 'Vouch-For', value: address },
    { name: 'Method', value: 'X' },
    { name: 'Confidence-Value', value: '0-USD' },
    { name: 'Identifier', value: handle }
  ]
})

const res = await result({
  process: processId,
  message: messageId
})

console.log(res)