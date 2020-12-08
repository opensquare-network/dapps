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
    bounty: null,
    loadingBounty: false,
    bountyContent: null,
    loadingBountyContent: false,
  },
  reducers: {
    setBounties(state, { payload }) {
      state.bounties = payload
    },
    setLoadingBounties(state, { payload }) {
      state.loadingBounties = payload
    },
    setBounty(state, { payload }) {
      state.bounty = payload
    },
    setLoadingBounty(state, { payload }) {
      state.loadingBounty = payload
    },
    setBountyContent(state, { payload }) {
      state.bountyContent = payload
    },
    setLoadingBountyContent(state, { payload }) {
      state.loadingBountyContent = payload
    },
  }
})


export const {
  setBounties,
  setLoadingBounties,
  setBounty,
  setLoadingBounty,
  setBountyContent,
  setLoadingBountyContent,
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

export const fetchBounty = (bountyId) => async dispatch => {
  dispatch(setLoadingBounty(true))
  try {
    const { result } = await api.fetch(`/bounties/${bountyId}`)
    dispatch(setBounty(result))
  } finally {
    dispatch(setLoadingBounty(false))
  }
}

export const fetchBountyContent = contentHash => async dispatch => {
  dispatch(setLoadingBountyContent(true))
  try {
    const { result } = await contentApi.fetch(`/content/${contentHash}`)
    dispatch(setBountyContent(result))
  } finally {
    dispatch(setLoadingBountyContent(false))
  }
}

export const bountiesSelector = state => state.explorer.bounties
export const bountiesLoadingSelector = state => state.explorer.loadingBounties
export const bountySelector = state => state.explorer.bounty
export const bountyLoadingSelector = state => state.explorer.loadingBounty
export const bountyContentSelector = state => state.explorer.bountyContent
export const bountyContentLoadingSelector = state => state.explorer.loadingBountyContent

export default explorerSlice.reducer
