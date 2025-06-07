import { ethers } from "ethers";
import { call, put, takeEvery } from "redux-saga/effects";
import { isErrorWithMessage } from "../utils";
import {
  connectWalletFailure,
  connectWalletSuccess,
  CONNECT_WALLET_REQUEST,
} from "./actions";
import { WindowWithEthereum } from "./types";
import { updateTokenBalancesRequest } from "../balances/actions";

// The regular `window` object with `ethereum` injected by MetaMask
const windowWithEthereum = window as unknown as WindowWithEthereum;

export function* walletSaga() {
  yield takeEvery(CONNECT_WALLET_REQUEST, handleConnectWalletRequest);
}

function* handleConnectWalletRequest() {
  try {
    const provider = new ethers.BrowserProvider(windowWithEthereum.ethereum);
    yield call([provider, "send"], "eth_requestAccounts", []) as Awaited<
      ReturnType<typeof provider.send>
    >;
    const signer = (yield call([provider, "getSigner"])) as Awaited<
      ReturnType<typeof provider.getSigner>
    >;

    const address = (yield call([signer, "getAddress"])) as Awaited<
      ReturnType<typeof signer.getAddress>
    >;
    yield put(connectWalletSuccess(address));
    yield put(updateTokenBalancesRequest());
  } catch (error) {
    yield put(
      connectWalletFailure(
        isErrorWithMessage(error) ? error.message : "Unknown error"
      )
    );
  }
}
