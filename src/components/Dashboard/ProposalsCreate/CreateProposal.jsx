import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FormActionButton } from "../../buttons/form_action_button";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../../helpers/firebase";
import { FaCircleExclamation } from "react-icons/fa6";
import SuccessfulProposal from "../../SuccessfulProposal";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers5/react";

const CreateProposal = () => {
  const { address, isConnected } = useWeb3ModalAccount();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [btnText, setBtnText] = useState(true);
  const [congrats, setCongrats] = useState(false);
  const [errors, setErrors] = useState({ title: "", description: "" });
  const fileInputRef = useRef(null);

  const handlePreviewClick = () => {
    setShowPreview(true);
    setBtnText(!btnText);
  };

  const handleSubmit = async () => {
    try {
      let validationErrors = { title: "", description: "" };
      if (!title) validationErrors.title = "Title is required";
      if (!description)
        validationErrors.description = "Description is required";
      setErrors(validationErrors);

      const currentDate = await Timestamp.now();
      // Add the proposal data to the 'proposals' collection in Firestore
      const docRef = await addDoc(collection(db, "proposals"), {
        title: title,
        description: description,
        address: address,
        status: "Pending",
        date: currentDate,
      });
      console.log("Proposal added with ID: ", docRef.id);

      // const subcollectionRef = collection(docRef, "votes");
      // const subDocRef = await addDoc(subcollectionRef, {
      //   subkey: "subvalue",
      // });
      // console.log(
      //   "Subcollection added to the document with ID: ",
      //   subDocRef.id
      // );

      // Clear the form fields after successful submission
      setTitle("");
      setDescription("");
      if (!validationErrors.title && !validationErrors.description) {
        setCongrats(true);
      }
    } catch (error) {
      console.error("Error adding proposal: ", error);
    }
  };
  // UPDATED CODE(ahmed-nissar)
  return (
    <div className=" min-h-screen">
      <Section congrats={congrats}>
        <div className="row d-flex justify-content-center">
          {/* <div className="col-xl-10"> */}
          {/* <div
              className="card"
              style={{
                backgroundColor: "#211f21",
                borderRadius: "16px",
                color: "#EDC452",
              }}
            > */}
          {/* <h1>Hello</h1> */}
          <div className="card-body pt-4">
            <div className="w-100">
              <div
                className="card"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, #262522, #000000)",
                  borderRadius: "16px",
                  color: "#EDC452",
                }}
              >
                <div className="card-body">
                  <div style={{ display: "flex", gap: "3px" }}>
                    <FaCircleExclamation style={{ marginTop: "5px" }} />
                    <div>
                      You must be staking CGOV to submit a proposal. Select an
                      action below and describe your proposal for the community.{" "}
                      <span
                        style={{
                          marginTop: "5px",
                          color: "white",
                          // fontStyle: "normal",
                          // fontWeight: "700",
                          // fontSize: "12px",
                          // letterSpacing: "1px",
                          // textTransform: "uppercase",
                          // background: "transparent",
                        }}
                      >
                        <a
                          href="https://medium.com/@chrysus_coin/exploring-governance-and-voting-mechanisms-in-a-gold-pegged-stablecoin-chrysus-coin-9164f5fb53cc"
                          target="_blank"
                        >
                          Learn more
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
        <div>
          {/* <div
            className="row justify-content-center w-100"
            style={{ borderRadiusBottom: "16px" }}
          > */}
          {/* <div className="col-xl-10"> */}
          <div className="flex md:flex-row flex-col gap-2 ">
            <div className="card-body ">
              <div
                className="  card "
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, #262522, #000000)",
                  borderRadius: "16px",
                  color: "#EDC452",
                }}
              >
                <div className="w-100 d-flex flex-row justify-content-start p-3">
                  {/* Form Actions */}
                  <Link to={"/accounts/governance"}>
                    <FormActionButton
                      className="mx-2"
                      color="primary"
                      gradient
                      outline
                    >
                      <IoMdArrowRoundBack />
                      Back
                    </FormActionButton>
                  </Link>
                </div>
                {/* showPreview */}
                {btnText && (
                  <div className="card-body">
                    <label htmlFor="" style={{ fontSize: "20px" }}>
                      Title <span className="text-[red]">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{
                        backgroundColor: "#262522",
                        color: "#ffffff",
                        border: "0px",
                        borderRadius: "50px",
                        padding: "0px 20px",
                      }}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && (
                      <p style={{ color: "red" }}>{errors.title}</p>
                    )}
                    <label
                      htmlFor=""
                      style={{ marginTop: "15px", fontSize: "20px" }}
                    >
                      Description <span className="text-[red]">*</span>
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      style={{
                        backgroundColor: "#262522",
                        color: "#ffffff",
                        border: "0px",
                        borderRadius: "20px",
                        height: "200px",
                        resize: "vertical",
                        marginBottom: "20px",
                      }}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && (
                      <p style={{ color: "red" }}>{errors.description}</p>
                    )}
                  </div>
                )}
                {!btnText && (
                  <div className="pl-6 pb-6">
                    {/* <h2>Preview:</h2> */}
                    <h5 style={{ color: "#ffffff" }}> {title}</h5>
                    <h5 style={{ color: "#ffffff", fontSize: "12px" }}>
                      {description}
                    </h5>
                    {/* Add other fields as needed */}
                  </div>
                )}
                <div
                  // className="flex md:flex-col md:bg-gradient-to-b from-[#262522] to-[#000000] bg-[none] justify-center gap-2  h-fit md:p-[30px] sm:p-0 md:mt-[15px] sm:mt-0"
                  className="mx-auto flex xs:flex-row flex-col gap-3"
                  style={{
                    // marginTop: "15px",
                    // padding: "30px 30px",

                    borderRadius: "16px",
                  }}
                >
                  <Button
                    style={{
                      color: "white",
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "14px",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      background: "transparent",
                      border: "1px solid #EDC452",
                      borderRadius: "40px",
                      filter: congrats ? "blur(1.2px)" : "none",
                      pointerEvents: congrats ? "none" : "auto",
                    }}
                    onClick={handlePreviewClick}
                    className=" color-white xs:text-[10px] text-[14px] tracking-widest xs:tracking-normal capitalize font-bold bg-transparent border border-[#EDC452]"
                  >
                    {btnText ? "Preview" : "Edit"}
                  </Button>

                  <Button
                    style={{
                      color: "black",
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "14px",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      background:
                        "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                      borderRadius: "40px",
                      // marginTop: "10px",

                      filter: congrats ? "blur(1.2px)" : "none", // Apply blur effect if congrats modal is open
                      pointerEvents: congrats ? "none" : "auto", // Disable pointer events when congrats modal is open
                    }}
                    onClick={handleSubmit}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {congrats && <SuccessfulProposal />}
          {/* </div> */}
          {/* </div> */}
        </div>
      </Section>
    </div>
  );
};

export default CreateProposal;

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  background-color: #000000;

  // filter: ${({ congrats }) =>
    congrats
      ? "blur(8px)"
      : "none"}; // Apply blur effect if congrats modal is open
  // pointer-events: ${({ congrats }) =>
    congrats
      ? "none"
      : "auto"}; // Disable pointer events when congrats modal is open
  // transition: filter 0.3s ease; // Add transition for smooth effect

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
