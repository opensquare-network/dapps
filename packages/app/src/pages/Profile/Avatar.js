import styled from "styled-components";
import React from "react";
import { useSelector } from "react-redux";
import { nowAddressSelector } from "@store/reducers/accountSlice";

const Image = styled.img`
  border-radius: 36px;
`

export default function() {
  const address = useSelector(nowAddressSelector)
  const url = `https://www.tinygraphs.com/squares/${address || '--'}?theme=frogideas&numcolors=2&size=72&fmt=svg`

  return <Image src={url} alt="" />
}
