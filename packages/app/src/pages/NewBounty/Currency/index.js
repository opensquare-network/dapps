import React from "react";
import styled from "styled-components";
import Title from "@components/Title";
import Hint from "@components/Hint";
import TokenSelector from "@pages/NewBounty/Currency/TokenSelector";
import TokenAmount from "@pages/NewBounty/Currency/TokenAmount";

const Wrapper = styled.div`
  margin-top: 20px;
  
  section.options {
    display: flex;
    margin-top: 10px;
    
    & > section {
      &:not(:first-of-type) {
        margin-left: 12px;
      }
    }
  }
`

export default function Currency() {
  return (
    <Wrapper>
      <Title>Currency</Title>
      <section className="sub-title">
        <Hint>Pick the token and fill the amount you will fund the bounty</Hint>
      </section>
      <section className="options">
        <TokenSelector />
        <TokenAmount />
      </section>
    </Wrapper>
  )
}
