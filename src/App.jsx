import React, { Suspense, lazy } from "react";
import styles from "./style";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import "react-toastify/dist/ReactToastify.css";
import About from "./components/About";
import Services from "./components/Services";
import Ecosystems from "./components/Ecosystems";
import { FAQ } from "./components/Faq";
import Accounts from "./components/Accounts";
import Loan from "./components/Dashboard/Loan";
import { Collateral } from "./components/chcform/collateral";
import SwapPopup from "./components/SwapPopup";
import { DAIDeposite } from "./components/mintform/dai";
import { ETHDeposite } from "./components/mintform/eth";
import Dashboard from "./components/Dashboard/Dashboard";
import Governance from "./components/Dashboard/gov";
import DaoLandPage from "./components/DaoLandPage";
import Mint from "./components/Dashboard/Mint";
import { Collaterals } from "./components/mintform/collaterals";
import CreateProposal from "./components/Dashboard/ProposalsCreate/CreateProposal";
import Staking from "./components/Dashboard/Staking";
import { Lend } from "./components/chcform/Lend";
import { BorrowCHC } from "./components/chcform/borrowCHC";
import { Repay } from "./components/chcform/repay";
import { Liquidate } from "./components/Dashboard/Liquidate";
import { MintPosition } from "./components/Dashboard/MintPosition";
import { Withdraw } from "./components/Dashboard/withdraw";
import { WthdrawLending } from "./components/chcform/wthdrawLending";
import ScrollToTop from "./components/ScrollToTop";
import { WithdrawStake } from "./components/Dashboard/withdrawStke";

const Home = lazy(() => import("./components/Home"));
import { CCoinGold, groupcoin1 } from "./assets";
import VirtualCard from "./components/VCards/VirtualCard";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
import ViewProposal from "./components/ViewProposal";
import Ai from "./components/Ai";

const projectId = "7ae37ceba6d88f458689041c037bf6ba";

const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const testnet = {
  chainId: 11155111,
  name: "Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: "https://rpc.sepolia.org",
};

const metadata = {
  name: "Ikemba",
  description: "Defi",
  url: "www.ikemba.io",
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [testnet, mainnet],
  projectId,
});

const App = () => {
  function Loading() {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div
          className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
        >
          <div className="">
            <span className="action action-center coin-rotating">
              <img src={groupcoin1} alt="c-coin-gold.sg" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black w-full overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/governance" element={<Ecosystems />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/ai" element={<Ai/>} />
          <Route path="/contect" element={<Ai/>} />

          <Route path="/accounts" element={<Accounts />}>
            <Route index element={<Dashboard />} />
            <Route path="createproposal" element={<CreateProposal />} />
            <Route path="liquidate" element={<Liquidate />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="withdrawstake" element={<WithdrawStake />} />
            {/* wthdrawLending */}
            <Route path="wthdrawLending" element={<WthdrawLending />} />
            <Route path="borrowchc" element={<BorrowCHC />} />
            <Route path="repay" element={<Repay />} />

            <Route path="lend" element={<Lend />} />
            <Route path="staking" element={<Staking />} />
            <Route path="mintposition" element={<MintPosition />} />
            <Route path="loan" element={<Loan />}>
              {/* <Route path="borrowchc" element={<BorrowCHC />} /> */}
              <Route index element={<Collateral />} />
              {/* <Route path="repay" element={<Repay />} /> */}
            </Route>
            <Route path="mint" element={<Mint />}>
              <Route index element={<Collaterals />} />
              <Route path="daideposite" element={<DAIDeposite />} />
              <Route path="ethdeposite" element={<ETHDeposite />} />
            </Route>
            <Route path="swappopup" element={<SwapPopup />} />
            <Route path="governance" element={<Governance />}>
              <Route index element={<DaoLandPage />} />
              <Route path="viewproposal" element={<ViewProposal />} />
            </Route>
            <Route path="virtualcard" element={<VirtualCard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollToTop />
      </BrowserRouter>
    </div>
  );
};

export default App;
