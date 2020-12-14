import { createSelector, createSlice } from '@reduxjs/toolkit'

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
export const isCouncilorSelector = state => state.account.isCouncilor
export const {
  setAccount,
  setAccountsModalOpen,
  removeAccount,
  setIsCouncilor,
} = accountSlice.actions
export default accountSlice.reducer
