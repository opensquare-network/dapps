import { useDispatch, useSelector } from "react-redux";
import {
  newBountyTitleSelector,
  setNewBountyTitle,
  setNewBountyTitleError,
  titleErrorSelector
} from "@store/reducers/newBountySlice";
import React from "react";
import Title from "@components/Title";
import { Input } from "semantic-ui-react";
import styled from "styled-components";
import ErrorLine from "@components/ErrorLine";

const Wrapper = styled.section`
  div.ui.input {
    width: 100%;
    margin-top: 8px;
  }
`

export default function BountyTitle() {
  const dispatch = useDispatch()
  const title = useSelector(newBountyTitleSelector)
  const titleError = useSelector(titleErrorSelector)

  return (
    <Wrapper>
      <Title>Title</Title>
      <Input
        error={!!titleError}
        placeholder='Input bounty title'
        value={title}
        onChange={(event, data) => {
          dispatch(setNewBountyTitleError(null))
          dispatch(setNewBountyTitle(data.value))
        }} />
      {
        titleError && <ErrorLine>{titleError}</ErrorLine>
      }
    </Wrapper>
  )
}
