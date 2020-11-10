import React from "react";
import styled from "styled-components";
import { Dropdown } from "semantic-ui-react";

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

const options = [
  {
    key: 'Native',
    text: 'Native',
    value: 'Native',
    image: { src: '/imgs/opensquare-logo.svg', avatar: true }
  },
  {
    key: 'DOT',
    text: 'DOT',
    value: 'DOT',
    image: { src: '/imgs/polkadot-logo.svg', avatar: true }
  },
];

export default function TokenSelector() {
  return (
    <Wrapper>
      <label>Token</label>
      <StyledDropDown
        options={options}
        defaultValue={options[0].value}
        selection
        onChange={(v, d) => {
          console.log(d)
        }} />
    </Wrapper>
  )
}
