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
  const [showRemarkFunderModel, setShowRemarkFunderModel] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { bountyId } = useParams();
  const dispatch = useDispatch();
  const bounty = useSelector(bountySelector);

  const isAssignee =
    nowAddress && bounty?.hunters?.assignee?.accountId === nowAddress;
  const isResolved = bounty?.state?.state === "Resolved";
  const isRemarked = !!bounty?.hunters?.hunterRemark;

  const remarkBountyFunder = async (bountyId, option) => {
    const api = await getApi();
    const unsub = await api.tx.osBounties
      .remarkBountyFunder(bountyId, option)
      .signAndSend(nowAddress, async ({ events = [], status }) => {
        if (status.isFinalized) {
          dispatch(fetchBounty(bountyId));
          unsub();
        }

        if (!status.isInBlock) {
          return;
        }

        dispatch(addFlashToast(toastType.INFO, "Extrinsic inBlock"));

        for (const item of events) {
          const { event } = item;
          const method = event.method;
          const data = event.data.toJSON();

          if ("HunterRemark" === method) {
            const [bountyId] = data;
            console.log(`Remarked bounty ${bountyId}`);
            dispatch(addFlashToast(toastType.SUCCESS, "Funder remarked"));
            dispatch(fetchBounty(bountyId));
            setIsSuccess(true);
          }
        }
      });
  };

  return (
    <>
      {(isResolved || isRemarked) && isAssignee && (
        <Button
          primary
          onClick={() => {
            setShowRemarkFunderModel(true);
          }}
          disabled={isRemarked || isSuccess}
        >
          {isRemarked || isSuccess ? "Remarked" : "Remark Funder"}
        </Button>
      )}

      <ListModal
        size="mini"
        open={showRemarkFunderModel}
        onClose={() => {
          setShowRemarkFunderModel(false);
        }}
      >
        <Modal.Header>Remark Funder</Modal.Header>
        <Modal.Content className="select-content">
          {apiTypes ? (
            <ol>
              {(apiTypes.BountyRemarkCollaborationResult._enum || []).map(
                (option) => {
                  return (
                    <li
                      key={option}
                      onClick={() => {
                        remarkBountyFunder(bountyId, option);
                        setShowRemarkFunderModel(false);
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
