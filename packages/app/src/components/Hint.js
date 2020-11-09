import styled from "styled-components";
import React from "react";

const Wrapper = styled.span`
  font-size: 12px;
  line-height: 20px;
  color: rgba(29, 37, 60, 0.24);
`

export default function Hint({ children }) {
  return <Wrapper>{children}</Wrapper>
}
