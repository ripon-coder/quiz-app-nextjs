"use client";

import type { Metadata } from "next";
import { useState } from "react";

export default function PaymentRequestPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    payment_method: "",
    account_number: "",
    account_name: "",
    amount: "",
    note: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/user/payment-request/api", {
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
        const message =
          data?.error || data?.message || "Failed to save payment request";
        setError(message);
        return;
      }

      // success
      setSuccess("Payment request submitted successfully!");
      setValue({
        payment_method: "",
        account_number: "",
        account_name: "",
        amount: "",
        note: "",
      });

      console.log("Payment request saved:", data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 pb-5">
      {error && <p className="text-red-500 my-5 text-center">{error}</p>}
      {success && <p className="text-green-500 my-5 text-center">{success}</p>}

      <form onSubmit={handleSubmit}>
        {/* Payment method & account info */}
        <div className="flex flex-col md:flex-row justify-between gap-5 mt-5">
          <div className="flex flex-col flex-1">
            <label className="py-0.5 text-sm">Payment Method</label>
            <select
              className="border border-gray-300 focus:outline-none p-1.5 pl-2"
              value={value.payment_method}
              onChange={(e) =>
                setValue({ ...value, payment_method: e.target.value })
              }
            >
              <option className="bg-black" value="" disabled>
                Choose...
              </option>
              <option className="bg-black" value="paypal">
                Paypal
              </option>
              <option className="bg-black" value="bkash">
                Bkash
              </option>
              <option className="bg-black" value="zille">
                Zille
              </option>
              <option className="bg-black" value="quickpay">
                Quick Pay
              </option>
              <option className="bg-black" value="bank-deposit">
                Bank Deposit
              </option>
              <option className="bg-black" value="rocket">
                Rocket
              </option>
              <option className="bg-black" value="nagad">
                Nagad
              </option>
            </select>
          </div>

          <div className="flex flex-col flex-1">
            <label className="py-0.5 text-sm">Account Number</label>
            <input
              type="text"
              required
              className="border border-gray-300 focus:outline-none p-1 pl-2"
              value={value.account_number}
              onChange={(e) =>
                setValue({ ...value, account_number: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col flex-1">
            <label className="py-0.5 text-sm">Account Name</label>
            <input
              type="text"
              required
              className="border border-gray-300 focus:outline-none p-1 pl-2"
              value={value.account_name}
              onChange={(e) =>
                setValue({ ...value, account_name: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col flex-1">
            <label className="py-0.5 text-sm">Amount</label>
            <input
              type="text"
              required
              className="border border-gray-300 focus:outline-none p-1 pl-2"
              value={value.amount}
              onChange={(e) => setValue({ ...value, amount: e.target.value })}
            />
          </div>
        </div>

        {/* Note */}
        <div className="flex flex-col md:flex-row justify-between gap-5 mt-5">
          <div className="flex flex-col grow">
            <label className="py-0.5 text-sm">Note</label>
            <textarea
              className="border border-gray-300 focus:outline-none p-1 pl-2"
              rows={3}
              value={value.note}
              onChange={(e) => setValue({ ...value, note: e.target.value })}
            ></textarea>
          </div>
        </div>

        {/* Submit button */}
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
