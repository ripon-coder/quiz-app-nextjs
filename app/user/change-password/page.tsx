"use client";

import { useState } from "react";

export default function ChangePasswordPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    newPassword: "",
    confirmPassword: "",
  });

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (value.newPassword !== value.confirmPassword) {
    setError("Passwords do not match.");
    setSuccess("");
    return;
  }

  setLoading(true);
  setError("");
  setSuccess("");

  try {
    const res = await fetch("/user/change-password/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      // Convert object to string if needed
      const message =
        typeof data?.error === "string"
          ? data.error
          : typeof data?.message === "string"
          ? data.message
          : JSON.stringify(data) || "Failed to change password";

      setError(message);
      return;
    }

    // success
    setSuccess("Password changed successfully!");
    setValue({
      newPassword: "",
      confirmPassword: "",
    });

    console.log("Password changed:", data);
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    setError(message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="px-5 pb-5">
      {/* Error and Success Messages */}
      {error && <p className="text-red-500 my-5 text-center">{error}</p>}
      {success && <p className="text-green-500 my-5 text-center">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row justify-between gap-5 mt-5">
          {/* New Password */}
          <div className="flex flex-col flex-1">
            <label className="py-0.5 text-sm">New Password</label>
            <input
              type="password"
              required
              className="border border-gray-300 focus:outline-none p-1 pl-2"
              value={value.newPassword}
              onChange={(e) =>
                setValue({ ...value, newPassword: e.target.value })
              }
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col flex-1">
            <label className="py-0.5 text-sm">Repeat New Password</label>
            <input
              type="password"
              required
              className="border border-gray-300 focus:outline-none p-1 pl-2"
              value={value.confirmPassword}
              onChange={(e) =>
                setValue({ ...value, confirmPassword: e.target.value })
              }
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-5">
          <button
            type="submit"
            disabled={loading}
            className={`py-1.5 px-5 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#1e60d3] hover:bg-[#122f61] cursor-pointer"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
