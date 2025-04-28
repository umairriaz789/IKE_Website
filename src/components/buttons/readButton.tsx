import React from "react";
import { PlayCircle } from "react-feather";
import { Button } from "reactstrap";

interface IIconButtonProps {
  text: string;
  style?: any;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const ReadButton = ({
  className,
  style,
  onClick,
  text,
}: IIconButtonProps) => {
  return (
    <Button
      className={`px-4 py-2 ${className}`}
      style={{
        color: "black",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "16px",
        lineHeight: "34px",
        letterSpacing: "1px",
        textTransform: "uppercase",
        background:
          "linear-gradient(270deg, #ac40ea 0.26%, #6b6bdf 99.99%, #bba9e7 100%),rgb(201, 201, 205)",
        borderRadius: "40px",
        border: "none",
        ...style,
      }}
      color="primary"
    >
      <span className="d-flex flex-row align-items-center justify-content-center">
        <span className="capitalize font-[600]">{text}</span>
        {/* <PlayCircle className="mx-2" color="black" /> */}
      </span>
    </Button>
  );
};
