import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'

const stateKey = 'os-state'

function saveState(state) {
  const serializedState = JSON.stringify(state)
  localStorage.setItem(stateKey, serializedState)
}

function loadState() {
  try {
    const serializedState = localStorage.getItem(stateKey)
    if (serializedState === null) {
      return {}
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return {}
  }
}

const persistedState = loadState()
const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState || {}
})

store.subscribe(() => {
  const { account } = store.getState()
  saveState({ account })
})

export default store
