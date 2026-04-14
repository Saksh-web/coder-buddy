import { useState } from "react";

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`sidebar ${open ? "open" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      

      <nav className="nav">
        <button>🏠 <span>Dashboard</span></button>
        <button>➕ <span>Add Project</span></button>
        <button>📥 <span>Received</span></button>
        <button>📤 <span>Sent</span></button>
        <button>👤 <span>Self</span></button>
        <button>📄 <span>Submitted</span></button>
        <button>✅ <span>Verify</span></button>
         <button>🕣<span>pending for verification</span></button>
        <button>💬 <span>Replies</span></button>
        <button className="logout">🚪 <span>Logout</span></button>
      </nav>
    </div>
  );
}

export default Sidebar;