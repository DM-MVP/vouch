import express from 'express'
import session from 'express-session'
import cors from 'cors'

import { status } from './routes/status.js'
import { login, callback } from './routes/x.js'
import { telegramCallback } from './routes/telegram.js'
import { getVouchInfo } from './routes/get-vouch-info.js'

const app = express()

// allow all origins
app.use(cors({
  origin: '*'
}))
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
app.get('/vouch/info', getVouchInfo)
app.get('/telegram/callback', telegramCallback)

app.listen(8080)