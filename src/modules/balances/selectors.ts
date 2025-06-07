import { RootState } from "../types";

export const selectTokenBalances = (state: RootState) =>
  state.balances.tokenBalances;
export const selectBalancesLoading = (state: RootState) =>
  state.balances.loading;
export const selectBalancesError = (state: RootState) => state.balances.error;
