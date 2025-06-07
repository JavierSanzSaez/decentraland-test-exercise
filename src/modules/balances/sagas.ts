import { ethers } from "ethers";
import { call, put, takeEvery } from "redux-saga/effects";
import { isErrorWithMessage } from "../utils";

import { WindowWithEthereum } from "./types";
import {
  UPDATE_TOKEN_BALANCES_REQUEST,
  updateTokenBalancesFailure,
  updateTokenBalancesSuccess,
} from "./actions";

interface TokenBalance {
  tokenAddress: string;
  balance: string;
  symbol: string;
}

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
    const signer = (yield call([provider, "getSigner"])) as Awaited<
      ReturnType<typeof provider.getSigner>
    >;
    const address = (yield call([signer, "getAddress"])) as Awaited<
      ReturnType<typeof signer.getAddress>
    >;

    const tokenAddresses = import.meta.env.VITE_TOKEN_ADDRESSES;

    const tokenBalances: TokenBalance[] = [];
    for (const tokenAddress of tokenAddresses.split(",")) {
      try {
        const tokenContract = new ethers.Contract(
          tokenAddress,
          TOKEN_ABI,
          signer
        );

        const balance = yield call(
          [tokenContract, tokenContract.balanceOf],
          address
        );

        const symbol: string = yield call(tokenContract.symbol);
        tokenBalances.push({
          tokenAddress,
          balance: balance.toString(),
          symbol,
        });
      } catch {
        tokenBalances.push({
          tokenAddress,
          balance: "0",
          symbol: "Unknown",
        });
      }
    }

    yield put(updateTokenBalancesSuccess(tokenBalances));
  } catch (error) {
    yield put(
      updateTokenBalancesFailure(
        isErrorWithMessage(error) ? error.message : "Unknown error"
      )
    );
  }
}
