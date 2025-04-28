import React from "react";
interface IPProps {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}
export const P = ({ children, className }: IPProps) => {
  return (
    <p
      className={`p ${className}`}
      style={{
        color: "#ffffff",
      }}
    >
      <>{children}</>
    </p>
  );
};
