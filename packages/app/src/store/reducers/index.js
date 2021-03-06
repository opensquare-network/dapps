import { combineReducers } from 'redux'
import testReducer from './testSlice'
import newBountyReducer from './newBountySlice'
import explorerReducer from './explorerSlice'
import chainReducer from './chainSlice'
import accountReducer from './accountSlice'
import balanceReducer from './balanceSlice'
import toastReducer from './toastSlice'
import profileReducer from './profileSlice'
import reputationReducer from './reputationSlice'
import miningPowerReducer from './miningPowerSlice'
import bountyReducer from './bountySlice'
import councilorReducer from './councilorSlice'

export default combineReducers({
  test: testReducer,
  newBounty: newBountyReducer,
  explorer: explorerReducer,
  chain: chainReducer,
  account: accountReducer,
  balance: balanceReducer,
  toast: toastReducer,
  profile: profileReducer,
  reputation: reputationReducer,
  miningPower: miningPowerReducer,
  bounty: bountyReducer,
  councilor: councilorReducer,
})
