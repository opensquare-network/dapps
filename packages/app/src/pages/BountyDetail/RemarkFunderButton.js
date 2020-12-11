import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button, Modal } from "semantic-ui-react";

import { getApi } from "@services/api";
import { nowAddressSelector } from "@store/reducers/accountSlice";
import { addFlashToast, toastType } from "@store/reducers/toastSlice";
import { bountySelector, fetchBounty } from "../../store/reducers/bountySlice";

import apiTypes from "@services/types"

export default function () {
  const nowAddress = useSelector(nowAddressSelector)
  const [showRemarkFunderModel, setShowRemarkFunderModel] = useState(false)
  const { bountyId } = useParams()
  const dispatch = useDispatch()
  const bounty = useSelector(bountySelector)

  const isAssignee = nowAddress && bounty?.hunters?.assignee?.accountId === nowAddress
  const isResolved = bounty?.state?.state === 'Resolved'

  const remarkBountyFunder = async (bountyId, option) => {
    const api = await getApi()
    const unsub = await api.tx.osBounties.remarkBountyFunder(bountyId, option)
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

          if ('Resolve' === method && status.isFinalized) {
            const [bountyId] = data
            console.log(`Remarked bounty ${bountyId}`)
            dispatch(addFlashToast(toastType.SUCCESS, 'Funder remarked'))
          }
        }

        if (status.isFinalized) {
          unsub()
        }
      })
  }

  return (
    <>
      { (isResolved && isAssignee) &&
          <Button primary onClick={() => {
            setShowRemarkFunderModel(true)
          }} disabled={false}>
            Remark Funder
          </Button>
      }

      <Modal
        size="mini"
        open={showRemarkFunderModel}
        onClose={() => {
          setShowRemarkFunderModel(false)
        }}
      >
        <Modal.Header>Remark Funder</Modal.Header>
        <Modal.Content className="account-select-content">
          { apiTypes ?
            (
              <ol>
                {(apiTypes.BountyRemarkCollaborationResult._enum || []).map(option => {
                  return (
                    <li key={option} onClick={() => {
                      remarkBountyFunder(bountyId, option)
                      setShowRemarkFunderModel(false)
                    }}>
                      <span>{option}</span>
                    </li>
                  )
                })}
              </ol>
            )
            : <span>Api types not available</span>
          }
        </Modal.Content>
      </Modal>
    </>
  )
}
