import React from 'react';
import { Wrapper, RightWrapper } from "./components";
import Logo from './logo.png'
import { useHistory } from "react-router";
import SignIn from "@pages/Header/SignIn";
import { useLocation } from 'react-router-dom'

import NavBar from "./NavBar";
import NavItem from "./NavItem";

export default function() {
  const history = useHistory()
  const location = useLocation();

  return <Wrapper>
    <img src={Logo} alt="" onClick={() => {
      history.push(`/`)
    }} />
    <RightWrapper>
      <NavBar locationpathname={location.pathname}>
        <NavItem pathname={'/councilor'}>Councilor</NavItem>
      </NavBar>
      <SignIn />
    </RightWrapper>
  </Wrapper>
}
