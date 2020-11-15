import Container from "@components/Container";
import React, { useEffect } from "react";
import styled from "styled-components";
import Card from "@components/Card";
import MarkdownEditor from "@pages/NewBounty/MarkdownEditor";
import Currency from "@pages/NewBounty/Currency";
import BountyAction from "@pages/NewBounty/BountyAction";
import BountyTitle from "@pages/NewBounty/BountyTitle";
import { useDispatch } from "react-redux";
import {
  setNewBountyAmountError,
  setNewBountyDetailError,
  setNewBountyTitleError
} from "@store/reducers/newBountySlice";

const Wrapper = styled(Container)`
  & > main {
    display: flex;
  }
  margin-top: 26px;
`

const Editor = styled(Card)`
  flex: 1;
  min-height: 850px;
`

export default function Typing() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setNewBountyTitleError(null))
    dispatch(setNewBountyAmountError(null))
    dispatch(setNewBountyDetailError(null))
  }, [dispatch])

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
