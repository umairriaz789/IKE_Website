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
                            <p className={`${styles.paragraph} font-poppins xss:text-2xl xs:text-[20px] sm:text-4xl md:text-[18px] xl:text-1xl xs:mb-5 mb-3`}>
                                The <span className="text-[#ac40ea]">Blockchain-based</span>
                                {""} tokenization of real-world assets—like real estate—offers 
                                unprecedented liquidity, transparency, and global access.
                            </p>
                        </Animator>
                        <Animator animation={MoveIn(1000, 10)}>
                            <p className={`${styles.paragraph} font-poppins xss:text-2xl xs:text-[20px] sm:text-4xl md:text-[18px] xl:text-1xl xs:mb-5 mb-3`}>
                            AI agents are emerging as a key component, facilitating seamless execution, 
                            decision-making, and compliance in decentralized finance (DeFi) and 
                            Real-World Asset (RWA) tokenization.
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
