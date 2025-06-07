import { connect } from "react-redux";
import { RootState } from "../../modules/types";
import { MapStateProps } from "./WalletBalance.types";
import WalletBalance from "./WalletBalance";
import {
  selectBalancesError,
  selectBalancesLoading,
  selectTokenBalances,
} from "../../modules/balances/selectors";
import { getAddress } from "../../modules/wallet/selectors";

const mapState = (state: RootState): MapStateProps => ({
  tokenBalances: selectTokenBalances(state),
  loading: selectBalancesLoading(state),
  error: selectBalancesError(state),
  userAddress: getAddress(state),
});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(WalletBalance);
