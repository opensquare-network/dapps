import { addFlashToast, toastType } from "@store/reducers/toastSlice";
import { encodeAddress } from "@polkadot/keyring";
import { getApi } from "@services/api";

export default async function createBounty(account, bounty, dispatch, ss58Format) {
  let resolve, reject = null
  const promise = new Promise((resolve1, reject1) => {
    resolve = resolve1
    reject = reject1
  })

  try {
    const api = await getApi()
    const unsub = await api.tx.osBounties.createBounty(bounty)
      .signAndSend(account.extensionAddress, async ({ events = [], status }) => {
        if (status.isInBlock) {
          dispatch(addFlashToast(toastType.INFO, 'Extrinsic inBlock'))
        }

        for (const item of events) {
          const { event } = item
          const method = event.method
          const data = event.data.toJSON()

          if ('ApplyBounty' === method && status.isFinalized) {
            const [accountId, bountyId] = data
            console.log(`${encodeAddress(accountId, ss58Format)} created bounty ${bountyId}`)
            dispatch(addFlashToast(toastType.SUCCESS, 'Created! Waiting for the council review'))

            unsub()
            resolve(bountyId)
          }
        }
      })
  } catch (e) {
    reject()
  }

  return promise
}
