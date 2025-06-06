import React from "react";
import {
  Button,
  Center,
  Footer,
  Navbar,
  Page,
} from "decentraland-ui";
import { Props } from "./App.types";
import "./App.css";
import WalletBalance from "../WalletBalance/WalletBalance";

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
            <WalletBalance address={address} />
          )}
        </Center>
      </Page>
      <Footer />
    </>
  );
};

export default App;
