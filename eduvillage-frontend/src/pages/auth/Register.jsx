import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authApi";
import usePageTitle from "../../utils/usePageTitle";
import AuthLayout from "./AuthLayout";

const Register = () => {
  usePageTitle("Register | EduVillage");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(form);
    navigate("/login");
  };

  return (
    <AuthLayout
      title="Join EduVillage"
      subtitle="Create your account to get started"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          placeholder="Full name"
          className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primaryDark transition">
          Create Account
        </button>
      </form>

      <p className="text-sm text-center mt-6 text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-semibold">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;