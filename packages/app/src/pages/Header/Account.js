import styled from "styled-components";
import Addr from "@components/Address";
import { Icon } from "semantic-ui-react";
import { nowAddressSelector, setAccount } from "@store/reducers/accountSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setBalances } from "@store/reducers/balanceSlice";
import { getApi } from "@services/api";

const AccountWrapper = styled.span`
  & > a {
    color: unset;
    &:hover {
      color: #04D2C5;
    }
  }

  i {
    margin-left: 10px;
    cursor: pointer;
    
    &:not(:first-of-type) {
      margin-left: 3px;
    }
  }
`

export default function Account({ setModalOpen }) {
  const nowAddress = useSelector(nowAddressSelector)
  const [copied, setCopied] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!nowAddress) {
      dispatch(setBalances(null))
      return
    }

    let unsub = null
    getApi().then(api => {
      return api.query.system.account(nowAddress, ({ data: balance }) => {
        dispatch(setBalances(balance.toJSON()))
      })
    }).then(unSubscribe => {
      unsub = unSubscribe
    })

    return () => {
      if (unsub) {
        unsub()
      }
    }

  }, [nowAddress, dispatch])

  return (
    <AccountWrapper>
      <a href="/profile" onClick={(event) => {
        event.preventDefault()
        history.push('/profile')
      }}>
        <Addr>{nowAddress}</Addr>
      </a>
      <Icon name="edit" title="Change Account" onClick={() => setModalOpen(true)} />
      {
        copied ?
          <Icon name="check circle" title="Copied" color="grey" />
          :
          <Icon
            className="clipboard"
            data-clipboard-text={nowAddress}
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
      }} />
    </AccountWrapper>
  )
}
