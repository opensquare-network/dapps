import React from "react";
import styled from "styled-components";
import { Input } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  amountErrorSelector,
  newBountyTokenAmountSelector,
  newBountyTokenSelector,
  setNewBountyAmount, setNewBountyAmountError
} from "@store/reducers/newBountySlice";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  
  label {
    font-size: 14px;
    line-height: 24px;
    color: rgba(29, 37, 60, 0.64);
  }
  
  & > div.ui.input {
    margin-top: unset !important;
  }
`

export default function TokenAmount() {
  const amount = useSelector(newBountyTokenAmountSelector)
  const dispatch = useDispatch()
  const token = useSelector(newBountyTokenSelector)
  const amountError = useSelector(amountErrorSelector)

  return (
    <Wrapper>
      <label>Amount</label>
      <Input
        error={!!amountError}
        value={amount}
        label={{ basic: true, content: token }}
        labelPosition='right'
        placeholder='Enter amount...'
        onChange={(event, data) => {
          dispatch(setNewBountyAmountError(null))
          dispatch(setNewBountyAmount(data.value))
        }}
      />
    </Wrapper>
  )
}
