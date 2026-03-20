import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ ADD

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      console.log("LOGIN RESPONSE:", res.data); // ✅ DEBUG

      // ✅ STORE TOKEN
      localStorage.setItem("token", res.data.token);

      // ✅ SET USER
      setUser(res.data.user);

      // ✅ REDIRECT TO DASHBOARD
      navigate("/");

    } catch (err) {
      console.log(err.response);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;