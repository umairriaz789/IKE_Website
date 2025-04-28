import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { close, brightlogo, menu, newWallet, logos} from "../assets";
import { navLinks } from "../constants";
import Pdf from "../assets/pdf/whitepaper.pdf";
import { Button } from "react-bootstrap";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers5/react";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setToggle(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="mt-2  relative lg:px-[90px] py-3 rounded-md w-[1372px]">
      <div className="absolute opacity-[0.1] inset-0 lg:bg-gradient-to-r from-[#bd8831] bg-[none] via-[#ffb842] to-[#ffb842] via-[#000000] to-[#bd8831] rounded-5"></div>
      <nav className="relative w-full  flex flex-row  items-center  lg:py-6 py-2 justify-between overflow-hidden lg:items-center ">
        <div>
          <Link to="/">
            <img
              src={logos}
              alt="hoobank"
              className="w-[137px] h-[33px]"
              onClick={() => setToggle(false)}
            />
          </Link>
        </div>
        <div>
          <ul className="list-none  sm:flex hidden flex-row gap-[1px] justify-between items-center flex-1 ">
            <li
              className={
                "leading-[16px] font-[400] text-[14px] font-poppins mr-4 cursor-pointer"
              }
              style={{ marginLeft: "35px" }}
            >
              <NavLink
                onClick={() => setActive("About")}
                className={`${active === "About" ? "" : "text-slate-50"}`}
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li
              className={
                "leading-[16px] font-[400] text-[14px] font-poppins mr-4  cursor-pointer"
              }
              style={{ marginLeft: "35px" }}
            >
              <NavLink
                onClick={() => setActive("Services")}
                className={`${active === "Services" ? "" : "text-slate-50"}`}
                to="/"
              >
                Services
              </NavLink>
            </li>
            <li
              className={
                "leading-[16px] font-[400] text-[14px] font-poppins mr-4  cursor-pointer"
              }
              style={{ marginLeft: "35px" }}
            >
              <NavLink
                onClick={() => setActive("Governance")}
                className={`${active === "Governance" ? "" : "text-slate-50"}`}
                to="/"
              >
                Governance
              </NavLink>
            </li>
            <li
              className={
                "leading-[16px] font-[400] text-[14px] font-poppins mr-4  cursor-pointer "
              }
              style={{ marginLeft: "35px" }}
            >
              <NavLink
                onClick={() => setActive("FAQ")}
                className={`${active === "FAQ" ? "" : "text-slate-50"}`}
                to="/"
              >
                FAQ
              </NavLink>
            </li>
            <li
              className="leading-[16px] font-[400] text-[14px] font-poppins mr-4  cursor-pointer text-slate-50"
              style={{ marginLeft: "35px" }}
              href="#"
              // onClick={() => window.open(Pdf)}
            >
              WhitePaper
            </li>

            {address != undefined ? (
              <li className="leading-[16px] font-[400] text-[14px] ml-4 font-poppins cursor-pointer ">
                <NavLink
                  onClick={() => setActive("Dashboard")}
                  className={`${active === "Dashboard" ? "" : "text-slate-50"}`}
                  to="/accounts"
                >
                  Dashboard
                </NavLink>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>

        <div>
          <div>
            <li
              style={{ marginLeft: "45px" }}
              className={`sub-menu-down md:block hidden`}
              id="menushow"
            >
              <Button
                style={{
                  // backgroundColor: "#1A1917",
                  borderRadius: "40px",
                  color: "#ac40ea",
                }}
                onClick={() => open()}
                className={`${
                  isConnected ? "w-{155px}" : "w-[133px]"
                } h-[36px]  font-medium bg-[transparent] hover:bg-[#1A1917]
                rounded-[50px] text-sm  text-center inline-flex items-center`}
              >
                <a
                  style={{
                    fontStyle: "normal",
                    fontWeight: "700",
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "#ac40ea",
                  }}
                >
                  {isConnected == true
                    ? address?.substring(0, 6) +
                      "..." +
                      address?.substring(address.length - 4)
                    : "Connect"}
                </a>{" "}
                <img src={newWallet} alt="wallets" className="w-[25px] ml-2" />
              </Button>
            </li>
          </div>
          <div className="gap-4   flex flex-1 justify-end items-center cursor-pointer">
            {/*wallet  sm-button */}
            <li className={` sub-menu-down md:hidden block`} id="menushow">
              <Button
                style={{
                  // backgroundColor: "#1A1917",
                  borderRadius: "40px",
                  color: "#ac40ea",
                  fontSize: isConnected ? "10px" : "inherit",
                }}
                onClick={() => open()}
                className={`h-[36px]  p-0 font-medium bg-[transparent] hover:bg-[#1A1917]
                rounded-[50px]  text-sm  text-center inline-flex items-center ${
                  isConnected ? "w-[90px] ml-3" : "w-[36px]"
                }`}
              >
                {/* <a
              style={{
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "12px",
                lineHeight: "16px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#EDC452",
              }}
            >
              
            </a>{" "} */}
                {isConnected == true ? (
                  address?.substring(0, 6) +
                  "..." +
                  address?.substring(address.length - 4)
                ) : (
                  <img
                    src={newWallet}
                    alt="wallets"
                    className="w-[16px] h-[16px]"
                  />
                )}
              </Button>
            </li>

            <div className="sm:hidden">
              <Button
                style={{
                  // backgroundColor: "#1A1917",
                  borderRadius: "40px",
                  color: "#ac40ea",
                }}
                className=" h-[36px] w-[36px] p-0 font-medium bg-[transparent] hover:bg-[#1A1917]
                rounded-[50px] text-sm  text-center inline-flex items-center"
              >
                <img
                  src={toggle ? close : menu}
                  alt="menu"
                  className="w-[16px] h-[16px] object-contain"
                  onClick={() => setToggle((prev) => !prev)}
                />
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <div>
        {toggle && (
          <div className="flex justify-end relative inline-block top-full  right-0 z-[100] overflow-hidden">
            <div className=" p-3 bg-black-gradient relative  z-[100] w-[300px] right-0 mx-4 my-2 min-w-[300px] rounded-lg sidebar">
              <ul className="list-none  flex  justify-end items-center flex-1 flex-col">
                {navLinks.map((nav, index) => (
                  <li
                    key={nav.path}
                    className={`font-poppins text-[#ac40ea] font-medium cursor-pointer text-[16px] ${
                      active === nav.name ? "text-white" : "text-[#ac40ea]"
                    } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                    onClick={() => setActive(nav.name)}
                  >
                    <NavLink to={nav.path} onClick={() => setToggle(false)}>
                      {nav.name}
                    </NavLink>
                  </li>
                ))}
                <li
                  className="text-[#ac40ea] text-[16px] font-poppins cursor-pointer"
                  style={{ marginTop: "20px" }}
                  onClick={() => window.open(Pdf)}
                >
                  WhitePaper
                </li>
                {address !== undefined && (
                  <li
                    style={{ marginTop: "20px" }}
                    className="text-[#ac40ea] text-[16px] font-poppins cursor-pointer"
                  >
                    <NavLink to="/" onClick={() => setToggle(false)}>
                      Dashboard
                    </NavLink>
                  </li>
                )}
                {/* <li
                  style={{ marginTop: "20px", zIndex: "1" }}
                  className="sub-menu-down"
                >
                  <Button
                    style={{ borderRadius: "40px", color: "#EDC452" }}
                    onClick={() => open()}
                    className="h-[36px] w-[133px] font-medium bg-[transparent] hover:bg-[#1A1917] rounded-[50px] text-sm text-center inline-flex items-center"
                  >
                    <a
                      style={{
                        fontStyle: "normal",
                        fontWeight: "700",
                        fontSize: "12px",
                        lineHeight: "16px",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        color: "#EDC452",
                      }}
                    >
                      {isConnected
                        ? `${address?.substring(0, 6)}...${address?.substring(
                            address.length - 4
                          )}`
                        : "Connect"}
                    </a>{" "}
                    <img
                      src={newWallet}
                      alt="wallets"
                      className="w-[25px] ml-2"
                    />
                  </Button>
                </li> */}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
