import { dryrun, extractResult, withTimeout } from '../lib/ao.js'

// can check session, if valid, then validate a signed message
// and then vouch the user

export async function getVouchInfo(req, res) {
  const processId = process.env.VOUCH_DAO_PROCESS_ID || 'L1CWfW_LAWA7UY_zf9CFwbnt3wLuVMEueylFi_1YACo'
  
  const tags = [
    { name: 'Action', value: 'Get-Vouches' },
    { name: 'ID', value: req.query.address }
  ];
  
  try {
    const ret = await withTimeout(
      dryrun({
        process: processId,
        tags
      }),
      5000
    );
    const result = extractResult(ret);

    // console.log('------\nget vouch info of address: ', req.query.address)
    // console.log('result: ', ret)
    // console.log('------')

    return res.send(result)
  } catch (e) {
    console.error('Error in getVouchInfo: ', e)
    return res.status(500).send({ error: e.message })
  }
}
