"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OtpVerify() {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const email = localStorage.getItem("forgot-email"); // retrieve stored email
      if (!email) {
        setErrorMsg("No email found. Please request OTP again.");
        setLoading(false);
        return;
      }

      const res = await fetch("/otp-verify/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("forgot-otp",otp)
        setSuccessMsg(data.message || "OTP Verified Successfully");
        setTimeout(() => {
          router.push("/reset-password"); // redirect to reset password page
        }, 1000);
      } else {
        setErrorMsg(data.message || "Invalid OTP. Try again.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-12 flex items-center justify-center bg-black px-4">
      <div className="bg-[#1a1c1d] p-8 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          OTP Verification
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* otp input */}
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Enter OTP
            </label>
            <input
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              type="text"
              id="otp"
              placeholder="Enter the code sent to your email"
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
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {errorMsg && (
          <p className="mt-4 text-red-500 text-center">{errorMsg}</p>
        )}
        {successMsg && (
          <p className="mt-4 text-green-500 text-center">{successMsg}</p>
        )}

        <div className="mt-6 text-center text-gray-400 text-sm">
          Didn’t get the code?{" "}
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Resend OTP
          </a>
        </div>
      </div>
    </div>
  );
}
