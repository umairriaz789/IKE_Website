import React from "react";
import { Info } from "react-feather";
import { Link } from "react-router-dom";
import { Tab } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import Toltip from "../buttons/toltip";
import Utils from "../../utilities";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";

export const Collaterals = () => {
  const [balance, setbalance] = useState(0);
  const [daiBalance, setdaiBalance] = useState(0);
  const [dai_chcBalance, setDai_chcBalance] = useState(0);
  const [eth_chcBalance, setEth_chcBalance] = useState(0);
  const [feed, setFeed] = useState(0);
  const { address } = useWeb3ModalAccount();

  Number.prototype.toFixedNoRounding = function (n) {
    const reg = new RegExp("^-?\\d+(?:\\.\\d{0," + n + "})?", "g");
    const a = this.toString().match(reg)[0];
    const dot = a.indexOf(".");
    if (dot === -1) {
      // integer, insert decimal dot and pad up zeros
      return a + "." + "0".repeat(n);
    }
    const b = n - (a.length - dot) + 1;
    return b > 0 ? a + "0".repeat(b) : a;
  };

  useEffect(() => {
    Utils.getUserBalance(address, "DAI").then(function (data) {
      setdaiBalance(Number(data) / 1e18);
    });

    Utils.getUserBalance(address, "ETH").then(function (data) {
      setbalance(Number(data) / 1e18);
    });

    Utils.getMintPosition(address, "DAI").then(function (data) {
      setDai_chcBalance(Number(data.minted) / 1e18);
    });

    Utils.getMintPosition(address, "ETH").then(function (data) {
      setEth_chcBalance(Number(data.minted) / 1e18);
    });

    Utils.getFeed("CHC").then(function (data) {
      setFeed(Number(data[1]) / 1e18);
    });
  });

  const Eth = [
    {
      Date: "ETH",
      Price: balance.toFixed(2),
      Amount: eth_chcBalance.toFixed(4),
      Value: (feed * eth_chcBalance).toFixedNoRounding(2),
    },
  ];

  const Dai = [
    {
      Date: "DAI",
      Price: daiBalance.toFixed(2),
      Amount: dai_chcBalance.toFixed(4),
      Value: (dai_chcBalance * feed).toFixedNoRounding(2),
    },
  ];

  return (
    <>
      <section className="vertically-overflow" style={{ height: "100%" }}>
        <div className=" d-flex align-items-start justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-12 col-sm-12 col-ss-12 col-xs-12 col-12 ">
            <div
              className="card"
              style={{
                backgroundImage: "linear-gradient(to bottom, #262522, #000000)",
                borderRadius: "16px",
                color: "#846424",
              }}
            >
              <div className="card-body p-0">
                <Tab.Container defaultActiveKey="All">
                  <div className="card-header border-0 pb-2 flex-wrap">
                    <h4 className="heading text-baseAssets">
                      Mint Chrysus Coin (CHAU)
                      <div style={{ position: "absolute", right: 30, top: 30 }}>
                        <Toltip
                          style={{ position: "absolute", right: 30, top: 30 }}
                        >
                          <Info />
                        </Toltip>
                      </div>
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
                              className="table display dataTable no-footer "
                            >
                              <thead>
                                <tr className="text-baseAssets whitespace-nowrap">
                                  <th>Collateral</th>
                                  <th>Collateral Balance</th>
                                  <th>CHAU Deposit</th>
                                  <th>CHAU Value</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody className="text-white">
                                {Eth.map((item, index) => (
                                  <tr key={index}>
                                    <td>{item.Date}</td>
                                    <td>{item.Price}</td>
                                    <td>{item.Amount}</td>
                                    <td>${item.Value}</td>
                                    <td>
                                      <Link to={"ethdeposite"}>
                                        <span
                                          className="badge cursor-pointer"
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
                                          Deposit
                                        </span>
                                      </Link>
                                      <Link
                                        to={"/accounts/withdraw"}
                                        state={{ collateral: "ETH" }}
                                      >
                                        <span
                                          className="badge cursor-pointer"
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
                                            margin: "5px",
                                          }}
                                        >
                                          Withdraw
                                        </span>
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                                {Dai.map((item, index) => (
                                  <tr key={index}>
                                    <td>{item.Date}</td>
                                    <td>{item.Price}</td>
                                    <td>{item.Amount}</td>
                                    <td>${item.Value}</td>
                                    <td>
                                      <Link to={"daideposite"}>
                                        <span
                                          className="badge cursor-pointer"
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
                                          Deposit
                                        </span>
                                      </Link>
                                      <Link
                                        to={"/accounts/withdraw"}
                                        state={{ collateral: "DAI" }}
                                      >
                                        <span
                                          className="badge cursor-pointer"
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
                                            margin: "5px",
                                          }}
                                        >
                                          Withdraw
                                        </span>
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
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
      </section>
    </>
  );
};
