import React, { useState, useEffect } from "react";
import { FormActionButton } from "../buttons/form_action_button";
import { Body, H4, P } from "../typography";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Chrysus } from "../../assets";
import Utils from "../../utilities";
import { ethers } from "ethers";
import ERC20 from "../../abis/ERC20.json";
import loan from "../../abis/MockLending.json";
import { DAI, ETH, LOAN } from "../../constant";
import { tick } from "../../assets";
import styled from "styled-components";
import ValidationPopup from "../Dashboard/ValidationPopup";
import Loader from "../Loader";
import { IoIosCloseCircle } from "react-icons/io";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";

export const BorrowCHC = () => {
  const navigate = useNavigate();
  const [collateralAmount, setCollateralAmount] = useState(0);
  const [volume, setVolume] = useState(0);
  const [amount, setAmount] = useState(null);
  const location = useLocation();
  const { collateral } = location.state;
  const [interestRate, setInterestRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [validationPopup, setValidationPopup] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [route, setRoute] = useState(false);
  const { walletProvider } = useWeb3ModalProvider();
  const { address, isConnected } = useWeb3ModalAccount();

  useEffect(() => {
    const refreshData = async () => {
      try {
        const volume = await Utils.volume();
        isNaN(volume.currentSupplied)
          ? setVolume(0)
          : setVolume(Number(volume.currentSupplied / 1e18));

        const rate = await Utils.interestRate();
        setInterestRate(Number(rate));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    refreshData();

    const intervalId = setInterval(refreshData, 3000);

    return () => clearInterval(intervalId);
  }, [address]);

  useEffect(() => {
    if (route == true) {
      navigate("/accounts/loan");
    }
  }, [route]);

  // Define the props for the ValidationPopup
  const validationPopupProps = {
    icon: <IoIosCloseCircle style={{ fontSize: "30px", color: "red" }} />,
    title: "Invalid Input",
    text: "Please check your entries and try again.",
    buttonText: "Back",
    buttonLink: "/accounts/loan",
  };

  if (!isNaN(amount)) {
    const interestAmount = (amount * interestRate) / 1e18;
    const totalAmount = Number(amount) + interestAmount;
    Utils.collateralAmount(
      ethers.utils.parseUnits(String(totalAmount)),
      collateral,
    ).then(function (data) {
      collateral == "DAI"
        ? setCollateralAmount(Number(data).toFixed(4))
        : setCollateralAmount(Number(data).toFixed(4));
    });
  }

  const borrow = async () => {
    try {
      if (isConnected && amount) {
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const _signer = provider.getSigner();
        const token = new ethers.Contract(DAI, ERC20.abi, _signer);
        const loanContract = new ethers.Contract(LOAN, loan.abi, _signer);

        const _collateral = collateral == "DAI" ? DAI : ETH;
        setLoading(true);
        let Txn;
        if (collateral == "DAI") {
          let checkAllowance = await token.allowance(address, LOAN);

          if (collateralAmount > Number(checkAllowance) / 1e18) {
            Txn = await token.approve(
              LOAN,
              ethers.utils.parseUnits(String(collateralAmount)),
            );
            await Txn.wait();
          }

          Txn = await loanContract.borrow(
            ethers.utils.parseUnits(String(amount)),
            _collateral,
          );
          await Txn.wait();
        }

        if (collateral == "ETH") {
          Txn = await loanContract.borrow(
            ethers.utils.parseUnits(String(amount)),
            _collateral,
            {
              from: address,
              value: ethers.utils.parseUnits(String(collateralAmount)),
            },
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
    <Section>
      <div className="min-h-screen d-flex align-items-start justify-content-center">
        <div className="row col-md-6" style={{ borderRadius: "16px" }}>
          <div
            className="w-100 d-flex flex-column align-items-center text-center"
            style={{
              backgroundImage: "linear-gradient(to bottom, #262522, #000000)",
              borderRadius: "16px",
              color: "#846424",
            }}
          >
            <div className="mt-5" />
            <h4 className="text-baseAssets">Borrow</h4>
            <div className="d-flex flex-column align-items-center">
              <P className="m-0">How many CHAU would you like to Borrow?</P>
              <div className="my-3" />
              <label className="form-label " style={{ color: "#EDC452" }}>
                Avaliable Amount to Borrow : {}
                {volume.toFixed(4)}
                CHAU
              </label>
              <div
                className="input-group"
                style={{
                  backgroundColor: "#262522",
                  color: "#846424",
                  border: "1px solid white",
                  borderRadius: "50px",
                }}
              >
                <input
                  type="text"
                  className="form-control"
                  style={{
                    backgroundColor: "#262522",
                    color: "#EDC452",
                    border: "0",
                    borderRadius: "50px",
                  }}
                  onChange={(e) => {
                    setAmount(parseFloat(e.target.value));
                    validationPopup == true ? setValidationPopup(false) : "";
                  }}
                  placeholder="0.00"
                />
                <span
                  style={{
                    backgroundColor: "#262522",
                    color: "#846424",
                    border: "0",
                    borderRadius: "50px",
                  }}
                  className="input-group-text"
                >
                  <img loading="lazy" src={Chrysus} alt="meta" />
                </span>
              </div>
              <div className="my-1" />
              <label className="form-label " style={{ color: "#EDC452" }}>
                Estimated Collateral Amount To Pay
              </label>
              <div
                className="input-group"
                style={{
                  color: "#846424",
                  border: "1px solid white",
                  borderRadius: "50px",
                }}
              >
                <input
                  type="text"
                  className="form-control"
                  style={{
                    backgroundColor: "#262522",
                    color: "#EDC452",
                    border: "0",
                    borderRadius: "50px",
                  }}
                  disabled
                  placeholder={collateralAmount}
                />
              </div>
            </div>
            <div
              className="w-100"
              style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
            />
            {/* Loader */}
            {loading && <Loader />}

            {/* Validation Popup */}
            {validationPopup && <ValidationPopup {...validationPopupProps} />}
            <div className="w-100 d-flex flex-row justify-content-start p-3">
              {/* Form Actions */}
              <Link to={"/accounts/loan"}>
                <FormActionButton color="white" outline>
                  Back
                </FormActionButton>
              </Link>
              <button
                style={{
                  borderRadius: "40px",
                  background:
                    "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                  // Fonts
                  fontStyle: "normal",
                  padding: "10px",
                  fontWeight: "700",
                  fontSize: "14px",
                  lineHeight: "24px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "black",
                }}
                onClick={() => {
                  if (amount != 0 && !isNaN(amount)) {
                    if (volume >= amount) {
                      borrow();
                    } else {
                      setValidationPopup(true);
                    }
                  } else {
                    setValidationPopup(true);
                  }
                }}
              >
                {loading ? "Processing...." : "Continue"}
              </button>
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
                            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
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
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

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
    margin-top: 0rem;
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
