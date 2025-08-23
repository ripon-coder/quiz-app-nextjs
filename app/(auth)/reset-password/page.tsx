"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    if (password !== confirm) {
      setErrorMsg("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const email = localStorage.getItem("forgot-email");
      const otp = localStorage.getItem("forgot-otp");
      if (!email && !otp) {
        setErrorMsg("No email found. Please restart reset process.");
        setLoading(false);
        return;
      }

      const res = await fetch("/reset-password/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email,otp, password }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMsg(data.message || "Password reset successfully!");
        setTimeout(() => {
          localStorage.removeItem("forgot-email");
          localStorage.removeItem("forgot-otp");
          router.push("/login"); // redirect to login page
        }, 1500);
      } else {
        setErrorMsg(data.message || "Password reset failed.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-12 flex items-center justify-center bg-black px-4">
      <div className="bg-[#1a1c1d] p-8 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Reset Password
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* New password input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              New Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 bg-black text-white focus:outline-none focus:ring-0 text-sm"
              required
              disabled={loading}
            />
          </div>

          {/* Confirm password input */}
          <div>
            <label
              htmlFor="confirm"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Confirm Password
            </label>
            <input
              onChange={(e) => setConfirm(e.target.value)}
              value={confirm}
              type="password"
              id="confirm"
              placeholder="Confirm new password"
              className="w-full px-4 py-2 bg-black text-white focus:outline-none focus:ring-0 text-sm"
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
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {errorMsg && (
          <p className="mt-4 text-red-500 text-center">{errorMsg}</p>
        )}
        {successMsg && (
          <p className="mt-4 text-green-500 text-center">{successMsg}</p>
        )}

        <div className="mt-6 text-center text-gray-400 text-sm">
          Remembered your password?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
