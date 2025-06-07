import React from "react";
import { Button, Center, Footer, Navbar, Page } from "decentraland-ui";
import { Props } from "./App.types";
import "./App.css";
import { WalletBalance } from "../WalletBalance";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TransferTokenForm } from "../TransferTokenForm";

const App: React.FC<Props> = ({
  isConnected,
  onConnect,
  isConnecting,
  error,
}) => {
  return (
    <BrowserRouter>
      <Navbar activePage="Wallet" />
      <Routes>
        <Route
          path="/"
          element={
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
          }
        />
        <Route path="/transfer" element={<TransferTokenForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
