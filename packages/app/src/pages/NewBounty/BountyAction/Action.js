import { Button } from "semantic-ui-react";
import React from "react";
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
import { getApi } from "@services/api";
import { newBounty } from "@pages/NewBounty/BountyAction/utils";
import testKeyring from "@polkadot/keyring/testing"
import { osnPrecisionSelector, ss58FormatSelector } from "@store/reducers/chainSlice";
import { encodeAddress } from "@polkadot/keyring";
import BigNumber from "bignumber.js";
import { postContent } from "@services/contentServer";
import { accountSelector, isLoginSelector } from "@store/reducers/accountSlice";
import ErrorLine from "@components/ErrorLine";
import { addFlashToast, toastType } from "@store/reducers/toastSlice";

export default function Action() {
  const token = useSelector(newBountyTokenSelector)
  const title = useSelector(newBountyTitleSelector)
  const amount = useSelector(newBountyTokenAmountSelector)
  const description = useSelector(newBountyContentSelector)
  const precision = useSelector(osnPrecisionSelector)
  const isLogin = useSelector(isLoginSelector)
  const account = useSelector(accountSelector)

  const ss58Format = useSelector(ss58FormatSelector)
  const dispatch = useDispatch()

  const create = async () => {
    let hasError = false
    if (!title) {
      dispatch(setNewBountyTitleError('Title can not be empyt'))
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
      return
    }

    await postContent(description)
    const keyring = testKeyring()
    keyring.setSS58Format(ss58Format)

    const api = await getApi()
    const realAmount = new BigNumber(amount).multipliedBy(Math.pow(10, precision)).toNumber()
    const bounty = newBounty(account.address, token, realAmount, title, description)

    const unsub = await api.tx.osBounties.createBounty(bounty)
      .signAndSend(account.extensionAddress, async ({ events = [], status }) => {
        console.log('status', status)
        if (status.isInBlock) {
          dispatch(addFlashToast(toastType.INFO, 'Extrinsic inBlock'))
        }

        for (const item of events) {
          console.log('events', events)
          const { event } = item
          const method = event.method
          const data = event.data.toJSON()

          if ('ApplyBounty' === method && status.isFinalized) {
            const [accountId, bountyId] = data
            console.log(`${encodeAddress(accountId, ss58Format)} created bounty ${bountyId}`)
            dispatch(addFlashToast(toastType.SUCCESS, 'Bounty created, and please wait for the council review'))
          }
        }

        if (status.isFinalized) {
          unsub()
        }
      })

    // TODO: go to explorer page after the creating
  }

  return (
    <>
      <Button
        disabled={!isLogin}
        primary
        onClick={create}>
        Fund Bounty
      </Button>
      {
        !isLogin && <ErrorLine>Please sign in to create bounty</ErrorLine>
      }
    </>
  )
}
