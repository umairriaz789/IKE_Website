import React, { useEffect, useState } from "react";
import styled from "styled-components";
import scrollreveal from "scrollreveal";
import { MintForm } from "../mintform";
import Disclaimer from "./Disclaimer";

const Mint = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  useEffect(() => {
    const disclaimerAccepted = sessionStorage.getItem("disclaimerAccepted");
    if (disclaimerAccepted) {
      setShowDisclaimer(false);
    }

    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        nav,
        .row__one,
        .row__two
    `,
      {
        opacity: 0,
        interval: 100,
      },
    );
  }, []);

  const handleAcceptDisclaimer = () => {
    setShowDisclaimer(false);
    sessionStorage.setItem("disclaimerAccepted", "true");
  };

  return (
    <div className="min-h-screen">
      <Section>
        <div className="grid">
          {showDisclaimer ? (
            <>
              <Disclaimer onAccept={handleAcceptDisclaimer} />
            </>
          ) : (
            <MintForm />
          )}
        </div>
      </Section>
    </div>
  );
};

export default Mint;

const Section = styled.section`
  margin-left: 14vw;
  padding: 2rem;
  height: 100%;
  background-color: #000000;
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
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
