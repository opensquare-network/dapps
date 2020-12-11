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
  const [showResolveAndRemarkModel, setShowResolveAndRemarkModel] = useState(false)
  const { bountyId } = useParams()
  const dispatch = useDispatch()
  const bounty = useSelector(bountySelector)

  const isFunder = bounty?.creator === nowAddress
  const isSubmitted = bounty?.state?.state === 'Submitted'
  const isResolved = bounty?.state?.state === 'Resolved'

  const resolveBountyAndRemark = async (bountyId, option) => {
    const api = await getApi()
    const unsub = await api.tx.osBounties.resolveBountyAndRemark(bountyId, option)
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
            console.log(`Resolve bounty ${bountyId}`)
            dispatch(addFlashToast(toastType.SUCCESS, 'Bounty resolved'))
          }
        }

        if (status.isFinalized) {
          unsub()
        }
      })
  }

  return (
    <>
      { ((isSubmitted || isResolved) && isFunder) &&
          <Button primary onClick={() => {
            setShowResolveAndRemarkModel(true)
          }} disabled={isResolved}>
            { isResolved ? 'Resolved' : 'Resolve and Remark' }
          </Button>
      }

      <Modal
        size="mini"
        open={showResolveAndRemarkModel}
        onClose={() => {
          setShowResolveAndRemarkModel(false)
        }}
      >
        <Modal.Header>Resove and Remark</Modal.Header>
        <Modal.Content className="account-select-content">
          { apiTypes ?
            (
              <ol>
                {(apiTypes.BountyRemarkCollaborationResult._enum || []).map(option => {
                  return (
                    <li key={option} onClick={() => {
                      resolveBountyAndRemark(bountyId, option)
                      setShowResolveAndRemarkModel(false)
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
