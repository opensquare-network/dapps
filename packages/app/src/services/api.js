import { ApiPromise, WsProvider } from '@polkadot/api'
import types from './types'

let api = null;
const wsProvider = new WsProvider(process.env.WS_ENDPOINT || 'ws://127.0.0.1:9944');

export async function getApi() {
  if (!api) {
    api = await ApiPromise.create({ provider: wsProvider, types })
  }

  return api
}

export async function disconnect() {
  if (wsProvider) {
    await wsProvider.disconnect()
  }
}


