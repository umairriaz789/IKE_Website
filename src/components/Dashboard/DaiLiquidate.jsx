import React from "react";
import { FormActionButton } from "../buttons/form_action_button";
import { Body, H4, P } from "../typography";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const DaiLiquidate = () => {
  return (
    <Section>
      <div className="row w-100" style={{ borderRadius: "16px" }}>
        <div className="col ">
          <div
            className="w-100 d-flex flex-column align-items-center text-center"
            style={{
              backgroundColor: "#211f21",
              borderRadius: "16px",
              color: "#846424",
            }}
          >
            <div className="mt-5" />
            <H4>Add Liquidity</H4>
            <div className="d-flex flex-column align-items-start">
              <P className="m-0">How much would you like to Borrow?</P>
              <Body className="m-0">
                Please Enter an amount would you like to Borrow
              </Body>
              <div className="my-3" />
              <label className="form-label text-primary">
                Your Blanace 0.123
              </label>
              <div
                className="input-group"
                style={{
                  backgroundColor: "#1A1917",
                  color: "#846424",
                }}
              >
                <input
                  type="text"
                  className="form-control"
                  style={{
                    backgroundColor: "#1A1917",
                    color: "#846424",
                  }}
                  placeholder="0.00"
                />
                <span
                  style={{
                    backgroundColor: "#1A1917",
                    color: "#846424",
                  }}
                  className=""
                >
                  <select
                    style={{
                      backgroundColor: "#1A1917",
                      color: "#846424",
                      height: "55px",
                    }}
                  >
                    <option value="Ethreum">ETH</option>
                    <option value="DAI">DAI</option>
                  </select>
                </span>
              </div>
              <div className="my-1" />
            </div>
            <div
              className="w-100"
              style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
            />
            <div className="w-100 d-flex flex-row justify-content-start p-3">
              {/* Form Actions */}
              <Link to={"/accounts/mintposition"}>
                <FormActionButton color="white" outline>
                  Back
                </FormActionButton>
              </Link>
              <FormActionButton
                color="primary"
                gradient
                outline
                className="mx-2"
              >
                Continue
              </FormActionButton>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5" />
    </Section>
  );
};

const Section = styled.section`
  margin-left: 18vw;
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
