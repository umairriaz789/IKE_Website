import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import { FormActionButton } from "../buttons/form_action_button";
import { Body, H4, P } from "../typography";
import { ConfirmationItem } from "../confirmation_item";
import { Button } from "reactstrap";
import Utils from "../../utilities";
import chrysus from "../../abis/Chrysus.json";
import { CHRYSUS, ETH } from "../../constant";
import { tick } from "../../assets";
import ValidationPopup from "../Dashboard/ValidationPopup";
import Loader from "../Loader";
import { IoIosCloseCircle } from "react-icons/io";

export const ETHDeposite = () => {
  const navigate = useNavigate();
  const [ethamount, setethamount] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [amount, setAmount] = useState(0);
  const [loading, setloading] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const [recipt, setrecipt] = useState("");
  const [rout, setrout] = useState(false);
  const [validationPopup, setValidationPopup] = useState(false);
  const { walletProvider } = useWeb3ModalProvider();
  const { address, isConnected } = useWeb3ModalAccount();

  useEffect(() => {
    if (!isNaN(ethamount)) {
      Utils.generate(ethers.utils.parseUnits(ethamount.toString()), "ETH").then(
        function (data) {
          setAmount(Utils.toFixedNoRounding(data, 4));
        },
      );
    }
  }, [ethamount]);

  const DepositCollateral = async () => {
    try {
      if (isConnected) {
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const _signer = provider.getSigner();
        const contract = new ethers.Contract(CHRYSUS, chrysus.abi, _signer);
        setloading(true);
        let Txn = await contract.depositCollateral(
          ETH,
          ethers.utils.parseUnits(String(ethamount)),
          {
            from: address,
            value: ethers.utils.parseUnits(String(ethamount)),
          },
        );
        await Txn.wait();
        setrecipt(`https://sepolia.etherscan.io/tx/${Txn.hash}`);
        setloading(false);
        setModalShow(false);
        setconfirm(true);
      }
    } catch (error) {
      setloading(false);
      setModalShow(false);
      setconfirm(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (rout == true) {
      navigate("/accounts/mint");
    }
  });

  // Define the props for the ValidationPopup
  const validationPopupProps = {
    icon: <IoIosCloseCircle style={{ fontSize: "30px", color: "red" }} />,
    title: "Invalid Input",
    text: "Please check your entries and try again.",
    buttonText: "Back",
    buttonLink: "/accounts/mint/ethdeposite",
  };

  return (
    <>
      <section>
        <div className="d-flex align-items-start justify-content-center">
          <div
            className="row justify-center w-100"
            style={{ borderRadius: "16px" }}
          >
            <div className="col-xl-6">
              <div
                className="w-100 p-[15px] d-flex flex-column align-items-center text-center"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, #262522, #000000)",
                  borderRadius: "16px",
                  color: "#846424",
                }}
              >
                <div className="mt-5" />

                <h4 className="text-baseAssets">Deposit Ethereum</h4>
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
                  <div className="flex justify-center items-center">
                    <input
                      type="text"
                      className="form-control "
                      style={{
                        backgroundColor: "#262522",
                        color: "#EDC452",
                        borderRadius: "50px",
                        width: "250px",
                      }}
                      onChange={(e) => {
                        setethamount(parseFloat(e.target.value));
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
                <div className="w-100 pb-3 text-center">
                  <Button
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
                      isNaN(ethamount) || ethamount == 0
                        ? setValidationPopup(true)
                        : setModalShow(true)
                    }
                  >
                    Preview
                  </Button>

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
                              // onClick={() =>setrout(true)} &&
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
                  {modalShow ? (
                    <>
                      <div className="col-md-8 ">
                        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-[#000000d9]">
                          <div
                            className="relative mx-auto w-auto my-6 max-w-2xl"
                            style={{
                              // backgroundColor: "#7a7a79",
                              // color: "black",
                              // backgroundColor: "#211f21",
                              // borderRadius: "16px",
                              // color: "#846424",
                              backgroundColor: "#211f21",
                              borderRadius: "16px",
                              // color: "#846424",
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
                                    value={ethamount}
                                  />
                                  <ConfirmationItem
                                    title="Generating"
                                    value={amount + " CHAU"}
                                  />

                                  <div className="d-flex flex-row align-items-center justify-content-start my-3 w-100">
                                    {/* <input
                                      type="checkbox"
                                      style={{
                                        transform: "scale(1.5)",
                                        accentColor: "#EDC452",
                                      }}
                                    /> */}
                                    <Body className="">
                                      Click Deposit Button to deposit Eth or
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
                                onClick={() => setModalShow(false)}
                              >
                                Close
                              </button>
                              <button
                                style={{
                                  height: "52px",
                                  width: "120px",
                                  // color: "#846424",
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
                                // onClick={() => setShowModal(false)}
                                onClick={() => DepositCollateral()}
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
                  ) : null}
                  {/* <FormActionButton
                                    color="primary"
                                    gradient={true}
                                    outline={true}
                                    className="mx-2"
                                    onClick={() => DepositCollateral()}
                                >
                                    Deposit
                                </FormActionButton> */}
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
        <div className="pt-5" />
        <div className="pt-2" />
      </section>
    </>
  );
};
