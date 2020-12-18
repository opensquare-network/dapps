import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button } from "semantic-ui-react";

import { getApi } from "@services/api";
import { nowAddressSelector } from "@store/reducers/accountSlice";
import { addFlashToast, toastType } from "@store/reducers/toastSlice";
import { bountySelector, fetchBounty } from "../../store/reducers/bountySlice";

export default function () {
  const nowAddress = useSelector(nowAddressSelector);
  const { bountyId } = useParams();
  const dispatch = useDispatch();
  const bounty = useSelector(bountySelector);

  const isAssignee =
    nowAddress && bounty?.hunters?.assignee?.accountId === nowAddress;
  const isAssigned = bounty?.state?.state === "Assigned";
  const isSubmitted = bounty?.state?.state === "Submitted";

  const submitBounty = async () => {
    const api = await getApi();
    const unsub = await api.tx.osBounties
      .submitBounty(bountyId)
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

          if ("Submit" === method) {
            const [bountyId] = data;
            console.log(`Submitted bounty ${bountyId}`);
            dispatch(
              addFlashToast(
                toastType.SUCCESS,
                "Bounty submitted, please wait for review"
              )
            );
            dispatch(fetchBounty(bountyId));
          }
        }
      });
  };

  return (
    <>
      {(isAssigned || isSubmitted) && isAssignee && (
        <Button primary onClick={submitBounty} disabled={isSubmitted}>
          {isSubmitted ? "Submitted" : "Submit"}
        </Button>
      )}
    </>
  );
}
