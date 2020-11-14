import { createSlice } from "@reduxjs/toolkit";

let nativeId = 0

function getNextToastId() {
  return nativeId++;
}

export const toastType = {
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}

const toastSlice = createSlice({
  name: 'account',
  initialState: {
    toasts: [],
  },
  reducers: {
    addToast(state, { payload: { id, type, title, items = [] } }) {
      state.toasts.push({
        id,
        type: type || toastType.INFO,
        title,
        items
      })
    },
    dismissToast(state, { payload }) {
      const idx = state.toasts.findIndex(toast => toast.id === payload)
      state.toasts.splice(idx, 1)
    }
  }
})

export const toastSelector = state => state.toast.toasts

export const {
  addToast,
  dismissToast
} = toastSlice.actions

export const addFlashToast = (type, title, seconds = 5) => dispatch => {
  const id = getNextToastId()
  dispatch(addToast({
    id,
    type,
    title
  }))

  setTimeout(() => {
    dispatch(dismissToast(id))
  }, seconds * 1000)
}

export default toastSlice.reducer
