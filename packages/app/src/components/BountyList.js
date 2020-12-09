import React from "react";
import styled from "styled-components";
import Card from "@components/Card";
import DateShow from "@components/DateShow";
import HexText from "@components/HexText";
import Balance from "@components/Balance";
import { NavLink } from "react-router-dom";


const BountyItem = styled(Card)`
  margin-bottom: 10px;

  .title {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
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
function BountyListItem({ bounty: item }) {
  return (
    <BountyItem key={item.bountyId}>
      <NavLink to={`/bounty/${item.bountyId}`}>
        <HexText className="title" value={item.meta.V1.title} />
      </NavLink>
      <div className="info">
        <div className="item">
          <div>{item.hunters?.hunters?.length || 0}</div>
          <div>Applicants</div>
        </div>

        <div className="item">
          <DateShow value={item.indexer.blockTime} />
          <div>Created</div>
        </div>

        <Balance value={item.meta.V1.payment} />
      </div>
    </BountyItem>
  )
}

export default function BountyList({ bounties }) {
  return bounties.map(item =>
    <BountyListItem key={item.bountyId} bounty={item} />
  )
}
