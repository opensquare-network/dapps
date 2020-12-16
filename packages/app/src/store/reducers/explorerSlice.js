import { createSlice } from '@reduxjs/toolkit'
import api from "@services/explorerApi";

const explorerSlice = createSlice({
  name: 'explorer',
  initialState: {
    huntableBounties: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    loadingHuntableBounties: false,
  },
  reducers: {
    setHuntableBounties(state, { payload }) {
      state.huntableBounties = payload
    },
    setLoadingHuntableBounties(state, { payload }) {
      state.loadingHuntableBounties = payload
    },
  }
})


export const {
  setHuntableBounties,
  setLoadingHuntableBounties,
} = explorerSlice.actions

export const fetchHuntableBounties = (page = 0, pageSize = 20) => async dispatch => {
  dispatch(setLoadingHuntableBounties(true))
  try {
    const { result } = await api.fetch('/bounties/huntable', { page, pageSize })
    dispatch(setHuntableBounties(result))
  } finally {
    dispatch(setLoadingHuntableBounties(false))
  }
}

export const huntableBountiesSelector = state => state.explorer.huntableBounties
export const huntableBountiesLoadingSelector = state => state.explorer.loadingHuntableBounties

export default explorerSlice.reducer
