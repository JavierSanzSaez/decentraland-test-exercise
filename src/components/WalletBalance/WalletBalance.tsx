import React from "react";
import { Card, Header, HeaderMenu } from "decentraland-ui";
import { WalletBalanceProps } from "./WalletBalance.types";
import "./WalletBalance.css";
import { ChainSelector } from "../ChainSelector/ChainSelector";
import { ChainId } from "@dcl/schemas";

const WalletBalance: React.FC<WalletBalanceProps> = ({ address }) => {
  return (
    <>
      <Card>
        <HeaderMenu>
          <HeaderMenu.Left>
            <Header as="h2">Wallet</Header>
          </HeaderMenu.Left>
          <HeaderMenu.Right>
            <ChainSelector
              chains={[ChainId.ETHEREUM_SEPOLIA, ChainId.MATIC_AMOY]}
              onSelectChain={(chain) => console.log(chain)}
              selectedChain={ChainId.ETHEREUM_SEPOLIA}
              i18n={{
                title: "Select Network",
                connected: "Connected",
                confirmInWallet: "Confirm in wallet",
              }}
              size="small"
            />
          </HeaderMenu.Right>
        </HeaderMenu>
        <p>
          <strong>Address:</strong>&nbsp;
          {address.slice(0, 6) + "..." + address.slice(-4)}
        </p>
      </Card>
    </>
  );
};

export default WalletBalance;
