import { useDispatch, useSelector } from "react-redux";
import { nowAddressSelector, setAccount, setAccountsModalOpen, setIsCouncilor } from "@store/reducers/accountSlice";
import React, { useEffect, useState } from "react";
import Addr from "@components/Address";
import { Icon } from "semantic-ui-react";
import ClipboardJS from "clipboard";
import styled from "styled-components";

const Wrapper = styled.span`

    i {
      &:first-of-type {
        margin-left: 10px;
      }

      font-weight: normal;
      font-size: 14px;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.32);;
    }

`

export default function Account() {
  const address = useSelector(nowAddressSelector)
  const [copied, setCopied] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const clipBoard = new ClipboardJS('.profile-clipboard')

    return function() {
      clipBoard.destroy()
    }
  }, [])


  return (
    <Wrapper>
      <Addr length={9}>{address}</Addr>
      <Icon name="edit" title="Change Account" onClick={() => {
        dispatch(setAccountsModalOpen(true))
      }} />

      {
        copied ?
          <Icon name="check circle" title="Copied" color="grey" />
          :
          <Icon
            className="profile-clipboard"
            data-clipboard-text={address}
            name="copy outline"
            title="Copy"
            onClick={() => {
              setCopied(true)
              setTimeout(() => {
                setCopied(false)
              }, 1000)
            }} />
      }

      <Icon name="sign-out" title="Sign Out" onClick={() => {
        dispatch(setAccount(null))
        dispatch(setIsCouncilor(false))
      }} />
    </Wrapper>
  )
}
