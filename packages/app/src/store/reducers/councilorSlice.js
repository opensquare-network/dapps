import { createSlice } from '@reduxjs/toolkit'
import api from "@services/explorerApi";

const councilorSlice = createSlice({
  name: 'councilor',
  initialState: {
    pendingApproveBounties: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    loadingPendingApproveBounties: false,
  },
  reducers: {
    setPendingApproveBounties(state, { payload }) {
      state.pendingApproveBounties = payload
    },
    setLoadingPendingApproveBounties(state, { payload }) {
      state.loadingPendingApproveBounties = payload
    },
  }
})

export const {
  setPendingApproveBounties,
  setLoadingPendingApproveBounties,
} = councilorSlice.actions

export const fetchPendingApproveBounties = (page, pageSize) => async dispatch => {
  dispatch(setLoadingPendingApproveBounties(true))
  try {
    const { result } = await api.fetch(`/councilor/pendingapprove`, { page, pageSize })
    dispatch(setPendingApproveBounties(result))
  } finally {
    dispatch(setLoadingPendingApproveBounties(false))
  }
}

export const pendingApproveBountiesSelector = state => state.councilor.pendingApproveBounties
export const pendingApproveBountiesLoadingSelector = state => state.councilor.loadingPendingApproveBounties

export default councilorSlice.reducer
