import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px", background: "#111", color: "white" }}>
        {children}
      </div>

    </div>
  );
}

export default Layout;