import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  & > main {
    @media screen and (min-width: 1140px) {
      width: 1128px;
      margin: 0 auto;
    }
    
    @media screen and (max-width: 1140px) {
      width: 100%;
    }
  }
`

export default function Container({ className, children }) {
  return (
    <Wrapper className={className}>
      <main>
        {children}
      </main>
    </Wrapper>
  )
}
