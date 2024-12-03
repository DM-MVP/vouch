import { connect, createDataItemSigner } from '@permaweb/aoconnect'
import { get } from 'lodash-es'

const { result, results, message, spawn, monitor, unmonitor, dryrun } = connect(
  {
    MU_URL: 'https://mu.ao-testnet.xyz',
    CU_URL: 'https://cu148.ao-testnet.xyz',
    GATEWAY_URL: 'https://arweave.net',
  },
)

export { result, results, message, spawn, monitor, unmonitor, dryrun, createDataItemSigner }

export function checkResult(res) {
  if (res.Error) {
    throw new Error(res.Error)
  }

  const tags = get(res, 'Messages[0].Tags')
  if (tags) {
    const errorTag = tags.find(tag => tag.name === 'Error')?.value
    if (errorTag) {
      throw new Error(errorTag)
    }
  }
  return true
}

export function extractResult(result) {
  checkResult(result)

  if (!result?.Messages?.[0]?.Data) {
    console.error('Failed to extract data from result.Messages', result)
    if (result.Output && result.Output.print) {
      console.error(result.Output.data)
    }
    throw new Error('Failed to extract data from result.Messages.')
  }

  return result.Messages[0].Data
}

export function withTimeout(promise, timeoutMs) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Operation timed out')), timeoutMs);
  });
  return Promise.race([promise, timeoutPromise]);
}