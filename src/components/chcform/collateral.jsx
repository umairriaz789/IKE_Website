import React from "react";
import { Tab, Nav } from "react-bootstrap";
import { Lending } from "./lending";
import { Borrow } from "./borrow";

export const Collateral = () => {
  return (
    <>
      <Tab.Container defaultActiveKey="Navbuy">
        <div>
          <nav className="w-full flex justify-center items-start navbar">
            <div className="buy-sell">
              <div
                style={{
                  background:
                    "linear-gradient(153.13deg, #846424 17.05%, #EDC452 49.23%, #846424 82.83%)",
                  padding: "1px",
                }}
              >
                <div
                  style={{
                    background: "#1A1917",
                    boxShadow:
                      "0px 4px 8px rgba(0, 0, 0, 0.08), 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 0px 1px rgba(0, 0, 0, 0.14)",
                  }}
                >
                  <Nav
                    className="nav nav-tabs"
                    eventKey="nav-tab2"
                    role="tablist"
                  >
                    <Nav.Link
                      as="button"
                      className="nav-link"
                      eventKey="Navbuy"
                      type="button"
                    >
                      Lending
                    </Nav.Link>
                    <Nav.Link
                      as="button"
                      className="nav-link"
                      eventKey="Navsell"
                      type="button"
                    >
                      Borrow
                    </Nav.Link>
                  </Nav>
                </div>
              </div>
            </div>
          </nav>
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
                  <Lending />
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
                <Borrow />
              </div>
            </Tab.Container>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  );
};
