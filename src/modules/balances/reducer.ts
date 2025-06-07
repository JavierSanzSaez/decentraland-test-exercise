import {
  UPDATE_TOKEN_BALANCES_FAILURE,
  UPDATE_TOKEN_BALANCES_REQUEST,
  UPDATE_TOKEN_BALANCES_SUCCESS,
  UpdateTokenBalancesFailureAction,
  UpdateTokenBalancesRequestAction,
  UpdateTokenBalancesSuccessAction,
} from "./actions";
import { BalancesState } from "./types";

const INITIAL_STATE: BalancesState = {
  tokenBalances: [],
  loading: false,
  error: null,
};

export function balancesReducer(
  state = INITIAL_STATE,
  action:
    | UpdateTokenBalancesRequestAction
    | UpdateTokenBalancesSuccessAction
    | UpdateTokenBalancesFailureAction
): BalancesState {
  switch (action.type) {
    case UPDATE_TOKEN_BALANCES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_TOKEN_BALANCES_SUCCESS:
      const { tokenBalances } =
        action.payload as UpdateTokenBalancesSuccessAction["payload"];

      return {
        ...state,
        loading: false,
        tokenBalances: tokenBalances || [],
      };

    case UPDATE_TOKEN_BALANCES_FAILURE:
      return {
        ...state,
        loading: false,
        error: (action as UpdateTokenBalancesFailureAction).payload.error,
      };
    default:
      return state;
  }
}
