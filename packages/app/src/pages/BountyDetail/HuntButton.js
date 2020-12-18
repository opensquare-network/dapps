import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button, Modal } from "semantic-ui-react";

import { getApi } from "@services/api";
import { isLoginSelector, nowAddressSelector } from "@store/reducers/accountSlice";
import { addFlashToast, toastType } from "@store/reducers/toastSlice";
import { ss58FormatSelector } from "@store/reducers/chainSlice";
import { encodeAddress } from "@polkadot/keyring";
import { bountySelector, fetchBounty } from "../../store/reducers/bountySlice";

export default function () {
  const nowAddress = useSelector(nowAddressSelector)
  const isLogin = useSelector(isLoginSelector)
  const [showRequireSignInModel, setShowRequireSignInModel] = useState(false)
  const {bountyId} = useParams()
  const dispatch = useDispatch()
  const ss58Format = useSelector(ss58FormatSelector)
  const bounty = useSelector(bountySelector)

  // Fetching bounty status maybe late. We use this for app status.
  const [hunted, setHunted] = useState(false)

  const isHunter = (bounty?.hunters?.hunters || []).some(hunter => hunter.accountId === nowAddress)
  const isAssignee = nowAddress && bounty?.hunters?.assignee?.accountId === nowAddress
  const isFunder = bounty?.creator === nowAddress
  const isAccepted = bounty?.state?.state === 'Accepted'

  const huntBounty = async () => {
    if (!isLogin) {
      setShowRequireSignInModel(true)
      return
    }

    const api = await getApi()
    const unsub = await api.tx.osBounties.huntBounty(bountyId)
      .signAndSend(nowAddress, async ({events = [], status}) => {
        if (status.isFinalized) {
          dispatch(fetchBounty(bountyId))
          unsub()
        }

        if (!status.isInBlock) {
          return
        }

        for (const item of events) {
          const {event} = item
          const method = event.method
          const data = event.data.toJSON()

          if ('HuntBounty' === method) {
            const [bountyId, accountId] = data
            console.log(`${encodeAddress(accountId, ss58Format)} hunt bounty ${bountyId}`)
            dispatch(addFlashToast(toastType.SUCCESS, 'Bounty hunted, please wait for assignment'))
            setHunted(true)
            dispatch(fetchBounty(bountyId))
          }
        }
      })
  }

  return (
    <>
      {(isAccepted && !isAssignee && !isFunder) &&
      <Button primary onClick={huntBounty} disabled={hunted || isHunter}>
        {hunted || isHunter ? 'Already Hunted' : 'Hunt'}
      </Button>
      }

      <Modal
        size="mini"
        open={showRequireSignInModel}
        onClose={() => {
          setShowRequireSignInModel(false)
        }}
      >
        <Modal.Header>Interest?</Modal.Header>
        <Modal.Content>
          SignIn is required to hunt a bounty.
        </Modal.Content>
      </Modal>
    </>
  )
}
