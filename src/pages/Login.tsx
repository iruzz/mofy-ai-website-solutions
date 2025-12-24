import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      // simpan token
      localStorage.setItem("token", token);

      console.log("✅ LOGIN SUCCESS");
      console.log("USER:", user);
      console.log("TOKEN:", token);

      // redirect TANPA reload
      navigate("/dashboard");
    } catch (err: any) {
      console.error("❌ LOGIN FAILED", err?.response || err);
      setError(err?.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
