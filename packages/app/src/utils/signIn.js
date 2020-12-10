import { getApi } from "@services/api";
import { web3Enable, web3FromAddress } from '@polkadot/extension-dapp'

export async function signIn(account) {
  await web3Enable('OpenSquare')
  const injector = await web3FromAddress(account.extensionAddress)
  const api = await getApi()
  api.setSigner(injector.signer)
}
