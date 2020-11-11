import { Button } from "semantic-ui-react";
import React from "react";
import { useSelector } from "react-redux";
import {
  newBountyContentSelector,
  newBountyTitleSelector,
  newBountyTokenAmountSelector,
  newBountyTokenSelector
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

  const create = async () => {
    /**
     * TODO:
     * 1. title|amount|description should not be empty
     * 2. amount should be numerical
     */

    if (!title || !description || !amount) {
      throw new Error('Fill the content')
    }

    if (isNaN(parseFloat(amount))) {
      throw new Error('Invalid amount')
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
