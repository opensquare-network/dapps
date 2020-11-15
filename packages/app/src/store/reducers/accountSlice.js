import { createSelector, createSlice } from '@reduxjs/toolkit'

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    account: null,
    accountsModalOpen: false,
  },
  reducers: {
    setAccount(state, { payload }) {
      state.account = payload
    },
    setAccountsModalOpen(state, { payload }) {
      state.accountsModalOpen = payload
    }
  }
})

export const accountsModalOpenSelector = state => state.account.accountsModalOpen
export const accountSelector = state => state.account.account
export const isLoginSelector = createSelector(accountSelector, account => {
  return !!account
})
export const nowAddressSelector = state => state.account.account?.address
export const {
  setAccount,
  setAccountsModalOpen
} = accountSlice.actions
export default accountSlice.reducer
