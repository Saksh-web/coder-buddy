import { useState } from "react";

function Sidebar({ setActiveTab }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`sidebar ${open ? "open" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <nav className="nav">

        <button onClick={() => setActiveTab("dashboard")}>
          🏠 <span>Dashboard</span>
        </button>

        <button onClick={() => setActiveTab("add")}>
          ➕ <span>Add Project</span>
        </button>

        <button onClick={() => setActiveTab("received")}>
          📥 <span>Received</span>
        </button>

        <button onClick={() => setActiveTab("sent")}>
          📤 <span>Sent</span>
        </button>

        <button onClick={() => setActiveTab("self")}>
          👤 <span>Self Assigned</span>
        </button>

        <button onClick={() => setActiveTab("submitted")}>
          📄 <span>Submitted</span>
        </button>

        <button onClick={() => setActiveTab("verify")}>
          ✅ <span>Verify</span>
        </button>

        <button onClick={() => setActiveTab("pending")}>
          🕣 <span>Pending</span>
        </button>

        <button onClick={() => setActiveTab("replies")}>
          💬 <span>Replies</span>
        </button>

        <button className="logout">
          🚪 <span>Logout</span>
        </button>

      </nav>
    </div>
  );
}

export default Sidebar;