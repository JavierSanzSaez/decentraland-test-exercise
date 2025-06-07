import { ethers } from "ethers";
import { call, put, takeEvery } from "redux-saga/effects";
import { isErrorWithMessage } from "../utils";

import { WindowWithEthereum } from "./types";
import {
  UPDATE_TOKEN_BALANCES_REQUEST,
  updateTokenBalancesFailure,
  updateTokenBalancesSuccess,
} from "./actions";

// The regular `window` object with `ethereum` injected by MetaMask
const windowWithEthereum = window as unknown as WindowWithEthereum;

export const TOKEN_ABI = [
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount)",
];

export function* updateTokenBalancesSaga() {
  yield takeEvery(
    UPDATE_TOKEN_BALANCES_REQUEST,
    handleUpdateTokenBalancesRequest
  );
}

function* handleUpdateTokenBalancesRequest(): Generator<any, void, any> {
  try {
    const provider = new ethers.BrowserProvider(windowWithEthereum.ethereum);
    const signer = yield call([provider, "getSigner"]);
    const address = yield call([signer, "getAddress"]);

    const tokenAddresses = import.meta.env.VITE_TOKEN_ADDRESSES.split(",");

    for (const tokenAddress of tokenAddresses) {
      const tokenContract = new ethers.Contract(
        tokenAddress,
        TOKEN_ABI,
        signer
      );
      const balance = yield call(tokenContract.balanceOf, address);
      const symbol = yield call(tokenContract.symbol);

      yield put(
        updateTokenBalancesSuccess(tokenAddress, symbol, balance.toString())
      );
    }
  } catch (error) {
    yield put(
      updateTokenBalancesFailure(
        isErrorWithMessage(error) ? error.message : "Unknown error"
      )
    );
  }
}
