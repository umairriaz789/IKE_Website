import React from "react";
import styles from "../style";
import { brightlogo, logos } from "../assets";
import { memo } from "react";
import { footerLinks, socialMedia } from "../constants";

const Footer = () => (
  <section
    className={`${styles.flexCenter} flex-col rounded-t-xl py-4 px-[80px] bg-gradient-to-t from-[#151515] to-[#323232] `}
  >
    <div className={`${styles.flexStart} md:flex-row flex-col w-full`}>
      <div className="flex-1 flex flex-col justify-start  mt-3 ">
        <img
          src={logos}
          alt="hoobank"
          className="w-[137px]  h-[33px] object-contain"
        />
        {/* lg:w-[380px] w-[220px] */}
        <div className="border-t-[1px] border-t-[#ac40ea] w-[100%] max-w-[380px] flex flex-wrap  mt-[20px]">
          <p
            className={`${styles.paragraph} mt-3  font-poppins text-[14px]`}
          >
            Engineered with excellence by <b> Ikemba AI Based Platform</b>
          </p>
        </div>
      </div>

      <div className="flex-[1.5px] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10 ">
        {footerLinks.map((footerLink, index) => (
          <div
            key={footerLink.title} // or key={index}
            className="flex flex-col ss:my-0 my-4 min-w-[150px]"
          >
            <h4 className="font-poppins font-[500] text-[14px] leading-[16px] text-[#ac40ea]">
              {footerLink.title}
            </h4>
            <ul className="list-none mt-2">
              {footerLink.links.map((link, linkIndex) => (
                <li
                  key={linkIndex}
                  className={`font-poppins font-[400] text-[14px] leading-[16px] opacity-[50%] text-[#FFFFFF] hover:text-[#ac40ea] cursor-pointer ${
                    linkIndex !== footerLink.links.length - 1 ? "mb-3" : "mb-0"
                  }`}
                >
                  <a
                    href={link.path}
                    // target={link.path.startsWith("http") ? "_blank" : ""}
                    // target="_blank"
                  >
                    {link.image ? (
                      <img
                        src={link.image}
                        alt={link.name}
                        className={`
                           w-[76px]  
                        `}
                      />
                    ) : (
                      link.name
                    )}{" "}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="w-full flex justify-between items-center md:flex-row flex-col py-6 border-t-[1px] border-t-[#ac40ea]">
      <p className="font-poppins font-normal text-center text-[14px] leading-[25.07px] text-white mb-0 opacity-[70%]">
        Copyright Ⓒ 2025 - 2027 <span className="text-[#ac40ea]"> Ikemba</span>
        , All Rights Reserved.
      </p>
      <div className="flex flex-row md:mt-0 mt-6">
        {socialMedia.map((social, index) => (
          <a href={social.link} target="_blank">
            <img
              key={social.id}
              src={social.icon}
              alt={social.id}
              className={`w-[21px] h-[21px] opacity-[50%] object-contain cursor-pointer ${
                index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
              }`}
            />
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default memo(Footer);
