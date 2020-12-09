import { createSlice } from '@reduxjs/toolkit'
import { getApi } from "@services/api";
import { blockPerSession } from '../../utils/constants';

const miningPowerSlice = createSlice({
  name: 'miningPower',
  initialState: {
    sessionMiningPower: 0,
  },
  reducers: {
    setSessionMiningPower(state, { payload }) {
      state.sessionMiningPower = payload
    }
  }
})

export const {
  setSessionMiningPower,
} = miningPowerSlice.actions

export const fetchSessionMiningPower = address => async dispatch => {
  if (!address) {
    dispatch(setSessionMiningPower(0))
    return
  }
  try {
    const api = await getApi()
    const hash = await api.rpc.chain.getFinalizedHead()
    const block = await api.rpc.chain.getBlock(hash)
    const lastBlockHeight = block.block.header.number
    const sessionIndex = Math.floor(lastBlockHeight / blockPerSession)
    const result = await api.query.osMining.sessionAccountMiningPower(sessionIndex, address)
    dispatch(setSessionMiningPower(result.toNumber()))
  } finally {
  }
}
export const sessionMiningPowerSelector = state => state.miningPower.sessionMiningPower
export default miningPowerSlice.reducer
