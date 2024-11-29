export function status(req, res) {
  return res.send({
    name: 'vouch-x service',
    version: '1.2.0',
    vouchProcessId: process.env.VOUCH_DAO_PROCESS_ID,
    voucherAddress: process.env.VOUCHER_ADDRESS,
    voucherName: process.env.VOUCHER_NAME
  })
}