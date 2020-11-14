import { combineReducers } from 'redux'
import testReducer from './testSlice'
import newBountyReducer from './newBountySlice'
import explorerReducer from './explorerSlice'
import chainReducer from './chainSlice'
import accountReducer from './accountSlice'
import balanceReducer from './balanceSlice'
import toastReducer from './toastSlice'

export default combineReducers({
  test: testReducer,
  newBounty: newBountyReducer,
  explorer: explorerReducer,
  chain: chainReducer,
  account: accountReducer,
  balance: balanceReducer,
  toast: toastReducer
})
