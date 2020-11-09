import { createSlice } from '@reduxjs/toolkit'

const explorerSlice = createSlice({
  name: 'explorer',
  initialState: {
    bounties: [],
  },
  reducers: {
    setBounties(state, { payload }) {
      state.bounties = payload
    }
  }
})

export const { setBounties } = explorerSlice.actions
export const bountiesSelector = state => state.explorer.bounties

export default explorerSlice.reducer
