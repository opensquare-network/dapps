import React from 'react';
import { Wrapper } from "./components";
import Logo from './logo.png'
import { useHistory } from "react-router";

export default function() {
  const history = useHistory()

  return <Wrapper>
    <img src={Logo} alt="" onClick={() => {
      history.push(`/`)
    }} />
  </Wrapper>
}
