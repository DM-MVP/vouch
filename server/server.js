import express from 'express'
import cors from 'cors'

import { status } from './routes/status.js'
import { login, callback } from './routes/x.js'
import { getVouchInfo } from './routes/get-vouch-info.js'

const app = express()

// Simple CORS configuration for public API
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS']
}))
app.set('trust proxy', true)

/** Routes */
app.get('/', status)
app.get('/x', login)
app.get('/x/callback', callback)
app.get('/vouch/info', getVouchInfo)

app.listen(8080)