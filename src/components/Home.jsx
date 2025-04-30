import React, { useState, Suspense, lazy } from "react";
import styles from "../style";
import Navbar from "./Navbar";
import SwapPopup from "./SwapPopup";
import SwapSection from "./SwapSection";
import AiComponent from "./AiComponent";
import Code from "./Code";
// import SwapWidgets from "./SwapWidgets";

const Hero = lazy(() => import("./Hero"));
const Coin = lazy(() => import("./Coin"));
const Ecosystem = lazy(() => import("./Ecosystem"));
const FeatureBlog = lazy(() => import("./FeatureBlog"));
const Community = lazy(() => import("./Community"));
const Footer = lazy(() => import("./Footer"));

const Home = () => {
  return (
    <div>
      <div className={`${styles.paddingXX} ${styles.flexCenter}`}>
        <Navbar />
      </div>
      <div>
        <Suspense>
          <Hero />
        </Suspense>
      </div>
      <div className={`${styles.paddingXX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Suspense>
            <Coin />
          </Suspense>
          <Suspense>
            <Code/>
          </Suspense>
          <Suspense>
            <AiComponent />
          </Suspense>
          <Suspense>
            <Ecosystem />
          </Suspense>
          <Suspense>
            <SwapSection />
          </Suspense>
          <Suspense>
            <Community />
          </Suspense>
          <Suspense>
            <FeatureBlog />
          </Suspense>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
