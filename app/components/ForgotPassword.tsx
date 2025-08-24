"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await fetch("/forgot-password/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("forgot-email", email);
        setSuccessMsg(data.message);
        setTimeout(() => {
          router.push("/otp-verify");
        }, 1000);
      } else {
        setErrorMsg(data.data);
        setLoading(false);
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
          Forgot Password
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

          <button
            type="submit"
            className={`w-full ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-800 hover:bg-blue-700"
            } transition-colors text-white font-semibold py-2 cursor-pointer rounded`}
            disabled={loading}
          >
            {loading ? "Code Sending..." : "Code Send"}
          </button>
        </form>

        {errorMsg && (
          <p className="mt-4 text-red-500 text-center">{errorMsg}</p>
        )}
        {successMsg && (
          <p className="mt-4 text-green-500 text-center">{successMsg}</p>
        )}

        <div className="mt-6 text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
