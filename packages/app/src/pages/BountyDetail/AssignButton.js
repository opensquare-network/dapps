import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button, Modal } from "semantic-ui-react";

import { getApi } from "@services/api";
import { nowAddressSelector } from "@store/reducers/accountSlice";
import { addFlashToast, toastType } from "@store/reducers/toastSlice";
import { ss58FormatSelector } from "@store/reducers/chainSlice";
import { encodeAddress } from "@polkadot/keyring";
import { bountySelector, fetchBounty } from "../../store/reducers/bountySlice";
import Addr from "@components/Address";

export default function () {
  const nowAddress = useSelector(nowAddressSelector)
  const [showAssignHunterModel, setShowAssignHunterModel] = useState(false)
  const { bountyId } = useParams()
  const dispatch = useDispatch()
  const ss58Format = useSelector(ss58FormatSelector)
  const bounty = useSelector(bountySelector)

  const isFunder = bounty?.creator === nowAddress
  const isAccepted = bounty?.state?.state === 'Accepted'
  const isAssigned = bounty?.state?.state === 'Assigned'

  const assignBounty = async (bountyId, address) => {
    const api = await getApi()
    const unsub = await api.tx.osBounties.assignBounty(bountyId, address)
      .signAndSend(nowAddress, async ({ events = [], status }) => {
        console.log('status', status)
        dispatch(fetchBounty(bountyId))

        if (status.isInBlock) {
          dispatch(addFlashToast(toastType.INFO, 'Extrinsic inBlock'))
        }

        for (const item of events) {
          console.log('events', events)
          const { event } = item
          const method = event.method
          const data = event.data.toJSON()

          if ('AssignBounty' === method && status.isFinalized) {
            const [bountyId, accountId] = data
            console.log(`Assigned bounty ${bountyId} to ${encodeAddress(accountId, ss58Format)} `)
            dispatch(addFlashToast(toastType.SUCCESS, 'Bounty assigned, please wait for submission'))
          }
        }

        if (status.isFinalized) {
          unsub()
        }
      })
  }

  return (
    <>
      { ((isAccepted || isAssigned) && isFunder) &&
          <Button primary onClick={() => {
            setShowAssignHunterModel(true)
          }} disabled={isAssigned}>
            { isAssigned ? 'Assigned' : 'Assign to Hunter' }
          </Button>
      }

      <Modal
        size="mini"
        open={showAssignHunterModel}
        onClose={() => {
          setShowAssignHunterModel(false)
        }}
      >
        <Modal.Header>Assign to hunter</Modal.Header>
        <Modal.Content className="account-select-content">
          { bounty?.hunters?.hunters?.length > 0 ?
            (
              <ol>
                {(bounty?.hunters?.hunters || []).map(hunter => {
                  return (
                    <li key={hunter.accountId} onClick={() => {
                      assignBounty(bountyId, hunter.accountId)
                      setShowAssignHunterModel(false)
                    }}>
                      <Addr>{hunter.accountId}</Addr>
                    </li>
                  )
                })}
              </ol>
            )
            : <span>No hunters</span>
          }
        </Modal.Content>
      </Modal>
    </>
  )
}
