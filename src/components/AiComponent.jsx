import { airobo, ex } from "../assets";
import { memo } from "react";
import styles, { layout } from "../style";
import { ReadButton } from "./buttons";
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";

const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
const FadeUp = batch(Fade(), Move(), Sticky());

const AiComponent = () => (

    <div className="bg-[url('./assets/bg-overlay.png')] lg:bg-contain bg-auto  sm:px-7  ">
        <section
            id="product"
            className="flex gap-5 max-[900px]:flex-col min-[2000px]:px-[150px] min-[2200px]:px-[200px]  min-[2400px]:px-[280px] min-[2000px]:justify-between justify-center items-center"
        >
            {/* <div
        className={`w-100 max-w-[582px] flex flex-col align-items-start py-[6px] px-4 bg-gradient-to-b from-[#151515] to-[#323232] rounded-[12px] min-[650px]:mb-3  `}
      >
        <p className={`${styles.paragraph} leading-[24px] text-[16px] mt-5 `}>
          The <span className="text-[#ac40ea]">Ikemba ecosystem</span> is a
          blockchain-based financial infrastructure. It utilizes{" "}
          <span className="text-[#ac40ea]"> Ikemba Protocols</span> to create a
          secure, transparent, and efficient system for exchanging digital
          assets and fiat currency. The Ikemba coin ecosystem is powered by{" "}
          <span className="text-[#ac40ea]">Chrysus tokens</span>, which govern
          the network, incentivize user engagement, and facilitate transactions
          within the platform.
        </p>
        <a
          style={{ color: "#846424" }}
          target="_blank"
          href="https://medium.com/"
        >
          <ReadButton
            text="Explore More"
            className="my-3 mb-5  border-0 lowercase"
          />
        </a>
      </div> */}
            <ScrollContainer>
                <ScrollPage>
                    <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
                        <span style={{ fontSize: "30px" }} className="font-poppins">Intelligence for Your Tokenized Assets</span>
                    </Animator>
                </ScrollPage>
                <ScrollPage>
                    <Animator animation={ZoomInScrollOut}>
                        <span style={{ fontSize: "30px" }}className="font-poppins">Smart Insights, Smarter Investments</span>
                    </Animator>
                </ScrollPage>
                <ScrollPage>
                    <Animator animation={FadeUp}>
                        <Animator animation={MoveIn(-1000, 0)}>
                            <p className={`${styles.paragraph} leading-[24px] text-[20px] mt-5 font-poppins`}>
                                The <span className="text-[#ac40ea]">Blockchain-based</span>
                                {""} tokenization of real-world assets—like real estate—offers 
                                unprecedented liquidity, transparency, and global access. However, the complexity 
                                of due diligence, valuation, and market dynamics can be daunting.
                            </p>
                        </Animator>
                        <Animator animation={MoveIn(1000, 10)}>
                            <p className={`${styles.paragraph} leading-[24px] text-[20px] font-poppins`}>
                            AI agents are emerging as a key component, facilitating seamless execution, 
                            decision-making, and compliance in decentralized finance (DeFi) and 
                            Real-World Asset (RWA) tokenization. With AI's growing role in predictive modeling, 
                            fraud detection, liquidity optimization, and smart contract automation, the future 
                            of asset management is set for unprecedented efficiency and innovation.
                            </p>
                        </Animator>
                        - Ikemba AI Agent -
                        <Animator animation={MoveOut(1000, 0)}>AI-Driven Robo-Advisors</Animator>
                        <Animator animation={MoveOut(-1000, 0)}>
                            <a
                                style={{ color: "#846424" }}
                                target="_blank"
                                href="https://medium.com/"
                            >
                                <ReadButton
                                    text="Explore More"
                                    className="my-3 mb-5  border-0 lowercase"
                                />
                            </a>
                        </Animator>
                        {/* <img
                            loading="lazy"
                            src={airobo}
                            alt="Ecosystem"
                            className="relative z-[5] min-[900px] max-[1100px]:w-[400px]  w-[340px] h-[340px]"
                        /> */}
                        {/* <span style={{ fontSize: "40px" }}>I'm FadeUp ⛅️</span> */}
                    </Animator>
                </ScrollPage>
                {/* <ScrollPage>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} >
                        <span style={{ fontSize: "40px" }}>
                            <img
                                loading="lazy"
                                src={airobo}
                                alt="Ecosystem"
                                className="relative z-[5] min-[900px] max-[1100px]:w-[400px]  w-[340px] h-[340px]"
                            />
                        </span>
                    </div>
                </ScrollPage> */}
                {/* <ScrollPage>
                    <Animator animation={batch(Fade(), Sticky())}>
                        <span style={{ fontSize: "40px" }}>Done</span>
                        <br />
                        <span style={{ fontSize: "30px" }}>
                            There's FadeAnimation, MoveAnimation, StickyAnimation, ZoomAnimation
                        </span>
                    </Animator>
                </ScrollPage> */}
            </ScrollContainer>
            <img
                loading="lazy"
                src={airobo}
                alt="Ecosystem"
                className="relative z-[5] min-[900px] max-[1100px]:w-[400px]  w-[340px] h-[340px]"
            />
            {/* </div> */}
        </section>
    </div>
);

export default memo(AiComponent);
