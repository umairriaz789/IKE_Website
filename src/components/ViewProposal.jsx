import React from "react";
import { dao } from "../assets";
import { bell } from "../assets";
const ViewProposal = ({ location }) => {
  return (
    <div>
      <div className="flex lg:flex-row lg:gap-3 flex-col lg:justify-start justify-center  flex-wrap">
        <div className=" lg:w-[60%] w-100% lg:p-[10px] p-[10px] flex flex-col gap-2">
          <div>
            <button className="bg-[#c461df] px-4 mb-2 py-2 rounded-lg w-fit">
              Closed
            </button>
            <h3>Record and Publish Stargate Community Cells</h3>
            <p className="text-[gray]">
              Issue Statement, Stargate community ceils are not recorded and
              published . This limits the engagement with the stargate community
              and the broader crypto community. Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Iusto quis veritatis ipsam dolorum
              esse. Neque?
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 border-1 border-gray-800 p-3">
              <h5 className="m-0">Votes</h5>{" "}
              {/* <div className="w-fit bg-[gray] text-white font-bold p-2 rounded-lg text-[10px]">
                45367
              </div> */}
            </div>
            {/* Map this div */}
            <div className="flex justify-between p-3 border-1 border-gray-800  ">
              <h6 className="m-0 text-[15px]">0xedE..8357</h6>
              <h6 className="m-0 text-[15px]">Yes</h6>
              {/* <h6 className="m-0 text-[15px]">161K veSTG</h6> */}
            </div>
          </div>
        </div>
        <div className="lg:w-[35%] w-[100%] p-2 flex flex-col gap-3 ">
          <div className="border-gray-800 border-1 p-3 rounded-sm">
            <h4 className="mb-4">Information</h4>

            <div className="flex flex-wrap justify-between">
              <h6 className=" text-[gray]">Voting System</h6>
              <h6>Single choice voting</h6>
            </div>
            <div className="flex flex-wrap justify-between">
              <h6 className="text-[gray]">Start date</h6>
              <h6>Feb 20, 2024,8:52 AM</h6>
            </div>
            <div className="flex flex-wrap justify-between">
              <h6 className=" text-[gray]">End date</h6>
              <h6>Feb 23, 2024,9:00 AM</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProposal;
