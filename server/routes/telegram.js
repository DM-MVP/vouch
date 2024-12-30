import { vouchTelegram } from '../lib/index.js'

export async function telegramCallback(req, res) {
  console.log('telegram callback req: ', req.query)
  /**
   * example query:
   * {

  id: '1623571692',

  first_name: 'xxx',

  username: 'xxx_username',

  photo_url: 'https://t.me/i/userpic/320/Z5zPgpUp4lvJTQxfYob_Av5BRMnOx5AecDhDi5QsuZE.jpg',

  auth_date: '1735550832',

  hash: 'xxxx35154207eccd5xx847425c8a133b6bfxd5b98xxce50bf8ab20e4fdxxxxxx'

}
   */
  try {
    if (!req.query.address || !req.query.username) {
      throw new Error("address or username is required")
    }
    await vouchTelegram(req.query.address, req.query.username, 0)
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
