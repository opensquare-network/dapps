import React from "react";
import styled from "styled-components";

const Wrapper = styled.p`
  background: #FFEDEA;
  border-radius: 4px;
  line-height: 36px;
  padding: 0 12px;
  margin-top: 8px;
  
  font-size: 12px;
  color: #EC4730;
`

export default function ErrorLine({ children }) {
  return (
    <Wrapper>{children}</Wrapper>
  )
}
