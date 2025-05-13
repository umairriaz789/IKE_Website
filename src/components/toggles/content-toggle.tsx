import React, { useState } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import { PlusWhiteIcon, XMarkWhiteIcon } from "../../assets";

interface ContentToggleProps {
  title: string;
  content: React.ReactNode | React.ReactNode[];
}

export const ContentToggle = ({ title, content }: ContentToggleProps) => {
  const [collapse, setCollapse] = useState(false);
  const [status, setStatus] = useState("Closed");

  const onEntering = () => setStatus("Opening...");
  const onEntered = () => setStatus("Opened");
  const onExiting = () => setStatus("Closing...");
  const onExited = () => setStatus("Closed");
  const toggle = () => setCollapse(!collapse);

  return (
    <div>
      <Button
        color="primary"
        onClick={toggle}
        style={{
          marginBottom: "1rem",
          backgroundColor: "transparent",
          outline: "none",
          boxShadow: "none",
          border: "none",
          width: "100%",
        }}
      >
        <div className=" w-[100%]  gap-2  d-flex flex-row  align-items-center justify-content-between">
          <span
            className={` hover:text-[#ffffff] ${
              collapse ? "text-white" : "opacity-[50%]"
            } w-[100%] `}
          >
            <div className="flex justify-start">{title}</div>
          </span>
          <span>
            {collapse ? (
              <img src={XMarkWhiteIcon} alt="xmark-white.svg" />
            ) : (
              <img src={PlusWhiteIcon} alt="plus-white.svg" />
            )}
          </span>
        </div>
      </Button>
      <Collapse
        isOpen={collapse}
        onEntering={onEntering}
        onEntered={onEntered}
        onExiting={onExiting}
        onExited={onExited}
      >
        <div
          className="text-justify"
          style={{ paddingLeft: "2em", paddingBottom: "1em", color:"#808080"}}
        >
          {content}
        </div>
      </Collapse>
    </div>
  );
};
