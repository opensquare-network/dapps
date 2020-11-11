import React from 'react';
import { Wrapper } from "./components";
import Logo from './logo.png'
import { useHistory } from "react-router";
import SignIn from "@pages/Header/SignIn";

export default function() {
  const history = useHistory()

  return <Wrapper>
    <img src={Logo} alt="" onClick={() => {
      history.push(`/`)
    }} />
    <SignIn />
  </Wrapper>
}
