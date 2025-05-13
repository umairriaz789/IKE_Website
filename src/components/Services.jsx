import React, { useState } from "react";
import styles, { layout } from "../style";
import { Service } from "../constants";
import { JumboButton } from "./buttons/jumbo_button";
import GetStarted from "./GetStarted";
import { H4 } from "./typography/h4";
import {
  LeafGold,
  UmbrellaGold,
  CartGold,
  SwapGold,
  CCoinGold,
  Swap,
  Shop,
  Mint,
  Loan,
} from "../assets";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAppSelector } from "../reducer/store";
import { Button } from "react-bootstrap";
import ComingSoon from "./VCards/ComingSoon";

const FeatureCard = ({ icon, title, content, index }) => (
  <div
    className={`flex flex-row p-6  items-center py-[6px] px-4 rounded-[12px] ${index !== Service.length - 1 ? "mb-6" : "mb-0"
      } feature-card`}
  >
    <div
      className={`w-[50px] h-[50px] rounded-full ${styles.flexCenter}`}
      style={{
        background:
          "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
      }}
    >
      <img
        loading="lazy"
        src={icon}
        alt="star"
        className="w-[60%] h-[60%] object-contain text-black"
      />
    </div>
    <div className="flex-1 flex flex-col ml-3 mt-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px] fontsize">
        {content}
      </p>
    </div>
  </div>
);
const FeatureContent = ({ icon, title, content, index }) => (
  <div
    className={`flex flex-row  items-center   rounded-[12px] ${index !== Service.length - 1 ? "mb-6" : "mb-0"
      } feature-card`}
  >
    <div>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px] fontsize">
        {content}
      </p>
    </div>
  </div>
);

const Services = () => {
  const [hover, setHover] = useState(false);
  return (
    <div className="bg-[url('./assets/bg-overlay.png')] lg:bg-contain bg-auto">
      <div className={`${styles.paddingXX} ${styles.flexCenter}`}>
        <Navbar />
      </div>
      <H4>
        <h1
          className="text-[32px] leading-[32px] font-[600] text-center font-montserrat mt-[60px] "
          style={{ color: "#846424" }}
        >
          Services
        </h1>
      </H4>
      {/* <section id="home" className={` flex md:flex-row flex-col`}>
        <div className="container">
          <div className="page-content">
            <div className="lg:hidden block">
              <div className={`${layout.sectionImg} flex flex-col`}>
                {Service.map((feature, index) => (
                  <FeatureCard key={feature.id} {...feature} index={index} />
                ))}
              </div>
            </div>
            <section className="content-inner about-sec lg:block hidden mb-4">
              <div className="  style-1 align-items-center">
                <div className={`${layout.sectionImg}`}>
                  <div className="absolute top-[0px] left-[-30px]  w-[338px]">
                    <FeatureContent
                      className="w-[50px]"
                      key={Service[0].id}
                      {...Service[0]}
                      index={0}
                    />
                  </div>
                  <div className="absolute  text-right  top-[0px] left-[785px] w-[328px]">
                    <FeatureContent
                      key={Service[1].id}
                      {...Service[1]}
                      index={1}
                    />
                  </div>
                  <div className="absolute bottom-[-365px] left-[-30px] w-[338px]">
                    <FeatureContent
                      key={Service[2].id}
                      {...Service[2]}
                      index={2}
                    />
                  </div>
                  <div className="absolute bottom-[-365px] left-[750px] text-right w-[363px]">
                    <FeatureContent
                      key={Service[3].id}
                      {...Service[3]}
                      index={3}
                    />
                  </div>
                </div>
                <div className=" py-[40px] about-content relative ">
                  <div
                    className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
                  >
                    <div className="jumbotron-actions">
                      <JumboButton
                        className="action top-left"
                        text="MINT"
                        icon={
                          <img
                            className="jumbo-button-icon"
                            src={LeafGold}
                            alt="leaf-gold"
                          />
                        }
                      />
                      <JumboButton
                        className="action bottom-left"
                        text="LOAN"
                        icon={
                          <img
                            className="jumbo-button-icon"
                            src={UmbrellaGold}
                            alt="umbrella-gold"
                          />
                        }
                      />
                      <JumboButton
                        className="action top-right"
                        text="SWAP"
                        icon={
                          <img
                            className="jumbo-button-icon"
                            src={SwapGold}
                            alt="swap-gold"
                          />
                        }
                      />
                      <JumboButton
                        className="action bottom-right"
                        text="BUY"
                        icon={
                          <img
                            className="jumbo-button-icon"
                            src={CartGold}
                            alt="card-gold"
                          />
                        }
                      />
                      <span className="action action-center coin-rotating">
                        <img src={CCoinGold} alt="c-coin-gold.sg" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section> */}
      <div className="container">
        <>
          <ComingSoon/>
        </>
      </div>
      <div className={`bg-black   ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Services;
