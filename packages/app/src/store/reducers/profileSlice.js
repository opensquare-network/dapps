import { createSlice } from '@reduxjs/toolkit'

export const profileTabs = [
  'Ongoing Bounties',
  'Applying Bounties'
]

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    tab: profileTabs[0]
  },
  reducers: {
    setTab(state, { payload }) {
      state.tab = payload
    }
  }
})

export const {
  setTab: setProfileTab
} = profileSlice.actions

export const profileTabSelector = state => state.profile.tab

export default profileSlice.reducer
