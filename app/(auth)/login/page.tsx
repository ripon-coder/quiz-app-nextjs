"use client";

import { useState, useEffect } from "react";
import { loginUser } from "@/app/lib/api/loginApi";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.replace("/");
    }
  }, [router]);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);
    setPassword("");
    try {
      const data = await loginUser(email, password);
      setEmail("");
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        setSuccessMsg("Login successful !");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        setErrorMsg("Login failed: token not received");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-12 flex items-center justify-center bg-black px-4">
      <div className="bg-[#1a1c1d] p-8 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* email input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2  bg-black text-white focus:outline-none focus:ring-0 text-sm"
              required
              disabled={loading}
            />
          </div>

          {/* password input */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Your password"
              className="w-full px-4 py-2 bg-black text-white focus:outline-none focus:ring-0 pr-10 text-sm"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[35px] text-gray-400 hover:text-gray-200 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
              disabled={loading}
            >
              {showPassword ? (
                /* eye open icon SVG */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                /* eye closed icon SVG */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.983 9.983 0 012.187-3.357M15 12a3 3 0 00-3-3m0 0a3 3 0 00-3 3m0 0a3 3 0 003 3m0 0a3 3 0 003-3m6 6L3 3"
                  />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            className={`w-full ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-800 hover:bg-blue-700"
            } transition-colors text-white font-semibold py-2 cursor-pointer rounded`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {errorMsg && (
          <p className="mt-4 text-red-500 text-center">{errorMsg}</p>
        )}
        {successMsg && (
          <p className="mt-4 text-green-500 text-center">{successMsg}</p>
        )}

        <div className="mt-4 flex justify-end text-sm text-gray-400">
          <a href="/forgot-password" className="hover:text-white underline">
            Forgot Password?
          </a>
        </div>

        <div className="mt-6 text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
