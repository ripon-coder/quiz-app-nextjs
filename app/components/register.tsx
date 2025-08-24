"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import countryList from "@/app/lib/countrylist";
import Link from "next/link";

export default function Register() {
  const router = useRouter();

  const initialState = {
    name: "",
    email: "",
    password: "",
    phone: "",
    occupation: "",
    address: "",
    city: "",
    zip: "",
    state: "",
    guardian: "",
    relation_with_guardian: "",
    date_of_birth: "",
    country: "",
    grade: "",
    guardian_email: "",
    guardian_phone: "",
  };

  const [value, setValue] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg([]);
    setSuccessMsg("");
    setLoading(true);
    
    if (value.grade == "above/adult") {
      setValue({
        ...value,
        guardian: "",
        relation_with_guardian: "",
        guardian_email: "",
        guardian_phone: "",
      });
    }

    try {
      const response = await fetch("/register/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });

      const data = await response.json();

      if (!response.ok || data.data?.validate === false) {
        // Flatten Laravel validation errors into a string array
        const errors: string[] = [];
        if (data.message && typeof data.message === "object") {
          Object.values(data.message).forEach((val) => {
            if (Array.isArray(val)) errors.push(...val);
            else errors.push(val as string);
          });
        } else if (typeof data.message === "string") {
          errors.push(data.message);
        }
        setErrorMsg(errors);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // Success
      window.scrollTo({ top: 0, behavior: "smooth" });
      setValue(initialState);
      setSuccessMsg("Registration Successfully!");
      setTimeout(() => router.push("/login"), 1000);
    } catch (err: any) {
      setErrorMsg([err.message || "Register failed"]);
    } finally {
      setLoading(false);
    }
  };

  const DateBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9]/g, "");
    if (val.length > 2) val = val.slice(0, 2) + "/" + val.slice(2);
    if (val.length > 5) val = val.slice(0, 5) + "/" + val.slice(5);
    setValue({ ...value, date_of_birth: val });
  };

  return (
    <div className="py-12 flex items-center justify-center bg-black px-4">
      <div className="bg-[#1a1c1d] p-3 md:p-8 shadow-lg w-full md:w-1/2">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Register
        </h2>

        {/* Error Messages */}
        {errorMsg.length > 0 && (
          <ul className="text-red-600 list-none text-center pb-6 text-sm">
            {errorMsg.map((err, index) => (
              <li className="py-1" key={index}>
                {err}
              </li>
            ))}
          </ul>
        )}

        {/* Success Message */}
        {successMsg && (
          <p className="mt-4 text-green-500 text-center">{successMsg}</p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={value.name}
              onChange={(e) => setValue({ ...value, name: e.target.value })}
              className="w-full px-4 py-2 bg-black text-white focus:outline-none focus:ring-0 text-sm"
              required
              disabled={loading}
            />
          </div>

          {/* Grade & Date of Birth */}
          <div className="flex flex-col md:flex-row justify-baseline gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Grade
              </label>
              <select
                value={value.grade}
                onChange={(e) => setValue({ ...value, grade: e.target.value })}
                className="w-full px-4 py-2 bg-black text-white focus:outline-none focus:ring-0 text-sm"
                required
                disabled={loading}
              >
                <option value="" disabled>
                  Choose...
                </option>
                <option value="0-5 grade">0-5 grade</option>
                <option value="6-8 grade">6-8 grade</option>
                <option value="9-12 grade">9-12 grade</option>
                <option value="above/adult">Above/Adult</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date of Birth
              </label>
              <input
                type="text"
                placeholder="dd/mm/yyyy"
                maxLength={10}
                pattern="^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/[0-9]{4}$"
                title="Please enter a valid date in dd/mm/yyyy format"
                value={value.date_of_birth}
                onChange={DateBirthChange}
                className="w-full px-4 py-2 bg-black text-white focus:outline-none focus:ring-0 text-sm"
                disabled={loading}
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="flex flex-col md:flex-row justify-baseline gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={value.email}
                onChange={(e) => setValue({ ...value, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-4 py-2 bg-black text-white focus:outline-none focus:ring-0 text-sm"
                required
                disabled={loading}
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="text"
                value={value.phone}
                onChange={(e) => setValue({ ...value, phone: e.target.value })}
                className="w-full px-4 py-2 bg-black text-white focus:outline-none focus:ring-0 text-sm"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Set Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={value.password}
              onChange={(e) => setValue({ ...value, password: e.target.value })}
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
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Address */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Address
            </label>
            <input
              type="text"
              value={value.address}
              onChange={(e) => setValue({ ...value, address: e.target.value })}
              className="w-full px-4 py-2 bg-black text-white focus:outline-none focus:ring-0 text-sm"
              required
              disabled={loading}
            />
          </div>

          {/* City, State */}
          <div className="flex flex-col md:flex-row justify-baseline gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                City
              </label>
              <input
                type="text"
                value={value.city}
                onChange={(e) => setValue({ ...value, city: e.target.value })}
                className="w-full px-4 py-2 bg-black text-white focus:outline-none focus:ring-0 text-sm"
                required
                disabled={loading}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                State
              </label>
              <input
                type="text"
                value={value.state}
                onChange={(e) => setValue({ ...value, state: e.target.value })}
                className="w-full px-4 py-2 bg-black text-white focus:outline-none focus:ring-0 text-sm"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Zip & Country */}
          <div className="flex flex-col md:flex-row justify-baseline gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Zip
              </label>
              <input
                type="text"
                value={value.zip}
                onChange={(e) => setValue({ ...value, zip: e.target.value })}
                className="w-full px-4 py-2 bg-black text-white focus:outline-none focus:ring-0 text-sm"
                required
                disabled={loading}
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Country
              </label>
              <select
                value={value.country}
                onChange={(e) =>
                  setValue({ ...value, country: e.target.value })
                }
                className="w-full px-4 py-2 bg-black text-white focus:outline-none focus:ring-0 text-sm"
              >
                <option value="" disabled>
                  Select country
                </option>
                {countryList.map((country) => (
                  <option
                    key={country.code}
                    value={country.code}
                    className="bg-black text-sm"
                  >
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Guardian Info (if grade < Above/Adult) */}
          {value.grade !== "above/adult" && (
            <>
              <div className="flex flex-col md:flex-row justify-baseline gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Guardian Name
                  </label>
                  <input
                    type="text"
                    value={value.guardian}
                    onChange={(e) =>
                      setValue({ ...value, guardian: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-black text-white focus:outline-none focus:ring-0 text-sm"
                    disabled={loading}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Relation with Guardian
                  </label>
                  <input
                    type="text"
                    value={value.relation_with_guardian}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        relation_with_guardian: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-black text-white focus:outline-none focus:ring-0 text-sm"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-baseline gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Guardian Phone
                  </label>
                  <input
                    type="text"
                    value={value.guardian_phone}
                    onChange={(e) =>
                      setValue({ ...value, guardian_phone: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-black text-white focus:outline-none focus:ring-0 text-sm"
                    disabled={loading}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Guardian Email
                  </label>
                  <input
                    type="email"
                    value={value.guardian_email}
                    onChange={(e) =>
                      setValue({ ...value, guardian_email: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-black text-white focus:outline-none focus:ring-0 text-sm"
                    disabled={loading}
                  />
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-800 hover:bg-blue-700"
            } transition-colors text-white font-semibold py-2 cursor-pointer rounded`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          Do you have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
