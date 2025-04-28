import React from "react";
import { disclaimer } from "../../assets";
import { Button } from "reactstrap";

const Disclaimer = ({ onAccept }) => {
  return (
    <div
      className="vertically-overflow container-fluid   d-flex align-items-center justify-content-center"
      style={{ height: "100%" }}
    >
      <div className="row justify-content-center ">
        <div className="col-xl-8">
          <div
            className="card"
            style={{
              // backgroundColor: "#211f21",
              backgroundImage: "linear-gradient(to bottom, #262522, #000000)",
              borderRadius: "16px",
              color: "#846424",
            }}
          >
            <div className="card-body">
              <div className="row sp20 mb-2  items-center">
                <div className="col-xxl-12 d-flex flex-wrap justify-content-between align-items-center">
                  <div className="px-2 info-group">
                    <div className=" text-[16px] font-normal mb-1 text-baseAssets flex justify-center items-center gap-4">
                      <img src={disclaimer} alt="disclaimer" />
                      <p className="xs:text-[25px] ss:text-[32px] md:text-[36px] mb-0">
                        Disclaimer
                      </p>
                    </div>
                    <div className="text-base sm:text-lg font-normal text-white sm:px-0 px-4 lg:px-16">
                      If you are an advanced user, feel free to explore these
                      sections and participate in governance decisions. Your
                      insights and actions are valuable to our community.
                      <br /> <br />
                      Novice users, please exercise caution! These features may
                      result in irreversible actions. It is strongly recommended
                      that you:
                      <ul className="list-disc ml-4">
                        <li>
                          - Review our documentation for detailed information.
                        </li>
                        <li>- Engage in our educational resources.</li>
                        <li>
                          - Seek advice from our community or support before
                          proceeding.
                        </li>
                      </ul>
                    </div>

                    <div className="d-flex justify-center items-center gap-4 sm:gap-2 my-4">
                      <Button
                        style={{
                          color: "white",
                          fontStyle: "normal",
                          fontWeight: "700",
                          fontSize: "14px",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          background: "transparent",
                          border: "1px solid #EDC452",
                          borderRadius: "40px",
                        }}
                        className="color-white xs:text-[10px] text-[14px] tracking-widest xs:tracking-normal capitalize font-bold bg-transparent border border-[#EDC452]"
                      >
                        <a
                          href="https://medium.com/@chrysus_coin"
                          target="_blank"
                        >
                          Learn more
                        </a>
                      </Button>

                      <Button
                        style={{
                          color: "black",
                          fontStyle: "normal",
                          fontWeight: "700",
                          fontSize: "14px",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          background:
                            "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                          borderRadius: "40px",
                        }}
                        onClick={onAccept}
                      >
                        Continue Anyway
                      </Button>
                    </div>
                    <p className="text-[#FF3434] text-center">
                      By continuing, you acknowledge that you have read and
                      understood this disclaimer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
