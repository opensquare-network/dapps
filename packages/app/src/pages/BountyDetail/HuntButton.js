import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button, Icon } from "semantic-ui-react";

import { getApi } from "@services/api";
import { nowAddressSelector } from "@store/reducers/accountSlice";
import { Modal } from "semantic-ui-react";
import { addFlashToast, toastType } from "@store/reducers/toastSlice";
import { ss58FormatSelector } from "@store/reducers/chainSlice";
import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { fetchBounty, bountySelector } from "../../store/reducers/bountySlice";

export default function () {
  const nowAddress = useSelector(nowAddressSelector)
  const [showRequireSignInModel, setShowRequireSignInModel] = useState(false)
  const { bountyId } = useParams()
  const dispatch = useDispatch()
  const ss58Format = useSelector(ss58FormatSelector)
  const bounty = useSelector(bountySelector)

  const isHunter = (bounty?.hunters?.hunters || []).some(hunter => hunter.accountId === nowAddress)
  const isAssignee = nowAddress && bounty?.hunters?.assignee?.accountId === nowAddress
  const isFunder = bounty?.creator === nowAddress
  const isAccepted = bounty?.state?.state === 'Accepted'

  const huntBounty = async () => {
    if (!nowAddress) {
      setShowRequireSignInModel(true)
    } else {
      const api = await getApi()
      const unsub = await api.tx.osBounties.huntBounty(bountyId)
        .signAndSend(nowAddress, async ({ events = [], status }) => {
          console.log('status', status)
          if (status.isInBlock) {
            dispatch(addFlashToast(toastType.INFO, 'Extrinsic inBlock'))
            dispatch(fetchBounty(bountyId))
          }

          for (const item of events) {
            console.log('events', events)
            const { event } = item
            const method = event.method
            const data = event.data.toJSON()

            if ('HuntBounty' === method && status.isFinalized) {
              const [bountyId, accountId] = data
              console.log(`${encodeAddress(accountId, ss58Format)} hunt bounty ${bountyId}`)
              dispatch(addFlashToast(toastType.SUCCESS, 'Bounty hunted, please wait for assignment'))
              dispatch(fetchBounty(bountyId))
            }
          }

          if (status.isFinalized) {
            unsub()
          }
        })
    }
  }

  return (
    <>
      { (isAccepted && !isAssignee && !isFunder) &&
          <Button className="colored-button" onClick={huntBounty} disabled={isHunter}>
            { isHunter ? 'Already Hunted' : 'Express Interest' }
          </Button>
      }

      <Modal
        size="mini"
        open={showRequireSignInModel}
        onClose={() => { setShowRequireSignInModel(false) }}
      >
        <Modal.Header>Interest?</Modal.Header>
        <Modal.Content>
          Signin is required to hunt a bounty.
        </Modal.Content>
      </Modal>
    </>
  )
}
