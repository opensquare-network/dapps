import styled from "styled-components";
import Addr from "@components/Address";
import { nowAddressSelector } from "@store/reducers/accountSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setBalances } from "@store/reducers/balanceSlice";
import { getApi } from "@services/api";

const AccountWrapper = styled.span`
  & > a {
    color: unset;
    & > span {
      margin-left: 8px;
      color: #04D2C5;
      &:hover {
        color: #04B9AD;
      }
      &:focus {
        color: #04B9AD;
      }
    }
  }
`

export default function Account() {
  const nowAddress = useSelector(nowAddressSelector)

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
        dispatch(setBalances({ free: 0, resevered: 0 }))
      }
    }

  }, [nowAddress, dispatch])

  return (
    <AccountWrapper>
      <a href="/profile" onClick={(event) => {
        event.preventDefault()
        history.push('/profile')
      }}>
        Hello, <Addr>{nowAddress}</Addr>
      </a>
    </AccountWrapper>
  )
}
