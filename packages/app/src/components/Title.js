import styled from "styled-components";
import React from "react";

const Wrapper = styled.section`
  label {
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    color: #1D253C;
  }
`;

export default function Title({ className, children }) {
  return (
    <Wrapper className={className}>
      <label>{children}</label>
    </Wrapper>
  )
}
