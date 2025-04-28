import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FormActionButton } from "../buttons/form_action_button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";

const SuccessfulSubscription = ({
  icon,
  title,
  text,
  buttonText,
  buttonLink,
}) => {
  // State to manage the visibility of the popup
  const [popupVisible, setPopupVisible] = useState(true);

  useEffect(() => {
    // Add a class to the body element to disable scrolling
    document.body.style.overflow = "hidden";

    // Clean up the effect by removing the class when the component is unmounted
    return () => {
      // Restore the scroll when the component is unmounted
      document.body.style.overflow = "auto";
    };
  }, []);

  // Function to handle hiding the popup
  const hidePopup = () => {
    setPopupVisible(false);
    // Restore the scroll when the popup is hidden
    document.body.style.overflow = "auto";
  };
  const [isValid, setIsValid] = useState(false);

  return (
    <>
      {popupVisible && (
        <Section>
          <div
            className="fixed top-0 left-0 w-full h-full lg:pl-[250px]  flex items-center justify-center bg-[#000000c4] bg-opacity-90"
            style={{ zIndex: 1000 }}
          >
            <div className="w-full max-w-md p-4 bg-gray-800 rounded-md bg-black">
              <div className="d-flex items-center flex-col">
                {icon}
                {/* {isValid ? (
                  <FaCircleCheck style={{ fontSize: "30px", color: "green" }} />
                ) : (
                  <IoIosCloseCircle
                    style={{ fontSize: "30px", color: "red" }}
                  />
                )} */}
                <h4 className="text-[#ac40ea] text-2xl">
                  {/* {isValid ? "Valid Input" : "Invalid Input"} */}
                  {title}
                </h4>
                <p className="m-0 text-lg text-white">{text}</p>
              </div>

              <div className="flex justify-center mt-4">
                <Link to={buttonLink} onClick={hidePopup}>
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
        </Section>
      )}
    </>
  );
};

export default SuccessfulSubscription;

const Section = styled.section`
  margin-left: 18vw;
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
