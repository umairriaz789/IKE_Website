import styles from "../style";
import {Play} from "../assets";
import { memo } from "react";

const GetStarted = () => (
  <div className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-yellow-500 p-[2px] cursor-pointer`}>
    <div className={`${styles.flexCenter} flex-col bg-black w-[100%] h-[100%] rounded-full`}>
      <div className={`${styles.flexStart} flex-row`}>
        <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
          <span className="text-gradient">PLAY</span>
        </p>
        <img loading="lazy" src={Play} alt="arrow-up" className=" ml-1 w-[23px] h-[23px] object-contain" />
      </div>
      
      <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
        <span className="text-gradient">TOUR</span>
      </p>
    </div>
  </div>
);

export default memo(GetStarted);
