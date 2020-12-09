import { createSlice } from '@reduxjs/toolkit'
import api from "@services/explorerApi";

export const profileTabs = [
  'Ongoing Bounties',
  'Applying Bounties',
  'Behavior List',
]

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    tab: profileTabs[0],
    applyingBounties: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    loadingApplyingBounties: false,
    ongoingBounties: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    loadingOngoingBounties: false,
    behaviors: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    loadingBehaviors: false,
  },
  reducers: {
    setTab(state, { payload }) {
      state.tab = payload
    },
    setApplyingBounties(state, { payload }) {
      state.applyingBounties = payload
    },
    setLoadingApplyingBounties(state, { payload }) {
      state.loadingApplyingBounties = payload
    },
    setOngoingBounties(state, { payload }) {
      state.ongoingBounties = payload
    },
    setLoadingOngoingBounties(state, { payload }) {
      state.loadingOngoingBounties = payload
    },
    setBehaviors(state, { payload }) {
      state.behaviors = payload
    },
    setLoadingBehaviors(state, { payload }) {
      state.loadingBehaviors = payload
    },
  }
})

export const {
  setTab: setProfileTab,
  setApplyingBounties,
  setLoadingApplyingBounties,
  setOngoingBounties,
  setLoadingOngoingBounties,
  setBehaviors,
  setLoadingBehaviors,
} = profileSlice.actions

export const fetchApplyingBounties = (address, page, pageSize) => async dispatch => {
  if (!address) {
    dispatch(setApplyingBounties({
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    }))
    return
  }
  dispatch(setLoadingApplyingBounties(true))
  try {
    const { result } = await api.fetch(`/accounts/${address}/applyingbounties`, { page, pageSize })
    dispatch(setApplyingBounties(result))
  } finally {
    dispatch(setLoadingApplyingBounties(false))
  }
}

export const fetchOngoingBounties = (address, page, pageSize) => async dispatch => {
  if (!address) {
    dispatch(setOngoingBounties({
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    }))
    return
  }
  dispatch(setLoadingOngoingBounties(true))
  try {
    const { result } = await api.fetch(`/accounts/${address}/assignedbounties`, { page, pageSize })
    dispatch(setOngoingBounties(result))
  } finally {
    dispatch(setLoadingOngoingBounties(false))
  }
}

export const fetchBehaviors = (address, page, pageSize) => async dispatch => {
  if (!address) {
    dispatch(setBehaviors({
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    }))
    return
  }
  dispatch(setLoadingBehaviors(true))
  try {
    const { result } = await api.fetch(`/accounts/${address}/behaviors`, { page, pageSize })
    dispatch(setBehaviors(result))
  } finally {
    dispatch(setLoadingBehaviors(false))
  }
}

export const profileTabSelector = state => state.profile.tab
export const applyingBountiesSelector = state => state.profile.applyingBounties
export const applyingBountiesLoadingSelector = state => state.profile.loadingApplyingBounties
export const ongoingBountiesSelector = state => state.profile.ongoingBounties
export const ongoingBountiesLoadingSelector = state => state.profile.loadingOngoingBounties
export const behaviorsSelector = state => state.profile.behaviors
export const behaviorsLoadingSelector = state => state.profile.loadingBehaviors

export default profileSlice.reducer
