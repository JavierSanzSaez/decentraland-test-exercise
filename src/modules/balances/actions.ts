import { TokenBalance } from "./types";

// Connect Wallet
export const UPDATE_TOKEN_BALANCES_REQUEST = "UPDATE_TOKEN_BALANCES_REQUEST";
export const UPDATE_TOKEN_BALANCES_SUCCESS = "UPDATE_TOKEN_BALANCES_SUCCESS";
export const UPDATE_TOKEN_BALANCES_FAILURE = "UPDATE_TOKEN_BALANCES_FAILURE";

export function updateTokenBalancesRequest() {
  return {
    type: UPDATE_TOKEN_BALANCES_REQUEST,
    payload: {},
  };
}

export function updateTokenBalancesSuccess(tokenBalances: TokenBalance[]) {
  return {
    type: UPDATE_TOKEN_BALANCES_SUCCESS,
    payload: {
      tokenBalances,
    },
  };
}
export function updateTokenBalancesFailure(error: string) {
  return {
    type: UPDATE_TOKEN_BALANCES_FAILURE,
    payload: {
      error,
    },
  };
}
export type UpdateTokenBalancesRequestAction = ReturnType<
  typeof updateTokenBalancesRequest
>;
export type UpdateTokenBalancesSuccessAction = ReturnType<
  typeof updateTokenBalancesSuccess
>;
export type UpdateTokenBalancesFailureAction = ReturnType<
  typeof updateTokenBalancesFailure
>;
