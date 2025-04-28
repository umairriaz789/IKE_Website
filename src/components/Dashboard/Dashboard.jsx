import React, { useEffect } from "react";
import styled from "styled-components";
import scrollreveal from "scrollreveal";
import UserDashboard from "./UserDashboard";
export default function Dashboard() {
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
  return (
    <Section>
      <div className="grid">
        {/* <NotAllow/> */}
        <UserDashboard />
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin-left: 13vw;
  padding: 0rem 1rem 0rem 1rem;
  height: 100%;
  background-color: #000000;
  .grid {
    display: flex;
    flex-direction: column;
    height: 50%;
    gap: 1rem;
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
