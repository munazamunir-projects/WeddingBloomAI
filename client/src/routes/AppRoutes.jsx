import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/Dashboard";
import Weddings from "../pages/Weddings";
import Guests from "../pages/Guests";
import Events from "../pages/Events";
import Expenses from "../pages/Expenses";
import Vendors from "../pages/Vendors";
import Packages from "../pages/Packages";
import Deals from "../pages/Deals";
import Bookings from "../pages/Bookings";
import Payments from "../pages/Payments";
import Reviews from "../pages/Reviews";
import Favorites from "../pages/Favorites";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";

function AppRoutes() {
  return (
    <Routes>

      {/* =========================
          AUTH
      ========================= */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      {/* =========================
          APPLICATION
      ========================= */}

      <Route
        path="/"
        element={
          <AppLayout>
            <Dashboard />
          </AppLayout>
        }
      />

      <Route
        path="/weddings"
        element={
          <AppLayout>
            <Weddings />
          </AppLayout>
        }
      />

      <Route
        path="/guests"
        element={
          <AppLayout>
            <Guests />
          </AppLayout>
        }
      />

      <Route
        path="/events"
        element={
          <AppLayout>
            <Events />
          </AppLayout>
        }
      />

      <Route
        path="/expenses"
        element={
          <AppLayout>
            <Expenses />
          </AppLayout>
        }
      />

      <Route
        path="/vendors"
        element={
          <AppLayout>
            <Vendors />
          </AppLayout>
        }
      />

      <Route
        path="/packages"
        element={
          <AppLayout>
            <Packages />
          </AppLayout>
        }
      />

      <Route
        path="/deals"
        element={
          <AppLayout>
            <Deals />
          </AppLayout>
        }
      />

      <Route
        path="/bookings"
        element={
          <AppLayout>
            <Bookings />
          </AppLayout>
        }
      />

      <Route
        path="/payments"
        element={
          <AppLayout>
            <Payments />
          </AppLayout>
        }
      />

      <Route
        path="/reviews"
        element={
          <AppLayout>
            <Reviews />
          </AppLayout>
        }
      />

      <Route
        path="/favorites"
        element={
          <AppLayout>
            <Favorites />
          </AppLayout>
        }
      />

      <Route
        path="/notifications"
        element={
          <AppLayout>
            <Notifications />
          </AppLayout>
        }
      />

      <Route
        path="/profile"
        element={
          <AppLayout>
            <Profile />
          </AppLayout>
        }
      />

      <Route
        path="/settings"
        element={
          <AppLayout>
            <Settings />
          </AppLayout>
        }
      />


      {/* =========================
          FALLBACK
      ========================= */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default AppRoutes;