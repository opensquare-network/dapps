import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Card from "@components/Card";
import DateShow from "@components/DateShow";
import HexText from "@components/HexText";
import Balance from "@components/Balance";
import Avatar from "@components/Avatar";

const BountyItem = styled(Card)`
  padding: 20px 24px;
  border: 1px solid #EEEEEE;
  display: flex;
  gap: 24px;

  .avatar-content {
    min-width: 56px;
    flex: 0 0 56px;
  }

  .title-content {
    flex-grow: 1;
  }

  & > div.info {
    display: flex;

    & > div.item {
      margin-right: 20px;
      flex: 1;
      flex-grow: 0;
      white-space: nowrap;

      display: flex;

      & > div {
        margin-right: 5px;
        flex: 1;
        flex-grow: 0;
        white-space: nowrap;
      }
    }
  }
`

const TitleWrapper = styled.div`
  min-height: 32px;
  display: flex;
  gap: 24px;

  & > .title {
    font-size: 16px;
    font-weight: bold;
    line-height: 32px;
    word-break: break-word;
    flex-grow: 1;
    color: #1D253C;
    :hover {
      color: #04D2C5;
    }
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
  & > div {
    display: inline-block;
    background: rgba(77, 113, 255, 0.1);
    border-radius: 4px;
    color: #4D71FF;
    font-size: 12px;
    line-height: 20px;
    padding: 2px 8px;
    margin-top: 4px;
    margin-right: 12px;
    :last-child {
      margin-right: 0;
    }
  }
`

const InfoWrapper = styled.div`
  margin-top: 12px;
  span.variable {
    line-height: 24px;
    color: rgba(29, 37, 60, 0.64);
  }
  span.static {
    line-height: 24px;
    color: rgba(29, 37, 60, 0.24);
  }
  span.static::before {
    content: "";
    margin-left: 8px;
    background:red;
  }
  span.divider::after {
    content: "|";
    margin: 0 16px;
    color: rgba(29, 37, 60, 0.24);
  }
`

export default function ({ bounty: item, labels, src }) {
  labels = ['N/A', 'N/A'];
  return (
    <BountyItem key={item.bountyId}>
      <div className="avatar-content">
        <Avatar src={src} />
      </div>
      <div className="title-content">
        <TitleWrapper>
          <NavLink className="title" to={`/bounty/${item.bountyId}`}>
            <HexText value={item.meta.V1.title} />
          </NavLink>
          <div className="payment">
            <Balance value={item.meta.V1.payment} />
          </div>
        </TitleWrapper>
        <LabelWrapper>
          { labels && labels.map((item, index) => (<div key={index}>{item}</div>)) }
        </LabelWrapper>
        <InfoWrapper>
          <span className="variable">{item.hunters?.hunters?.length || 0}</span>
          <span className="static">Applicants</span>
          <span className="divider" />
          <span className="variable">
            <DateShow style={{display: "inline-block"}} value={item.indexer.blockTime} />
          </span>
          <span className="static">Created</span>
        </InfoWrapper>
      </div>
      
    </BountyItem>
  )
}
