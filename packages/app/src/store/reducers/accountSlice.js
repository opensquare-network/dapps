import { createSlice } from '@reduxjs/toolkit'

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    account: null,
  },
  reducers: {
    setAccount(state, { payload }) {
      state.account = payload
    }
  }
})

export const accountSelector = state => state.account.account
export const nowAddressSelector = state => state.account.account?.address
export const { setAccount } = accountSlice.actions
export default accountSlice.reducer
