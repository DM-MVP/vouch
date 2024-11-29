import { test } from 'node:test'
import { sendFeishuAlert } from '../lib/feishu.js'

test('send feishu alert', async () => {
  await sendFeishuAlert('test')
})
