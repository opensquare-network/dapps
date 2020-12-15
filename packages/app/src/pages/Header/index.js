import React from 'react';
import { useSelector } from "react-redux";
import { Wrapper, RightWrapper } from "./components";
import Logo from './logo.png'
import { useHistory } from "react-router";
import SignIn from "@pages/Header/SignIn";
import { useLocation } from 'react-router-dom'

import NavBar from "./NavBar";
import NavItem from "./NavItem";
import { isCouncilorSelector } from "@store/reducers/accountSlice";

export default function() {
  const history = useHistory()
  const location = useLocation()
  const isCouncilor = useSelector(isCouncilorSelector)

  return <Wrapper>
    <img src={Logo} alt="" onClick={() => {
      history.push(`/`)
    }} />
    <RightWrapper>
      <NavBar locationpathname={location.pathname}>
        <NavItem pathname={'/'}>Home</NavItem>
        <NavItem pathname={'/councilor'} visibility={isCouncilor} >Councilor</NavItem>
      </NavBar>
      <SignIn />
    </RightWrapper>
  </Wrapper>
}
