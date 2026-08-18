import React from "react";
import {
  FaStore,
  FaBox,
  FaCalendarCheck,
  FaStar,
  FaArrowRight,
  FaBriefcase,
  FaTags,
  FaClipboardList,
  FaMoneyBillWave,
} from "react-icons/fa";

import "./VendorDashboard.css";

function VendorDashboard() {

  // =========================================
  // GET LOGGED-IN USER
  // =========================================

  const storedUser = localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;


  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="vendor-dashboard-page">


      {/* =====================================
          WELCOME
      ===================================== */}

      <section className="vendor-dashboard-welcome">

        <div>

          <span className="vendor-dashboard-eyebrow">
            WELCOME TO WEDDING BLOOM
          </span>

          <h1>
            Hello,{" "}
            {user?.full_name || "Vendor"}.
            <br />
            Grow your wedding business.
          </h1>

          <p>
            Manage your business, packages,
            bookings, deals, and reviews
            all in one place.
          </p>

        </div>


        <div className="vendor-dashboard-welcome-icon">
          <FaStore />
        </div>

      </section>



      {/* =====================================
          STATS
      ===================================== */}

      <section className="vendor-dashboard-stats">


        {/* BUSINESS */}

        <div className="vendor-dashboard-stat-card">

          <div className="vendor-dashboard-stat-icon">
            <FaStore />
          </div>

          <div>

            <span>
              Business
            </span>

            <strong>
              Active
            </strong>

          </div>

        </div>


        {/* PACKAGES */}

        <div className="vendor-dashboard-stat-card">

          <div className="vendor-dashboard-stat-icon">
            <FaBox />
          </div>

          <div>

            <span>
              Packages
            </span>

            <strong>
              0
            </strong>

          </div>

        </div>


        {/* BOOKINGS */}

        <div className="vendor-dashboard-stat-card">

          <div className="vendor-dashboard-stat-icon">
            <FaCalendarCheck />
          </div>

          <div>

            <span>
              Bookings
            </span>

            <strong>
              0
            </strong>

          </div>

        </div>


        {/* REVIEWS */}

        <div className="vendor-dashboard-stat-card">

          <div className="vendor-dashboard-stat-icon">
            <FaStar />
          </div>

          <div>

            <span>
              Rating
            </span>

            <strong>
              0.00
            </strong>

          </div>

        </div>

      </section>



      {/* =====================================
          BUSINESS OVERVIEW
      ===================================== */}

      <section className="vendor-dashboard-business-card">


        <div className="vendor-dashboard-business-main">

          <div className="vendor-dashboard-business-icon">
            <FaBriefcase />
          </div>


          <div>

            <span className="vendor-dashboard-card-eyebrow">
              YOUR BUSINESS
            </span>

            <h2>
              {user?.business_name || "Your Business"}
            </h2>

            <p>
              <FaStore />

              {user?.role === "vendor"
                ? "Wedding Service Provider"
                : "Vendor Account"}

            </p>

          </div>

        </div>


        <button
          type="button"
          className="vendor-dashboard-business-btn"
        >

          Manage Business

          <FaArrowRight />

        </button>

      </section>



      {/* =====================================
          CONTENT GRID
      ===================================== */}

      <section className="vendor-dashboard-content-grid">


        {/* =====================================
            QUICK ACCESS
        ===================================== */}

        <div className="vendor-dashboard-panel">

          <div className="vendor-dashboard-panel-header">

            <div>

              <span>
                BUSINESS
              </span>

              <h2>
                Quick Access
              </h2>

            </div>

          </div>


          <div className="vendor-dashboard-quick-links">


            {/* BUSINESS */}

            <button
              type="button"
            >

              <FaStore />

              <span>
                My Business
              </span>

              <FaArrowRight />

            </button>


            {/* PACKAGES */}

            <button
              type="button"
            >

              <FaBox />

              <span>
                Packages
              </span>

              <FaArrowRight />

            </button>


            {/* BOOKINGS */}

            <button
              type="button"
            >

              <FaClipboardList />

              <span>
                Bookings
              </span>

              <FaArrowRight />

            </button>


            {/* DEALS */}

            <button
              type="button"
            >

              <FaTags />

              <span>
                Deals
              </span>

              <FaArrowRight />

            </button>


            {/* REVIEWS */}

            <button
              type="button"
            >

              <FaStar />

              <span>
                Reviews
              </span>

              <FaArrowRight />

            </button>

          </div>

        </div>



        {/* =====================================
            BUSINESS STATUS
        ===================================== */}

        <div className="vendor-dashboard-panel">

          <div className="vendor-dashboard-panel-header">

            <div>

              <span>
                YOUR BUSINESS
              </span>

              <h2>
                Business Overview
              </h2>

            </div>

          </div>


          <div className="vendor-dashboard-status-content">


            <div className="vendor-dashboard-status-row">

              <span>
                Account
              </span>

              <strong className="vendor-dashboard-status-badge">
                Active
              </strong>

            </div>


            <div className="vendor-dashboard-status-row">

              <span>
                Business
              </span>

              <strong>
                {user?.business_name || "Not added"}
              </strong>

            </div>


            <div className="vendor-dashboard-status-row">

              <span>
                Packages
              </span>

              <strong>
                0
              </strong>

            </div>


            <div className="vendor-dashboard-status-row">

              <span>
                Bookings
              </span>

              <strong>
                0
              </strong>

            </div>


            <div className="vendor-dashboard-status-row">

              <span>
                Rating
              </span>

              <strong>
                0.00
              </strong>

            </div>


            <div className="vendor-dashboard-status-row">

              <span>
                Earnings
              </span>

              <strong>
                Rs. 0
              </strong>

            </div>


          </div>

        </div>

      </section>



      {/* =====================================
          GET STARTED
      ===================================== */}

      <section className="vendor-dashboard-get-started">

        <div className="vendor-dashboard-get-started-icon">
          <FaMoneyBillWave />
        </div>

        <div>

          <span className="vendor-dashboard-card-eyebrow">
            GET STARTED
          </span>

          <h2>
            Build your wedding business
          </h2>

          <p>
            Add your packages, create attractive
            deals, and start connecting with couples
            looking for your services.
          </p>

        </div>


        <button
          type="button"
          className="vendor-dashboard-start-btn"
        >

          Get Started

          <FaArrowRight />

        </button>

      </section>


    </div>
  );
}

export default VendorDashboard;