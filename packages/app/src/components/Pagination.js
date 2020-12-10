import React from "react";
import { Pagination } from "semantic-ui-react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: flex-end;
`

export default function (props) {
  return (
    <Wrapper>
        <Pagination {...props} />
    </Wrapper>
  )
}
