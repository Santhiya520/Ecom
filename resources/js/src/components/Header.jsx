import React from "react";
import { FaBars } from "react-icons/fa";
import "./Header.css";

const Header = ({ toggleSidebar }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="admin-header">
      <button className="menu-button" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className="header-right">Welcome, {user?.name || "Admin"}</div>
    </header>
  );
};

export default Header;
