import { createSlice } from '@reduxjs/toolkit'
import api from "@services/explorerApi";
import contentApi from "@services/contentApi";

const bountySlice = createSlice({
  name: 'bounty',
  initialState: {
    bounty: null,
    loadingBounty: false,
    bountyContent: null,
    loadingBountyContent: false,
  },
  reducers: {
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
  setBounty,
  setLoadingBounty,
  setBountyContent,
  setLoadingBountyContent,
} = bountySlice.actions

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

export const bountySelector = state => state.bounty.bounty
export const bountyLoadingSelector = state => state.bounty.loadingBounty
export const bountyContentSelector = state => state.bounty.bountyContent
export const bountyContentLoadingSelector = state => state.bounty.loadingBountyContent

export default bountySlice.reducer
