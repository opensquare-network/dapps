import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBounty, bountySelector, bountyContentSelector, fetchBountyContent } from "../../store/reducers/explorerSlice";
import styled from "styled-components";
import { useHistory, useParams } from 'react-router'
import Container from "@components/Container";
import Card from "@components/Card";
import { NavLink } from "react-router-dom";
import { Divider } from "semantic-ui-react";

import Detail from "./Detail";
import Description from "./Description";
import Applicants from "./Applicants";
import backArrow from "@static/back-arrow.svg";

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

export default function() {
  // eslint-disable-next-line
  const history = useHistory()
  const { bountyId } = useParams()
  const dispatch = useDispatch()
  const bounty = useSelector(bountySelector)
  const content = useSelector(bountyContentSelector)

  console.log({bounty, content})

  useEffect(() => {
    if (bountyId) {
      dispatch(fetchBounty(bountyId))
    }
  }, [dispatch, bountyId])

  const {
    // eslint-disable-next-line
    creator,
    meta: {
      V1: {
        currency_id: currency,
        payment: amount,
        title,
        digest,
      }
    },
    state: {
      // eslint-disable-next-line
      state
    },
  } = bounty || {
    meta: { V1: { title: '' } },
    state: {},
  }

  const { assignee, hunters } = bounty?.hunters || { hunters: [] }

  useEffect(() => {
    if (digest) {
      dispatch(fetchBountyContent(digest))
    }
  }, [dispatch, digest])

  // fake detail data
  const fakeDetailData = {
    avatar: "",
    labels: ["N/A", "N/A"],
    info: [
      { title: "Time Left", content: "N/A" },
      { title: "Experience Level", content: "N/A" },
      { title: "Issue Type", content: "N/A" },
      { title: "Workers Auto Approve", content: "N/A" },
      { title: "Opened", content: "N/A" },
    ]
  };

  return (
    <Wrapper>
      <NavLink to="/">
        <Nav><img src={backArrow} alt="back arrow" /> Back to issue Explorer</Nav>
      </NavLink>
      <Content>
        <Detail title={title} amount={amount} currency={currency} {...fakeDetailData} />
        <Divider />
        <Description md={content?.content || 'No data'}></Description>
        <Divider />
        <Applicants assignee={assignee} hunters={hunters} />
      </Content>
    </Wrapper>
  );
}
