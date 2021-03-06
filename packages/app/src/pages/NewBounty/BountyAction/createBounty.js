import { addFlashToast, toastType } from "@store/reducers/toastSlice";
import { encodeAddress } from "@polkadot/keyring";
import { getApi } from "@services/api";
import BigNumber from "bignumber.js";

export default function createBounty(account, bounty, dispatch, ss58Format) {
  return new Promise(async (resolve, reject) => {
    try {
      const api = await getApi()
      const unsub = await api.tx.osBounties.createBounty(bounty)
        .signAndSend(account.extensionAddress, async ({events = [], status}) => {
          if (!status.isInBlock) {
            return
          }

          for (const item of events) {
            const {event} = item
            const method = event.method
            const data = event.data.toJSON()

            if ('ApplyBounty' === method) {
              const [accountId, bountyId] = data
              console.log(`${encodeAddress(accountId, ss58Format)} created bounty ${bountyId}`)
              dispatch(addFlashToast(toastType.SUCCESS, 'Created! Waiting for the council review'))

              unsub()
              resolve(bountyId)
            }
          }
        })
    } catch (e) {
      reject(e)
    }
  })
}

export async function estimateBountyCreationFee(account, bounty) {
  const api = await getApi()
  const paymentInfo = await api.tx.osBounties.createBounty(bounty).paymentInfo(account.extensionAddress)

  const txFee = new BigNumber(paymentInfo.partialFee)
  return txFee
}
