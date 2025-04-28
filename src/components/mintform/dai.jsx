import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Link, useNavigate } from "react-router-dom";
import { FormActionButton } from "../buttons/form_action_button";
import { Body, H4, P } from "../typography";
import { Button } from "reactstrap";
import { CHRYSUS, DAI } from "../../constant";
import { ConfirmationItem } from "../confirmation_item";
import Utils from "../../utilities";
import ERC20 from "../../abis/ERC20.json";
import chrysus from "../../abis/Chrysus.json";
import ValidationPopup from "../Dashboard/ValidationPopup";
import Loader from "../Loader";
import { tick } from "../../assets";
import { IoIosCloseCircle } from "react-icons/io";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";

export const DAIDeposite = () => {
  const navigate = useNavigate();
  const [isApprove, setisApprove] = useState(false);
  const [loading, setloading] = useState(false);
  const [DAIamount, setDAIamount] = useState(0);
  const [confirm, setconfirm] = useState(false);
  const [amount, setAmount] = useState(0);
  const [recipt, setrecipt] = useState();
  const [rout, setrout] = useState(false);
  const [validationPopup, setValidationPopup] = useState(false);
  const { walletProvider } = useWeb3ModalProvider();
  const { address, isConnected } = useWeb3ModalAccount();

  useEffect(() => {
    if (!isNaN(DAIamount)) {
      Utils.generate(ethers.utils.parseUnits(DAIamount.toString()), "DAI").then(
        function (data) {
          setAmount(Utils.toFixedNoRounding(data, 4));
        },
      );
    }
  });

  useEffect(() => {
    if (rout == true) {
      navigate("/accounts/mint");
    }
  });

  const DAIApprove = async () => {
    try {
      if (isConnected) {
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const _signer = provider.getSigner();
        const token = new ethers.Contract(DAI, ERC20.abi, _signer);
        setloading(true);

        let checkAllowance = await token.allowance(address, CHRYSUS);

        if (DAIamount > Number(checkAllowance) / 1e18) {
          let Txn = await token.approve(
            CHRYSUS,
            ethers.utils.parseUnits(String(DAIamount)),
          );
          await Txn.wait();
        }
        setloading(false);
        setisApprove(true);
      }
    } catch (error) {
      setloading(false);
      setisApprove(false);
      console.error("Error:", error);
    }
  };

  const DepositDAICollateral = async () => {
    try {
      if (isConnected) {
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const _signer = provider.getSigner();
        const contract = new ethers.Contract(CHRYSUS, chrysus.abi, _signer);
        setloading(true);
        let Txn = await contract.depositCollateral(
          DAI,
          ethers.utils.parseUnits(String(DAIamount)),
        );
        await Txn.wait();
        setrecipt(`https://sepolia.etherscan.io/tx/${Txn.hash}`);
        setloading(false);
        setisApprove(false);
        setconfirm(true);
      }
    } catch (error) {
      setloading(false);
      setconfirm(false);
      setValidationPopup(true);
      console.error("Error:", error);
    }
  };

  // Define the props for the ValidationPopup
  const validationPopupProps = {
    icon: <IoIosCloseCircle style={{ fontSize: "30px", color: "red" }} />,
    title: "Invalid Input",
    text: "Please check your entries and try again.",
    buttonText: "Back",
    buttonLink: "/accounts/mint/daideposite",
  };

  return (
    <>
      <section>
        <div className="d-flex align-items-start justify-content-center">
          <div
            className="row justify-content-center w-100"
            style={{ borderRadius: "16px" }}
          >
            <div className="col-md-6">
              <div
                className="w-100 p-[15px] d-flex flex-column align-items-center text-center"
                style={{
                  backgroundColor: "#211f21",
                  borderRadius: "16px",
                  color: "#846424",
                }}
              >
                <div className="mt-5" />
                <h4 className="text-baseAssets">Deposit DAI</h4>
                <div className="d-flex flex-column text-center">
                  <P className="m-0">
                    How much Collateral would you like to deposit into your
                    Position?
                  </P>
                  <Body className="m-0">
                    The amount of Collateral you deposit determines how much
                    CHAU you can generate.
                  </Body>
                  <div className="my-3" />
                  <div className="d-flex justify-content-center ">
                    <input
                      type="text"
                      className="form-control"
                      style={{
                        backgroundColor: "#1A1917",
                        color: "#EDC452",
                        borderRadius: "50px",
                        width: "80%",
                      }}
                      onChange={(e) => {
                        setDAIamount(parseFloat(e.target.value));
                        setError(false);
                        validationPopup == true
                          ? setValidationPopup(false)
                          : "";
                      }}
                      placeholder="0.00"
                    />
                  </div>
                  {/* Loader */}
                  {loading && <Loader />}

                  {/* Validation Popup */}
                  {validationPopup && (
                    <ValidationPopup {...validationPopupProps} />
                  )}

                  <div className="my-3" />
                </div>

                <div className="mt-2" />
                <div className="w-100  p-3 text-center">
                  {confirm === true ? (
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
                                      <a href={recipt} target="_blank">
                                        <u>{recipt}</u>
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
                              onClick={() => setconfirm(false) & setrout(true)}
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
                  {isApprove === true ? (
                    <>
                      <div className="col-md-8 ">
                        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-[#000000d9]">
                          <div
                            className="relative mx-auto w-auto my-6 max-w-2xl"
                            style={{
                              backgroundColor: "#211f21",
                              borderRadius: "16px",
                              color: "white",
                            }}
                          >
                            <div className="row justify-content-center w-100">
                              <div className="d-flex flex-column align-items-center mt-4">
                                <h4 className="text-baseAssets">
                                  Confirm Mint Details
                                </h4>
                                <div className="d-flex flex-column align-items-center justify-content-center col-7 ">
                                  <ConfirmationItem
                                    title="Depositing"
                                    value={DAIamount}
                                  />
                                  <ConfirmationItem
                                    title="Generating"
                                    value={amount + " CHAU"}
                                  />

                                  <div className="d-flex flex-row align-items-center justify-content-start my-3 w-100">
                                    <Body className="">
                                      Click Deposit Button to deposit DAI or
                                      Close Button to Cancel.
                                    </Body>
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
                            <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                              <button
                                className="text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setisApprove(false)}
                              >
                                Close
                              </button>
                              <button
                                style={{
                                  height: "52px",
                                  width: "120px",
                                  color: "#EDC452",
                                  textTransform: "uppercase",
                                  fontStyle: "normal",
                                  fontWeight: "700",
                                  fontSize: "10px",
                                  backgroundColor: "#1A1917",
                                  borderRadius: "16px",
                                  border: "1px solid transparent",
                                  borderColor: "#846424",
                                }}
                                type="button"
                                onClick={() => DepositDAICollateral()}
                              >
                                {loading ? "Processing..." : "Deposit"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* </div> */}
                      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
                    </>
                  ) : (
                    <>
                      <Button
                        data-modal-target="popup-modal"
                        data-modal-toggle="popup-modal"
                        style={{
                          color: "black",
                          fontStyle: "normal",
                          fontWeight: "700",
                          fontSize: "16px",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          background:
                            "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                          borderRadius: "40px",
                        }}
                        onClick={() =>
                          isNaN(DAIamount) || DAIamount == 0
                            ? setValidationPopup(true)
                            : DAIApprove()
                        }
                      >
                        {loading ? "Processing..." : "Approve"}
                      </Button>
                    </>
                  )}
                </div>
                <div
                  className="w-100"
                  style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
                />
                <div className="w-100 d-flex flex-row justify-content-start p-3">
                  {/* Form Actions */}
                  <Link to={"/accounts/mint"}>
                    <FormActionButton
                      className="mx-2"
                      color="primary"
                      gradient
                      outline
                    >
                      Back
                    </FormActionButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
