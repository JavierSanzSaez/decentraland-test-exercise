import { AnyAction, Dispatch } from "redux";
import { ConnectWalletRequestAction } from "../../modules/wallet/actions";
import { TokenBalance } from "../../modules/balances/types";

export type WalletBalanceProps = {
  tokenBalances: TokenBalance[];
  loading: boolean;
  error: string | null;
  userAddress: string;
};

export type MapStateProps = Pick<
  WalletBalanceProps,
  "tokenBalances" | "loading" | "error" | "userAddress"
>;
export type MapDispatch = Dispatch<ConnectWalletRequestAction | AnyAction>;
