import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { Button, Icon } from "semantic-ui-react";

import HexText from "@components/HexText";
import Avatar from "@components/Avatar";
import { elemIn, toPrecision } from "../../utils";
import { osnPrecision } from "../../utils/constants";

import { getApi } from "@services/api";
import { nowAddressSelector } from "@store/reducers/accountSlice";
import { Modal } from "semantic-ui-react";
import { addFlashToast, toastType } from "@store/reducers/toastSlice";
import { ss58FormatSelector } from "@store/reducers/chainSlice";
import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { fetchBounty, bountySelector } from "../../store/reducers/bountySlice";


const Wrapper = styled.div`

`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  .title-content {
    flex-grow: 1;
  }
`

const TitleWrapper = styled.div`
  min-height: 32px;
  display: flex;
  gap: 20px;

  & > .title {
    font-size: 16px;
    font-weight: bold;
    line-height: 32px;
  }

  & > .payment {
    font-size: 18px;
    font-weight: 700;
    line-height: 32px;
    color: #04D2C5;
    white-space: nowrap;
    margin-left: auto;
  }
`

const LabelWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 6px;

  & > div {
    background: rgba(77, 113, 255, 0.1);
    border-radius: 4px;
    color: #4D71FF;
    font-size: 12px;
    line-height: 20px;
    padding: 2px 8px;
  }
`

const InfoWrapper = styled.div`
  background: #FBFBFB;
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
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 20px;

  & > .button {
    margin-right: 0px;
  }

  .colored-button {
    color: white;
    background: #04D2C5;

    &:hover, &:focus {
      color: white;
      background: #04D2C5;
    }
  }
`

export default function ( { avatar, title, amount, currency, labels, info } ) {
  const nowAddress = useSelector(nowAddressSelector)
  const [showRequireSignInModel, setShowRequireSignInModel] = useState(false)
  const { bountyId } = useParams()
  const dispatch = useDispatch()
  const ss58Format = useSelector(ss58FormatSelector)
  const bounty = useSelector(bountySelector)

  const isHunter = (bounty?.hunters?.hunters || []).some(hunter => hunter.accountId === nowAddress)
  const isAssignee = nowAddress && bounty?.hunters?.assignee?.accountId === nowAddress
  const allowHunting = bounty?.state?.state === 'Accepted'
  const allowSubmit = bounty?.state?.state === 'Assigned'

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

  const submitBounty = async () => {
    if (!nowAddress) {
      setShowRequireSignInModel(true)
    } else {
      const api = await getApi()
      const unsub = await api.tx.osBounties.submitBounty(bountyId)
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

            if ('Submit' === method && status.isFinalized) {
              const [bountyId, accountId] = data
              console.log(`${encodeAddress(accountId, ss58Format)} submit bounty ${bountyId}`)
              dispatch(addFlashToast(toastType.SUCCESS, 'Bounty submitted, please wait for review'))
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
      <Wrapper>
        <Header>
          <Avatar src={avatar} />
          <div className="title-content">
            <TitleWrapper>
              <HexText className="title" value={title || ""} />
              <div className="payment">{toPrecision(amount, osnPrecision, osnPrecision)} {currency}</div>
            </TitleWrapper>
            <LabelWrapper>
              { labels && labels.map((item, index) => (<div key={index}>{item}</div>)) }
            </LabelWrapper>
          </div>
        </Header>
        { info && info.length > 0 && <InfoWrapper>
          { info.map((item) => (
            <div key={item.title}>
              <span className="info-title">{item.title}</span>
              <span className="info-content">{item.content}</span>
            </div>
          )) }
          </InfoWrapper>
        }
        <ButtonWrapper>
          <Button basic disabled>
            <Icon name="share alternate" />
            Share
          </Button>
          <Button basic disabled>
            <Icon name="github" />
            Via on Github
          </Button>
          { (allowHunting && !isAssignee) &&
              <Button className="colored-button" onClick={huntBounty} disabled={isHunter}>
                { isHunter ? 'Already Hunted' : 'Express Interest' }
              </Button>
          }
          { isAssignee &&
              <Button className="colored-button" onClick={submitBounty} disabled={!allowSubmit}>
                { allowSubmit ? 'Submit' : bounty?.state?.state }
              </Button>
          }
        </ButtonWrapper>
      </Wrapper>


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
