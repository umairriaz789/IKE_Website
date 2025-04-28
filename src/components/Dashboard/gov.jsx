import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DaoNav from "../DaoNav";
import styles from "../../style";
import styled from "styled-components";
import Disclaimer from "./Disclaimer";

const Governance = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  useEffect(() => {
    const disclaimerAccepted = sessionStorage.getItem("disclaimerAccepted");
    if (disclaimerAccepted) {
      setShowDisclaimer(false);
    }
  }, []);

  const handleAcceptDisclaimer = () => {
    setShowDisclaimer(false);
    sessionStorage.setItem("disclaimerAccepted", "true");
  };

  return (
    <div className="min-h-screen">
      <Section>
        {showDisclaimer ? (
          <Disclaimer onAccept={handleAcceptDisclaimer} />
        ) : (
          <>
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
              <div className={`${styles.boxWidth}`}>
                <DaoNav />
              </div>
            </div>
            <Outlet />
          </>
        )}
      </Section>
    </div>
  );
};

export default Governance;

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
