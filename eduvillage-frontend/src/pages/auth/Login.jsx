import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser(form);
      const user = res.data.user;

      login(user, res.data.token);

     if (user.role === "admin") {
  navigate("/admin/dashboard");
} else if (user.role === "teacher") {
  navigate("/teacher/dashboard");
} else {
  navigate("/dashboard");
}

    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#D4DBE9" }}
    >
      <div className="w-full max-w-md">
        <div className="card">
          <h1 className="text-3xl mb-2" style={{ color: "#142C52" }}>
            Welcome back
          </h1>
          <p className="mb-6" style={{ color: "#5B74A3" }}>
            Sign in to continue your learning journey
          </p>

          {error && (
            <p className="text-sm text-red-600 mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="input-group">
              <label className="input-label">Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />
            </div>

            <button className="btn btn-primary">
              Login
            </button>
          </form>

          <p className="helper-text">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold"
              style={{ color: "#142C52" }}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
