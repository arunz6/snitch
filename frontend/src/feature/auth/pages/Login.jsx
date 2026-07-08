import React, { useState } from "react";
import { useauth } from "../hook/use.auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const { handlelogin } = useauth();
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const userdata = await handlelogin({
        email,
        password,
      });
      if (userdata.role == "buyer") {
        navigate("/");
      }
      if (userdata.role == "seller") {
        navigate("/seller/productdashbord");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to sign in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-background min-h-screen font-body-md text-on-background antialiased">
      {/* Top Navigation Bar */}
      <header className="z-50 flex justify-between items-center bg-background px-[var(--spacing-margin-mobile)] md:px-[var(--spacing-margin-desktop)] py-[var(--spacing-unit)] border-b border-outline-variant w-full">
        <div className="font-display-lg text-on-background text-2xl tracking-tighter">
          SNITCH
        </div>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="active:opacity-80 text-on-surface-variant hover:text-primary scale-95 transition-all"
          >
            <span className="material-symbols-outlined">close</span>
          </Link>
        </div>
      </header>

      {/* Main Split Layout */}
      <main className="flex md:flex-row flex-col flex-grow items-stretch overflow-hidden">
        {/* Imagery Section (Left side on Desktop) */}
        <div className="hidden md:block relative bg-surface-container-lowest md:w-1/2 overflow-hidden">
          <div className="absolute inset-0 opacity-60">
            <div
              className="bg-cover bg-center w-full h-full"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D')`,
              }}
            />
          </div>
          <div className="bottom-16 left-16 absolute max-w-sm">
            <h2 className="mb-4 font-display-lg text-primary text-4xl md:text-5xl leading-tight">
              Elegance in shadows.
            </h2>
            <p className="font-body-lg text-on-surface-variant italic">
              The 2024 Noir Collection is now available for members.
            </p>
          </div>
        </div>

        {/* Login Form Section (Right side) */}
        <div className="flex justify-center items-center bg-background p-8 md:p-24 w-full md:w-1/2">
          <div className="w-full max-w-md">
            {/* Branding / Greeting */}
            <div className="mb-12">
              <span className="block mb-2 font-label-caps text-primary text-xs uppercase tracking-widest">
                Authentication
              </span>
              <h1 className="mb-4 font-display-lg text-on-background text-4xl md:text-5xl">
                Sign In
              </h1>
              <p className="font-body-md text-on-surface-variant">
                Enter your credentials to access your private wardrobe.
              </p>
            </div>

            {/* Login Form */}
            <form className="space-y-10" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-error-container px-4 py-3 border-error border-l-4 font-body-md text-on-error-container text-sm">
                  {error}
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-2 underline-expand">
                <label
                  className="block font-label-caps text-on-surface-variant text-xs"
                  htmlFor="email"
                >
                  EMAIL ADDRESS
                </label>
                <input
                  className="bg-transparent px-0 py-3 border-0 focus:border-primary border-b border-outline-variant focus:outline-none focus:ring-0 w-full font-body-md text-on-background transition-colors duration-300 placeholder-surface-container-highest"
                  id="email"
                  name="email"
                  placeholder="vogue@noir.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div className="relative space-y-2 underline-expand">
                <div className="flex justify-between items-center">
                  <label
                    className="block font-label-caps text-on-surface-variant text-xs"
                    htmlFor="password"
                  >
                    PASSWORD
                  </label>
                  <button
                    type="button"
                    className="hover:opacity-80 focus:outline-none font-label-caps text-[10px] text-primary uppercase tracking-wider transition-opacity cursor-pointer"
                    onClick={() => {}}
                  >
                    FORGOT?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <input
                    className="bg-transparent px-0 py-3 pr-10 border-0 focus:border-primary border-b border-outline-variant focus:outline-none focus:ring-0 w-full font-body-md text-on-background transition-colors duration-300 placeholder-surface-container-highest"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                  <button
                    className="right-0 absolute focus:outline-none text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* CTA Section */}
              <div className="space-y-6 pt-6">
                <button
                  className="bg-primary-container hover:bg-primary disabled:opacity-55 py-5 w-full font-label-caps font-semibold text-on-primary-container text-xs tracking-[0.2em] hover:tracking-[0.25em] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "AUTHENTICATING..." : "SIGN IN"}
                </button>
                <div className="text-center">
                  <p className="font-body-md text-on-surface-variant text-sm">
                    Don't have an account?
                    <Link
                      className="ml-1 font-semibold text-primary decoration-1 hover:underline underline-offset-4 transition-colors duration-300"
                      to="/register"
                    >
                      Register
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
              </div>
            </form>

            {/* Footer Links Inside Form Area for Mobile */}
            <div className="flex justify-between items-center opacity-40 hover:opacity-100 mt-16 transition-opacity">
              <span className="font-label-caps text-[10px] tracking-tighter">
                EST. 2024
              </span>
              <div className="flex-grow mx-4 bg-outline-variant h-[1px]"></div>
              <span className="font-label-caps text-[10px] tracking-tighter">
                NOIR LUXURY
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <footer className="flex md:flex-row flex-col justify-between items-center bg-background mt-auto px-[var(--spacing-margin-mobile)] md:px-[var(--spacing-margin-desktop)] py-[var(--spacing-gutter)] border-t border-outline-variant w-full">
        <div className="hidden md:block opacity-20 font-display-lg text-on-surface text-4xl select-none">
          SNITCH
        </div>
        <div className="flex md:flex-row flex-col items-center gap-8">
          <p className="font-label-caps text-[11px] text-on-surface-variant">
            © 2024 NOIR LUXURY. ALL RIGHTS RESERVED.
          </p>
          <nav className="flex gap-6">
            <a
              className="font-label-caps text-[11px] text-on-surface-variant hover:text-primary transition-colors duration-200"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="font-label-caps text-[11px] text-on-surface-variant hover:text-primary transition-colors duration-200"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="font-label-caps text-[11px] text-on-surface-variant hover:text-primary transition-colors duration-200"
              href="#"
            >
              Cookie Settings
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
