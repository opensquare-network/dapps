import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBounty, bountySelector, bountyContentSelector, fetchBountyContent } from "../../store/reducers/explorerSlice";
import styled from "styled-components";
import { useHistory, useParams } from 'react-router'
import Container from "@components/Container";
import Card from "@components/Card";
import ReactMarkdown from 'react-markdown';
import HexText from "../../components/HexText";
import DateShow from "../../components/DateShow";
import { NavLink } from "react-router-dom";

const Wrapper = styled(Container)`
  margin-top: 26px;
`

const Content = styled(Card)`
  min-height: 360px;
  & > .title {
    font-size: 16px;
    font-weight: bold;
  }
`
const Nav = styled.nav`
  color: rgba(29, 37, 60, 0.64);
  padding-bottom: 10px;
`

const Applicants = styled.ul`
  display: flex;
  flex-flow: wrap;
`

const ApplicantItem = styled.li`
  flex: 1;
  border: 1px solid #EEEEEE;
  padding: 10px;
  margin: 10px;

  & > .title {
    padding-top: 10px;
    font-weight: bold;
  }
`

export default function() {
  const history = useHistory()
  const { bountyId } = useParams()
  const dispatch = useDispatch()
  const bounty = useSelector(bountySelector)
  const content = useSelector(bountyContentSelector)

  useEffect(() => {
    if (bountyId) {
      dispatch(fetchBounty(bountyId))
    }
  }, [dispatch, bountyId])

  const {
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

  return (
    <Wrapper>
      <NavLink to="/">
        <Nav>&lt;&nbsp;Back to issue Explorer</Nav>
      </NavLink>
      <Content>
        <HexText className="title" value={title}/>
        <hr/>
        <ReactMarkdown>{content?.content || 'No data'}</ReactMarkdown>
        <hr />
        <h4>Applicants</h4>
        <Applicants>
        { hunters.map(hunter => (
          <ApplicantItem key={hunter.accountId}>
            <div className="title">Hunter Address</div>
            <div>{hunter.accountId}</div>
            <div className="title">Applied At</div>
            <DateShow value={hunter.indexer.blockTime} />
            <div className="title">Assignee</div>
            <div>{assignee?.accountId === hunter.accountId ? 'Yes' : 'No' }</div>
          </ApplicantItem>
          ))
        }
        </Applicants>
      </Content>
    </Wrapper>
  );
}
