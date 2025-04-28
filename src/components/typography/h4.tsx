import React from "react";

interface IH4Props {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}
export const H4 = ({ children, className }: IH4Props) => {
  return (
    <h4
      className="h4 text-baseAssets"
      style={{
                // "linear-gradient(270deg, #ac40ea 0.26%, #6b6bdf 99.99%, #bba9e7 100%),rgb(195, 198, 202)",
        background:
          "-webkit-linear-gradient(270deg, #ac40ea 0.26%, #6b6bdf 99.99%, #bba9e7 100%), #FFFFFF",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        // textFillColor: "transparent",
      }}
    >
      {children}
    </h4>
  );
};
