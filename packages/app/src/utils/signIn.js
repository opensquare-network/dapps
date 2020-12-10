import { getApi } from "@services/api";
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp'
import { removeAccount } from "@store/reducers/accountSlice";

export async function signIn(account, dispatch) {
  await web3Enable('OpenSquare')

  const allAccounts = await web3Accounts()
  const addressesInExtension = allAccounts.map(account => account.address)
  if (!addressesInExtension.includes(account.extensionAddress)) {
    dispatch(removeAccount())
    return
  }

  const injector = await web3FromAddress(account.extensionAddress)
  const api = await getApi()
  api.setSigner(injector.signer)
}
