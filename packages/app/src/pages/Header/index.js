import React from 'react';
import { Wrapper } from "./components";
import Logo from './logo.svg'

export default function() {
  return <Wrapper>
    <div>
      <img src={Logo} alt="logo" />
    </div>
  </Wrapper>
}
