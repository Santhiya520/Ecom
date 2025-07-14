import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://totalwebsolutions.co.in";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${BASE_URL}/api/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <button onClick={() => navigate("/")} style={styles.backButton}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#bde0fe",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    maxWidth: "400px",
    padding: "2rem",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#1e40af",
    color: "#fff",
    cursor: "pointer",
  },
  backButton: {
    marginTop: "1rem",
    padding: "10px",
    fontSize: "0.9rem",
    border: "1px solid #1e40af",
    borderRadius: "4px",
    backgroundColor: "#fff",
    color: "#1e40af",
    cursor: "pointer",
    width: "100%",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
  },
};

export default Login;
