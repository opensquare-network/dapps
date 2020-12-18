import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button, Modal } from "semantic-ui-react";

import { getApi } from "@services/api";
import { nowAddressSelector } from "@store/reducers/accountSlice";
import { addFlashToast, toastType } from "@store/reducers/toastSlice";
import { bountySelector, fetchBounty } from "../../store/reducers/bountySlice";

import apiTypes from "@services/types";
import styled from "styled-components";

const ListModal = styled(Modal)`
  .select-content {
    li {
      cursor: pointer;
      padding: 3px;
      font-size: 1.1em;

      &:hover {
        background: #fbfbfb;
      }
    }
  }
`;

export default function () {
  const nowAddress = useSelector(nowAddressSelector);
  const [showResolveAndRemarkModel, setShowResolveAndRemarkModel] = useState(
    false
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const { bountyId } = useParams();
  const dispatch = useDispatch();
  const bounty = useSelector(bountySelector);

  const isFunder = bounty?.creator === nowAddress;
  const isSubmitted = bounty?.state?.state === "Submitted";
  const isResolved = bounty?.state?.state === "Resolved";

  const resolveBountyAndRemark = async (bountyId, option) => {
    const api = await getApi();
    const unsub = await api.tx.osBounties
      .resolveBountyAndRemark(bountyId, option)
      .signAndSend(nowAddress, async ({ events = [], status }) => {
        if (status.isFinalized) {
          dispatch(fetchBounty(bountyId));
          unsub();
        }

        if (!status.isInBlock) {
          return;
        }

        for (const item of events) {
          const { event } = item;
          const method = event.method;
          const data = event.data.toJSON();

          if ("Resolve" === method) {
            const [bountyId] = data;
            console.log(`Resolve bounty ${bountyId}`);
            dispatch(addFlashToast(toastType.SUCCESS, "Bounty resolved"));
            dispatch(fetchBounty(bountyId));
            setIsSuccess(true);
          }
        }
      });
  };

  return (
    <>
      {(isSubmitted || isResolved) && isFunder && (
        <Button
          primary
          onClick={() => {
            setShowResolveAndRemarkModel(true);
          }}
          disabled={isResolved || isSuccess}
        >
          {isResolved || isSuccess ? "Resolved" : "Resolve and Remark"}
        </Button>
      )}

      <ListModal
        size="mini"
        open={showResolveAndRemarkModel}
        onClose={() => {
          setShowResolveAndRemarkModel(false);
        }}
      >
        <Modal.Header>Resove and Remark</Modal.Header>
        <Modal.Content className="select-content">
          {apiTypes ? (
            <ol>
              {(apiTypes.BountyRemarkCollaborationResult._enum || []).map(
                (option) => {
                  return (
                    <li
                      key={option}
                      onClick={() => {
                        resolveBountyAndRemark(bountyId, option);
                        setShowResolveAndRemarkModel(false);
                      }}
                    >
                      <span>{option}</span>
                    </li>
                  );
                }
              )}
            </ol>
          ) : (
            <span>Api types not available</span>
          )}
        </Modal.Content>
      </ListModal>
    </>
  );
}
