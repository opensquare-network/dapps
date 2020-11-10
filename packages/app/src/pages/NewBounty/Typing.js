import Container from "@components/Container";
import React from "react";
import styled from "styled-components";
import Card from "@components/Card";
import Title from "@components/Title";
import { Input } from "semantic-ui-react";
import MarkdownEditor from "@pages/NewBounty/MarkdownEditor";
import Currency from "@pages/NewBounty/Currency";
import { useDispatch, useSelector } from "react-redux";
import { newBountyTitleSelector, setNewBountyTitle } from "@store/reducers/newBountySlice";
import BountySummary from "@pages/NewBounty/BountySummary";

const Wrapper = styled(Container)`
  & > main {
    display: flex;
  }
  margin-top: 26px;
`

const Editor = styled(Card)`
  flex: 1;
  min-height: 976px;
  
  div.ui.input {
    width: 100%;
    margin-top: 8px;
  }
`

export default function Typing() {
  const dispatch = useDispatch()
  const title = useSelector(newBountyTitleSelector)

  return (
    <Wrapper>
      <Editor>
        <Title>Title</Title>
        <Input
          placeholder='Input bounty title'
          value={title}
          onChange={(event, data) => {
            dispatch(setNewBountyTitle(data.value))
          }} />
        <Currency />
        <MarkdownEditor />
      </Editor>
      <BountySummary />
    </Wrapper>
  )
}
