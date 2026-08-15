import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBars,
  FaBell,
  FaSearch,
  FaChevronDown,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import "./Navbar.css";

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const [user, setUser] = useState({
    full_name: "Wedding Planner",
    email: "",
    profile_image: "",
  });

  /* =========================
     LOAD USER
  ========================= */

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setUser({
          full_name:
            parsedUser.full_name ||
            parsedUser.name ||
            "Wedding Planner",

          email:
            parsedUser.email || "",

          profile_image:
            parsedUser.profile_image || "",
        });
      } catch (error) {
        console.error(
          "Unable to load user:",
          error
        );
      }
    }
  }, []);

  /* =========================
     PROFILE
  ========================= */

  const handleProfile = () => {
    setProfileOpen(false);
    navigate("/profile");
  };

  /* =========================
     SETTINGS
  ========================= */

  const handleSettings = () => {
    setProfileOpen(false);
    navigate("/settings");
  };

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setProfileOpen(false);

    navigate("/login");
  };

  /* =========================
     NOTIFICATIONS
  ========================= */

  const handleNotifications = () => {
    setNotificationOpen(
      (previous) => !previous
    );

    setProfileOpen(false);
  };

  return (
    <header className="navbar">

      {/* =========================
          LEFT
      ========================= */}

      <div className="navbar-left">

        <button
          className="navbar-menu-btn"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <FaBars />
        </button>


        {/* SEARCH */}

        <div className="navbar-search">

          <FaSearch />

          <input
            type="search"
            placeholder="Search Wedding Bloom..."
            aria-label="Search"
          />

        </div>

      </div>


      {/* =========================
          RIGHT
      ========================= */}

      <div className="navbar-right">


        {/* =========================
            NOTIFICATIONS
        ========================= */}

        <div className="navbar-notification-wrapper">

          <button
            className={`navbar-notification-btn ${
              notificationOpen
                ? "active"
                : ""
            }`}
            onClick={handleNotifications}
            aria-label="Notifications"
          >

            <FaBell />

            <span className="navbar-notification-dot"></span>

          </button>


          {/* NOTIFICATION DROPDOWN */}

          {notificationOpen && (

            <div className="navbar-notification-dropdown">

              <div className="navbar-dropdown-header">

                <div>
                  <strong>
                    Notifications
                  </strong>

                  <span>
                    Your latest updates
                  </span>
                </div>

              </div>


              <div className="navbar-notification-item">

                <div className="navbar-notification-icon">
                  <FaBell />
                </div>

                <div>

                  <strong>
                    Wedding planning
                  </strong>

                  <span>
                    Keep your wedding
                    tasks and events updated.
                  </span>

                </div>

              </div>


              <div className="navbar-notification-item">

                <div className="navbar-notification-icon">
                  <FaUser />
                </div>

                <div>

                  <strong>
                    Welcome to Wedding Bloom
                  </strong>

                  <span>
                    Your wedding planner
                    workspace is ready.
                  </span>

                </div>

              </div>


              <div className="navbar-notification-footer">

                <button
                  onClick={() =>
                    setNotificationOpen(false)
                  }
                >
                  Close
                </button>

              </div>

            </div>

          )}

        </div>


        {/* DIVIDER */}

        <div className="navbar-divider"></div>


        {/* =========================
            USER PROFILE
        ========================= */}

        <div className="navbar-profile-wrapper">

          <button
            className={`navbar-profile ${
              profileOpen
                ? "active"
                : ""
            }`}
            onClick={() =>
              setProfileOpen(
                (previous) => !previous
              )
            }
          >

            {/* AVATAR */}

            <div className="navbar-avatar">

              {user.profile_image ? (

                <img
                  src={user.profile_image}
                  alt={user.full_name}
                />

              ) : (

                <span>
                  {user.full_name
                    ? user.full_name
                        .charAt(0)
                        .toUpperCase()
                    : "W"}
                </span>

              )}

            </div>


            {/* USER INFO */}

            <div className="navbar-user-info">

              <strong>
                {user.full_name}
              </strong>

              <small>
                My Account
              </small>

            </div>


            <FaChevronDown
              className={`navbar-chevron ${
                profileOpen
                  ? "rotate"
                  : ""
              }`}
            />

          </button>


          {/* =========================
              PROFILE DROPDOWN
          ========================= */}

          {profileOpen && (

            <div className="navbar-profile-dropdown">

              <div className="navbar-profile-dropdown-user">

                <div className="navbar-dropdown-avatar">

                  {user.profile_image ? (

                    <img
                      src={user.profile_image}
                      alt={user.full_name}
                    />

                  ) : (

                    <span>
                      {user.full_name
                        ? user.full_name
                            .charAt(0)
                            .toUpperCase()
                        : "W"}
                    </span>

                  )}

                </div>


                <div>

                  <strong>
                    {user.full_name}
                  </strong>

                  <span>
                    {user.email ||
                      "Wedding Planner"}
                  </span>

                </div>

              </div>


              <div className="navbar-dropdown-divider"></div>


              {/* PROFILE */}

              <button
                className="navbar-dropdown-item"
                onClick={handleProfile}
              >

                <FaUser />

                <span>
                  My Profile
                </span>

              </button>


              {/* SETTINGS */}

              <button
                className="navbar-dropdown-item"
                onClick={handleSettings}
              >

                <FaCog />

                <span>
                  Settings
                </span>

              </button>


              <div className="navbar-dropdown-divider"></div>


              {/* LOGOUT */}

              <button
                className="navbar-dropdown-item logout"
                onClick={handleLogout}
              >

                <FaSignOutAlt />

                <span>
                  Logout
                </span>

              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;