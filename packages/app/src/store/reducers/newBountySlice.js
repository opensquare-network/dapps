import { createSlice } from '@reduxjs/toolkit'
import { newBountySourceOptions } from "@pages/NewBounty/constants";

const newBountySlice = createSlice({
  name: 'newBounty',
  initialState: {
    type: newBountySourceOptions[0],
    content: '',
  },
  reducers: {
    setType(state, { payload }) {
      state.type = payload
    },
    setContent(state, { payload }) {
      state.content = payload
    }
  }
})

export const {
  setType: setNewBountySourceType,
  setContent: setNewBountyContent,
} = newBountySlice.actions

export const newBountySourceSelector = state => state.newBounty.type
export const newBountyContentSelector = state => state.newBounty.content

export default newBountySlice.reducer
