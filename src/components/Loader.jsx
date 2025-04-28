import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(
    0,
    0,
    0,
    0.8
  ); /* Adjust the opacity and color as needed */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999; /* Ensure the loader is on top of other elements */
`;

const LoaderSpinner = styled.div`
  border: 6px solid #e8e8e8e1; /* Light grey and slightly thinner */
  border-top: 6px solid #edc452; /* Blue and slightly thinner */
  border-radius: 50%;
  width: 60px; /* Slightly smaller width */
  height: 60px; /* Slightly smaller height */
  animation: ${spin} 1s linear infinite;
`;

const Loader = () => {
  return (
    <LoaderContainer className="lg:pl-[250px]">
      <LoaderSpinner />
    </LoaderContainer>
  );
};

export default Loader;
