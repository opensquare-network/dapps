import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Wrapper = styled(NavLink)`
  color: ${p => p.pathname === p.locationpathname ?  '#1D253C' : 'rgba(29, 37, 60, 0.64)'}
`

export default function({ pathname, locationpathname, children }) {
  return (
      <Wrapper to={pathname} pathname={pathname} locationpathname={locationpathname}>{children}</Wrapper>
  )
}
