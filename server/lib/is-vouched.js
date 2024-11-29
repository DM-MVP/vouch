import Query from '@irys/query'

export async function isVouched({ address }) {
  const query = new Query()
  const results = await query
    .search("arweave:transactions")
    .from([process.env.VOUCHER_ADDRESS])
    .tags([
      { name: 'Data-Protocol', values: 'Vouch-For' },
      { name: 'Vouch-For', values: [address] },
      { name: 'Method', values: ["X"] },
    ])
  if (results.length > 0) {
    return { ok: true }
  } else {
    return { ok: false }
  }

}