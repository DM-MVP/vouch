import express from 'express'
import cors from 'cors'
import session from 'express-session'

import { status } from './routes/status.js'
import { login, callback } from './routes/x.js'
import { getVouchInfo } from './routes/get-vouch-info.js'

const app = express()

// Simple CORS configuration for public API
app.use(cors())
app.set('trust proxy', true)
app.use(session({
  secret: 'chocolate milk',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    sameSite: 'none' // Important for cross-origin requests
  }
}))

/** Routes */
app.get('/', status)
app.get('/x', login)
app.get('/x/callback', callback)
app.get('/vouch/info', cors({
  origin: '*',
  methods: ['GET']
}), getVouchInfo)

app.listen(8080)