import React, { useState } from "react";
import { Button } from "reactstrap";

interface CircleExpandButtonProps {
  icon: React.ReactNode;
  hoverIcon: React.ReactNode;
  text: string;
  color: string;
  outline: boolean;
}

export const CircleExpandButton = ({
  icon,
  text,
  color,
  outline,
  hoverIcon,
}: CircleExpandButtonProps) => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <Button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="p-3 mx-3 my-3"
      color={color}
      outline={outline}
      style={{
        color: "#d6aded",
        borderRadius: "40px",
      }}
    >
      {hover ? hoverIcon : icon}
      {hover ? (
        <span className="mx-3" style={{ color: "#d6aded", transition: "0.3s" }}>
          {text}
        </span>
      ) : (
        ""
      )}
    </Button>
  );
};
