import React, { useState, useEffect, useRef } from "react";
import { H4 } from "../typography/h4";
import { Dash, C, Ether } from "../../assets";
import { Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import Utils from "../../utilities";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";

const UserDashboard = () => {
  const [transaction, settransaction] = useState([]);
  const [collateralRatio, setcollateralRatio] = useState(null);
  const [liquidationRatio, setLiquidationRatio] = useState(null);
  const [daiBalance, setdaiBalance] = useState(0);
  const [chcBalance, setchcBalance] = useState(0);
  const [balance, setbalance] = useState(0);
  const [daiFeed, setDaiFeed] = useState(0);
  const [chcFeed, setChcFeed] = useState(0);
  const [ethFeed, setEthFeed] = useState(0);
  const [cdp, setCDP] = useState(0);
  const sort = 5;
  const activePag = useRef(0);
  const { address } = useWeb3ModalAccount();

  // paggination
  let paggination = Array(Math.ceil(transaction.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const paginateTransactions = (data, pageNumber, pageSize) => {
    const startIndex = pageNumber * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  };

  const currentTransactions = paginateTransactions(
    transaction,
    activePag.current,
    sort,
  );

  const handlePaginationClick = (i) => {
    activePag.current = i;
  };

  const validMethodIDs = [
    "0x26c01303",
    "0x350c35e9",
    "0xa5d5db0c",
    "0x1d7ce898",
    "0xdf133bca",
    "0xb1884744",
    "0x4b3fd148",
    "0x22867d78",
    "0x00f714ce",
    "0xa694fc3a",
    "0xc6066272",
  ];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (address) {
          const response = await fetch(
            `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=BI5FBJREUF3GEDF7Q3UTU3CFGNCE15YNMH`,
          );
          const data = await response.json();

          const transactions = data.result.filter((transaction) =>
            validMethodIDs.includes(transaction.methodId),
          );
          settransaction(transactions);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
    const intervalId = setInterval(fetchTransactions, 3000);

    return () => clearInterval(intervalId);
  }, [address]);

  useEffect(() => {
    const refreshData = async () => {
      try {
        const collateralizationData = await Utils.getCollateralizationRatio();
        setcollateralRatio((Number(collateralizationData) / 1e6).toFixed(2));

        const cdpData = await Utils.getCDPCount();
        setCDP(Number(cdpData));

        const liqRatioData = await Utils.liqRatio();
        setLiquidationRatio((Number(liqRatioData) / 1e6).toFixed(2));

        const chcFeedData = await Utils.getFeed("CHC");
        setChcFeed((Number(chcFeedData[1]) / 1e18).toFixed(2));

        const daiFeedData = await Utils.getFeed("DAI");
        setDaiFeed((Number(daiFeedData[1]) / 1e8).toFixed(2));

        const ethFeedData = await Utils.getFeed("ETH");
        setEthFeed((Number(ethFeedData[1]) / 1e8).toFixed(2));

        const daiBalanceData = await Utils.getUserBalance(address, "DAI");
        setdaiBalance(Number(daiBalanceData) / 1e18);

        const chcBalanceData = await Utils.getUserBalance(address, "CHC");
        setchcBalance(Number(chcBalanceData) / 1e18);

        const ethBalanceData = await Utils.getUserBalance(address, "ETH");
        setbalance(Number(ethBalanceData) / 1e18);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    refreshData();

    const intervalId = setInterval(refreshData, 3000);

    return () => clearInterval(intervalId);
  }, [address]);

  return (
    <div className="min-h-screen">
      <div className="row mt-4 justify-center">
        <div className="col-xl-10">
          {/* bg-gradient-to-b from-[#151515] to-[#323232] */}
          <div
            className="card"
            style={{
              backgroundImage: "linear-gradient(to bottom, #262522, #000000)",
              borderRadius: "16px",
              color: "#846424",
            }}
          >
            <div className="mt-2 text-center">
              <H4></H4>
            </div>
            <div className="card-body">
              <div className="row sp20 mb-2 align-items-center">
                <div className="col-xxl-12 d-flex flex-wrap justify-content-between align-items-center">
                  <div className="px-2 info-group  text-center">
                    <h6 className="fs-14 mb-1 font-[700] text-transparent bg-clip-text bg-gradient-to-b from-[#d6aded] to-[#ac40ea] font-montserrat">
                      Liquidation Ratio
                    </h6>
                    <h4 className="fs-20 font-w300 text-white font-poppins">
                      {liquidationRatio}%
                    </h4>
                  </div>
                  <div className="px-2 info-group text-center">
                    <h6 className="fs-14 mb-1 font-[700] text-transparent bg-clip-text bg-gradient-to-b from-[#d6aded] to-[#ac40ea]  font-montserrat">
                      Collateralization Ratio
                    </h6>
                    <h3 className="fs-20 font-w300 text-white font-poppins">
                      {collateralRatio}%
                    </h3>
                  </div>
                  <div className="px-2 info-group  text-center">
                    <h6 className="fs-14 mb-1 font-[700] text-transparent bg-clip-text bg-gradient-to-b from-[#d6aded] to-[#ac40ea]  font-montserrat">
                      Active CDPS
                    </h6>
                    <h3 className="fs-20 font-w300 text-white font-poppins">
                      {cdp} CDPs
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-5">
          <div
            className="card"
            style={{
              backgroundImage: "linear-gradient(to bottom, #262522, #000000)",
              borderRadius: "16px",
              color: "#846424",
            }}
          >
            <div className="card-body pt-4">
              <div className="w-100">
                <div className="d-flex flex-row justify-content-start align-items-center w-100">
                  <h4 className="text-transparent bg-clip-text bg-gradient-to-b from-[#d6aded] to-[#ac40ea] font-montserrat">
                    Wallet Balances
                  </h4>
                </div>
                <table
                  className="w-100"
                  style={{ borderCollapse: "separate", borderSpacing: "0.5em" }}
                >
                  <thead>
                    <tr>
                      <td>
                        <span
                          style={{ color: "#d6aded" }}
                          className="font-poppins"
                        >
                          ASSET
                        </span>
                      </td>
                      <td>
                        <span
                          style={{ color: "#d6aded" }}
                          className=" font-poppins"
                        >
                          BALANCE
                        </span>
                      </td>
                      <td>
                        <span
                          style={{ color: "#d6aded" }}
                          className="font-poppins"
                        >
                          USD
                        </span>
                      </td>
                      <td>
                        <span
                          style={{ color: "#d6aded" }}
                          className="text-white"
                        ></span>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <img src={Dash} alt="d" width={13} height={11} />
                      </td>
                      <td>
                        <div
                          className="font-poppins"
                          style={{
                            fontStyle: "normal",
                            fontWeight: "400",
                            fontSize: "12px",
                            lineHeight: "15px",
                            color: "#FFFFFF",
                          }}
                        >
                          {daiBalance.toFixed(2)}
                        </div>
                      </td>
                      <td>
                        <div
                          className="font-poppins"
                          style={{
                            fontStyle: "normal",
                            fontWeight: "400",
                            fontSize: "12px",
                            lineHeight: "15px",
                            color: "#FFFFFF",
                          }}
                        >
                          ${(daiBalance * daiFeed).toFixed(2)}
                        </div>
                      </td>
                    </tr>
                    {/* <tr>
                      <td>
                        <img src={C} alt="d" width={13} height={11} />
                      </td>
                      <td>
                        <div
                          className="font-poppins"
                          style={{
                            fontStyle: "normal",
                            fontWeight: "400",
                            fontSize: "12px",
                            lineHeight: "15px",
                            color: "#FFFFFF",
                          }}
                        >
                          {chcBalance.toFixed(2)}
                        </div>
                      </td>
                      <td>
                        <div
                          className="font-poppins"
                          style={{
                            fontStyle: "normal",
                            fontWeight: "400",
                            fontSize: "12px",
                            lineHeight: "15px",
                            color: "#FFFFFF",
                          }}
                        >
                          ${(chcBalance * chcFeed).toFixed(2)}
                        </div>
                      </td>
                    </tr> */}
                    <tr>
                      <td>
                        <img src={Ether} alt="d" width={13} height={11} />
                      </td>
                      <td>
                        <div
                          className="font-poppins"
                          style={{
                            fontStyle: "normal",
                            fontWeight: "400",
                            fontSize: "12px",
                            lineHeight: "15px",
                            color: "#FFFFFF",
                          }}
                        >
                          {balance.toFixed(2)}
                        </div>
                      </td>
                      <td>
                        <div
                          className="font-poppins"
                          style={{
                            fontStyle: "normal",
                            fontWeight: "400",
                            fontSize: "12px",
                            lineHeight: "15px",
                            color: "#FFFFFF",
                          }}
                        >
                          ${(balance * ethFeed).toFixed(2)}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-5">
          <div
            className="card"
            style={{
              backgroundImage: "linear-gradient(to bottom, #262522, #000000)",
              borderRadius: "16px",
              color: "#846424",
            }}
          >
            <div className="card-body pt-4">
              <div className="w-100">
                <div className="d-flex flex-row align-items-center justify-content-between mb-3">
                  <h4 className="m-0 text-transparent bg-clip-text bg-gradient-to-b from-[#d6aded] to-[#ac40ea] font-montserrat">
                    Price Feeds
                  </h4>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between my-2">
                  <div
                    className="font-poppins"
                    style={{
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "15px",
                      color: "#FFFFFF",
                    }}
                  >
                    DAI/USD
                  </div>
                  <div
                    className="font-poppins"
                    style={{
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "15px",
                      color: "#FFFFFF",
                    }}
                  >
                    {daiFeed} USD
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between my-2">
                  <div
                    className="font-poppins"
                    style={{
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "15px",
                      color: "#FFFFFF",
                    }}
                  >
                    IKE/USD
                  </div>
                  <div
                    className="font-poppins"
                    style={{
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "15px",
                      color: "#FFFFFF",
                    }}
                  >
                    {chcFeed} USD
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between my-2">
                  <div
                    className="font-poppins"
                    style={{
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "15px",
                      color: "#FFFFFF",
                    }}
                  >
                    ETH/USD
                  </div>
                  <div
                    className="font-poppins"
                    style={{
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "15px",
                      color: "#FFFFFF",
                    }}
                  >
                    {ethFeed} USD
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-10">
          {/* bg-gradient-to-b from-[#151515] to-[#323232] */}
          <div
            className="card"
            style={{
              backgroundImage: "linear-gradient(to bottom, #262522, #000000)",
              // backgroundImage: "linear-gradient(to bottom, #262522, #000000)",
              borderRadius: "16px",
              color: "#846424",
            }}
          >
            <div className="card-body">
              <div className="row sp20 mb-2 align-items-center">
                <div className="col-xxl-12 d-flex flex-wrap justify-content-between align-items-center">
                  <div className="flex flex-col xs:gap-0 gap-3 xs:flex-row justify-between w-100 items-center">
                    <h4 className="m-0 text-transparent bg-clip-text bg-gradient-to-b from-[#d6aded] to-[#ac40ea] font-montserrat">
                      Ikemba Rewards
                    </h4>
                    {/* <div className="flex flex-col xs:flex-row items-center gap-3"> */}
                    <h5 className="m-0 text-white">799444.00 IKE</h5>

                    <button
                      className="font-poppins font-[600] bg-gradient-to-b from-[#d6aded] to-[#ac40ea]"
                      style={{
                        color: "#000000",
                        padding: "10px 25px",
                        fontSize: "12px",
                        borderRadius: "25px",
                      }}
                    >
                      Claim Reward
                    </button>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-10">
          <div
            className="card"
            style={{
              backgroundImage: "linear-gradient(to bottom, #262522, #000000)",
              borderRadius: "16px",
              color: "#846424",
            }}
          >
            <Tab.Container defaultActiveKey="All">
              <div className="card-header border-0 pb-2 flex-wrap">
                <h4 className="text-transparent bg-clip-text bg-gradient-to-b from-[#d6aded] to-[#ac40ea] font-montserrat">
                  Recent Activity
                </h4>
              </div>
              <div className="card-body pt-0 pb-0">
                <Tab.Content>
                  <Tab.Pane eventKey="All">
                    <div className="table-responsive dataTabletrade ">
                      <div
                        id="status_wrapper"
                        className="dataTables_wrapper no-footer"
                      >
                        <table
                          id="example"
                          className="table display dataTable no-footer"
                          style={{ minWidth: "845px" }}
                        >
                          <thead>
                            <tr
                              className="text-white"
                              style={{ textAlign: "center" }}
                            >
                              <th className="text-[#d6aded] font-poppins">
                                Date
                              </th>
                              <th className="text-[#d6aded] font-poppins">
                                Action
                              </th>
                              <th className="text-[#d6aded] font-poppins">
                                Transaction
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-white">
                            {currentTransactions.length == 0 ? (
                              <tr className="text-[#d6aded]">Loading...</tr>
                            ) : (
                              ""
                              // currentTransactions.map((item, index) => (
                              //   <tr key={index} style={{ textAlign: "center" }}>
                              //     <td>
                              //       {new Date(
                              //         item.timeStamp * 1000,
                              //       ).toDateString()}
                              //     </td>
                              //     <td>
                              //       {item.methodId == 0x26c01303 ? (
                              //         <a>Liquidity</a>
                              //       ) : item.methodId == 0x350c35e9 ? (
                              //         <a>WithdrawCollateral</a>
                              //       ) : item.methodId == 0xa5d5db0c ? (
                              //         <a>DepositCollateral</a>
                              //       ) : item.methodId == 0x1d7ce898 ? (
                              //         <a>ProposeVote</a>
                              //       ) : item.methodId == 0xb1884744 ? (
                              //         <a>Lend</a>
                              //       ) : item.methodId == 0x4b3fd148 ? (
                              //         <a>Borrow</a>
                              //       ) : item.methodId == 0x22867d78 ? (
                              //         <a>Repay</a>
                              //       ) : item.methodId == 0x00f714ce ? (
                              //         <a>Withdraw</a>
                              //       ) : item.methodId == 0xa694fc3a ? (
                              //         <a>Stake</a>
                              //       ) : item.methodId == 0xc6066272 ? (
                              //         <a>WithdrawStake</a>
                              //       ) : (
                              //         <></>
                              //       )}
                              //     </td>
                              //     <td>
                              //       <Link
                              //         className="tranlink"
                              //         to={`https://sepolia.etherscan.io/tx/${item.blockHash}`}
                              //         target="_blank"
                              //         style={{
                              //           textDecorationLine: "underline",
                              //         }}
                              //       >
                              //         More details
                              //       </Link>
                              //     </td>
                              //     <td></td>
                              //   </tr>
                              // ))
                            )}
                          </tbody>
                        </table>
                        <div className="d-sm-flex text-white text-center justify-content-between align-items-center mt-3 mb-3">
                          <div className="dataTables_info">
                            Showing{" "}
                            {transaction.length === 0
                              ? 0
                              : `${activePag.current * sort + 1} - ${Math.min(
                                  (activePag.current + 1) * sort,
                                  transaction.length,
                                )}`}{" "}
                            of {transaction.length} entries
                          </div>
                          <div
                            className="dataTables_paginate paging_simple_numbers mb-0"
                            id="application-tbl1_paginate"
                          >
                            <Link
                              className="paginate_button previous text-white mt-2"
                              onClick={() =>
                                activePag.current > 0 &&
                                handlePaginationClick(activePag.current - 1)
                              }
                            >
                              <i>
                                <svg
                                  className="rounded-sm bg-[white]"
                                  style={{
                                    width: "15px",
                                    height: "15px",
                                    marginTop: "14",
                                    marginLeft: "8px",
                                  }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                >
                                  <path d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z" />
                                </svg>
                              </i>
                            </Link>
                            <span className="text-white">
                              <Link style={{ fontSize: "10px" }}>
                                {activePag.current + 1}
                              </Link>
                            </span>

                            <Link
                              className="paginate_button next text-white mt-2"
                              onClick={() =>
                                activePag.current + 1 < paggination.length &&
                                handlePaginationClick(activePag.current + 1)
                              }
                            >
                              <i>
                                <svg
                                  className="rounded-sm bg-[white]"
                                  style={{
                                    width: "15px",
                                    height: "15px",
                                    marginTop: "14",
                                    marginLeft: "8px",
                                  }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                >
                                  <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z" />
                                </svg>
                              </i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Tab.Container>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserDashboard;
