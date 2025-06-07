import { combineReducers } from 'redux'
import { walletReducer as wallet } from './wallet/reducer'
import { balancesReducer as balances } from './balances/reducer'

export const reducer = combineReducers({
  wallet,
  balances,
})
