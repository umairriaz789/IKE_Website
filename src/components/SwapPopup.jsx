import React from "react";
import Modal from "react-bootstrap/Modal";
import { PrimaryGradientButton } from "../components/buttons/primary_gradient.button";
import { useNavigate } from "react-router-dom";
import { Transferblack, groupcoin1 } from "../assets";
import styled from "styled-components";
import { ethers } from "ethers";
import { Body, H4, P } from "../components/typography";
import { CHRYSUS, DAI, SWAP } from "../constant";
import { useEffect, useState } from "react";
import Utils from "../utilities";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import routerABI from "../abis/Router";
import ERC20 from "../abis/ERC20.json";
import { tick } from "../assets";
import { IoIosCloseCircle } from "react-icons/io";
import ValidationPopup from "./Dashboard/ValidationPopup";
import Loader from "./Loader";

const SwapPopup = () => {
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();
  const { walletProvider } = useWeb3ModalProvider();
  const { address, isConnected } = useWeb3ModalAccount();
  const [amount, setAmount] = useState(0);
  const [amountOut, setAmountOut] = useState(0);
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [validationPopup, setValidationPopup] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [route, setRoute] = useState(false);

  useEffect(() => {
    const refreshData = async () => {
      try {
        const chcBalanceData = await Utils.getUserBalance(address, "CHC");
        setBalance(Number(chcBalanceData) / 1e18);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    refreshData();

    const intervalId = setInterval(refreshData, 3000);

    return () => clearInterval(intervalId);
  }, [address]);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setOption(value);
    getAmountOut();
  };

  // Define the props for the ValidationPopup
  const validationPopupProps = {
    icon: <IoIosCloseCircle style={{ fontSize: "30px", color: "red" }} />,
    title: "Invalid Input",
    text: "Please check your entries and try again.",
    buttonText: "Back",
    buttonLink: "/accounts/swappopup",
  };

  useEffect(() => {
    if (route == true) {
      navigate("/accounts/swappopup");
    }
  }, [route]);

  const getAmountOut = async () => {
    try {
      if (isConnected && amount) {
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const _signer = provider.getSigner();
        const contract = new ethers.Contract(SWAP, routerABI, _signer);
        const path2 =
          option == "ETH"
            ? "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9"
            : option == "DAI"
              ? DAI
              : "";
        let Txn = await contract.getAmountsOut(
          ethers.utils.parseUnits(String(amount)),
          [CHRYSUS, path2],
        );
        setAmountOut(Number(Txn[1]));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const swap = async () => {
    try {
      if (isConnected && amount) {
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const _signer = provider.getSigner();
        const token = new ethers.Contract(CHRYSUS, ERC20.abi, _signer);
        const contract = new ethers.Contract(SWAP, routerABI, _signer);

        const _swapToken =
          option == "DAI"
            ? DAI
            : option == "ETH"
              ? "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9"
              : "";
        setLoading(true);
        let Txn;

        let checkAllowance = await token.allowance(address, SWAP);

        if (amount > Number(checkAllowance) / 1e18) {
          Txn = await token.approve(
            contract,
            ethers.utils.parseUnits(String(amount)),
          );
          await Txn.wait();
        }

        if (option == "DAI") {
          Txn = await contract.swapExactTokensForTokens(
            ethers.utils.parseUnits(String(amount)),
            0,
            [CHRYSUS, _swapToken],
            address,
            Math.round(Date.now() / 1000) + 60 * 20,
          );
          await Txn.wait();
        } else if (option == "ETH") {
          Txn = await contract.swapExactTokensForETH(
            ethers.utils.parseUnits(String(amount)),
            0,
            [CHRYSUS, _swapToken],
            address,
            Math.round(Date.now() / 1000) + 60 * 20,
          );

          await Txn.wait();
        }
        setReceipt(`https://sepolia.etherscan.io/tx/${Txn.hash}`);
        setLoading(false);
        setIsConfirm(true);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <div className=" min-h-screen">
      <Section>
        <div className="d-flex justify-center ">
          <div
            className="row justify-content-center w-100"
            style={{ borderRadiusBottom: "16px" }}
          >
            <div className="col-md-6">
              <Modal.Header
                className=" flex flex-col flex-wrap text-center items-center py-[6px] px-4  "
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, #262522, #000000)",
                }}
              >
                <div
                  style={{
                    width: "30%",
                    height: "3px",
                    background:
                    "linear-gradient(270deg, #ac40ea 0.26%, #6b6bdf 99.99%, #bba9e7 100%),rgb(195, 198, 202)",
                    borderRadius: "40px",
                    borderRadiusBottom: "40px",
                    textAlign: "center",
                    marginBottom: "8px",
                  }}
                />
                <Modal.Title>
                  <h4 className="text-[#ac40ea]">Swap Ikemba Coin (IKE)</h4>
                </Modal.Title>
              </Modal.Header>
              <div
                className="px-3 w-100 d-flex flex-column align-items-center"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, #262522, #000000)",
                  borderEndStartRadius: "16px",
                  borderEndEndRadius: "16px",
                  color: "#846424",
                }}
              >
                <div className="mt-5 " />
                {/* <h4 className="text-baseAssets">Chrysus Coin</h4> */}
                <div className="d-flex flex-column text-center">
                  {/* <P className="m-0">
                    Chrysus facilitates the instant exchange between Chrysus
                    Token and Selected Token/Coin
                  </P> */}
                  {/* <Body className="m-0">
                    Quickly swap to the growing asset.
                  </Body> */}
                  {/* <div className="my-3" /> */}
                  {/* <label className="form-label text-primary">
                    Available (CHC) {balance}
                  </label> */}
                  <div
                    className="input-group "
                    style={{
                      backgroundColor: "#1A1917",
                      color: "#846424",
                      border: "1px solid white",
                      borderRadius: "50px",

                      marginBottom: "5px",
                    }}
                  >
                    <input
                      type="text"
                      className="form-control px-3 min-w-[300px] w-[100]"
                      style={{
                        backgroundColor: "#1A1917",
                        color: "#ffffff",
                        border: "0px",
                        borderRadius: "50px",
                        // width: "50px",
                      }}
                      placeholder="Amount to Swap"
                      onMouseOver={getAmountOut()}
                      onChange={(e) => {
                        setAmount(parseFloat(e.target.value));
                        validationPopup == true
                          ? setValidationPopup(false)
                          : "";
                      }}
                    />

                    <span
                      style={{
                        backgroundColor: "#1A1917",
                        color: "#846424",
                        border: "0px",
                        borderRadius: "50px",
                      }}
                      className="input-group-text"
                    >
                      <img loading="lazy" src={groupcoin1} width="35px" height="35px" alt="meta" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[#ac40ea]">
                    <p>Balance: {balance.toFixed(4)}</p>
                  </div>
                  {/* <label className="form-label text-primary">
                    Enter Amount
                  </label> */}
                  <div
                    className="input-group  "
                    style={{
                      backgroundColor: "#1A1917",
                      color: "#846424",
                      border: "1px solid white",
                      borderRadius: "50px",
                    }}
                  >
                    <input
                      type="text"
                      className="form-control px-3"
                      style={{
                        backgroundColor: "#1A1917",
                        color: "#ffffff",
                        border: "0px",
                        borderRadius: "50px",
                      }}
                      placeholder="Amount to Receive"
                      value={
                        amount > 0 ? Number(amountOut / 1e18).toFixed(4) : ""
                      }
                      disabled={true}
                    />
                    {/* <span
                      style={{
                        backgroundColor: "#1A1917",
                        color: "#846424",
                      }}
                      className="input-group-text"
                    >
                      Amount
                    </span> */}
                  </div>
                  <div className="input-group  ">
                    <select
                      className="px-3"
                      style={{
                        backgroundColor: "#1A1917",
                        color: "white",
                        borderRadius: "50px",
                      }}
                      onChange={handleSelectChange}
                    >
                      <option value="">Swap To</option>
                      <option value="ETH">ETH</option>
                      <option value="DAI">DAI</option>
                    </select>
                  </div>

                  {/* <div className="my-3" /> */}
                </div>
                <div className="text-center">
                  <PrimaryGradientButton
                    className="mt-3"
                    onClick={() => {
                      if (amount != 0 && !isNaN(amount)) {
                        if (balance >= amount) {
                          swap();
                        } else {
                          setValidationPopup(true);
                        }
                      } else {
                        setValidationPopup(true);
                      }
                    }}
                  >
                    <div className="d-flex flex-row align-items-center justify-content-center">
                      Swap
                      <img
                        className="mx-2"
                        src={Transferblack}
                        alt="transfer-black.svg"
                      />
                    </div>
                  </PrimaryGradientButton>
                </div>
                {/* Loader */}
                {loading && <Loader />}

                {/* Validation Popup */}
                {validationPopup && (
                  <ValidationPopup {...validationPopupProps} />
                )}
                {isConfirm === true ? (
                  <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div
                        className="relative w-auto my-6 mx-auto max-w-2xl"
                        style={{
                          backgroundColor: "#525151",
                          borderRadius: "16px",
                          color: "white",
                        }}
                      >
                        <div className="row w-150">
                          <div className="col-12">
                            <div className="d-flex flex-column align-items-center mt-4">
                              <H4>Congratulations</H4>
                              <img
                                loading="lazy"
                                src={tick}
                                alt="tick"
                                className="w-[38px] h-[38px]"
                              />
                              <div className="d-flex flex-column align-items-center justify-content-center col-5">
                                <div className="d-flex flex-row align-items-center justify-content-start my-3 w-30">
                                  <Body className="m-0 mx-3">
                                    Your Transaction has been Confirmed
                                    <br />
                                    <a href={receipt} target="_blank">
                                      <u>{receipt}</u>
                                    </a>
                                  </Body>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2" />
                          <div
                            style={{
                              borderBottom:
                                "1px solid rgba(255, 255, 255, 0.1)",
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            style={{
                              height: "32px",
                              width: "90px",
                              color: "#846424",
                              textTransform: "uppercase",
                              fontStyle: "normal",
                              fontWeight: "600",
                              fontSize: "10px",
                              backgroundColor: "#1A1917",
                              borderRadius: "16px",
                              border: "1px solid transparent",
                              borderColor: "#846424",
                            }}
                            type="button"
                            onClick={() => setIsConfirm(false) & setRoute(true)}
                          >
                            ok
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div className="mt-5" />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default SwapPopup;
const Section = styled.section`
  margin-left: 13vw;
  padding: 2rem;
  height: 100vh;
  background-color: #000000;
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 2rem;
    .row__one {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 50%;
      gap: 1rem;
    }
    .row__two {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      height: 50%;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;
