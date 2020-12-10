import { createSlice } from '@reduxjs/toolkit'
import api from "@services/explorerApi";
import contentApi from "@services/contentApi";

const explorerSlice = createSlice({
  name: 'explorer',
  initialState: {
    bounties: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    loadingBounties: false,
  },
  reducers: {
    setBounties(state, { payload }) {
      state.bounties = payload
    },
    setLoadingBounties(state, { payload }) {
      state.loadingBounties = payload
    },
  }
})


export const {
  setBounties,
  setLoadingBounties,
} = explorerSlice.actions

export const fetchBounties = ({ state }, page = 0, pageSize = 20) => async dispatch => {
  dispatch(setLoadingBounties(true))
  try {
    const { result } = await api.fetch('/bounties', { state: (state || ''), page, pageSize })
    dispatch(setBounties(result))
  } finally {
    dispatch(setLoadingBounties(false))
  }
}

export const bountiesSelector = state => state.explorer.bounties
export const bountiesLoadingSelector = state => state.explorer.loadingBounties

export default explorerSlice.reducer
