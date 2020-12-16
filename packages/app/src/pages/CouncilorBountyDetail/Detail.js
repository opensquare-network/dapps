import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { Button, Icon, Modal } from "semantic-ui-react";
import Avatar from "@components/Avatar";
import { toPrecision } from "../../utils";
import { osnPrecision } from "../../utils/constants";

import { getApi } from "@services/api";
import { addFlashToast, toastType } from "@store/reducers/toastSlice";
import { bountySelector, fetchBounty } from "../../store/reducers/bountySlice";
import {
  isCouncilorSelector,
  nowAddressSelector,
  isLoginSelector,
} from "@store/reducers/accountSlice";

const Wrapper = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  .avatar-content {
    min-width: 56px;
    flex-shrink: 0 0 56px;
  }

  .title-content {
    flex-grow: 1;
  }
`;

const TitleWrapper = styled.div`
  min-height: 32px;
  display: flex;
  gap: 24px;

  & > .title {
    font-size: 16px;
    font-weight: bold;
    line-height: 32px;
    word-break: break-word;
  }

  & > .payment {
    font-size: 18px;
    font-weight: 700;
    line-height: 32px;
    color: #04d2c5;
    white-space: nowrap;
    margin-left: auto;
  }
`;

const LabelWrapper = styled.div`
  & > div {
    display: inline-block;
    background: rgba(77, 113, 255, 0.1);
    border-radius: 4px;
    color: #4d71ff;
    font-size: 12px;
    line-height: 20px;
    padding: 2px 8px;
    margin-top: 4px;
    margin-right: 12px;
    :last-child {
      margin-right: 0;
    }
  }
`;

const InfoWrapper = styled.div`
  background: #fbfbfb;
  border-radius: 4px;
  margin-top: 20px;
  padding: 20px 24px;
  display: grid;
  column-gap: 72px;
  grid-template-columns: repeat(auto-fit, minmax(296px, 1fr));
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 24px;
    .info-title {
      color: rgba(29, 37, 60, 0.24);
    }
    .info-content {
      color: rgba(29, 37, 60, 0.64);
      margin: 0 0 auto;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 20px;

  & > .button {
    margin-right: 0px;
  }
`;

export default function ({ avatar, title, amount, currency, labels, info }) {
  const { bountyId } = useParams();
  const dispatch = useDispatch();
  const bounty = useSelector(bountySelector);
  const nowAddress = useSelector(nowAddressSelector);
  const isLogin = useSelector(isLoginSelector);
  const isCouncilor = useSelector(isCouncilorSelector);
  const [showRequireSignInModel, setShowRequireSignInModel] = useState(false);
  const [
    showNeedCouncilorAccountModel,
    setShowNeedCouncilorAccountModel,
  ] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isApplying = bounty?.state?.state === "Applying";

  const examineBounty = async (isAccept) => {
    if (!isLogin) {
      setShowRequireSignInModel(true);
      return;
    }

    let remindOnce = true;
    const api = await getApi();
    const unsub = await api.tx.osBounties
      .examineBounty(bountyId, isAccept)
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

          if (remindOnce && method === "ExtrinsicFailed") {
            // Remind user that must use councilor account
            remindOnce = false;
            setShowNeedCouncilorAccountModel(true);
            return;
          }

          if ("Accept" === method) {
            const [bountyId] = data;
            console.log(`Accepted bounty ${bountyId}`);
            dispatch(addFlashToast(toastType.SUCCESS, "Bounty accepted"));
            dispatch(fetchBounty(bountyId));
            setIsSuccess(true);
          } else if ("Reject" === method) {
            const [bountyId] = data;
            console.log(`Rejected bounty ${bountyId}`);
            dispatch(addFlashToast(toastType.SUCCESS, "Bounty rejected"));
            dispatch(fetchBounty(bountyId));
            setIsSuccess(true);
          }
        }
      });
  };

  return (
    <>
      <Wrapper>
        <Header>
          <Avatar className="avatar-content" src={avatar} />
          <div className="title-content">
            <TitleWrapper>
              <span className="title">{title || ""}</span>
              <div className="payment">
                {toPrecision(amount, osnPrecision, osnPrecision)} {currency}
              </div>
            </TitleWrapper>
            <LabelWrapper>
              {labels &&
                labels.map((item, index) => <div key={index}>{item}</div>)}
            </LabelWrapper>
          </div>
        </Header>
        {info && info.length > 0 && (
          <InfoWrapper>
            {info.map((item) => (
              <div key={item.title}>
                <span className="info-title">{item.title}</span>
                <span className="info-content">{item.content}</span>
              </div>
            ))}
          </InfoWrapper>
        )}
        <ButtonWrapper>
          <Button basic disabled>
            <Icon name="share alternate" />
            Share
          </Button>
          <Button basic disabled>
            <Icon name="github" />
            Via on Github
          </Button>
          {isApplying && !isSuccess && (
            <>
              <Button
                primary
                onClick={() => examineBounty(true)}
                disabled={!isCouncilor}
              >
                Accept
              </Button>
              <Button
                primary
                onClick={() => examineBounty(false)}
                disabled={!isCouncilor}
              >
                Reject
              </Button>
            </>
          )}
        </ButtonWrapper>
      </Wrapper>

      <Modal
        size="mini"
        open={showRequireSignInModel}
        onClose={() => {
          setShowRequireSignInModel(false);
        }}
      >
        <Modal.Header>Need Sign In</Modal.Header>
        <Modal.Content>
          Signin is required to accept or reject a bounty.
        </Modal.Content>
      </Modal>

      <Modal
        size="mini"
        open={showNeedCouncilorAccountModel}
        onClose={() => {
          setShowNeedCouncilorAccountModel(false);
        }}
      >
        <Modal.Header>Need Councilor Account</Modal.Header>
        <Modal.Content>
          Operation failed, please make sure the currect account is a councilor.
        </Modal.Content>
      </Modal>
    </>
  );
}
