import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isWeb3Injected, web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp'
import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { useDispatch, useSelector } from "react-redux";
import { ss58FormatSelector } from "@store/reducers/chainSlice";
import { Modal } from "semantic-ui-react";
import Addr from "@components/Address";
import { getApi } from "@services/api";
import { nowAddressSelector, setAccount } from "@store/reducers/accountSlice";
import ClipboardJS from 'clipboard'
import Account from "@pages/Header/Account";

const SignInWrapper = styled.span`
  cursor: pointer;
  
  &:hover {
    color: #04D2C5;
  }
`

const SignInModal = styled(Modal)`
  .account-select-content {
    li {
      display: flex;
      justify-content: space-between;
      line-height: 36px;
      cursor: pointer;
      
      &:hover {
        background: #FBFBFB;
      }
    }
  }
`

export default function() {
  const ss58Format = useSelector(ss58FormatSelector)
  const [modalOpen, setModalOpen] = useState(false)
  const [noExtensionModalOpen, setNoExtensionModalOpen] = useState(false)
  const [accounts, setAccounts] = useState([])
  const nowAddress = useSelector(nowAddressSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    const clipBoard = new ClipboardJS('.clipboard')

    return function() {
      clipBoard.destroy()
    }
  }, [])

  const signIn = async () => {
    await web3Enable('OpenSquare')

    if (!isWeb3Injected) {
      return setNoExtensionModalOpen(true)
    }
    const allAccounts = await web3Accounts()

    const accounts = allAccounts.map(({ address, meta: { name } }) => {
      const pub = decodeAddress(address, true)
      return {
        address: encodeAddress(pub, ss58Format),
        name,
        extensionAddress: address
      }
    })

    setAccounts(accounts)
    setModalOpen(true)
  }

  const signInWithAddress = async account => {
    const injector = web3FromAddress(account.extensionAddress)

    const api = await getApi()
    api.setSigner(injector.signer)
    dispatch(setAccount(account))
    setModalOpen(false)
  }

  return (
    <>
      {
        nowAddress ?
          <Account setModalOpen={setModalOpen} />
          :
          <SignInWrapper onClick={signIn}>Sign in</SignInWrapper>
      }

      <SignInModal
        size="mini"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Modal.Header>Select accounts</Modal.Header>
        <Modal.Content className="account-select-content">
          <ol>
            {
              accounts.map(account => {
                return (
                  <li key={account.address} onClick={async () => {
                    await signInWithAddress(account)
                  }}>
                    <span>{account.name}</span>
                    <Addr>{account.address}</Addr>
                  </li>
                )
              })
            }
          </ol>
        </Modal.Content>
      </SignInModal>

      <Modal
        size="mini"
        open={noExtensionModalOpen}
        onClose={() => setNoExtensionModalOpen(false)}
      >
        <Modal.Header>Sign in</Modal.Header>
        <Modal.Content>
          Polkadot extension was not found. Please install or enable it.
        </Modal.Content>
      </Modal>
    </>
  )
}
