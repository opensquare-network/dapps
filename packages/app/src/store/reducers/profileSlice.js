import { createSlice } from '@reduxjs/toolkit'
import api from "@services/explorerApi";

export const profileTabs = [
  'Pending Approve',
  'Fund Bounties',
  'Ongoing Bounties',
  'Applying Bounties',
  'Behavior List',
]

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    tab: profileTabs[0],
    pendingApproveBounties: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    loadingPendingApproveBounties: false,
    fundBounties: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    loadingFundBounties: false,
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
    countBehaviors: 0,
    countOngoingBounties: 0,
    countApplyingBounties: 0,
    countFundBounties: 0,
    countPendingApproveBounties: 0,
  },
  reducers: {
    setTab(state, { payload }) {
      state.tab = payload
    },
    setFundBounties(state, { payload }) {
      state.fundBounties = payload
    },
    setLoadingFundBounties(state, { payload }) {
      state.loadingFundBounties = payload
    },
    setPendingApproveBounties(state, { payload }) {
      state.pendingApproveBounties = payload
    },
    setLoadingPendingApproveBounties(state, { payload }) {
      state.loadingPendingApproveBounties = payload
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
    setCountBehaviors(state, { payload }) {
      state.countBehaviors = payload
    },
    setCountOngoingBounties(state, { payload }) {
      state.countOngoingBounties = payload
    },
    setCountApplyingBounties(state, { payload }) {
      state.countApplyingBounties = payload
    },
    setCountFundBounties(state, { payload }) {
      state.countFundBounties = payload
    },
    setCountPendingApproveBounties(state, { payload }) {
      state.countPendingApproveBounties = payload
    },
  }
})

export const {
  setTab: setProfileTab,
  setFundBounties,
  setLoadingFundBounties,
  setPendingApproveBounties,
  setLoadingPendingApproveBounties,
  setApplyingBounties,
  setLoadingApplyingBounties,
  setOngoingBounties,
  setLoadingOngoingBounties,
  setBehaviors,
  setLoadingBehaviors,
  setCountBehaviors,
  setCountOngoingBounties,
  setCountApplyingBounties,
  setCountFundBounties,
  setCountPendingApproveBounties,
} = profileSlice.actions

export const fetchFundBounties = (address, page, pageSize) => async dispatch => {
  if (!address) {
    dispatch(setFundBounties({
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    }))
    return
  }
  dispatch(setLoadingFundBounties(true))
  try {
    const { result } = await api.fetch(`/accounts/${address}/examinedbounties`, { page, pageSize })
    dispatch(setFundBounties(result))
  } finally {
    dispatch(setLoadingFundBounties(false))
  }
}

export const fetchFundBountiesCount = (address) => async dispatch => {
  if (!address) {
    dispatch(setCountFundBounties(0))
    return
  }
  try {
    const { result } = await api.fetch(`/accounts/${address}/examinedbountiescount`)
    dispatch(setCountFundBounties(result))
  } finally {
  }
}

export const fetchPendingApproveBounties = (address, page, pageSize) => async dispatch => {
  if (!address) {
    dispatch(setPendingApproveBounties({
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    }))
    return
  }
  dispatch(setLoadingPendingApproveBounties(true))
  try {
    const { result } = await api.fetch(`/accounts/${address}/pendingapprove`, { page, pageSize })
    dispatch(setPendingApproveBounties(result))
  } finally {
    dispatch(setLoadingPendingApproveBounties(false))
  }
}

export const fetchPendingApproveBountiesCount = (address) => async dispatch => {
  if (!address) {
    dispatch(setCountPendingApproveBounties(0))
    return
  }
  try {
    const { result } = await api.fetch(`/accounts/${address}/pendingapprovecount`)
    dispatch(setCountPendingApproveBounties(result))
  } finally {
  }
}

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

export const fetchApplyingBountiesCount = (address) => async dispatch => {
  if (!address) {
    dispatch(setCountApplyingBounties(0))
    return
  }
  try {
    const { result } = await api.fetch(`/accounts/${address}/applyingbountiescount`)
    dispatch(setCountApplyingBounties(result))
  } finally {
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

export const fetchOngoingBountiesCount = (address) => async dispatch => {
  if (!address) {
    dispatch(setCountOngoingBounties(0))
    return
  }
  try {
    const { result } = await api.fetch(`/accounts/${address}/assignedbountiescount`)
    dispatch(setCountOngoingBounties(result))
  } finally {
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

export const fetchBehaviorsCount = (address) => async dispatch => {
  if (!address) {
    dispatch(setCountBehaviors(0))
    return
  }
  try {
    const { result } = await api.fetch(`/accounts/${address}/behaviorscount`)
    dispatch(setCountBehaviors(result))
  } finally {
  }
}

export const profileTabSelector = state => state.profile.tab
export const fundBountiesSelector = state => state.profile.fundBounties
export const fundBountiesLoadingSelector = state => state.profile.loadingFundBounties
export const pendingApproveBountiesSelector = state => state.profile.pendingApproveBounties
export const pendingApproveBountiesLoadingSelector = state => state.profile.loadingPendingApproveBounties
export const applyingBountiesSelector = state => state.profile.applyingBounties
export const applyingBountiesLoadingSelector = state => state.profile.loadingApplyingBounties
export const ongoingBountiesSelector = state => state.profile.ongoingBounties
export const ongoingBountiesLoadingSelector = state => state.profile.loadingOngoingBounties
export const behaviorsSelector = state => state.profile.behaviors
export const behaviorsLoadingSelector = state => state.profile.loadingBehaviors

export const fundBountiesCountSelector = state => state.profile.countFundBounties
export const pendingApproveBountiesCountSelector = state => state.profile.countPendingApproveBounties
export const applyingBountiesCountSelector = state => state.profile.countApplyingBounties
export const ongoingBountiesCountSelector = state => state.profile.countOngoingBounties
export const behaviorsCountSelector = state => state.profile.countBehaviors

export default profileSlice.reducer
