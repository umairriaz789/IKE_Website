import React, { useEffect, useState } from "react";
import { daogold } from "../assets";
import Navbar from "./Navbar";
import styles from "../style";
import Footer from "./Footer";
import { H4 } from "./typography";
import { ReadButton } from "./buttons";

const ImageBox = ({ image, changeClass }) => {
  return (
    <div className="col-6">
      <div className={`image-box ${changeClass}`}>
        <img src={image} alt="" />
      </div>
    </div>
  );
};

const Ecosystems = () => {
  return (
    <div className="bg-[url('./assets/bg-overlay.png')] lg:bg-contain bg-auto bg-no-repeat">
      <div className={`${styles.paddingXX} ${styles.flexCenter}`}>
        <Navbar />
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <H4>
          <p
            style={{
              fontWeight: "600",
              fontSize: "32px",

              lineHeight: "32px",
            }}
            className="font-montserrat mt-[70px] mb-[50px]"
          >
            Governance{" "}
          </p>
        </H4>
        <p
          className="text-center col-8 font-poppins leading-[24px] text-[16px]"
          style={{ color: "#FFFFFF" }}
        >
          <span className="text-[#EDC452]">Chrysus</span> is a comprehensive
          decentralized application{" "}
          <span className="text-[#EDC452]">(DApps)</span> that seamlessly
          integrates a range of financial services, such as loans, swaps, and
          more, to create a unified platform for its users. The{" "}
          <span className="text-[#EDC452]">
            Chrysus Governance Token (CGOV)
          </span>{" "}
          empowers token holders by granting them the ability to actively
          participate in decision-making processes, steering the platform's
          future trajectory.
        </p>
        <div className="container">
          <div className="page-content">
            <section className="content-inner about-sec">
              <div className="row about-bx2  align-items-start">
                <div className="col-lg-6">
                  <div
                    className="p-5 flex  justify-center items-center dz-media bg-gradient-to-b from-[#000000] to-[#1A1917]"
                    style={{
                      borderRadius: "25px",
                      overflow: "hidden",
                      marginBottom: "30px",
                    }}
                  >
                    <ImageBox
                      // className="w-[472px]"
                      image={daogold}
                      changeclassName="image-box-1"
                    />
                  </div>
                </div>
                <div className="col-lg-6 about-content ps-lg-5 m-b30">
                  <div className="section-head">
                    <H4>
                      {" "}
                      <h2 className="text-[24px] font-montserrat font-[600] leading-[32px]">
                        Get Started with <br /> Chrysus DAO
                      </h2>
                    </H4>
                    <p className="m-0 font-montserrat font-[500] text-[16px] leading-[19.5px">
                      ChrysusDAO was founded with a simple mission of making
                      everyone a part of a fair and inclusive Chrysus ecosystem.
                      <br /> <br />
                      As an added incentive, users who engage in various
                      services on the platform, like loans and swaps, can earn
                      rewards in CGOV, further enhancing the decentralized
                      experience and fostering a collaborative ecosystem driven
                      by its community members.
                    </p>
                    <a
                      style={{ color: "#846424" }}
                      target="_blank"
                      href="https://medium.com/@chrysus_coin/exploring-governance-and-voting-mechanisms-in-a-gold-pegged-stablecoin-chrysus-coin-9164f5fb53cc"
                    >
                      <ReadButton text="Explore DAO" className="mt-3" />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className={`bg-black ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Ecosystems;
