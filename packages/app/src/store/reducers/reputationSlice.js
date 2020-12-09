import { createSlice } from '@reduxjs/toolkit'
import { getApi } from "@services/api";

const reputationSlice = createSlice({
  name: 'reputation',
  initialState: {
    reputation: 0,
  },
  reducers: {
    setReputation(state, { payload }) {
      state.reputation = payload
    }
  }
})

export const {
  setReputation,
} = reputationSlice.actions

export const fetchReputation = address => async dispatch => {
  if (!address) {
    dispatch(setReputation(0))
    return
  }
  try {
    const api = await getApi()
    const result = await api.query.osReputation.behaviorScore(address)
    dispatch(setReputation(result.toNumber()))
  } finally {
  }
}

export const reputationSelector = state => state.reputation.reputation
export default reputationSlice.reducer
