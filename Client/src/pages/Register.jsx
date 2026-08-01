import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/Register.css";
import { registerUser } from "../api/auth";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await registerUser({
        username,
        email,
        password,
      });

      if (!data.success) {
        setError(data.message);
        setLoading(false);
        return;
      }

      alert("Registration Successful");

      navigate("/login");

    } catch (err) {
      setError("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <main className="login-page">

      <div className="login-card">

        <h1>Create Account</h1>

        <p>
          Join AI GitHub Code Reviewer
        </p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">

            {loading
              ? "Creating..."
              : "Register"}

          </button>

        </form>

        {error && (

          <p className="auth-error">

            {error}

          </p>

        )}

        <p className="auth-switch">

          Already have an account?

          <Link to="/login">

            Login

          </Link>

        </p>

      </div>

    </main>
  );
};

export default Register;