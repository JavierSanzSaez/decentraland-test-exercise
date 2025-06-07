import { all } from "@redux-saga/core/effects";
import { walletSaga } from "./wallet/sagas";
import { updateTokenBalancesSaga } from "./balances/sagas";

export function* sagas() {
  yield all([walletSaga(), updateTokenBalancesSaga()]);
}
