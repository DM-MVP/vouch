import { sub, isBefore, parseISO } from 'date-fns'
//import isBefore from 'date-fns/isBefore'
import { of, fromPromise, Rejected, Resolved } from 'hyper-async'
import { dispatch } from '../lib/dispatch.js'
// import { writeInteraction } from '../lib/write-interaction.js'
import { isVouched } from '../lib/is-vouched.js'
import { sendMessage } from './send-message.js'
import { sendFeishuAlert } from './feishu.js'

export async function vouch(startdate, address, username, value) {
  const minimumMonths = 6
  const sixMonthsAgo = sub(new Date(), { months: minimumMonths })
  if (isBefore(parseISO(startdate), sixMonthsAgo)) {
    return of({ address, username, value })
      // check if already vouched
      // disable for now, because the function isVouched is fetching transactions from gql endpoint, but not from AO process,
      // so it's possible to vouch failed but the function still return { ok: true }.
      // .chain(ctx => fromPromise(isVouched)(ctx)
      //   .chain(r => r.ok ? Rejected({ message: 'already vouched' }) : Resolved(ctx))
      // )
      .chain(fromPromise(dispatch))
      .chain(fromPromise(sendMessage))
      // .chain(fromPromise(writeInteraction))

      .toPromise()
  } else {
    console.log('==========')
    console.log(`address: ${address}`)
    console.log(`unqualified twitter handle: ${username}`)
    console.log('==========')
    // send alert to feishu
    await sendFeishuAlert(`Not qualified Twitter account:\n${JSON.stringify({ address, username })}`)
    return Promise.reject({ message: `Not qualified: Your Twitter account created less than ${minimumMonths} months.` })
  }
}