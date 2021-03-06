import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bountyContentSelector,
  bountySelector,
  fetchBounty,
  fetchBountyContent
} from "../../store/reducers/bountySlice";
import styled from "styled-components";
import { useParams } from 'react-router'
import Container from "@components/Container";
import Card from "@components/Card";
import { NavLink } from "react-router-dom";
import { Divider } from "semantic-ui-react";

import Detail from "./Detail";
import Description from "./Description";
import backArrow from "@static/back-arrow.svg";
import Address from "@components/Address";
import DateShow from "@components/DateShow";

const Wrapper = styled(Container)`
  margin-top: 26px;
`

const Content = styled(Card)`
  min-height: 360px;
`
const Nav = styled.nav`
  color: rgba(29, 37, 60, 0.64);
  margin-bottom: 26px;
  display: inline-flex;
  aligin-items: center;
  gap: 10px;
`

export default function () {
  const {bountyId} = useParams()
  const dispatch = useDispatch()
  const bounty = useSelector(bountySelector)
  const content = useSelector(bountyContentSelector)

  useEffect(() => {
    if (bountyId) {
      dispatch(fetchBounty(bountyId))
    }
  }, [dispatch, bountyId])

  const {
    meta: {
      V1: {
        currency_id: currency,
        payment: amount,
        title,
        digest,
      }
    },
  } = bounty || {
    meta: {V1: {title: ''}},
    state: {},
  }

  useEffect(() => {
    if (digest) {
      dispatch(fetchBountyContent(digest))
    }
  }, [dispatch, digest])

  // fake detail data
  const fakeDetailData = {
    avatar: "",
    labels: ["N/A", "N/A"],
    info: (
      bounty
        ? [
          {title: "Creator", content: <Address>{bounty.creator}</Address>},
          {title: "Created At", content: <DateShow value={bounty.indexer.blockTime} />},
          ...(
            bounty.state
              ? [{title: `${bounty.state.state} At`, content: <DateShow value={bounty.state.indexer.blockTime} />}]
              : []
          )
        ]
        : []
    )
  };

  return (
    <Wrapper>
      <NavLink to="/councilor">
        <Nav><img src={backArrow} alt="back arrow"/> Back to Councilor Explorer</Nav>
      </NavLink>
      <Content>
        <Detail title={title} amount={amount} currency={currency} {...fakeDetailData} />
        <Divider/>
        <Description md={content?.content || 'No data'}/>
      </Content>
    </Wrapper>
  );
}
