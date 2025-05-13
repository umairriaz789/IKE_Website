import { memo } from "react";
import { features } from "../constants";
import styles, { layout } from "../style";
import { ExplorButton } from "./buttons";
import { JumboButton } from "./buttons/jumbo_button";
import { LeafGold } from "../assets";
import { UmbrellaGold } from "../assets";
import { SwapGold } from "../assets";
import { goldframe } from "../assets";
import { CCoinGold } from "../assets";
import { groupcoin } from "../assets";
import { groupcoin1 } from "../assets";
import {op} from "../assets"

const FeatureCard = ({ icon, title, content, index, customClassName }) => {
  const tops = ["130px", "130px", "-65px", "-65px"];
  const lefts = ["260px", "-487px", "260px", "-487px"];
  // Buy, Swap,Loan, Mint
  return (
    <div
      className={` flex-wrap flex flex-row p-6 items-center py-[6px]  
        px-4 bg-gradient-to-b from-[#151515] to-[#323232]  rounded-[16px] ${
        index !== features.length - 1 ? "mb-6" : "mb-0"
      } feature-card ${customClassName}`}
      style={{
        // background: borderColors[index],
        top: tops[index],
        left: lefts[index],
        // bottom: bottoms[index],
      }}
    >
      <div
        className={` w-[48px] h-[48px] rounded-full ${styles.flexCenter} bg-stone-900`}
        style={{
          background:
            "linear-gradient(270deg, #ac40ea 0.26%, #6b6bdf 99.99%, #bba9e7 100%),rgb(196, 196, 198)",
        }}
      >
        <img
          loading="lazy"
          src={icon}
          alt="star"
          className="w-[50%] h-[50%] object-contain"
        />
      </div>
      <div className="flex-1 flex flex-col  ml-3 mt-3">
        <h4
          id="about"
          className="font-montserrat font-semibold text-[18px] leading-[23.4px] mb-1 text-[#ac40ea]"
        >
          {title}
        </h4>
        <p className="text-justify font-poppins font-[300] text-dimWhite text-[13px] ">
          {content}
        </p>
      </div>
    </div>
  );
};

const Coin = () => (
  <section id="features" className=" flex  flex-col my-5 ">
    <div
      className={`${layout.sectionInfo}  sm:mt-0 mt-[200px] max-[376px]:mt-[100px]  `}
    >
      <h2 className=" text-center pb-4 font-poppins text-transparent bg-clip-text 
      bg-gradient-to-b from-[#ac40ea] to-[#6b6bdf] min-[1700px]:text-[52px] ">
        About Ikemba Coin (IKC) <br className="sm:block hidden" />
      </h2>
      <p
        className={`${styles.paragraph} font-poppins text-justify text-[16px] leading-[24px] max-w-[1075px]  min-[1700px]:max-w-[1500px] min-[2000px]:max-w-[1700px] min-[1700px]:text-[22px] min-[1700px]:leading-[40px] `}
      >
        Through the power of blockchain technology,
        <span className="text-[#ac40ea]">  Ikemba {""}</span> 
        aims to break barriers, promote equality, and foster sustainable growth, creating a 
        future where everyone has a voice and a chance to succeed.{" "}
        Ikemba is a decentralized platform empowering marginalized communities with <span className="text-[#ac40ea]"> AI-driven {""}</span> insights 
        and blockchain-based tools. From real-time market analytics to investment education, Ikemba bridges 
        the gap between opportunity and accessibility, fostering strength and growth for individuals worldwide.
      </p>
      <a
        target="_blank"
        href="https://medium.com/"
      >
        <ExplorButton className="my-3 mb-5 " />
      </a>
    </div>
    <div className="flex flex-col items-center lg:hidden  block">
      <div>
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.id}
            {...feature}
            index={index}
            className="w-[444px] h-[50px]"
          />
        ))}
      </div>
    </div>
    <div className="lg:block hidden  bg-[url('./assets/bg-overlay.png')]  lg:bg-contain bg-auto">
      <div
        className={` ${styles.flexCenter}
    h-[502px]  `}
      >
        <div className="  h-[203px] w-[300px] relative ">
          <div className="md:flex flex-col sm:flex-wrap">
            <div className={`${layout.sectionImg}  `}>
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.id}
                  {...feature}
                  index={index}
                  customClassName={`card-${index} absolute w-[444px] h-[120px]`}
                />
              ))}
            </div>
            <span className="action action-center ">
              <img
                src={op}
                alt="c-coin-gold.sg"
                className="h-[203px] w-[320px]"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default memo(Coin);
