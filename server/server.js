import express from 'express'
import cors from 'cors'
import session from 'express-session'

import { status } from './routes/status.js'
import { login, callback } from './routes/x.js'
import { getVouchInfo } from './routes/get-vouch-info.js'

const app = express()

app.use(cors())
app.set('trust proxy', 1)
app.use(session({
  secret: 'chocolate milk',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

/** Routes */
app.get('/', status)
app.get('/x', login)
app.get('/x/callback', callback)
app.get('/vouch/info', cors(), getVouchInfo)

app.listen(8080)