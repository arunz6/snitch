import React, { useState } from "react";
import { useauth } from "../hook/use.auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { handelregister } = useauth();
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [isSeller, setisSeller] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const contact = phone;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handelregister({
      fullname: fullName,
      email,
      password,
      contact,
      isseller: isSeller,
    });
    navigate("/");
  };
  return (
    <div className="flex flex-col bg-background min-h-screen font-body-lg text-on-background antialiased">
      <main className="flex flex-grow justify-center items-center px-[var(--spacing-margin-mobile)] md:px-[var(--spacing-margin-desktop)] py-24 md:py-32">
        <div className="space-y-12 mx-auto w-full max-w-md">
          {/* Header Section */}
          <div className="space-y-4 text-center">
            <h1 className="font-display-lg font-bold text-primary text-5xl md:text-6xl uppercase tracking-tighter">
              Snitch
            </h1>
            <p className="font-body-lg text-on-surface-variant tracking-wide">
              Join the inner circle.
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              {/* Full Name */}
              <div className="group relative">
                <label
                  htmlFor="fullName"
                  className="block mb-2 font-label-caps text-on-surface-variant group-focus-within:text-primary text-xs uppercase tracking-widest transition-colors duration-300"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => {
                    setfullName(e.target.value);
                  }}
                  placeholder="Enter your full name"
                  required
                  className="bg-transparent px-0 py-2 border-0 focus:border-primary border-b border-outline-variant focus:outline-none focus:ring-0 w-full font-body-md text-on-surface text-base transition-colors duration-300 placeholder-surface-container-highest"
                />
              </div>

              {/* Email Address */}
              <div className="group relative">
                <label
                  htmlFor="email"
                  className="block mb-2 font-label-caps text-on-surface-variant group-focus-within:text-primary text-xs uppercase tracking-widest transition-colors duration-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  placeholder="name@example.com"
                  required
                  className="bg-transparent px-0 py-2 border-0 focus:border-primary border-b border-outline-variant focus:outline-none focus:ring-0 w-full font-body-md text-on-surface text-base transition-colors duration-300 placeholder-surface-container-highest"
                />
              </div>

              {/* Contact Number */}
              <div className="group relative">
                <label
                  htmlFor="phone"
                  className="block mb-2 font-label-caps text-on-surface-variant group-focus-within:text-primary text-xs uppercase tracking-widest transition-colors duration-300"
                >
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => {
                    setphone(e.target.value);
                  }}
                  placeholder="+1 (555) 000-0000"
                  required
                  className="bg-transparent px-0 py-2 border-0 focus:border-primary border-b border-outline-variant focus:outline-none focus:ring-0 w-full font-body-md text-on-surface text-base transition-colors duration-300 placeholder-surface-container-highest"
                />
              </div>

              {/* Password */}
              <div className="group relative">
                <label
                  htmlFor="password"
                  className="block mb-2 font-label-caps text-on-surface-variant group-focus-within:text-primary text-xs uppercase tracking-widest transition-colors duration-300"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    placeholder="••••••••"
                    required
                    className="bg-transparent px-0 py-2 pr-10 border-0 focus:border-primary border-b border-outline-variant focus:outline-none focus:ring-0 w-full font-body-md text-on-surface text-base transition-colors duration-300 placeholder-surface-container-highest"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="top-1/2 right-0 absolute focus:outline-none text-on-surface-variant hover:text-primary transition-colors -translate-y-1/2"
                  >
                    <span className="text-[20px] align-middle select-none material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Seller Checkbox */}
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                id="isSeller"
                name="isSeller"
                checked={isSeller}
                onChange={(e) => setisSeller(e.target.checked)}
                className="bg-transparent rounded-none border-outline-variant focus:ring-primary focus:ring-offset-background w-4 h-4 text-primary transition-colors duration-300 cursor-pointer"
              />
              <label
                htmlFor="isSeller"
                className="block ml-3 font-body-md text-on-surface-variant hover:text-on-surface text-sm transition-colors duration-200 cursor-pointer select-none"
              >
                Register as a seller
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="flex justify-center items-center gap-2 bg-primary-container hover:bg-primary px-6 py-4 w-full font-label-caps font-semibold text-on-primary-container text-xs tracking-widest active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                <span>CREATE ACCOUNT</span>
                <span className="text-[18px] material-symbols-outlined">
                  arrow_forward
                </span>
              </button>
            </div>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="font-body-md text-on-surface-variant text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="hover:text-primary-fixed text-primary underline underline-offset-4 transition-colors duration-300"
                >
                  Sign in
                </Link>
              </p>
            </div>
            <a
              href="/api/auth/google"
              className="flex justify-center items-center gap-3 bg-transparent hover:bg-surface-container-highest px-6 py-4 border hover:border-primary rounded-none border-outline-variant w-full font-label-caps text-on-background text-xs tracking-widest active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
      c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
      c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039
      l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
      c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
      c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24
      C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              <span>Continue with Google</span>
            </a>
          </form>
        </div>
      </main>
    </div>
  );
}
