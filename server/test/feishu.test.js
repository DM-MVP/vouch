import { test } from 'node:test'
import { sendFeishuAlert } from '../lib/feishu.js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.test' })

test('send feishu alert', async () => {
  await sendFeishuAlert('test')
})
