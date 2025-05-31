import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://reqres.in/api/login", 
        {email, password},
        {
          headers: {
            "x-api-key": "reqres-free-v1",
          },
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", email);
      setError("");
      navigate("/userlist");
    } catch (error) {
      console.error(error.response?.data);
      setError("user not found");
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-container">
      <h2>🔐 로그인</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required 
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">로그인</button>
      {error && (
        <div
          style={{
            color: "black",
            padding: "8px 12px",
            marginTop: "12px",
            fontWeight: "normal",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          <span>❌</span> {error}
        </div>
      )}
    </form>
  );
}

export default LoginForm;
