import { createSlice } from '@reduxjs/toolkit'

const accountSlice = createSlice({
  name: 'balance',
  initialState: {
    balances: null,
  },
  reducers: {
    setBalances(state, { payload }) {
      state.balances = payload
    }
  }
})

export const {
  setBalances,
} = accountSlice.actions

export const freeBalanceSelector = state => state.balance.balances?.free || 0
export const reservedBalanceSelector = state => state.balance.balances?.reserved || 0
export default accountSlice.reducer
