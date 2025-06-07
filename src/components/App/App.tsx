import React from "react";
import { Button, Center, Footer, Navbar, Page } from "decentraland-ui";
import { Props } from "./App.types";
import "./App.css";
import { WalletBalance } from "../WalletBalance";

const App: React.FC<Props> = ({
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
            <WalletBalance />
          )}
        </Center>
      </Page>
      <Footer />
    </>
  );
};

export default App;
