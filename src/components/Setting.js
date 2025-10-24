// src/components/Setting.jsx
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../components Stylesheet/Setting.css";

const Setting = () => {
  const location = useLocation();

  // Get logged-in user from localStorage
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const avatar = "https://www.w3schools.com/howto/img_avatar.png";

  return (
    <div className="settings-container">
      {/* Sidebar */}
      <div className="sidebar">

        <div className="sidebar-header">
          <button className="gear-btn">
            <i className="fas fa-gear"></i>
          </button>
          <h2 className="sidebar-title">Settings</h2>
        </div>

        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <Link
              to="account"
              className={`sidebar-link ${location.pathname.includes("account") ? "active" : ""
                }`}
            >
              <div className="sidebar-icon">
                <i className="fas fa-user-circle"></i>
              </div>
              Account
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to="personal"
              className={`sidebar-link ${location.pathname.includes("personal") ? "active" : ""
                }`}
            >
              <div className="sidebar-icon">
                <i className="fas fa-user-edit"></i>
              </div>
              Personal
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content (nested routes render here) */}
      <div className="setting-main-content">
        {/* User Info */}
        <div className="user-infos d-flex rounded-top">
          <img src={avatar} alt="User Avatar" className="user-avatars" />
          <div className="user-details">
            <div className="d-flex">
              <h3 className="user-names">{name}</h3>
              <span className="user-roles">{role}</span>
            </div>
            <p className="user-emails">{email}</p>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Setting;