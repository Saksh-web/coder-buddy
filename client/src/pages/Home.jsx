import Layout from "../components/Layout";

function Home() {
  return (
    <Layout>
      {(activeTab) => (
        <div>

          {activeTab === "dashboard" && <h1>Dashboard</h1>}

          {activeTab === "add" && <h1>Add Project Page</h1>}

          {activeTab === "received" && <h1>📥 Received Projects</h1>}

          {activeTab === "sent" && <h1>📤 Sent Projects</h1>}

          {activeTab === "self" && <h1>👤 Self Assigned</h1>}

          {activeTab === "submitted" && <h1>📄 Submitted</h1>}

          {activeTab === "verify" && <h1>✅ Verify</h1>}

          {activeTab === "pending" && <h1>🕣 Pending Verification</h1>}

          {activeTab === "replies" && <h1>💬 Replies</h1>}

        </div>
      )}
    </Layout>
  );
}

export default Home;