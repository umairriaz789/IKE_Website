import React from "react";

const Button = ({ styles }) => (
  <button
    type="button"
    className={`py-4 px-6 font-poppins font-medium text-[18px] text-white bg-discount-gradient rounded-[10px] outline-none ${styles} `}
  >
    Explore the Technology
  </button>
);

export default Button;
