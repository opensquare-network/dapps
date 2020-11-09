import { combineReducers } from 'redux'
import testReducer from './testSlice'
import newBountyReducer from './newBountySlice'

export default combineReducers({
  test: testReducer,
  newBounty: newBountyReducer
})
