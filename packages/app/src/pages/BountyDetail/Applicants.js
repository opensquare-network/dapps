import React from "react";
import styled from "styled-components";
import DateShow from "../../components/DateShow";

const Wrapper = styled.div`
  .title {
    line-height: 28px;
    font-weight: 500;
    color: #1D253C;
  }
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

export default function ({ hunters, assignee }) {
  return (
    <Wrapper>
      <div className="title">Applicatis</div>
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
    </Wrapper>
  )
}
