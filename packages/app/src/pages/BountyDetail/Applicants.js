import React from "react";
import styled from "styled-components";
import DateShow from "../../components/DateShow";
import Avatar from "@components/Avatar";
import Success from "@components/Success";
import Addr from "@components/Address";

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
  display: inline-block;
  border: 1px solid #EEEEEE;
  padding: 10px;
  margin: 12px;
  gap: 10px;

  display: flex;
  flex-flow: wrap;

  & > .avatar-container {
    display: inline-block;
  }
  & > .info-container {
    display: inline-block;

    & > .address-line {
      display: flex;
      justify-content: space-between;
    }

    & > .apply-at {
      display: block;
      white-space: nowrap;

      & > .value {
        display: inline-block;
        line-height: 24px;
        color: rgba(29,37,60,0.64);
      }

      & > .label {
        display: inline-block;
        margin-left: 8px;
        line-height: 24px;
        color: rgba(29,37,60,0.24);
      }
    }
  }
`

export default function ({ hunters, assignee }) {
  return (
    <Wrapper>
      <div className="title">Applicants</div>
      <Applicants>
        { hunters.map(hunter => (
          <ApplicantItem key={hunter.accountId}>
            <div className="avatar-container">
              <Avatar width="40px" height="40px" />
            </div>
            <div className="info-container">
              <div className="address-line">
                <Addr>{hunter.accountId}</Addr>
                {assignee?.accountId === hunter.accountId ? <Success /> : '' }
              </div>
              <div className="apply-at">
                {
                  assignee?.accountId === hunter.accountId
                  ? <>
                      <DateShow value={assignee.indexer.blockTime} className="value"/>
                      <div className="label">Assigned</div>
                    </>
                  : <>
                      <DateShow value={hunter.indexer.blockTime} className="value"/>
                      <div className="label">Apply</div>
                    </>
                }
              </div>
            </div>
          </ApplicantItem>
          ))
        }
      </Applicants>
    </Wrapper>
  )
}
