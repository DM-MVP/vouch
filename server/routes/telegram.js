import { vouchTelegram } from '../lib/index.js'

export async function telegramCallback(req, res) {
  console.log('telegram callback address: ', req.session.address)
  console.log('telegram callback req: ', req.query)
  try {
    await vouchTelegram(req.session.address, req.query.user)
  } catch(err) {
    console.error(err)
    if (err.message === "already vouched") {
      res.redirect(req.session.callback + '#/success?msg=' + err.message + '&address=' + req.session.address)
    } else {
      res.redirect(req.session.callback + '#/error?msg=' + err.message)
    }
  } finally {
    console.log('-------')
  }
}
