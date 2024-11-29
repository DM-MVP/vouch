import dotenv from 'dotenv'
dotenv.config({ path: '.env.test' })

/**
 * Send alert message to Feishu/Lark
 * curl -X POST -H "Content-Type: application/json" \
 * -d '{"msg_type":"text","content":{"text":"request example"}}' \
 * https://open.feishu.cn/open-apis/bot/v2/hook/****
 */
export async function sendFeishuAlert(message) {
  if (!process.env.WEBHOOK_URL) {
    throw new Error('WEBHOOK_URL is not set')
  }
  await fetch(process.env.WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ msg_type: 'text', content: { text: message } })
  })
}