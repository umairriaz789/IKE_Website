import React, { useEffect, useState } from "react";
import { FormActionButton } from "../buttons/form_action_button";
import { Body, H4, P } from "../typography";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import styled from "styled-components";
import Utils from "../../utilities";
import { ethers } from "ethers";
import chrysus from "../../abis/Chrysus.json";
import { CHRYSUS } from "../../constant.js";
import { DAI, ETH } from "../../constant";
import ValidationPopup from "./ValidationPopup";
import Loader from "../Loader";
import { IoIosCloseCircle } from "react-icons/io";
import { tick } from "../../assets";

export const WithdrawStake = () => {
  const [TotalStake, setTotalStake] = useState(0);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [validationPopup, setValidationPopup] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [route, setRoute] = useState(false);
  const { walletProvider } = useWeb3ModalProvider();
  const { address, isConnected } = useWeb3ModalAccount();

  useEffect(() => {
    if (route == true) {
      navigate("/accounts/governance");
    }
  }, [route]);

  useEffect(() => {
    const refreshData = async () => {
      try {
        const govStake = await Utils.getGovStake(address);
        setTotalStake(Number(govStake.amount) / 1e18);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    refreshData();

    const intervalId = setInterval(refreshData, 3000);

    return () => clearInterval(intervalId);
  }, [address]);

  // Define the props for the ValidationPopup
  const validationPopupProps = {
    icon: <IoIosCloseCircle style={{ fontSize: "30px", color: "red" }} />,
    title: "Invalid Input",
    text: "Please check your entries and try again.",
    buttonText: "Back",
    buttonLink: "/accounts/governance",
  };

  const withdrawStake = async () => {
    try {
      if (isConnected) {
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const _signer = provider.getSigner();
        const Stakecontract = new ethers.Contract(
          MockStabilityModule,
          StakeABI,
          _signer,
        );

        Txn = await Stakecontract.withdrawStake(
          DAI,
          ethers.utils.parseUnits(String(amount)),
        );
        setLoading(true);
        await Txn.wait();
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
    <Section className="vertically-overflow" style={{ height: "100vh" }}>
      <div className="d-flex align-items-start justify-content-center">
        <div
          className="row d-flex justify-content-center w-100"
          style={{ borderRadius: "16px" }}
        >
          <div className="col-md-6">
            <div
              className="w-100 d-flex flex-column align-items-center justify-items-center text-center"
              style={{
                backgroundColor: "#211f21",
                borderRadius: "16px",
                color: "#846424",
              }}
            >
              <div className="mt-5" />
              <h4 className="text-baseAssets">Withdraw</h4>
              <div className="d-flex flex-column align-items-center ">
                <P className="m-0 ">How much would you like to Withdraw?</P>
                <Body className="m-0">
                  Please Enter the CGOV amount you would like to Withdraw
                </Body>
                <div className="my-3" />
                <label className="form-label " style={{ color: "#EDC452" }}>
                  Avaliable to Withdraw : {TotalStake}
                  CGOV
                </label>
                <div
                  className="input-group"
                  style={{
                    backgroundColor: "#1A1917",
                    color: "#846424",
                    borderRadius: "50px",
                    width: "250px",
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    style={{
                      backgroundColor: "#1A1917",
                      color: "#EDC452",
                      borderRadius: "50px",
                    }}
                    onChange={(e) => {
                      setAmount(parseFloat(e.target.value));
                      validationPopup == true ? setValidationPopup(false) : "";
                    }}
                    placeholder="0.00"
                  />
                </div>
                <div className="my-1" />
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
                <Link to={"/accounts/governance"}>
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
                      if (TotalStake >= amount) {
                        withdrawStake();
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
              </div>
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
