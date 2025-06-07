import React from "react";
import { Button, Card, Header, HeaderMenu, Table } from "decentraland-ui";
import { WalletBalanceProps } from "./WalletBalance.types";
import "./WalletBalance.css";
import { ChainSelector } from "../ChainSelector/ChainSelector";
import { ChainId } from "@dcl/schemas";

const WalletBalance: React.FC<WalletBalanceProps> = ({
  tokenBalances,
  userAddress,
}) => {
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
          {userAddress &&
            userAddress.slice(0, 6) + "..." + userAddress.slice(-4)}
        </p>
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Token</Table.HeaderCell>
              <Table.HeaderCell>Balance</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tokenBalances &&
              tokenBalances.map((token) => (
                <Table.Row key={token.tokenAddress}>
                  <Table.Cell>{token.symbol}</Table.Cell>
                  <Table.Cell>{token.balance}</Table.Cell>
                  <Table.Cell>
                    <Button primary size="tiny">
                      Transfer
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </Card>
    </>
  );
};

export default WalletBalance;
