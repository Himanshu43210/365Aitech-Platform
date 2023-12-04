import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../features/login/loginSlice";
import "./css/login.css";
import { LOGIN_API } from "../Const";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("hs");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  //   const loginState = useSelector((state) => state.login);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(LOGIN_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data);
      if (data.success && data.status === 200) {
        console.log("inside this");
        // Dispatch action to save token and username to Redux store
        dispatch(
          loginSuccess({
            token: data?.token,
            userName: data?.userName,
          })
        );

        // Redirect to Dashboard
        navigate("/dashboard");
      } else {
        // Set error message
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
