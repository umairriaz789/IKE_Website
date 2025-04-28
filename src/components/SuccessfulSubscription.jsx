import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiPartyPopper } from "react-icons/gi";
import { FormActionButton } from "./buttons/form_action_button";
import styled from "styled-components";

const SuccessfulSubscription = () => {
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

  return (
    <>
      {popupVisible && (
        <Section>
          <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#000000c4] bg-opacity-90"
            style={{ zIndex: 1000 }}
          >
            <div className="w-full max-w-md p-4 bg-gray-800 rounded-md bg-black">
              <div className="d-flex items-center flex-col">
                <GiPartyPopper style={{ fontSize: "30px", color: "#EDC452" }} />
                <h4 className="text-baseAssets text-2xl mt-2">
                  Congratulations
                </h4>
                <p className="text-lg text-white text-center">
                  You have successfully subscribed to our Newsletter
                </p>
              </div>

              <div className="flex justify-center mt-4">
                <Link to="/" onClick={hidePopup}>
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
