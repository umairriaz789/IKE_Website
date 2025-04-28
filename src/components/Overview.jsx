import React, { useState, useEffect, useRef } from "react";
import { Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import Utils from "../utilities.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../helpers/firebase.js";
import ProposalModal from "./widgets/modals/proposal-modal/ProposalModal.jsx";
// import Example from "./widgets/modals/popup-modal/Example.js";

const Overview = () => {
  const sort = 5;
  const activePag = useRef(0);
  const [test, settest] = useState(0);
  const [TotalStake, setTotalStake] = useState(0);
  const [proposals, setProposals] = useState([]);
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const readProposalsAndVotes = async () => {
    try {
      // Query all documents from the "proposals" collection
      const proposalsSnapshot = await getDocs(collection(db, "proposals"));

      const proposalsList = []; // Empty array to store proposal objects

      // Loop through each proposal document
      for (const proposalDoc of proposalsSnapshot.docs) {
        const proposalData = proposalDoc.data(); // Proposal data
        const proposalId = proposalDoc.id; // Proposal ID

        // Query all documents from the "votes" subcollection within the current proposal
        const votesSnapshot = await getDocs(
          collection(proposalDoc.ref, "votes"),
        );

        const votesList = []; // Empty array to store votes for the current proposal

        // Loop through each vote document within the subcollection
        votesSnapshot.forEach((voteDoc) => {
          // Store vote data in the votes array
          votesList.push({
            id: voteDoc.id,
            data: voteDoc.data(),
          });
        });

        // Store proposal data along with its associated votes in the proposals array
        proposalsList.push({
          id: proposalId,
          data: proposalData,
          votes: votesList,
        });
      }

      // console.log("Proposals:", proposalsList); // Log the proposals before returning
      setProposals(proposalsList);
      // return proposalsList; // Return the array of proposals with associated votes
    } catch (error) {
      console.error("Error reading proposals and votes:", error);
      // return []; // Return an empty array in case of error
    }
  };

  useEffect(() => {
    // Example usage: Read proposals and votes
    readProposalsAndVotes();
  }, []);

  // const openModal = () => {
  //   setModal(!modal)
  //   // console.log("clicked")
  // }

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

  useEffect(() => {
    const refreshData = async () => {
      try {
        const stakeData = await Utils.getTotalStakeAmount();
        setTotalStake(Number(stakeData) / 1e18);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    refreshData();

    const intervalId = setInterval(refreshData, 3000);

    return () => clearInterval(intervalId);
  });

  return (
    <>
      {modal && <ProposalModal />}
      <div className="page-content mt-5">
        <div className="row d-flex justify-content-center">
          <div
            className="col-lg-3 col-md-6 m-b30 wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <div
              className=" icon-bx-wraper style-1 box-hover"
              style={{
                backgroundImage: "linear-gradient(to bottom, #262522, #000000)",
                borderRadius: "16px",
                color: "#846424",
              }}
            >
              <div className=" justify-between items-center">
                <div className="icon-info">
                  <h5 className="title text-[#EDC452]">Total Stakes</h5>
                </div>
              </div>
              <p className="mb-0 amount text-[#EDC452]">
                Tokens
                <span className="text-white  ml-2">
                  {TotalStake.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
          <div
            className="col-lg-3 col-md-6 m-b30 wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <div
              className=" icon-bx-wraper style-1 box-hover"
              style={{
                backgroundImage: "linear-gradient(to bottom, #262522, #000000)",
                borderRadius: "16px",
                color: "#846424",
              }}
            >
              <div className=" justify-between items-center">
                <div className="icon-info">
                  <h5 className="title text-[#EDC452]">Lock time</h5>
                </div>
              </div>
              <p className="mb-0 amount text-[#EDC452]">
                Average Time
                <a className="text-white ml-2">30Days</a>
              </p>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div
            className="col-xl-10 col-md-6 m-b30 wow fadeInUp"
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
              <div className=" justify-between items-center" />
              <Tab.Container defaultActiveKey="All">
                <div className="card-header border-0 pb-2 flex-wrap">
                  <h4 className="heading text-[#EDC452]">Your Proposals</h4>
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
                              <tr className="text-[#EDC452]">
                                <th>Proposal</th>
                                <th>Votes</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody className="text-[white]">
                              {proposals.map((proposal, index) => (
                                <tr>
                                  <td>
                                    <Link
                                      to={`viewproposal?title=${encodeURIComponent(
                                        proposal.title,
                                      )}`}
                                    >
                                      <label
                                        key={index}
                                        className="cursor-pointer"
                                      >
                                        {proposal?.data?.title}
                                      </label>
                                    </Link>
                                  </td>

                                  <td>
                                    <label key={index}>
                                      {proposal?.votes[0]?.data?.data}
                                    </label>
                                  </td>
                                  <td>
                                    <label key={index}>
                                      {proposal?.data?.status}
                                    </label>
                                  </td>
                                </tr>
                              ))}
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
                              className=" dataTables_paginate paging_simple_numbers mb-0"
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
      </div>
      <div className="mt-5" />
    </>
  );
};

export default Overview;
