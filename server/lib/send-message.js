import { createDataItemSigner, message, result } from '@permaweb/aoconnect'
import fs from 'fs'
import { sendFeishuAlert } from './feishu.js'

const key = JSON.parse(fs.readFileSync(process.env.VOUCHER_WALLET, 'utf-8'))


export async function sendMessage({ address, transaction, username, value }) {
  console.log('SEND TO AOS: ')
  const processId = process.env.VOUCH_DAO_PROCESS_ID || 'L1CWfW_LAWA7UY_zf9CFwbnt3wLuVMEueylFi_1YACo'
  const tags = [
    { name: 'Data-Protocol', value: 'Vouch' },
    { name: 'Vouch-For', value: address },
    { name: 'Method', value: 'X' },
    { name: 'Confidence-Value', value: String(value) + '-USD' },
    { name: 'Identifier', value: username }
  ];
  console.log("tags: ", tags)
  // console.log("processId: ", processId)
  // console.log("voucher wallet address: ", key)
  const messageId = await message({
    process: processId,
    tags,
    signer: createDataItemSigner(key)
  })
  const res = await result({
    process: processId,
    message: messageId
  })
  console.log('messageId', messageId)
  console.log('-------')

  if (res.Error) {
    await sendFeishuAlert(`Error in send message to AO: ${res.Error}\n${JSON.stringify(tags)}`)
    throw new Error(`Error in send message to AO: ${res.Error}`)
  }
  return { address, transaction, value }
}
