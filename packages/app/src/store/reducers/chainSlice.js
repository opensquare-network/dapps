import { createSlice } from '@reduxjs/toolkit'
import { getApi } from "@services/api";

const chainSlice = createSlice({
  name: 'chain',
  initialState: {
    properties: {
      "ss58Format": 16,
      "tokenDecimals": 8,
      "tokenSymbol": "OSN"
    },
  },
  reducers: {
    setProperties(state, { payload }) {
      state.properties = payload
    }
  }
})

export const fetchProperties = () => async dispatch => {
  const api = await getApi()
  const systemProperties = await api.rpc.system.properties()
  const properties = systemProperties.toJSON()

  dispatch(setProperties(properties))
}

export const { setProperties } = chainSlice.actions

export default chainSlice.reducer
