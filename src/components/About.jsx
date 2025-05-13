import React from "react";
import styles from "../style";
import { mapVideo, GIFMap, Picture } from "../assets";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { H4 } from "./typography/h4";
import { ReadButton } from "./buttons";

const About = () => {
  return (
    <div className="bg-[url('./assets/bg-overlay.png')] lg:bg-contain bg-auto">
      <div className={`${styles.paddingXX} ${styles.flexCenter} `}>
        {/* <div className={`${styles.boxWidth}`}> */}
        <Navbar />
      </div>
      {/* </div> */}
      <div className="container">
        <div>
          <div className={`${styles.boxWidth}`}>
            <H4>
              <h1
                className="text-[32px] leading-[32px] font-[600] text-center font-montserrat mt-[70px] mb-[50px]"
                style={{ color: "#ac40ea" }}
              >
                About Us
              </h1>
            </H4>
            <div style={{
              fontFamily:"Arial", margin:"0", padding:"0"
              }}>

              {/* <div style={{
                maxWidth:"800px", margin:"40px"
                max-width: 800px; margin: 40px auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); padding: 40px;

              }}> */}

                <h1
                style={{fontSize:"2.5rem", color:"#55465e", fontWeight:"bold", marginBottom:"12px"}} 
                >
                  Empowering the Future of Real Assets with Blockchain &amp; AI
                </h1>

                <p
                style={{fontSize:"1.15rem", color:"#c4c4c4", marginBottom:"24px", lineHeight:"1.7"}} 
                >
                  At <span 
                  style={{color:"#c4c4c4", fontWeight:"600"}}
                  >Ikemba</span>, we are revolutionizing how people invest in and interact with real-world assets. Leveraging the power of 
                  <span 
                  style={{fontWeight:"600", color:"#c4c4c4"}}
                  > Blockchain technology</span> and 
                  <span 
                  style={{fontWeight:"600", color:"#c4c4c4"}}
                  > Artificial intelligence</span>,
                   our platform bridges the gap between traditional real estate markets and the digital future, 
                   making real asset investments accessible, transparent, and efficient for everyone.
                </p>

                <h2 
                style={{fontSize: "1.6rem", color: "#55465e", marginTop: "36px", marginBottom: "12px", borderBottom: "2px solid", paddingBottom: "4px"}}>
                  Our Core Services
                </h2>

                <ol style={{paddingLeft: "20px", color: "#55465e", marginBottom: "30px"}}>
                  <li style={{marginBottom: "16px"}}>
                    <span style={{fontSize: "1.2rem", fontWeight: "bold"}}>Real Assets Tokenization</span>
                    <p style={{color: "#c4c4c4", fontSize: "1rem", marginTop: "8px"}}>
                      We transform real estate and other tangible assets into easily tradable digital tokens. By tokenizing real estate, we lower the barriers to entry, allowing investors from around the globe to own fractional shares of premium properties. Our process ensures:
                    </p>
                    <ul style={{color: "#555", fontSize: "1rem", marginTop: "6px", marginBottom: "10px"}}>
                      <li>Full compliance with regulatory standards,</li>
                      <li>Secure, immutable records on the blockchain,</li>
                      <li>Enhanced liquidity and flexible investment options.</li>
                    </ul>
                  </li>
                  <li style={{marginBottom: "16px"}}>
                    <span style={{fontSize: "1.2rem", fontWeight: "bold"}}>AI-Powered Advisor</span>
                    <p style={{color: "#c4c4c4", fontSize: "1rem", marginTop: "8px"}}>
                      Navigating real asset investments can be complex. Our AI Advisor simplifies this journey for both buyers and sellers by:
                    </p>
                    <ul style={{color: "#555", fontSize: "1rem", marginTop: "6px", marginBottom: "10px"}}>
                      <li>Offering personalized recommendations based on user preferences and market trends,</li>
                      <li>Automating due diligence, property analysis, and valuation,</li>
                      <li>Facilitating transparent and data-driven decision making,</li>
                      <li>Guiding users step-by-step, from discovery to transaction.</li>
                    </ul>
                  </li>
                  <li>
                    <span style={{fontSize: "1.2rem", fontWeight: "bold"}}>Peer-to-Peer (P2P) Marketplace</span>
                    <p style={{color: "#c4c4c4", fontSize: "1rem", marginTop: "8px"}}>
                      Our decentralized marketplace connects buyers and sellers directly, eliminating middlemen and reducing costs. Key features include:
                    </p>
                    <ul style={{color: "#555", fontSize: "1rem", marginTop: "6px"}}>
                      <li>Secure, smart contract-driven transactions,</li>
                      <li>Real-time listings and transparent offers,</li>
                      <li>Community governance and dispute resolution,</li>
                      <li>Direct communication and negotiation tools for users.</li>
                    </ul>
                  </li>
                </ol>

                <h2 style={{fontSize: "1.6rem", color: "#55465e", marginTop: "36px", marginBottom: "12px", borderBottom: "2px solid #e8f0fc", paddingBottom: "4px"}}>
                  Our Mission
                </h2>
                <p style={{fontSize: "1.1rem", color: "#c4c4c4", lineHeight: "1.7"}}>
                  We believe in democratizing access to high-value real assets and creating a more inclusive financial ecosystem. By combining 
                  <span style={{fontWeight: "600", color: "#c4c4c4"}}> Blockchain’s security</span> with 
                  <span style={{fontWeight: "600", color: "#c4c4c4"}}> AI’s intelligence</span>, 
                  we empower individuals and institutions to unlock new opportunities in real estate and 
                  beyond—safely, transparently, and efficiently.
                </p>

              {/* </div> */}
            </div>
            <div className="my-5 flex justify-center">
              <ReadButton text="Explore Technology" />
            </div>
            {/* <H4>
              <p
                className="text-center font-montserrat lg:mt-[100px] mt-[50px]  mb-[30px]"
                style={{
                  fontWeight: "700",
                  fontSize: "32px",
                  lineHeight: "32px",
                  color: "#846424",
                }}
              >
                Our Roadmap
              </p>
            </H4>
            <div className="my-5 flex justify-center">
              <img src={Picture} alt="picture.png" />
              <video controls>
                <source src={GIFMap} type="video/gif" />
              </video>
            </div> */}
          </div>
        </div>
      </div>
      <div className={`bg-black   ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default About;
