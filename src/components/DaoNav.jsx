import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../reducer/store";

const DaoNav = () => {
  const navigate = useNavigate();

  const ProposalButton = async () => {
    navigate("/accounts/createproposal");
  };

  return (
    <nav className="w-full flex max-[400px]:flex-col justify-between   items-center navbar">
      <Link to="/">
        <h3 className="text-white">Governance</h3>
      </Link>
      <ul className="list-none flex justify-end items-center flex-1">
        <li style={{ marginLeft: "0px" }}>
          <div className="">
            <Button
              type="button"
              style={{
                backgroundColor: "#1A1917",
                borderRadius: "16px",
                color: "#EDC452",
              }}
              onClick={() => ProposalButton()}
              className=" font-medium
             rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center"
            >
              <a>Create Proposal</a>
            </Button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default DaoNav;
