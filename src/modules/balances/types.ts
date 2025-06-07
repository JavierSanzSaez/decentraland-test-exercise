import { ethers } from 'ethers'

export type TokenBalance = {
  tokenAddress: string
  balance: string
  symbol: string
}

export type BalancesState = {
  tokenBalances: TokenBalance[]
  loading: boolean
  error: string | null
}

export type WindowWithEthereum = Window & {
  ethereum: ethers.Eip1193Provider
}
