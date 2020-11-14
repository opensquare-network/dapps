import { useDispatch, useSelector } from "react-redux";
import { newBountyTitleSelector, setNewBountyTitle } from "@store/reducers/newBountySlice";
import React from "react";
import Title from "@components/Title";
import { Input } from "semantic-ui-react";
import styled from "styled-components";

const Wrapper = styled.section`
  div.ui.input {
    width: 100%;
    margin-top: 8px;
  }
`

export default function BountyTitle() {
  const dispatch = useDispatch()
  const title = useSelector(newBountyTitleSelector)

  return (
    <Wrapper>
      <Title>Title</Title>
      <Input
        placeholder='Input bounty title'
        value={title}
        onChange={(event, data) => {
          dispatch(setNewBountyTitle(data.value))
        }} />
    </Wrapper>
  )
}
