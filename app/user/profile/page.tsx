"use client";

import { useState, useEffect } from "react";
import countryList from "@/app/lib/countrylist";
import Spinner from "@/app/components/Spinner";

export default function Profile() {
  const [value, setValue] = useState({
    name: "",
    email: "",
    date_of_birth: "",
    grade: "",
    occupation: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    guardian: "",
    relation_with_guardian: "",
    guardian_phone: "",
    guardian_email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [saving, setSave] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setSave(true);
      try {
        const response = await fetch("/user/profile/api");
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const result = await response.json();
        if (result && result.data && result.data[0]) {
          const user = result.data[0];
          setValue((prev) => ({
            ...prev,
            name: user.name ?? "",
            email: user.email ?? "",
            date_of_birth: user.date_of_birth ?? "",
            grade: user.grade ?? "",
            occupation: user.occupation ?? "",
            phone: user.phone ?? "",
            address: user.address ?? "",
            city: user.city ?? "",
            state: user.state ?? "",
            zip: user.zip ?? "",
            country: user.country ?? "",
            guardian: user.guardian ?? "",
            relation_with_guardian: user.relation_with_guardian ?? "",
            guardian_phone: user.guardian_phone ?? "",
            guardian_email: user.guardian_email ?? "",
          }));
        }
      } catch (err) {
      } finally {
        setSave(false);
      }
    };
    fetchProfile();
  }, []);

  const DateBirthChange = (e: any) => {
    let val = e.target.value.replace(/[^0-9]/g, "");
    if (val.length > 2) val = val.slice(0, 2) + "/" + val.slice(2);
    if (val.length > 5) val = val.slice(0, 5) + "/" + val.slice(5);
    setValue({ ...value, date_of_birth: val });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Map state to backend expected format
    const payload = {
      name: value.name,
      email: value.email,
      date_of_birth: value.date_of_birth,
      grade: value.grade,
      occupation: value.occupation,
      phone: value.phone,
      address: value.address,
      city: value.city,
      state: value.state,
      zip: value.zip,
      country: value.country,
      guardian: value.guardian,
      relation_with_guardian: value.relation_with_guardian,
      guardian_phone: value.guardian_phone,
      guardian_email: value.guardian_email,
    };

    try {
      const response = await fetch("/user/profile/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to save profile");
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 py-5">
      <div className="relative">
        {saving && <Spinner />}
        {success ? (
          <p className="text-emerald-400 text-center p-1">Saved Successfully!</p>
        ) : null}
        {error ? (
          <p className="text-red-500 text-center p-1">Failed to save profile!</p>
        ) : null}

        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col md:flex-row justify-between gap-5">
            <div className="flex flex-col grow">
              <label className="py-0.5 text-sm">Full Name</label>
              <input
                className="border border-gray-300 focus:outline-none p-1 pl-2"
                required
                type="text"
                value={value.name}
                onChange={(e) => setValue({ ...value, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col grow">
              <label className="py-0.5 text-sm">Email</label>
              <input
                className="border border-gray-300 focus:outline-none p-1 pl-2"
                type="email"
                required
                value={value.email}
                onChange={(e) => setValue({ ...value, email: e.target.value })}
              />
            </div>

            <div className="flex flex-col grow">
              <label className="py-0.5 text-sm">Date of Birth</label>
              <input
                className="border border-gray-300 focus:outline-none p-1 pl-2"
                type="text"
                placeholder="dd/mm/yyyy"
                pattern="^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/[0-9]{4}$"
                title="Please enter a valid date in dd/mm/yyyy format"
                maxLength={10}
                value={value.date_of_birth}
                onChange={(e) => DateBirthChange(e)}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-5 mt-5">
            <div className="flex flex-col flex-1">
              <label className="py-0.5 text-sm">Grade</label>
              <select
                className="border border-gray-300 focus:outline-none p-1.5 pl-2"
                onChange={(e) => setValue({ ...value, grade: e.target.value })}
                value={value.grade}
              >
                <option value="" disabled>
                  Choose...
                </option>
                <option className="bg-black" value="0-5 grade">
                  0-5 grade
                </option>
                <option className="bg-black" value="6-8 grade">
                  6-8 grade
                </option>
                <option className="bg-black" value="9-12 grade">
                  9-12 grade
                </option>
                <option className="bg-black" value="above/adult">
                  Above/Adult
                </option>
              </select>
            </div>

            <div className="flex flex-col flex-1">
              <label className="py-0.5 text-sm">Occupation</label>
              <input
                className="border border-gray-300 focus:outline-none p-1 pl-2"
                type="text"
                required
                value={value.occupation}
                onChange={(e) =>
                  setValue({ ...value, occupation: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col flex-1">
              <label className="py-0.5 text-sm">Phone</label>
              <input
                className="border border-gray-300 focus:outline-none p-1 pl-2"
                type="text"
                required
                value={value.phone}
                onChange={(e) => setValue({ ...value, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-5 mt-5">
            <div className="flex flex-col grow">
              <label className="py-0.5 text-sm">Address</label>
              <input
                className="border border-gray-300 focus:outline-none p-1 pl-2"
                type="text"
                required
                value={value.address}
                onChange={(e) => setValue({ ...value, address: e.target.value })}
              />
            </div>
            <div className="flex flex-col grow">
              <label className="py-0.5 text-sm">City</label>
              <input
                className="border border-gray-300 focus:outline-none p-1 pl-2"
                type="text"
                required
                value={value.city}
                onChange={(e) => setValue({ ...value, city: e.target.value })}
              />
            </div>
            <div className="flex flex-col grow">
              <label className="py-0.5 text-sm">State</label>
              <input
                className="border border-gray-300 focus:outline-none p-1 pl-2"
                type="text"
                required
                value={value.state}
                onChange={(e) => setValue({ ...value, state: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-5 mt-5">
            {/* ZIP */}
            <div className="flex flex-col flex-1">
              <label className="py-0.5 text-sm">Zip</label>
              <input
                className="border border-gray-300 focus:outline-none p-1 pl-2 w-full"
                type="text"
                required
                value={value.zip}
                onChange={(e) => setValue({ ...value, zip: e.target.value })}
              />
            </div>

            {/* Country */}
            <div className="flex flex-col flex-1">
              <label className="py-0.5 text-sm">Country</label>
              <select
                className="border border-gray-300 focus:outline-none p-1.5 pl-2 w-full"
                value={value.country}
                onChange={(e) => setValue({ ...value, country: e.target.value })}
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

            {/* Guardian */}
            <div className="flex flex-col flex-1">
              <label className="py-0.5 text-sm">Guardian</label>
              <input
                className="border border-gray-300 focus:outline-none p-1 pl-2 w-full"
                type="text"
                value={value.guardian}
                onChange={(e) => setValue({ ...value, guardian: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-5 mt-5">
            <div className="flex flex-col grow">
              <label className="py-0.5 text-sm">Relation with Guardian</label>
              <input
                className="border border-gray-300 focus:outline-none p-1 pl-2"
                type="text"
                value={value.relation_with_guardian}
                onChange={(e) =>
                  setValue({ ...value, relation_with_guardian: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col grow">
              <label className="py-0.5 text-sm">Guardian Phone</label>
              <input
                className="border border-gray-300 focus:outline-none p-1 pl-2"
                type="text"
                value={value.guardian_phone}
                onChange={(e) =>
                  setValue({ ...value, guardian_phone: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col grow">
              <label className="py-0.5 text-sm">Guardian Email</label>
              <input
                className="border border-gray-300 focus:outline-none p-1 pl-2"
                type="text"
                value={value.guardian_email}
                onChange={(e) =>
                  setValue({ ...value, guardian_email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="pt-5">
            <button
              className={`py-1.5 px-5 ${
                loading
                  ? "bg-gray-400"
                  : "bg-[#1e60d3] hover:bg-[#122f61] cursor-pointer"
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? `Saving....` : `Save`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
