import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Tab } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import Utils from "../../utilities";

export const MintPosition = () => {
  const [collateralRatio, setcollateralRatio] = useState(0);
  const [liquidationRatio, setLiquidationRatio] = useState(0);
  const [position, setposition] = useState([]);
  const [feed, setFeed] = useState(0);
  const sort = 10;
  const activePag = useRef(0);

  // paggination
  let paggination = Array(Math.ceil(position.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const paginatePositions = (data, pageNumber, pageSize) => {
    const startIndex = pageNumber * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  };

  const currentPositions = paginatePositions(position, activePag.current, sort);

  const handlePaginationClick = (i) => {
    activePag.current = i;
  };

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const positions = await Utils.getMintPositions();
        setposition(positions);

        const feedData = await Utils.getFeed("CHC");
        setFeed(Utils.toFixedNoRounding(Number(feedData[1]) / 1e18, 2));

        const coldata = await Utils.getCollateralizationRatio();
        setcollateralRatio((Number(coldata) / 1e6).toFixed(2));

        const liqData = await Utils.liqRatio();
        setLiquidationRatio((Number(liqData) / 1e6).toFixed(2));
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

    fetchPositions();
    const intervalId = setInterval(fetchPositions, 3000);

    return () => clearInterval(intervalId);
  });

  function Loading() {
    return (
      <div className="py-5">
        <div>
          <h4 className="text-left">
            Loading
            <span>
              <div
                className="spinner-grow spinner-grow-sm ml-2"
                role="status"
                aria-hidden="true"
              ></div>
              <div
                className="spinner-grow spinner-grow-sm ml-1"
                role="status"
                aria-hidden="true"
              ></div>
              <div
                className="spinner-grow spinner-grow-sm ml-1"
                role="status"
                aria-hidden="true"
              ></div>
            </span>
          </h4>
        </div>
      </div>
    );
  }
  return (
    <Section className="vertically-overflow" style={{ height: "100vh" }}>
      <div className="d-flex align-items-start justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-12 col-sm-12 col-ss-12 col-xs-12 col-12">
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
                <h4 className="heading text-baseAssets">Mint Positions</h4>
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
                        >
                          <thead>
                            <tr
                              style={{
                                color: "#EDC452",
                              }}
                              className="whitespace-nowrap"
                            >
                              <th>Collateral</th>
                              <th>Collateral Deposited</th>
                              <th>CHAU Minted</th>
                              <th>Current Value</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody className="text-white">
                            {position == 0 ? (
                              <tr>
                                <td></td>
                                <td></td>
                                <Loading />
                                <td></td>
                                <td></td>
                              </tr>
                            ) : (
                              // <div className="w-100">
                              //   <div className=" flex justify-center border-2 text-white">
                              //     <Loading />
                              //   </div>
                              // </div>
                              <>
                                {currentPositions.map((item, index) => (
                                  <tr key={index}>
                                    <td>{item.col}</td>
                                    <td>
                                      {Utils.toFixedNoRounding(
                                        Number(item.deposited) / 1e18,
                                        2,
                                      )}
                                    </td>
                                    <td>
                                      {Utils.toFixedNoRounding(
                                        Number(item.minted) / 1e18,
                                        3,
                                      )}
                                    </td>
                                    <td>
                                      {"$" +
                                        Utils.toFixedNoRounding(
                                          Utils.toFixedNoRounding(
                                            Number(item.minted) / 1e18,
                                            3,
                                          ) * feed,
                                          2,
                                        )}
                                    </td>
                                    <td>
                                      <Link
                                        to={"/accounts/liquidate"}
                                        state={{
                                          collateral: item.col,
                                          userToLiquidate: item.user,
                                        }}
                                      >
                                        <button
                                          className="badge cursor-pointer"
                                          disabled={
                                            collateralRatio > liquidationRatio
                                              ? true
                                              : false
                                          }
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
                                            borderColor: "#846424",
                                          }}
                                        >
                                          Liquidate
                                        </button>
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                              </>
                            )}
                          </tbody>
                        </table>
                        <div className="d-sm-flex text-white text-center justify-content-between align-items-center mt-3 mb-3">
                          <div className="dataTables_info">
                            Showing{" "}
                            {position.length === 0
                              ? 0
                              : `${activePag.current * sort + 1} - ${Math.min(
                                  (activePag.current + 1) * sort,
                                  position.length,
                                )}`}{" "}
                            of {position.length} entries
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
    </Section>
  );
};

const Section = styled.section`
  margin-left: 13vw;
  padding: 2rem;
  height: 100vh;
  background-color: #000000;
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 2rem;
    .row__one {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 50%;
      gap: 1rem;
    }
    .row__two {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      height: 50%;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;
