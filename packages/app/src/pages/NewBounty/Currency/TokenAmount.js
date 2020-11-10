import React from "react";
import styled from "styled-components";
import { Input } from "semantic-ui-react";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  
  label {
    font-size: 14px;
    line-height: 24px;
    color: rgba(29, 37, 60, 0.64);
  }
  
  & > div.ui.input {
    margin-top: unset !important;
  }
`

export default function TokenAmount() {
  return (
    <Wrapper>
      <label>Amount</label>
      <Input
        label={{ basic: true, content: 'Native' }}
        labelPosition='right'
        placeholder='Enter amount...'
      />
    </Wrapper>
  )
}
