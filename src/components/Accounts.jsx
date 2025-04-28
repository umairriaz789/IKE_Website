import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "./Dashboard/Dashboard";
import UserSideBar from "./Dashboard/UserSideBar";

const Accounts = () => {
  return (
    <Div>
      <UserSideBar />

      <Outlet />
    </Div>
  );
};

export default Accounts;

const Div = styled.div`
  background-color: #000000;
`;
