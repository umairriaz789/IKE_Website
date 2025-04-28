import React from "react";
import styles from "../style";
import { Nav, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import Overview from "./Overview";
import Proposal from "./Proposal";
import Staking from "./Dashboard/Staking";

const listData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

const DaoLandPage = () => {
  return (
    <div className={`${styles.boxWidth}`}>
      <div className="mt-5">
        <div>
          <Tab.Container defaultActiveKey="Navbuy">
            <div className={`${styles.flexCenter}`}>
              <Nav
                className="nav nav-tabs flex flex-nowrap overflow-x-auto overflow-y-hidden"
                eventKey="nav-tab2"
              >
                <Nav.Link
                  style={{
                    color: "#EDC452",
                    fontSize: "20px",
                  }}
                  as="button"
                  className="nav-link max-[400px]:p-[5px]"
                  eventKey="Navbuy"
                  type="button"
                >
                  <span className="max-[400px]:text-[15px]">Overview</span>
                </Nav.Link>
                <Nav.Link
                  style={{ color: "#EDC452", fontSize: "20px" }}
                  as="button"
                  className="nav-link max-[400px]:p-[5px]"
                  eventKey="Navstake"
                  type="button"
                >
                  <span className="max-[400px]:text-[15px]">Staking</span>
                </Nav.Link>
                <Nav.Link
                  style={{ color: "#EDC452", fontSize: "20px" }}
                  as="button"
                  className="nav-link  max-[400px]:p-[5px]"
                  eventKey="Navsell"
                  type="button"
                >
                  <span className="max-[400px]:text-[15px]">Proposal</span>
                </Nav.Link>
              </Nav>
            </div>
            <Tab.Content>
              <Tab.Pane eventKey="Navbuy">
                <Tab.Container defaultActiveKey="Navbuymarket">
                  <Tab.Content id="nav-tabContent1">
                    <Tab.Pane eventKey="Navbuymarket" />
                    <Tab.Pane eventKey="Navbuylimit" />
                  </Tab.Content>
                  <div className="text-center">
                    <div className="sell-element">
                      <Overview />
                    </div>
                  </div>
                </Tab.Container>
              </Tab.Pane>
              <Tab.Pane eventKey="Navstake">
                <Tab.Container defaultActiveKey="Navbuymarket">
                  <Tab.Content id="nav-tabContent1">
                    <Tab.Pane eventKey="Navbuymarket" />
                    <Tab.Pane eventKey="Navbuylimit" />
                  </Tab.Content>
                  <div className="text-center">
                    <div className="sell-element">
                      <Staking />
                    </div>
                  </div>
                </Tab.Container>
              </Tab.Pane>
              <Tab.Pane eventKey="Navsell">
                <Tab.Container defaultActiveKey="Navsellmarket">
                  <Tab.Content id="nav-tabContent2">
                    <Tab.Pane id="Navsellmarket" />
                    <Tab.Pane id="Navselllimit" />
                  </Tab.Content>
                  <div className="sell-element">
                    <Proposal />
                  </div>
                </Tab.Container>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

export default DaoLandPage;
