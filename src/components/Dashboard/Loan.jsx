import React, { useEffect, useState } from "react";
import styled from "styled-components";
import scrollreveal from "scrollreveal";
import { CHCForm } from "../chcform";
import Utils from "../../utilities";

export default function Loan() {
  const [interestRate, setInterestRate] = useState(0);
  const [utilRate, setUtilRate] = useState(0);
  const [volume, setVolume] = useState([]);
  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        nav,
        .row__one,
        .row__two
    `,
      {
        opacity: 0,
        interval: 100,
      },
    );
  }, []);

  useEffect(() => {
    const refreshData = async () => {
      try {
        const volume = await Utils.volume();
        setVolume(volume);

        const utilizationRate = await Utils.utilizationRate();
        setUtilRate(Number(utilizationRate));

        const interestRate = await Utils.interestRate();
        setInterestRate(Number(interestRate));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    refreshData();

    const intervalId = setInterval(refreshData, 3000);

    return () => clearInterval(intervalId);
  });

  return (
    <Section className="overflow-y-auto">
      <div className="grid">
        <div className="d-flex align-items-center justify-content-center mx-[15px]">
          <div className="col-xl-10">
            <div
              className="card"
              style={{
                backgroundImage: "linear-gradient(to bottom, #262522, #000000)",
                borderRadius: "16px",
                color: "#846424",
              }}
            >
              <div className="card-header pb-0 d-block d-sm-flex flex-wrap border-0 align-items-center">
                <div className="me-auto mb-3">
                  <h2 className="fs-28 font-w600 text-white"></h2>
                </div>
              </div>
              <div className="card-body">
                <div className="row sp20 mb-4 align-items-center">
                  <div className="col-xxl-12 d-flex flex-wrap justify-content-between align-items-center">
                    <div className="px-2 info-group">
                      <p className="fs-18 mb-1 text-baseAssets">
                        Interest Rate
                      </p>
                      <h2 className="fs-28 font-w600 text-white">
                        {isNaN(interestRate)
                          ? 0
                          : Number((interestRate * 100) / 1e18).toFixed(2) +
                            "%"}
                      </h2>
                    </div>
                    <div className="px-2 info-group">
                      <p className="fs-14 mb-1 text-baseAssets">
                        Utilization Rate
                      </p>
                      <h3 className="fs-20 font-w600 text-white">
                        {isNaN(utilRate)
                          ? 0
                          : Number((utilRate * 100) / 1e18).toFixed(2) + "%"}
                      </h3>
                    </div>
                    <div className="px-2 info-group">
                      <p className="fs-14 mb-1 text-baseAssets">
                        Total Supplied
                      </p>
                      <h3 className="fs-20 font-w600 text-white">
                        {isNaN(volume.totalSupplied)
                          ? 0
                          : Number(volume.totalSupplied / 1e18).toFixed(4)}
                      </h3>
                    </div>
                    <div className="px-2 info-group">
                      <p className="fs-14 mb-1 text-baseAssets">
                        Total Borrowed
                      </p>
                      <h3 className="fs-20 font-w600 text-white">
                        {isNaN(volume.totalBorrowed)
                          ? 0
                          : Number(volume.totalBorrowed / 1e18).toFixed(4)}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CHCForm />
      </div>
    </Section>
  );
}

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
    margin-top: 0rem;
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
