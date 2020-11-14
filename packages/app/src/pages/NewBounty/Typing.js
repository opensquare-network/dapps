import Container from "@components/Container";
import React from "react";
import styled from "styled-components";
import Card from "@components/Card";
import MarkdownEditor from "@pages/NewBounty/MarkdownEditor";
import Currency from "@pages/NewBounty/Currency";
import BountyAction from "@pages/NewBounty/BountyAction";
import BountyTitle from "@pages/NewBounty/BountyTitle";

const Wrapper = styled(Container)`
  & > main {
    display: flex;
  }
  margin-top: 26px;
`

const Editor = styled(Card)`
  flex: 1;
  min-height: 976px;
  
`

export default function Typing() {
  return (
    <Wrapper>
      <Editor>
        <BountyTitle />
        <Currency />
        <MarkdownEditor />
      </Editor>
      <BountyAction />
    </Wrapper>
  )
}
