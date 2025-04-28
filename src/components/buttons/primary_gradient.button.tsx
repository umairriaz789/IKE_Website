import React from "react";
import { Button } from "reactstrap";

interface IPrimaryGradientButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode | React.ReactNode[];
}

export const PrimaryGradientButton = ({
  className,
  style,
  onClick,
  children,
}: IPrimaryGradientButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={`${className}`}
      style={{
        background:
          "linear-gradient(270deg, #ac40ea 0.26%, #6b6bdf 99.99%, #bba9e7 100%),rgb(195, 198, 202)",
        borderRadius: "40px",
        outline: "none",
        border: "none",
        color: "black",
        fontWeight: "bold",
        padding: "12px",
        ...style,
      }}
    >
      {children}
    </Button>
  );
};
