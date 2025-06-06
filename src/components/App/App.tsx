import React from "react";
import {
  Button,
  Card,
  Center,
  Footer,
  Header,
  HeaderMenu,
  Navbar,
  Page,
} from "decentraland-ui";
import { Props } from "./App.types";
import "./App.css";
import { ChainSelector } from "../ChainSelector/ChainSelector";
import { ChainId } from "@dcl/schemas";

const App: React.FC<Props> = ({
  address,
  isConnected,
  onConnect,
  isConnecting,
  error,
}) => {
  return (
    <>
      <Navbar activePage="Wallet" />
      <Page className="App">
        <Center>
          {!isConnected ? (
            <>
              <Button primary onClick={onConnect} loading={isConnecting}>
                Connect
              </Button>
              {error ? <p className="error">{error}</p> : null}
            </>
          ) : (
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
                  />
                </HeaderMenu.Right>
              </HeaderMenu>
              <p>
                <strong>Address:</strong>&nbsp;
                {address.slice(0, 6) + "..." + address.slice(-4)}
              </p>
            </Card>
          )}
        </Center>
      </Page>
      <Footer />
    </>
  );
};

export default App;
