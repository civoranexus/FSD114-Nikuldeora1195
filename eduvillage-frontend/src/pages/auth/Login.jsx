
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../api/authApi";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  // Using the logic from Code 1: context provides 'login' function
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Logging in...");

    try {
      // API call logic from Code 1
      const res = await loginUser(form);
      const { token, user } = res.data;

      // Update context and storage
      login(user, token);

      toast.success(`Welcome back, ${user.name || 'User'}! 🎉`, { id: toastId });

      // Role-based navigation logic from Code 1
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid email or password", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#128e90] via-[#012136] to-[#01181F] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2%, transparent 0%), 
                           radial-gradient(circle at 75px 75px, rgba(255,255,255,0.2) 2%, transparent 0%)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center space-x-3 bg-white rounded-2xl px-6 py-4 shadow-2xl">
            <img src="https://civoranexus.com/logo.svg" alt="EduVillage" className="w-10 h-12" />
            <div className="text-left">
              <h1 className="text-2xl font-bold text-[#142C52]">EduVillage</h1>
              <p className="text-xs text-[#071426] opacity-60">Learn & Grow</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-linear-to-r from-[#1B9AAA] to-[#16808D] p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
            <p className="text-[#CCE7EC]">Sign in to continue your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#142C52]">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4C97A8]">✉️</div>
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#CCE7EC] rounded-xl focus:outline-none focus:border-[#1B9AAA] transition-colors text-[#071426]"
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#142C52]">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4C97A8]">🔒</div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-3 border-2 border-[#CCE7EC] rounded-xl focus:outline-none focus:border-[#1B9AAA] transition-colors text-[#071426]"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4C97A8] hover:text-[#1B9AAA]"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-[#CCE7EC] text-[#1B9AAA]" />
                <span className="text-sm text-[#071426]">Remember me</span>
              </label>
              <Link to="/forgot-password" size="sm" className="text-sm text-[#1B9AAA] hover:underline font-medium">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 transform hover:-translate-y-1"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#CCE7EC]"></div></div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#071426] opacity-60">Don't have an account?</span>
              </div>
            </div>

            <Link
              to="/register"
              className="block w-full text-center py-4 rounded-xl font-bold text-lg border-2 border-[#1B9AAA] text-[#1B9AAA] hover:bg-[#1B9AAA] hover:text-white transition-all"
            >
              Create Account
            </Link>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-white text-sm opacity-80">
            By signing in, you agree to our{" "}
            <Link to="/terms" className="underline">Terms</Link> & <Link to="/privacy" className="underline">Privacy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;