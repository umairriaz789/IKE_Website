import React from "react";
import styled from "styled-components";
import { vcardcomingsoon } from "../../assets";

const VcardComingSoon = () => {
  return (
    <>
      <div
        className="text-center min-h-screen d-flex justify-content-center align-items-center "
        style={{
          background: `url(${vcardcomingsoon}) center/cover no-repeat `,
        }}
      >
        <Section>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <GradientH1 className="fw-bold">COMING SOON</GradientH1>
            <h4>users will be notified when the feature is ready</h4>
          </div>
        </Section>
      </div>
    </>
  );
};

export default VcardComingSoon;

const GradientH1 = styled.h1`
  background: linear-gradient(to right, #b77000, #f8ea6d);
  -webkit-background-clip: text;
  color: transparent;
  background-clip: text;
`;

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
      grid-template-columns: repeat(1, 1fr);
      height: 50%;
      gap: 1rem;
    }
    .row__two {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
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
