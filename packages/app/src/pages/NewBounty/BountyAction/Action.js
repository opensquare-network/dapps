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

export default function Action() {
  const token = useSelector(newBountyTokenSelector)
  const title = useSelector(newBountyTitleSelector)
  const amount = useSelector(newBountyTokenAmountSelector)
  const description = useSelector(newBountyContentSelector)
  const precision = useSelector(osnPrecisionSelector)

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

    const keyring = testKeyring()
    keyring.setSS58Format(ss58Format)
    const alice = keyring.pairs[0]

    const api = await getApi()
    const realAmount = new BigNumber(amount).multipliedBy(Math.pow(10, precision)).toNumber()
    const bounty = newBounty(alice.address, token, realAmount, title, description)

    const unsub = await api.tx.osBounties.createBounty(bounty)
      .signAndSend(alice, async ({ events = [], status }) => {
        for (const item of events) {
          console.log('events', events)
          const { event } = item
          const method = event.method
          const data = event.data.toJSON()

          if ('ApplyBounty' === method) {
            const [accountId, bountyId] = data
            console.log(`${encodeAddress(accountId, ss58Format)} created bounty ${bountyId}`)
          }
        }

        if (status.isFinalized) {
          unsub()
        }
      })

    // TODO: go to explorer page after the creating
  }

  return (
    <Button primary onClick={create}>Fund Bounty</Button>
  )
}
