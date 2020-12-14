import { createSelector, createSlice } from '@reduxjs/toolkit'

const councilorAddr = '2ck7Ffrom1wmewMWUuQQYcw5tgTxiLj3c8foQ1hgc5dL2N3P'

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    account: null,
    accountsModalOpen: false,
    isCouncilor: false,
  },
  reducers: {
    setAccount(state, { payload }) {
      state.account = payload
    },
    setIsCouncilor(state, { payload }) {
      state.isCouncilor = payload
    },
    setAccountsModalOpen(state, { payload }) {
      state.accountsModalOpen = payload
    },
    removeAccount(state) {
      state.account = null
    }
  }
})

export const accountsModalOpenSelector = state => state.account.accountsModalOpen
export const accountSelector = state => state.account.account
export const isLoginSelector = createSelector(accountSelector, account => {
  return !!account
})
export const nowAddressSelector = state => state.account.account?.address
export const isCouncilorSelector = createSelector(accountSelector, account => {
  return account?.address === councilorAddr
})
export const {
  setAccount,
  setAccountsModalOpen,
  removeAccount,
  setIsCouncilor,
} = accountSlice.actions
export default accountSlice.reducer
