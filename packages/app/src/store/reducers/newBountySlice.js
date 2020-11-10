import { createSlice } from '@reduxjs/toolkit'
import { newBountySourceOptions } from "@pages/NewBounty/constants";
import { tokenOptions } from "../../constants/tokens";

const newBountySlice = createSlice({
  name: 'newBounty',
  initialState: {
    type: newBountySourceOptions[0],
    title: '',
    content: '',
    token: tokenOptions[0].value,
    amount: ''
  },
  reducers: {
    setType(state, { payload }) {
      state.type = payload
    },
    setTitle(state, { payload }) {
      state.title = payload
    },
    setToken(state, { payload }) {
      state.token = payload
    },
    setAmount(state, { payload }) {
      state.amount = payload
    },
    setContent(state, { payload }) {
      state.content = payload
    }
  }
})

export const {
  setType: setNewBountySourceType,
  setTitle: setNewBountyTitle,
  setToken: setNewBountyToken,
  setAmount: setNewBountyAmount,
  setContent: setNewBountyContent,
} = newBountySlice.actions

export const newBountySourceSelector = state => state.newBounty.type
export const newBountyTitleSelector = state => state.newBounty.title
export const newBountyTokenSelector = state => state.newBounty.token
export const newBountyTokenAmountSelector = state => state.newBounty.amount
export const newBountyContentSelector = state => state.newBounty.content

export default newBountySlice.reducer
