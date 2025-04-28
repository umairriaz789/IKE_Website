import React, { useState } from "react";
import styles from "../style";
import { logo } from "../assets";
import { memo } from "react";
import { LeafGold } from "../assets";
import { UmbrellaGold } from "../assets";
import { SwapGold } from "../assets";
import { CartGold,lo } from "../assets";
import { CCoinGold } from "../assets";
import { heroimgsm, lr } from "../assets";
import { JumboButton } from "./buttons/jumbo_button";
import { PlayTourButton } from "./buttons";
import {
  blurmeta,
  blurwalletconnect,
  blurtrustwallet,
  blureth,
  blurlogo,
  groupcoin1,
} from "../assets";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Hero = () => {
  const [modal, setModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  const openModal = () => {
    setModal(!modal);
  };

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };
  return (
    // md:h-screen lg:h-[50%]
    <div className=" bg-[url('./assets/bg_overlay1.jpg')] md:bg-cover sm:bg-auto h-screen  ">
      <div onClick={openModal} className="relative z-[10000]">
        {modal ? (
          <section className=" fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="modal__align  ">
              <div className="modal__content relative bg-gradient-to-l from-[#846424] to-[#EDC452] p-1 rounded-md shadow-lg z-10">
                <div className="modal__video-align">
                  <iframe
                    className="modal__video-style"
                    onLoad={spinner}
                    loading="lazy"
                    width="800"
                    height="500"
                    src="https://www.youtube.com/embed/D98gFrQ3dMQ"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </div>
      <div className=" p-5">
        <section
          id="home"
          // container
          className={` max-[1700px]:container  mx-auto flex max-[800px]:flex-col-reverse md:gap-0 gap-[55px]  xl:gap-[100px]  ${styles.paddingY} 
            w-full relative  `}
        >
          <img
            src={blurmeta}
            alt="metamask"
            className="hello absolute z-[-1] animate-spin inherit left-[50%] top-[60%]"
            // style={{
            //   animation:
            //     "animation: 'animateX 2s linear 0s infinite alternate, animateY 3.4s linear 0s infinite alternate'",
            // }}
          />
          <img
            src={blurwalletconnect}
            alt="walletconnect"
            className="hello absolute z-[-1] left-[30%] top-[20%]"
          />
          <img
            src={blurtrustwallet}
            alt="trustwallet"
            className="hello absolute z-[-1] top-[90%] left-[80%]"
          />
          <img
            src={blureth}
            alt="ethereum"
            className="hello absolute z-[-1]  top-[90%] left-[10%]"
          />
          {/* <img
            src={blurlogo}
            alt="logo"
            className="hello absolute z-[-1] left-[90%] top-[20%]"
          /> */}

          <div
            className={` flex-1 ${styles.flexStart}   flex-col lg:px-0  lg:items-start md:items-center xl:items-center`}
          >
            <div className="flex flex-row justify-between flex-wrap items-center w-full">
              <h1 className="min-[2000px]:text-[86px] min-[2000px]:leading-[86px] 
              flex flex-col lg:items-start    md:items-center xl:items-center  
              text-gradient flex-1 font-montserrat font-semibold  lg:text-[64px] text-[40px] 
              lg:leading-[75px] leading-[42px]">
                Decentralized
                <br className="sm:block hidden" />
                <span className="text-gradient"> 
                  All-Rounder
                  </span>
              </h1>
            </div>

            <div className="flex flex-row items-center py-[6px] px-1  rounded-[10px] mb-2">
              <img
                loading="lazy"
                src={lo}
                alt="discount"
                className="w-[32px] h-[32px]"
              />
              <p
                className={`${styles.paragraph} mt-3 ml-2 min-[2000px]:text-[24px]`}
              >
                <span className="text-white ">Innovative,</span> secure and
                smart ecosystem
              </p>
            </div>
            <div 
            // onClick={openModal} 
            className="relative">
              <PlayTourButton className="my-3" />
            </div>
          </div>
          <div className="heroart-sm">
            <img src={lr} alt="sm-img" />
          </div>

          <div
            className={`heroart flex-1 flex-wrap flex ${styles.flexCenter} md:my-0 my-10 relative`}
          >
            <div className="jumbotron-actions flex-wrap h-[1000px]">
              <JumboButton
                className="action top-left hover:bg-[#1A1917] "
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
                className="action bottom-left hover:bg-[#1A1917]"
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
                className="action top-right hover:bg-[#1A1917]"
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
                className="action bottom-right hover:bg-[#1A1917]"
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
                <img src={groupcoin1} alt="c-coin-gold.sg" className="w-[100px] h-[100px]"/>
              </span>
            </div>
          </div>
        </section>
      </div>
      {/* <h2 className=" text-center pb-4 font-poppins text-transparent bg-clip-text bg-gradient-to-b from-[#846424] to-[#EDC452] ">
        About Chrysus Coin (CHC) <br className="sm:block hidden" />
      </h2> */}
    </div>
  );
};

export default memo(Hero);
