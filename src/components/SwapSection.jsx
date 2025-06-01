import { apple, google, EcosystemImage2, ex } from "../assets";
import { memo } from "react";
import styles, { layout } from "../style";
import { ReadButton } from "./buttons";
import SwapingCard from "./SwapingCard";

const SwapSection = () => (
  <div className="bg-[url('./assets/bg-overlay.png')] lg:bg-contain bg-auto  sm:px-1  mt-5">
    <section
      id="product"
      className="flex gap-5 max-[900px]:flex-col min-[2000px]:px-[150px] min-[2200px]:px-[200px]  min-[2400px]:px-[280px] min-[2000px]:justify-between justify-center items-center"
    >
      <div
        className={`w-100 max-w-[582px] flex flex-col align-items-start py-[6px] px-4 bg-gradient-to-b from-[#151515] to-[#323232] rounded-[12px] min-[650px]:mb-3  `}
      >
        <p className={`${styles.paragraph} leading-[24px] text-[16px] mt-5 `}>
          Emerging <span className="text-[#ac40ea]">Technologies</span> Safiah Protocols to 
          create a secure, transparent, and efficient system for{" "}
          <span className="text-[#ac40ea]"> exchanging digital assets</span> 
          and fiat currency. The IKE coin ecosystem is powered by <span className="text-[#ac40ea]">Ikemba tokens</span>, 
          which govern the network, incentivize user engagement, and 
          facilitate transactions within the platform.
        </p>
        <a
          style={{ color: "#846424" }}
          target="_blank"
          // href="https://medium.com/"
        >
          <ReadButton
            text="Explore More"
            className="my-3 mb-5  border-0 lowercase"
          />
        </a>
      </div>
      <div 
      className={layout.sectionImgReverse}
      >
      <SwapingCard/>
      </div>
    </section>
  </div>
);

export default memo(SwapSection);





