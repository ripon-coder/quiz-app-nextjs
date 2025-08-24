"use client";

import { useState } from "react";

export default function ContactUs() {
  const payload = {
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  };
  const [value, setValue] = useState(payload);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string[] | null>([]);
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg([]);
    setSuccessMsg("");
    try {
      const res = await fetch("/contact-us/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await res.json();

      if (!res.ok || data.data?.validate === false) {
        let CustomErrorMsg: any[] = [];
        Object.values(data.message).map((item, index) => {
          if (Array.isArray(item)) {
            CustomErrorMsg.push(...item);
          } else {
            CustomErrorMsg.push(item);
          }
        });
        setErrorMsg(CustomErrorMsg);
        setLoading(false);
      }

      if (data.success) {
        setValue(payload);
        setLoading(false);
        setSuccessMsg("Message Sent Successfully!");
      } else {
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  }

  return (
    <>
      {" "}
      <h2 className="text-green-400 text-xl font-bold pb-2 text-center md:text-start">
        HAVE ANY QUESTIONS? SEND MESSAGE US
      </h2>
      {successMsg && (
        <p className="bg-green-700 text-white px-2 text-center py-2">
          {successMsg}
        </p>
      )}
      {errorMsg && errorMsg.length > 0 && (
        <div className="text-white text-center">
          <ul>
            {errorMsg.map((item: string, index: number) => (
              <li className="my-1 bg-red-600" key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="text-white py-2 flex flex-col md:flex-row gap-4">
          <div className="flex flex-col flex-1">
            <label className="py-1">Full Name</label>
            <input
              type="text"
              className="border border-gray-500 focus:outline-none p-1 pl-2"
              required
              value={value.name}
              onChange={(e) => setValue({ ...value, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="py-1">Phone</label>
            <input
              type="text"
              className="border border-gray-500 focus:outline-none p-1 pl-2"
              required
              value={value.phone}
              onChange={(e) => setValue({ ...value, phone: e.target.value })}
            />
          </div>
        </div>
        <div className="text-white py-2 flex flex-col md:flex-row gap-4">
          <div className="flex flex-col flex-1">
            <label className="py-1">Email</label>
            <input
              type="email"
              className="border border-gray-500 focus:outline-none p-1 pl-2"
              required
              value={value.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="py-1">Subject</label>
            <input
              type="text"
              className="border border-gray-500 focus:outline-none p-1 pl-2"
              required
              value={value.subject}
              onChange={(e) => setValue({ ...value, subject: e.target.value })}
            />
          </div>
        </div>
        <div className="text-white py-2 flex gap-4">
          <div className="flex flex-col flex-1">
            <label className="py-1">Message</label>
            <textarea
              className="border border-gray-500 focus:outline-none p-1 pl-2"
              required
              value={value.message}
              onChange={(e) => setValue({ ...value, message: e.target.value })}
            ></textarea>
          </div>
        </div>
        <button
          disabled={loading}
          type="submit"
          className={`mt-2 px-4 ${loading ? `bg-gray-700` : `bg-blue-800`} hover:bg-blue-700 transition-colors text-white font-semibold py-1 cursor-pointer`}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </>
  );
}
