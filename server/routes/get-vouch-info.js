import { createDataItemSigner, messageResultParsed, withTimeout } from '../lib/ao.js'
import fs from 'fs'

const key = JSON.parse(fs.readFileSync(process.env.VOUCHER_WALLET, 'utf-8'))

// can check session, if valid, then validate a signed message
// and then vouch the user

export async function getVouchInfo(req, res) {
  const processId = process.env.VOUCH_DAO_PROCESS_ID || 'L1CWfW_LAWA7UY_zf9CFwbnt3wLuVMEueylFi_1YACo'
  
  const tags = [
    { name: 'Action', value: 'Get-Vouches' },
    { name: 'ID', value: req.query.address }
  ];
  
  try {
    const result = await withTimeout(
      messageResultParsed({
        process: processId,
        tags,
        signer: createDataItemSigner(key)
      }),
      25000
    );

    // console.log('------\nget vouch info of address: ', req.query.address)
    // console.log('result: ', ret)
    // console.log('------')

    return res.send(result)
  } catch (e) {
    console.error('Error in getVouchInfo: ', e)
    return res.status(500).send({ error: e.message })
  }
}
