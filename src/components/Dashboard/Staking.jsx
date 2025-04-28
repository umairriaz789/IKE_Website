import React, { useState, useEffect, useRef } from "react";
import { Chrysus } from "../../assets";
import { Body, H4, P } from "../typography";
import { Tab } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { ethers } from "ethers";
import Utils from "../../utilities";
import { MockStabilityModule, GOVERNANCE } from "../../constant";
import StakeABI from "../../abis/MockStabilityModule.json";
import governance from "../../abis/Governance.json";
import { tick } from "../../assets";
import ValidationPopup from "../Dashboard/ValidationPopup";
import Loader from "../Loader";
import { IoIosCloseCircle } from "react-icons/io";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";

const Staking = () => {
  const navigate = useNavigate();
  const [Stakeamount, setStakeamount] = useState(0);
  const [TotalStake, setTotalStake] = useState(0);
  const [currentStakeamount, setCurrentStakeamount] = useState(0);
  const [cgtBalance, setCGTBalance] = useState(0);
  const [reward, setReward] = useState(0);
  const [loading, setLoading] = useState(false);
  const [endTime, setEndTime] = useState(0);
  const [isConfirm, setIsConfirm] = useState(false);
  const [validationPopup, setValidationPopup] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [route, setRoute] = useState(false);
  const { walletProvider } = useWeb3ModalProvider();
  const { address, isConnected } = useWeb3ModalAccount();

  // Define the props for the ValidationPopup
  const validationPopupProps = {
    icon: <IoIosCloseCircle style={{ fontSize: "30px", color: "red" }} />,
    title: "Invalid Input",
    text: "Please check your entries and try again.",
    buttonText: "Back",
    buttonLink: "/accounts/governance",
  };

  const Stake = async () => {
    try {
      if (isConnected) {
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const _signer = provider.getSigner();
        const Stakecontract = new ethers.Contract(
          MockStabilityModule,
          StakeABI.abi,
          _signer,
        );
        const GovernanceContract = new ethers.Contract(
          GOVERNANCE,
          governance.abi,
          _signer,
        );
        setLoading(true);

        let checkAllowance = await GovernanceContract.allowance(
          address,
          MockStabilityModule,
        );

        if (Stakeamount > Number(checkAllowance) / 1e18) {
          let Txn = await GovernanceContract.approve(
            MockStabilityModule,
            ethers.utils.parseUnits(String(Stakeamount)),
          );
          await Txn.wait();
        }

        let Txn = await Stakecontract.stake(
          ethers.utils.parseUnits(String(Stakeamount)),
        );
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

  useEffect(() => {
    if (route == true) {
      navigate("/accounts/governance");
    }
  }, [route]);

  useEffect(() => {
    const refreshData = async () => {
      try {
        const stakeData = await Utils.getTotalStakeAmount();
        setTotalStake(Number(stakeData) / 1e18);

        const CGTBalance = await Utils.getUserBalance(address, "CGT");
        setCGTBalance(Number(CGTBalance) / 1e18);

        const govStake = await Utils.getGovStake(address);
        setCurrentStakeamount(Number(govStake.amount) / 1e18);
        setEndTime(Number(govStake.startTime) / 1e18);

        const reward = await Utils.getReward(address);
        isNaN(Number(reward)) ? setReward(0) : setReward(Number(reward) / 1e18);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    refreshData();

    const intervalId = setInterval(refreshData, 3000);

    return () => clearInterval(intervalId);
  }, [address]);

  let now = new Date();
  now = Date.parse(now) / 1000;
  const timeDepends = endTime + Number(2592000);

  return (
    <div>
      <Tab.Container defaultActiveKey="Navbuy">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-10">
            <div
              className="card"
              style={{
                backgroundImage: "linear-gradient(to bottom, #262522, #000000)",
                borderRadius: "16px",
                color: "#846424",
              }}
            >
              <div className="card-body pt-4">
                <div className="w-100">
                  <div className="d-flex flex-row align-items-center justify-content-between mb-4">
                    <h4 className="text-baseAssets">Staking Dashboard</h4>
                  </div>
                  <div
                    className="card mx-auto"
                    style={{
                      backgroundColor: "#121112",
                      borderRadius: "16px",
                      color: "#846424",
                      width: "80%",
                    }}
                  >
                    <div className="card-body ">
                      <div className="row sp20 flex align-items-center">
                        <div className="col-xxl-12 d-flex flex-wrap justify-content-center gap-2 align-items-center">
                          <div className="px-3 info-group">
                            <p className="fs-10 mb-1 text-baseAssets">
                              WALLET BALANCE
                            </p>
                            <h3 className="fs-10 font-w400 text-white">
                              {cgtBalance.toFixed(2)}
                            </h3>
                          </div>
                          <div className="px-3 info-group">
                            <p className="fs-10 mb-1 text-baseAssets">
                              CURRENT STAKED AMOUNT
                            </p>
                            <h3 className="fs-10 font-w400 text-white">
                              {currentStakeamount.toFixed(2)}
                            </h3>
                          </div>
                          <div className="px-3 info-group">
                            <p className="fs-10 mb-1 text-baseAssets">
                              TOTAL POOL STAKED
                            </p>
                            <h3 className="fs-10 font-w300 text-white">
                              {TotalStake.toFixed(2)}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-10">
            <div
              className="card"
              style={{
                backgroundImage: "linear-gradient(to bottom, #262522, #000000)",
                borderRadius: "16px",
                color: "#846424",
              }}
            >
              <div>
                <div className="card-body">
                  <div
                    className="card mx-auto"
                    style={{
                      backgroundColor: "#121112",
                      borderRadius: "16px",
                      color: "#EDC452",
                      width: "80%",
                    }}
                  >
                    <h2 className="text-center mt-5">Lock Tokens</h2>
                    <div className="card-body">
                      <div className="col-md-8 col-sm-12 mx-auto text-center">
                        <div className="form-group mr-5 ml-5">
                          <div
                            className="input-group mt-4 mx-auto"
                            style={{
                              backgroundColor: "#1A1917",
                              color: "#846424",
                              border: "1px solid #EDC452",
                              borderRadius: "50px",
                            }}
                          >
                            <input
                              type="text"
                              className="form-control input-sm "
                              style={{
                                backgroundColor: "#1A1917",
                                color: "#EDC452",
                                border: "0",
                                borderRadius: "50px",
                              }}
                              onChange={(e) => {
                                setStakeamount(parseFloat(e.target.value));
                                validationPopup == true
                                  ? setValidationPopup(false)
                                  : "";
                              }}
                              placeholder="0.00"
                            />
                            <span
                              style={{
                                backgroundColor: "#1A1917",
                                color: "#846424",
                                border: "0",
                                borderRadius: "50px",
                              }}
                              className="input-group-text"
                            >
                              <img loading="lazy" src={Chrysus} alt="meta" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Loader */}
                    {loading && <Loader />}

                    {/* Validation Popup */}
                    {validationPopup && (
                      <ValidationPopup {...validationPopupProps} />
                    )}
                    <div className="text-center mb-5">
                      <Button
                        type="button"
                        style={{
                          backgroundColor: "#1A1917",
                          borderRadius: "16px",
                          color: "#EDC452",
                          height: "32px",
                          width: "180px",
                          fontWeight: "700",
                          fontSize: "15px",
                        }}
                        onClick={() => {
                          if (Stakeamount != 0 && !isNaN(Stakeamount)) {
                            if (cgtBalance >= Stakeamount) {
                              Stake();
                            } else {
                              setValidationPopup(true);
                            }
                          } else {
                            setValidationPopup(true);
                          }
                        }}
                        className=" font-thin
                         rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center"
                      >
                        <a>{loading ? "Processing...." : "Stake"}</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

          <div className="col-xl-10 ">
            <div
              className="card"
              style={{
                backgroundImage: "linear-gradient(to bottom, #262522, #000000)",
                borderRadius: "16px",
                color: "#846424",
              }}
            >
              <Tab.Container defaultActiveKey="All">
                <div className="card-header border-0 pb-2 flex-wrap">
                  <h4 className="heading text-baseAssets">Your Stakes</h4>
                </div>
                <div className="card-body pt-0 pb-0">
                  <Tab.Content>
                    <Tab.Pane eventKey="All">
                      <div className="table-responsive dataTabletrade ">
                        <div
                          id="status_wrapper"
                          className="dataTables_wrapper no-footer"
                        >
                          <table
                            id="example"
                            className="table display dataTable no-footer"
                            style={{ minWidth: "845px" }}
                          >
                            <thead>
                              <tr className="text-white">
                                <th>Staked</th>
                                <th>Reward</th>
                                <th>Withdrawal Status</th>
                                <th>Withdraw </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <div
                                    style={{
                                      fontStyle: "normal",
                                      fontWeight: "400",
                                      fontSize: "12px",
                                      lineHeight: "15px",
                                      color: "#FFFFFF",
                                    }}
                                  >
                                    {currentStakeamount.toFixed(2)}
                                  </div>
                                </td>
                                <td>
                                  <div
                                    style={{
                                      fontStyle: "normal",
                                      fontWeight: "400",
                                      fontSize: "12px",
                                      lineHeight: "15px",
                                      color: "#FFFFFF",
                                    }}
                                  >
                                    {reward.toFixed(2)}
                                  </div>
                                </td>
                                <td>
                                  <div
                                    style={{
                                      fontStyle: "normal",
                                      fontWeight: "400",
                                      fontSize: "12px",
                                      lineHeight: "15px",
                                      color: "#FFFFFF",
                                    }}
                                  >
                                    {currentStakeamount > 0 &&
                                    now >= timeDepends
                                      ? "Withdrawable"
                                      : "Not Withdrawable"}
                                  </div>
                                </td>
                                <td>
                                  <Link to={"/accounts/withdrawstake"}>
                                    <button
                                      className="badge cursor-pointer"
                                      disabled={
                                        currentStakeamount > 0 &&
                                        now >= timeDepends
                                          ? false
                                          : true
                                      }
                                      style={{
                                        height: "22px",
                                        width: "80px",
                                        color: "#EDC452",
                                        textTransform: "uppercase",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        fontSize: "10px",
                                        backgroundColor: "#1A1917",
                                        borderRadius: "16px",
                                        border: "1px solid transparent",
                                        borderColor: "#EDC452",
                                      }}
                                    >
                                      Withdraw
                                    </button>
                                  </Link>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="d-sm-flex text-white text-center justify-content-between align-items-center mt-3 mb-3" />
                        </div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </Tab.Container>
            </div>
          </div>
        </div>
      </Tab.Container>
    </div>
  );
};
export default Staking;

const Section = styled.section`
  margin-left: 13vw;
  padding: 2rem;
  height: 100%;
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
