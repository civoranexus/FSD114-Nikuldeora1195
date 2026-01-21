// import { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { loginUser } from "../../api/authApi";
// import { AuthContext } from "../../context/AuthContext";
// import usePageTitle from "../../utils/usePageTitle";
// import AuthLayout from "./AuthLayout";

// const Login = () => {
//   usePageTitle("Login | EduVillage");
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await loginUser(form);
//       login(res.data.user, res.data.token);
//       navigate(res.data.user.role === "teacher" ? "/teacher/dashboard" : "/dashboard");
//     // eslint-disable-next-line no-unused-vars
//     } catch (err) {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <AuthLayout
//       title="Welcome back"
//       subtitle="Sign in to continue your learning journey"
//     >
//       {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <input
//           type="email"
//           placeholder="Email address"
//           className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//           required
//         />

//         <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primaryDark transition">
//           Sign In
//         </button>
//       </form>

//       <p className="text-sm text-center mt-6 text-gray-500">
//         Don’t have an account?{" "}
//         <Link to="/register" className="text-primary font-semibold">
//           Sign up
//         </Link>
//       </p>
//     </AuthLayout>
//   );
// };

// export default Login;










import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login data:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F4F7FA' }}>
      <div className="w-full max-w-md">
        {/* Logo & Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ backgroundColor: '#1B9AAA' }}>
            <svg className="w-9 h-9" fill="white" viewBox="0 0 24 24">
              <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: '#142C52' }}>
            Welcome back
          </h1>
          <p className="text-sm" style={{ color: '#64748B' }}>
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: '#FFFFFF' }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#071426' }}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  color: '#071426'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1B9AAA'}
                onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                placeholder="you@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: '#071426' }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  color: '#071426'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1B9AAA'}
                onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                placeholder="Enter your password"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-end">
              <Link 
                to="/forgot-password"
                className="text-sm font-medium hover:underline"
                style={{ color: '#1B9AAA' }}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
              style={{ backgroundColor: '#1B9AAA' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#16808D'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#1B9AAA'}
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 text-gray-500" style={{ backgroundColor: '#FFFFFF' }}>
                or
              </span>
            </div>
          </div>

          {/* Toggle to Register */}
          <div className="text-center">
            <p className="text-sm" style={{ color: '#64748B' }}>
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold hover:underline"
                style={{ color: '#1B9AAA' }}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-xs mt-6" style={{ color: '#94A3B8' }}>
          By continuing, you agree to EduVillage's Terms of Service and Privacy Policy
        </p>

        {/* Brand Attribution */}
        <div className="text-center mt-8">
          <p className="text-xs font-medium" style={{ color: '#94A3B8' }}>
            Powered by <span style={{ color: '#142C52' }}>Civora Nexus</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;