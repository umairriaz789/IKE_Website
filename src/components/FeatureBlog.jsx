import React, { useState } from "react";
import { Link } from "react-router-dom";
import { postblog, pic1, SendDarkIcon, bl } from "../assets";
import { useWindowSize } from "../hooks";
import { PrimaryGradientButton } from "../components/buttons";
import { ReadButton } from "./buttons";
import SuccessfulSubscription from "./SuccessfulSubscription";
import ValidationPopup from "./Dashboard/ValidationPopup";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../helpers/firebase";

const blocardList = [
  { image: bl, image2: bl, title: "Featured Blog" },
];

const FeatureBlog = () => {
  const [width, height] = useWindowSize();
  const [email, setEmail] = useState("");
  const [isSubscribe, setIsSubscribe] = useState(false);

  const storeEmail = async () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
      try {
        const docRef = await addDoc(collection(db, "emails_app"), {
          email: email,
        });
        //console.log("Document written with ID: ", docRef.id);
        document.getElementById("email-input").value = "";
        setIsSubscribe(true);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      alert("Please enter a valid email");
    }
  };

  return (
    <div className=" bg-[url('./assets/bg-overlay.png')] lg:bg-contain bg-auto sm:px-5">
      <div id="blog" className="page-content ">
        <section className="content-inner w-[100%] mx-auto xl:max-w-[70%] min-[2000px]:max-w-[78%] xl:mx-auto ">
          <div className=" flex  max-[800px]:flex-col max-[800px]:items-center gap-3 justify-center  ">
            <div className="sm:w-[50%] xl:w-[100%] flex items-center justify-between ">
              <div className="flex flex-col w-[100%]">
                <h1 className="text-white leading-[32px] font-[600] text-[24px] font-poppins">
                  Subscribe
                </h1>
                <p className="text-white font-[300] text-[16px] leading-[24px] font-poppins">
                  Enter your email below for the latest blogs and news
                </p>
                <div className="max-w-[487px] w-[100%]    flex items-center justify-between border border-yellow-500 rounded-full bg-transparent p-2">
                  <input
                    type="email"
                    id="email-input"
                    placeholder="Email"
                    className="outline-none border-none pl-4 font-poppins font-light text-base text-white bg-transparent flex-grow"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {width <= 460 ? (
                    <PrimaryGradientButton
                      className="text-uppercase"
                      onClick={storeEmail}
                    >
                      <img src={SendDarkIcon} alt="send-dark.svg" />
                    </PrimaryGradientButton>
                  ) : (
                    <>
                      <PrimaryGradientButton
                        className="text-uppercase font-poppins"
                        onClick={storeEmail}
                      >
                        Subscribe
                      </PrimaryGradientButton>
                      {isSubscribe && <SuccessfulSubscription />}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:w-[50%]  xl:w-[100%] lg:mr-8  ">
              <div className="flex flex-col  lg:items-end xl:items-center min-[2000px]:items-end space-y-8">
                {blocardList.map((item, index) => (
                  <div className="mb-8" key={index}>
                    <div className="dz-card max-w-[596px] w-[100%] style-1 flex lg:flex-row flex-col gap-3 items-center bg-gradient-to-b from-[#151515] to-[#323232] p-4 rounded-lg ">
                      <div className="dz-media">
                        <Link to="#">
                          <img
                            src={item.image}
                            alt=""
                            className="rounded-lg max-h-[190px] max-w-[190px]"
                          />
                        </Link>
                      </div>
                      <div className="flex flex-col gap-[5px]">
                        <h4 className="text-[#ac40ea] text-2xl font-semibold  ">
                          <Link to="#" className="">
                            {item.title}
                          </Link>
                        </h4>
                        <p className="text-white text-base leading-6 font-poppins">
                          Ethereum, and other digital currencies to create a
                          secure, fast, and reliable digital asset for global
                          payments.
                        </p>
                        <span className="text-[#ac40ea] mb-2 leading-[12.19px] text-[12px] font-[600] font-poppins">
                          7 April, 2022
                        </span>
                        <div>
                          <a
                            style={{ color: "#ac40ea" }}
                            target="_blank"
                            href="https://medium.com/"
                          >
                            <ReadButton text="Read More" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FeatureBlog;
