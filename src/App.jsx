import React, { useState, useEffect } from "react";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const [logText, setLogText] = useState("");
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState("");
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const savedPassword = localStorage.getItem("vaultPassword");
    const savedLogs = JSON.parse(localStorage.getItem(`logs-${today}`)) || [];
    if (savedLogs) setLogs(savedLogs);
    if (savedPassword) setStoredPassword(savedPassword);
  }, [today]);

  const handleLogin = () => {
    if (!storedPassword) {
      localStorage.setItem("vaultPassword", inputPassword);
      setStoredPassword(inputPassword);
      setIsAuthenticated(true);
      setMessage("Password set for the first time.");
    } else if (inputPassword === storedPassword) {
      setIsAuthenticated(true);
      setMessage("Access granted.");
    } else {
      setMessage("❌ Incorrect password!");
    }
    setInputPassword("");
  };

  const addLog = () => {
    if (!logText.trim()) return;
    const newLogs = [...logs, { id: Date.now(), text: logText }];
    setLogs(newLogs);
    localStorage.setItem(`logs-${today}`, JSON.stringify(newLogs));
    setLogText("");
    setMessage("✅ Task added.");
  };

  const deleteLog = (id) => {
    const updatedLogs = logs.filter((log) => log.id !== id);
    setLogs(updatedLogs);
    localStorage.setItem(`logs-${today}`, JSON.stringify(updatedLogs));
    setMessage("🗑️ Task deleted.");
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h2 style={styles.title}>🔐 Log Tracker Vault</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleLogin} style={styles.button}>
            Access
          </button>
          <p style={styles.message}>{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>📝 Log Tracker – {today}</h2>
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="What did you do today?"
            value={logText}
            onChange={(e) => setLogText(e.target.value)}
            style={styles.input}
          />
          <button onClick={addLog} style={styles.button}>
            Add
          </button>
        </div>

        <div style={styles.taskList}>
          {logs.length === 0 ? (
            <p style={{ color: "#777", marginTop: "20px" }}>No Logs yet.</p>
          ) : (
            logs.map((log) => (
              <div key={log.id} style={styles.taskCard}>
                <span style={styles.taskText}>{log.text}</span>
                <button
                  onClick={() => deleteLog(log.id)}
                  style={styles.deleteBtn}
                >
                  ✖
                </button>
              </div>
            ))
          )}
        </div>
        <p style={styles.message}>{message}</p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "#f2f4f8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Segoe UI, sans-serif",
    padding: "20px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "500px",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "24px",
    color: "#333",
  },
  inputGroup: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  input: {
    flexGrow: 1,
    padding: "12px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    minWidth: "0",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    borderRadius: "10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  taskList: {
    marginTop: "10px",
  },
  taskCard: {
    display: "flex",
    justifyContent: "space-between",
    background: "#f9fafb",
    padding: "14px 18px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    marginBottom: "10px",
    alignItems: "center",
  },
  taskText: {
    fontSize: "16px",
    color: "#333",
  },
  deleteBtn: {
    background: "none",
    border: "none",
    fontSize: "18px",
    color: "#d11a2a",
    cursor: "pointer",
  },
  message: {
    textAlign: "center",
    marginTop: "10px",
    fontSize: "14px",
    color: "#444",
  },
};
