import { message, result, createDataItemSigner } from './lib/ao.js'
import fs from 'fs'
import { withTimeout } from './lib/ao.js'
import dotenv from 'dotenv'
dotenv.config()

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

const key = JSON.parse(fs.readFileSync(process.env.VOUCHER_WALLET, 'utf-8'))
try {
  // vouch for address
  const messageId = await withTimeout(message({
    process: processId,
    signer: createDataItemSigner(key),
    tags: [
      { name: 'Data-Protocol', value: 'Vouch' },
      { name: 'Vouch-For', value: address },
      { name: 'Method', value: 'X' },
      { name: 'Confidence-Value', value: '0-USD' },
      { name: 'Identifier', value: handle }
    ]
  }), 5000)
  console.log('messageId: ', messageId)

  try {
    const res = await withTimeout(result({
      process: processId,
      message: messageId
    }), 10000)
    console.log('vouch result: ', res)

    if (res.Messages.length > 0) {
      if (res.Messages.find(msg => msg.Data === 'Duplicate Identifier')) {
        throw new Error('Duplicate Identifier: This twitter account has already been vouched for another address, please try another twitter account.')
      }
      console.log('Vouch success!')
    } else {
      console.error('Vouch failed!')
    }
  } catch (e) {
    console.error('Vouch error:', e.message)
    process.exit(1) // Force exit on timeout
  }
} catch (e) {
  console.error('Error:', e.message)
  process.exit(1)
}
