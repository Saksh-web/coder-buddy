import { useState } from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar gets control function */}
      <Sidebar setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px", background: "#111", color: "white" }}>
        {children(activeTab)}
      </div>

    </div>
  );
}

export default Layout;