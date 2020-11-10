import React from "react";
import styled from "styled-components";
import { Dropdown } from "semantic-ui-react";
import { tokenOptions } from "../../../constants/tokens";
import { useDispatch } from "react-redux";
import { setNewBountyToken } from "@store/reducers/newBountySlice";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  
  label {
    font-size: 14px;
    line-height: 24px;
    color: rgba(29, 37, 60, 0.64);
  }
`

const StyledDropDown = styled(Dropdown)`
  display: inline-flex !important;
  align-items: center !important;
  
  &:focus {
    border-color: #04D2C5 !important;
    .menu {
      border-color: #04D2C5 !important;
    }
  }
  
  i {
    top: unset !important;
  }
`;

export default function TokenSelector() {
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <label>Token</label>
      <StyledDropDown
        options={tokenOptions}
        defaultValue={tokenOptions[0].value}
        selection
        onChange={(v, d) => {
          dispatch(setNewBountyToken(d.value))
        }} />
    </Wrapper>
  )
}
