import React, { useState } from "react";
import { translateDOMPositionXY } from "rsuite/esm/DOMHelper";
import { Body, H4, P } from "../typography";

const Toltip = ({ text, children }) => {
  const [visible, setvisible] = useState(false);

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setvisible(true)}
      onMouseLeave={() => setvisible(false)}
    >
      {!visible ? <>{children}</> : ""}
      {visible ? (
        <div
          className="text"
          style={{
            width: "270px",
            color: "black",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "10px",
            // background: "#141414",
            backgroundColor: "#525151",
            borderRadius: "10px",
          }}
        >
          <div className="">
            <div className="p-3">
              <Body style={{ fontWeight: "600", color: "white", marginBottom: "0" }}>
                Stability Fee
              </Body>
              <Body style={{ fontWeight: "300", color: "white", marginBottom: "0" }}>
                The fee calculated based on the outstanding debt of your
                position. This is continiously added to your existing debt.
              </Body>
              <Body
                className="mt-3"
                style={{ fontWeight: "600", color: "white", marginBottom: "0" }}
              >
                Liquidation Ratio
              </Body>
              <Body style={{ fontWeight: "300", color: "white", marginBottom: "0" }}>
                The collateral-to-dai ratio at which the position becomes
                vulnerable to liquidation.
              </Body>
              <Body
                className="mt-3"
                style={{ fontWeight: "600", color: "white", marginBottom: "0" }}
              >
                Liquidation Fee
              </Body>
              <Body style={{ fontWeight: "300", color: "white", marginBottom: "0" }}>
                The fee that is added to the total outstanding DAI debt when a
                liquidation occurs.
              </Body>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Toltip;
