import React, { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import AIAssistant from "../AIAssistant/AIAssistant";

import "./AppLayout.css";

function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app">

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <Navbar
        onMenuClick={() => setSidebarOpen(true)}
      />

      <main className="page-content">
        {children}
      </main>

      <AIAssistant />

    </div>
  );
}

export default AppLayout;