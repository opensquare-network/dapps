import { combineReducers } from 'redux'
import testReducer from './testSlice'
import newBountyReducer from './newBountySlice'
import explorerReducer from './explorerSlice'
import chainReducer from './chainSlice'

export default combineReducers({
  test: testReducer,
  newBounty: newBountyReducer,
  explorer: explorerReducer,
  chain: chainReducer
})
