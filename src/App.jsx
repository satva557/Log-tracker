import React, { useState, useEffect } from "react";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const [log, setLog] = useState("");
  const [message, setMessage] = useState("");
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const savedPassword = localStorage.getItem("vaultPassword");
    const savedLog = localStorage.getItem(`log-${today}`);
    if (savedLog) setLog(savedLog);
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
      setMessage("Incorrect password!");
    }
    setInputPassword("");
  };

  const handleSave = () => {
    localStorage.setItem(`log-${today}`, log);
    setMessage("Log saved successfully.");
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.container}>
        <h2>🔒 Enter Vault Password</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Enter Vault
        </button>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>📘 Log Tracker Vault</h2>
      <h3>🗓️ {today}</h3>
      <textarea
        placeholder="What did you do today?"
        value={log}
        onChange={(e) => setLog(e.target.value)}
        style={styles.textarea}
      />
      <button onClick={handleSave} style={styles.button}>
        Save Log
      </button>
      <p>{message}</p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    textAlign: "center",
    border: "2px solid #ddd",
    borderRadius: "12px",
    fontFamily: "Arial",
    backgroundColor: "#fefefe",
  },
  input: {
    width: "80%",
    padding: "10px",
    fontSize: "16px",
    margin: "10px 0",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },
  textarea: {
    width: "100%",
    height: "200px",
    fontSize: "16px",
    padding: "10px",
    marginTop: "10px",
  },
};
