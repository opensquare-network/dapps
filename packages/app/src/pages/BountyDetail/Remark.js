import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  .title {
    line-height: 28px;
    font-weight: 500;
    color: #1D253C;
  }

  & > div {
    display: flex;
    gap: 8px;

    .label {
      color: rgba(29,37,60,0.24);
    }
    .value {
      color: rgba(29,37,60,0.64);
    }
  }
`

export default function ({ hunterRemark, funderRemark }) {
  return (
    <Wrapper>
      <div className="title">Work Rating</div>
      {
        funderRemark && <div>
          <span className="label">Funder remark:</span>
          <span className="value">{funderRemark.remark}</span>
        </div>
      }
      {
        hunterRemark && <div>
          <span className="label">Hunter remark:</span>
          <span className="value">{hunterRemark.remark}</span>
        </div>
      }
    </Wrapper>
  )
}
