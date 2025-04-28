import React from "react";
import { Link } from "react-router-dom";
import { Tab } from "react-bootstrap";
import { useEffect, useState } from "react";
import Utils from "../../utilities";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";

export const Borrow = () => {
  const [dai_chcBalance, setDai_chcBalance] = useState(0);
  const [eth_chcBalance, setEth_chcBalance] = useState(0);
  const [volume, setVolume] = useState(0);
  const [feed, setFeed] = useState(0);
  const { address } = useWeb3ModalAccount();

  useEffect(() => {
    const refreshData = async () => {
      try {
        const lendPosition_dai = await Utils.getLendPosition(address, "DAI");
        setDai_chcBalance(Number(lendPosition_dai.borrowedAmount) / 1e18);

        const lendPosition_eth = await Utils.getLendPosition(address, "ETH");
        setEth_chcBalance(Number(lendPosition_eth.borrowedAmount) / 1e18);

        const volume = await Utils.volume();
        isNaN(volume.currentSupplied)
          ? setVolume(0)
          : setVolume(Number(volume.currentSupplied / 1e18));

        const chcFeedData = await Utils.getFeed("CHC");
        setFeed((Number(chcFeedData[1]) / 1e18).toFixed(2));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    refreshData();

    const intervalId = setInterval(refreshData, 3000);

    return () => clearInterval(intervalId);
  }, [address]);

  const Eth = [
    {
      Collateral: "CHC/ETH",
      borrow: volume.toFixed(4),
      current_value: Number(feed * eth_chcBalance).toFixed(2),
      borrow_value: eth_chcBalance.toFixed(4),
    },
  ];

  const Dai = [
    {
      Collateral: "CHC/DAI",
      borrow: volume.toFixed(4),
      current_value: Number(feed * dai_chcBalance).toFixed(2),
      borrow_value: dai_chcBalance.toFixed(4),
    },
  ];
  // const Bat = [
  //   {
  //     Collateral: "CHC/BAT",
  //   },
  // ];
  // const Usdt = [
  //   {
  //     Collateral: "CHC/USDT",
  //   },
  // ];
  // const Usdc = [
  //   {
  //     Collateral: "CHC/USDC",
  //   },
  // ];
  // const Uni = [
  //   {
  //     Collateral: "CHC/UNI",
  //   },
  // ];
  // const Wbtc = [
  //   {
  //     Collateral: "CHC/WBTC",
  //   },
  // ];

  return (
    <>
      <div className="row">
        <div className="d-flex justify-content-center align-items-center">
          <div className="col-xl-10 col-lg-12 col-md-12 col-sm-12 col-ss-12 col-xs-12 col-12">
            <div
              className="card"
              style={{
                // backgroundColor: "#211f21",
                backgroundImage: "linear-gradient(to bottom, #262522, #000000)",
                borderRadius: "16px",
                color: "#846424",
              }}
            >
              <div className="card-body">
                <Tab.Container defaultActiveKey="All">
                  <div className="card-header border-0 pb-2 flex-wrap">
                    <h4 className="heading text-baseAssets">Borrow</h4>
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
                              style={{ minWidth: "745px" }}
                            >
                              <thead>
                                <tr
                                  style={{
                                    color: "#EDC452",
                                  }}
                                  className="whitespace-nowrap"
                                >
                                  <th>Pool</th>
                                  <th>Borrow</th>
                                  <th>Current Value</th>
                                  <th>Available Loan(CHAU)</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody className="text-white">
                                {Eth.map((item, index) => (
                                  <tr key={index}>
                                    <td>{item.Collateral}</td>
                                    <td>{item.borrow}</td>
                                    <td>${item.current_value}</td>
                                    <td>{item.borrow_value}</td>
                                    <td className="d-flex justify-content-center">
                                      <Link
                                        to={"/accounts/borrowchc"}
                                        state={{ collateral: "ETH" }}
                                      >
                                        <span
                                          className="badge cursor-pointer"
                                          style={{
                                            height: "22px",
                                            width: "80px",
                                            color: "#EDC452",
                                            textTransform: "uppercase",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            fontSize: "10px",
                                            backgroundColor: "#1A1917",
                                            borderRadius: "16px",
                                            border: "1px solid transparent",
                                            borderColor: "#EDC452",
                                          }}
                                        >
                                          Borrow
                                        </span>
                                      </Link>
                                      <Link
                                        to={"/accounts/repay"}
                                        state={{ collateral: "ETH" }}
                                      >
                                        <span
                                          className="badge cursor-pointer ml-2"
                                          style={{
                                            height: "22px",
                                            width: "80px",
                                            color: "black",
                                            textTransform: "uppercase",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            fontSize: "10px",
                                            background:
                                              "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                                            borderRadius: "40px",
                                          }}
                                        >
                                          Repay
                                        </span>
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                                {Dai.map((item, index) => (
                                  <tr key={index}>
                                    <td>{item.Collateral}</td>
                                    <td>{item.borrow}</td>
                                    <td>${item.current_value}</td>
                                    <td>{item.borrow_value}</td>

                                    <td>
                                      <Link
                                        to={"/accounts/borrowchc"}
                                        state={{ collateral: "DAI" }}
                                      >
                                        <span
                                          className="badge cursor-pointer"
                                          style={{
                                            height: "22px",
                                            width: "80px",
                                            color: "#EDC452",
                                            textTransform: "uppercase",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            fontSize: "10px",
                                            backgroundColor: "#1A1917",
                                            borderRadius: "16px",
                                            border: "1px solid transparent",
                                            borderColor: "#EDC452",
                                          }}
                                        >
                                          Borrow
                                        </span>
                                      </Link>
                                      <Link
                                        to={"/accounts/repay"}
                                        state={{ collateral: "DAI" }}
                                      >
                                        <span
                                          className="badge cursor-pointer ml-2"
                                          style={{
                                            height: "22px",
                                            width: "80px",
                                            color: "black",
                                            textTransform: "uppercase",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            fontSize: "10px",
                                            background:
                                              "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                                            borderRadius: "40px",
                                          }}
                                        >
                                          Repay
                                        </span>
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                                {/* {Bat.map((item, index) => (
                                  <tr key={index}>
                                    <td>{item.Collateral}</td>
                                    <td>0</td>
                                    <td>$0</td>
                                    <td>0</td>
                                    <td>
                                      <Link
                                        to={"/accounts/wthdrawLending"}
                                        state={{ collateral: "ETH" }}
                                      >
                                        <span
                                          className="badge cursor-pointer"
                                          // onClick={() => setModalShowDAI(true)}
                                          style={{
                                            height: "22px",
                                            width: "80px",
                                            color: "#EDC452",
                                            textTransform: "uppercase",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            fontSize: "10px",
                                            backgroundColor: "#1A1917",
                                            borderRadius: "16px",
                                            border: "1px solid transparent",
                                            borderColor: "#EDC452",
                                          }}
                                        >
                                          Borrow
                                        </span>
                                      </Link>
                                      <Link
                                        to={"/accounts/lend"}
                                        state={{ collateral: "ETH" }}
                                      >
                                        <span
                                          className="badge cursor-pointer ml-2"
                                          style={{
                                            height: "22px",
                                            width: "80px",
                                            color: "black",
                                            textTransform: "uppercase",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            fontSize: "10px",
                                            background:
                                              "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                                            borderRadius: "40px",
                                          }}
                                        >
                                          Repay
                                        </span>
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                                {Usdt.map((item, index) => (
                                  <tr key={index}>
                                    <td>{item.Collateral}</td>
                                    <td>0</td>
                                    <td>$0</td>
                                    <td>0</td>
                                    <td>
                                      <Link>
                                        <span
                                          className="badge cursor-pointer"
                                          // onClick={() => setModalShowDAI(true)}
                                          style={{
                                            height: "22px",
                                            width: "80px",
                                            color: "#EDC452",
                                            textTransform: "uppercase",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            fontSize: "10px",
                                            backgroundColor: "#1A1917",
                                            borderRadius: "16px",
                                            border: "1px solid transparent",
                                            borderColor: "#EDC452",
                                          }}
                                        >
                                          Borrow
                                        </span>
                                      </Link>
                                      <Link
                                        to={"/accounts/lend"}
                                        state={{ collateral: "ETH" }}
                                      >
                                        <span
                                          className="badge cursor-pointer ml-2"
                                          style={{
                                            height: "22px",
                                            width: "80px",
                                            color: "black",
                                            textTransform: "uppercase",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            fontSize: "10px",
                                            background:
                                              "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                                            borderRadius: "40px",
                                          }}
                                        >
                                          Repay
                                        </span>
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                                {Usdc.map((item, index) => (
                                  <tr key={index}>
                                    <td>{item.Collateral}</td>
                                    <td>0</td>
                                    <td>$0</td>
                                    <td>0</td>
                                    <td>
                                      <Link>
                                        <span
                                          className="badge cursor-pointer"
                                          // onClick={() => setModalShowDAI(true)}
                                          style={{
                                            height: "22px",
                                            width: "80px",
                                            color: "#EDC452",
                                            textTransform: "uppercase",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            fontSize: "10px",
                                            backgroundColor: "#1A1917",
                                            borderRadius: "16px",
                                            border: "1px solid transparent",
                                            borderColor: "#EDC452",
                                          }}
                                        >
                                          Borrow
                                        </span>
                                      </Link>
                                      <Link
                                        to={"/accounts/lend"}
                                        state={{ collateral: "ETH" }}
                                      >
                                        <span
                                          className="badge cursor-pointer ml-2"
                                          style={{
                                            height: "22px",
                                            width: "80px",
                                            color: "black",
                                            textTransform: "uppercase",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            fontSize: "10px",
                                            background:
                                              "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                                            borderRadius: "40px",
                                          }}
                                        >
                                          Repay
                                        </span>
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                                {Wbtc.map((item, index) => (
                                  <tr key={index}>
                                    <td>{item.Collateral}</td>
                                    <td>0</td>
                                    <td>$0</td>
                                    <td>0</td>
                                    <td>
                                      <Link>
                                        <span
                                          className="badge cursor-pointer"
                                          // onClick={() => setModalShowDAI(true)}
                                          style={{
                                            height: "22px",
                                            width: "80px",
                                            color: "#EDC452",
                                            textTransform: "uppercase",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            fontSize: "10px",
                                            backgroundColor: "#1A1917",
                                            borderRadius: "16px",
                                            border: "1px solid transparent",
                                            borderColor: "#EDC452",
                                          }}
                                        >
                                          Borrow
                                        </span>
                                      </Link>
                                      <Link
                                        to={"/accounts/lend"}
                                        state={{ collateral: "ETH" }}
                                      >
                                        <span
                                          className="badge cursor-pointer ml-2"
                                          style={{
                                            height: "22px",
                                            width: "80px",
                                            color: "black",
                                            textTransform: "uppercase",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            fontSize: "10px",
                                            background:
                                              "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                                            borderRadius: "40px",
                                          }}
                                        >
                                          Repay
                                        </span>
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                                {Uni.map((item, index) => (
                                  <tr key={index}>
                                    <td>{item.Collateral}</td>
                                    <td>0</td>
                                    <td>$0</td>
                                    <td>0</td>
                                    <td>
                                      <Link>
                                        <span
                                          className="badge cursor-pointer"
                                          // onClick={() => setModalShowDAI(true)}
                                          style={{
                                            height: "22px",
                                            width: "80px",
                                            color: "#EDC452",
                                            textTransform: "uppercase",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            fontSize: "10px",
                                            backgroundColor: "#1A1917",
                                            borderRadius: "16px",
                                            border: "1px solid transparent",
                                            borderColor: "#EDC452",
                                          }}
                                        >
                                          Borrow
                                        </span>
                                      </Link>
                                      <Link>
                                        <span
                                          className="badge cursor-pointer ml-2"
                                          style={{
                                            height: "22px",
                                            width: "80px",
                                            color: "black",
                                            textTransform: "uppercase",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            fontSize: "10px",
                                            background:
                                              "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                                            borderRadius: "40px",
                                          }}
                                        >
                                          Repay
                                        </span>
                                      </Link>
                                    </td>
                                  </tr>
                                        ))}*/}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container>
              </div>
              <div
                style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
              />
              <div className="mt-4" />
              <div className="w-100 d-flex flex-row justify-content-start p-3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
