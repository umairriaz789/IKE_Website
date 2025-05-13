import React from "react";
import styles from "../style";
import { mapVideo, GIFMap, Picture } from "../assets";
import Navbar from "./Navbar";
import Footer from "./Footer";
import VcardComingSoon from "./VCards/VcardComingSoon";

const Ai = () => {
    return (
        <div className="bg-[url('./assets/bg-overlay.png')] lg:bg-contain bg-auto">
            <div className={`${styles.paddingXX} ${styles.flexCenter} `}>
                <Navbar />
            </div>
            <div className="container">
                <>
                    <VcardComingSoon />
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

export default Ai;
