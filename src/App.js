import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavComponent from "./components/NavComponent";
import LoadingComponent from "./components/LoadingComponent";

import HomeRoute from "./routes/HomeRoute";
import BuyPKRRoute from "./routes/BuyPKRRoute";
import SendPKRRoute from "./routes/SendPKRRoute";

import AccountsContext from "./context/AccountsContext";
import ContractsContext from "./context/ContractsContext";

import PKRAbi from "./contractsData/PKR.json";
import PKRAddress from "./contractsData/PKR-address.json";

import PKRCrowdsaleAbi from "./contractsData/PKRCrowdsale.json";
import PKRCrowdsaleAddress from "./contractsData/PKRCrowdsale-address.json";

import "./App.css";
import "normalize.css";

function App() {
  const [account, setAccount] = useState({});
  const [pkr, setPkr] = useState();
  const [pkrCrowdsale, setPkrCrowdsale] = useState();
  const [loading, setLoading] = useState(false);

  const web3Handler = async () => {
    setLoading("Connecting to your Blockchain account");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    setLoading("Loading contracts");
    const pkr = new ethers.Contract(PKRAddress.address, PKRAbi.abi, signer);
    const pkrCrowdsale = new ethers.Contract(
      PKRCrowdsaleAddress.address,
      PKRCrowdsaleAbi.abi,
      signer
    );
    setPkr(pkr);
    setPkrCrowdsale(pkrCrowdsale);

    const address = await signer.getAddress();
    setAccount({
      ...account,
      address,
      signer,
      balance: await signer.getBalance(),
      pkrBalance: (await pkr.balanceOf(address)).toNumber() / 100,
    });
    setLoading(false);
  };

  const loadBalances = async () => {
    setAccount({
      ...account,
      balance: await account.signer.getBalance(),
      pkrBalance: (await pkr.balanceOf(account.address)).toNumber() / 100,
    });
  };

  useEffect(() => {
    web3Handler();
  }, []);

  if (loading) return <LoadingComponent message={loading} />;

  return (
    <BrowserRouter>
      <div className="App">
        <NavComponent
          title="Crowdsale PKR"
          user={account.address}
          balance={parseFloat(
            ethers.utils.formatEther(account.balance || 0)
          ).toFixed(4)}
          tokens={account.pkrBalance}
        />
      </div>
      <ContractsContext.Provider value={{ pkr, pkrCrowdsale }}>
        <AccountsContext.Provider value={{ account, setAccount, loadBalances }}>
          <div className="AppContent">
            <Routes>
              <Route path="/" element={<HomeRoute />} />
              <Route path="/buy-pkr" element={<BuyPKRRoute />} />
              <Route path="/send-pkr" element={<SendPKRRoute />} />
            </Routes>
          </div>
        </AccountsContext.Provider>
      </ContractsContext.Provider>
    </BrowserRouter>
  );
}

export default App;
