import { Button } from "semantic-ui-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  newBountyContentSelector,
  newBountyTitleSelector,
  newBountyTokenAmountSelector,
  newBountyTokenSelector,
  setNewBountyAmountError,
  setNewBountyDetailError,
  setNewBountyTitleError
} from "@store/reducers/newBountySlice";
import { newBounty } from "@pages/NewBounty/BountyAction/utils";
import testKeyring from "@polkadot/keyring/testing"
import { osnPrecisionSelector, ss58FormatSelector } from "@store/reducers/chainSlice";
import BigNumber from "bignumber.js";
import { postContent } from "@services/contentServer";
import { accountSelector, isLoginSelector } from "@store/reducers/accountSlice";
import ErrorLine from "@components/ErrorLine";
import createBounty from "@pages/NewBounty/BountyAction/createBounty";
import { useHistory } from "react-router";
import { sleep } from "../../../utils"
import api from "@services/explorerApi";


async function checkBountyDataReady(bountyId) {
  const { result } = await api.fetch(`/bounties/${bountyId}`)
  return !!result
}

export default function Action() {
  const token = useSelector(newBountyTokenSelector)
  const title = useSelector(newBountyTitleSelector)
  const amount = useSelector(newBountyTokenAmountSelector)
  const description = useSelector(newBountyContentSelector)
  const precision = useSelector(osnPrecisionSelector)
  const isLogin = useSelector(isLoginSelector)
  const account = useSelector(accountSelector)

  const [creating, setCreating] = useState(false)

  const ss58Format = useSelector(ss58FormatSelector)
  const dispatch = useDispatch()
  const history = useHistory()

  const create = async () => {
    setCreating(true)

    let hasError = false
    if (!title) {
      dispatch(setNewBountyTitleError('Title can not be empty'))
      hasError = true
    }

    if (!description) {
      dispatch(setNewBountyDetailError('Description can not be empty'))
      hasError = true
    }

    if (!amount || isNaN(parseFloat(amount))) {
      dispatch(setNewBountyAmountError('Invalid amount value'))
      hasError = true
    }

    if (hasError) {
      setCreating(false)
      return
    }

    await postContent(description)
    const keyring = testKeyring()
    keyring.setSS58Format(ss58Format)

    let bountyId = null
    try {
      const realAmount = new BigNumber(amount).multipliedBy(Math.pow(10, precision)).toNumber()
      const bounty = newBounty(account.address, token, realAmount, title, description)

      bountyId = await createBounty(account, bounty, dispatch, ss58Format)
    } finally {
      setCreating(false)
    }

    // Wait until bounty data is ready before redirecting
    if (bountyId) {
      // Maximium wait time
      let maxWaitSeconds = 8

      while (maxWaitSeconds--) {
        await sleep(1000)
        const ready = await checkBountyDataReady(bountyId)
        if (ready) {
          history.push(`/bounty/${bountyId}`)
          break
        }
      }
    }
  }

  return (
    <>
      <Button
        disabled={!isLogin || creating}
        primary
        onClick={create}>
        {creating ? 'Funding' : 'Fund Bounty'}
      </Button>
      {
        !isLogin && <ErrorLine>Please sign in to create bounty</ErrorLine>
      }
    </>
  )
}
