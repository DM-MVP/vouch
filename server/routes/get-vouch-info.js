import { dryrun, extractResult } from '../lib/ao.js'
// can check session, if valid, then validate a signed message
// and then vouch the user

export async function getVouchInfo(req, res) {
  const processId = process.env.VOUCH_DAO_PROCESS_ID || 'L1CWfW_LAWA7UY_zf9CFwbnt3wLuVMEueylFi_1YACo'
  
  const tags = [
    { name: 'Action', value: 'Get-Vouches' },
    { name: 'ID', value: req.query.address }
  ];
  console.log("tags: ", tags)
  console.log("processId: ", processId)
  
  const ret = extractResult(await dryrun({
    process: processId,
    tags
  }))

  console.log('------\nget vouch info of address: ', req.query.address)
  console.log('result: ', ret)
  console.log('------')

  return res.send(ret)
}
