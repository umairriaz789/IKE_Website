import React, { useState, useEffect, useRef } from "react";
import { Nav, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";

// import { collection, addDoc, getDocs } from "firebase/firestore";
// import { db } from "../helpers/firebase";

const Proposal = () => {
  const sort = 6;
  const activePag = useRef(0);
  const [proposals, setProposals] = useState([]);

  // useEffect(() => {
  //   getDataToProposalsTable();
  // }, []);

  // if api call is on seprate click // GET API (Get data to backend)
  // const getDataToProposalsTable = async () => {
  //   try {
  //     const menuCollection = collection(db, "proposals");
  //     const result = await getDocs(menuCollection);
  //     const res = [];
  //     result.forEach((proposal) => {
  //       res.push({
  //         id: proposal.id,
  //         ...proposal.data(),
  //       });
  //     });

  //     setProposals(res);
  //     console.log("testing: ", res);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

  // paggination
  let paggination = Array(Math.ceil(proposals.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const paginateTransactions = (data, pageNumber, pageSize) => {
    const startIndex = pageNumber * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  };

  const currentProposals = paginateTransactions(
    proposals,
    activePag.current,
    sort,
  );

  const handlePaginationClick = (i) => {
    activePag.current = i;
  };

  return (
    <>
      <section>
        <div className="row flex justify-center">
          <div
            className="col-xl-10 col-md-6 m-b30 wow fadeInUp page-content mt-5"
            data-wow-delay="0.2s"
          >
            <div
              className="style-1 box-hover"
              style={{
                backgroundImage: "linear-gradient(to bottom, #262522, #000000)",
                borderRadius: "16px",
                color: "#846424",
              }}
            >
              <div className="flex justify-between items-center" />
              <Tab.Container defaultActiveKey="All">
                <div className=" border-0 pb-3 pt-4 ">
                  <>
                    <Nav className=" flex flex-nowrap overflow-x-auto overflow-y-hidden items-center order nav nav-tabs justify-content-center">
                      <Nav.Link
                        style={{ color: "#EDC452" }}
                        as="button"
                        eventKey="All"
                        type="button"
                        className="max-[480px]:text-[12px] max-[400px]:px-[5px] "
                      >
                        <span className="max-[400px]:text-[10px]">
                          All Proposals
                        </span>
                      </Nav.Link>
                      <Nav.Link
                        style={{ color: "#EDC452" }}
                        as="button"
                        eventKey="Order"
                        type="button"
                        className=" max-[480px]:text-[12px] max-[400px]:px-[5px]  "
                      >
                        <span className="max-[400px]:text-[10px]">Active</span>
                      </Nav.Link>
                      <Nav.Link
                        style={{ color: "#EDC452" }}
                        as="button"
                        eventKey="Trade"
                        type="button"
                        className=" max-[480px]:text-[12px] max-[400px]:px-[5px] "
                      >
                        <span className="max-[400px]:text-[10px]">Pending</span>
                      </Nav.Link>
                      <Nav.Link
                        style={{ color: "#EDC452" }}
                        as="button"
                        eventKey="Trades"
                        type="button"
                        className=" max-[480px]:text-[12px] max-[400px]:px-[5px] "
                      >
                        <span className="max-[400px]:text-[10px]">Closed</span>
                      </Nav.Link>
                    </Nav>
                  </>
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
                              <tr className="text-white">
                                <th>Proposal</th>
                                <th>{""}</th>
                                <th />
                                <th />
                                <th />
                                <th />
                                <th>Votes</th>
                              </tr>
                            </thead>
                            <tbody className="text-white">
                              {/* {proposals.map((proposal, index) => (
                                <li key={index}>
                                  Display relevant data from each proposal
                                  <div>{proposal.title}</div>
                                  <div>{proposal.description}</div>
                                  Add additional fields as needed
                                </li>
                              ))} */}
                              {/* <tr>
                                <td>Proposal 1 </td>
                                <td>Proposal 2 </td>
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                              </tr> */}
                            </tbody>
                          </table>
                          <div className="d-sm-flex text-white text-center justify-content-between align-items-center mt-3 mb-3">
                            <div className="dataTables_info">
                              Showing{" "}
                              {proposals.length === 0
                                ? 0
                                : `${activePag.current * sort + 1} - ${Math.min(
                                    (activePag.current + 1) * sort,
                                    proposals.length,
                                  )}`}{" "}
                              of {proposals.length} entries
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
                                      marginTop: "12",
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
                                      marginTop: "12",
                                      marginLeft: "10px",
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
                    <Tab.Pane eventKey="Order">
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
                              <tr className="text-white">
                                <th>Proposal</th>
                                <th>{""}</th>
                                <th />
                                <th />
                                <th />
                                <th />
                                <th>Votes</th>
                              </tr>
                            </thead>
                          </table>
                          <div className="d-sm-flex text-white text-center justify-content-between align-items-center mt-3 mb-3">
                            <div className="dataTables_info">
                              Showing{" "}
                              {proposals.length === 0
                                ? 0
                                : `${activePag.current * sort + 1} - ${Math.min(
                                    (activePag.current + 1) * sort,
                                    proposals.length,
                                  )}`}{" "}
                              of {proposals.length} entries
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
                                      marginTop: "12",
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
                                      marginTop: "12",
                                      marginLeft: "10px",
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
                    <Tab.Pane eventKey="Trade">
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
                              <tr className="text-white">
                                <th>Proposal</th>
                                <th>{""}</th>
                                <th />
                                <th />
                                <th />
                                <th />
                                <th>Votes</th>
                              </tr>
                            </thead>
                          </table>
                          <div className="d-sm-flex text-white text-center justify-content-between align-items-center mt-3 mb-3">
                            <div className="dataTables_info">
                              Showing{" "}
                              {proposals.length === 0
                                ? 0
                                : `${activePag.current * sort + 1} - ${Math.min(
                                    (activePag.current + 1) * sort,
                                    proposals.length,
                                  )}`}{" "}
                              of {proposals.length} entries
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
                                      marginTop: "12",
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
                                      marginTop: "12",
                                      marginLeft: "10px",
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
                    <Tab.Pane eventKey="Trades">
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
                              <tr className="text-white">
                                <th>Proposal</th>
                                <th>{""}</th>
                                <th />
                                <th />
                                <th />
                                <th />
                                <th>Votes</th>
                              </tr>
                            </thead>
                          </table>
                          <div className="d-sm-flex text-white text-center justify-content-between align-items-center mt-3 mb-3">
                            <div className="dataTables_info">
                              Showing{" "}
                              {proposals.length === 0
                                ? 0
                                : `${activePag.current * sort + 1} - ${Math.min(
                                    (activePag.current + 1) * sort,
                                    proposals.length,
                                  )}`}{" "}
                              of {proposals.length} entries
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
                                      marginTop: "12",
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
                                      marginTop: "12",
                                      marginLeft: "10px",
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
        <div className="mt-5" />
      </section>
    </>
  );
};

export default Proposal;
