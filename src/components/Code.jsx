import {apivector} from "../assets";
import styles from "./nerocoin.module.css";
// import Container from "../ui/Container.tsx";
import CodeWriter from "./CodeWriter";

const Container = ({ children, classes }) => {
    const { root = "" } = classes || {};
    return (
      <div
        className={`max-w-[95vw] md:max-w-[90vw] 2xl:max-w-[1280px] mx-auto ${root}`}
      >
        {children}
      </div>
    );
  };

export default function Code() {
  return (
    // bg-[#1c1c1c] 
    // <div className="md:py-20 py-10 text-white bg-[#437a45]">
      <Container
        classes={{
          root: "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-5 xl:gap-10 items-center",
        }}
      >
        <div className="">
          <p className="font-montserrat leading-7 xss:leading-8 xs:leading-[2.25rem] xl:leading-none text-[1.35rem] xss:text-2xl xs:text-[28px] sm:text-4xl md:text-[42px] xl:text-5xl xs:mb-5 mb-3">
           Emerging{" "}
            <span className={styles["sub-nerocoines"]}>Technologies</span> and
            <br className="hidden sm:block lg:hidden" /> Markets to Arbitrium & Web3
          </p>
          <p className=" font-poppins text-xs sm:text-sm md:text-base lg:text-lg w-[90%]">
          IKEMBA Protocols to create a secure, transparent, and efficient system for exchanging 
          digital assets and fiat currency. The Ikemba coin ecosystem is powered by IKE tokens, which govern 
          the network, incentivize user engagement, and facilitate transactions within the platform.
          </p>
          <button className={styles["api-button font-poppins"]}>
            Explore More <img src={apivector} alt="API Vector" />
          </button>
        </div>

        <CodeWriter />
      </Container>
    // </div>
  );
}
