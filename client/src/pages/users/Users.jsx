import React from "react";
import "./Users.css";
import { useLocation } from "react-router-dom";
import LeftSidebar from "../../components/leftSidebar/LeftSidebar";
import UsersList from "./UsersList.jsx";

function Users() {
  const location = useLocation();
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        .<h1>Users</h1>
        <UsersList />
      </div>
    </div>
  );
}

export default Users;
