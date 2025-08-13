"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "";

export default function ProfileCard() {
  const [preview, setPreview] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch profile data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/user/api"); // your API route
        const resText = await res.text();
        const jsonData = resText ? JSON.parse(resText) : {};
        setData(jsonData.data || jsonData);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchData();
  }, []);

  // Trigger file input
  const handleImageClick = () => fileInputRef.current?.click();

  // Handle image upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setPreview(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append("image", file, file.name);

      const res = await fetch("/user/api", {
        method: "POST",
        body: formData,
      });

      // Safe parsing
      const resText = await res.text();
      let uploaded: any;
      try {
        uploaded = resText ? JSON.parse(resText) : {};
      } catch {
        uploaded = { message: resText || "No response from server" };
      }

      if (!res.ok) {
        throw new Error(uploaded.error || uploaded.message || "Upload failed");
      }

      console.log("Upload success:", uploaded);

      // Refresh profile after upload
      const profileRes = await fetch("/user/api");
      const profileText = await profileRes.text();
      const profileJson = profileText ? JSON.parse(profileText) : {};
      setData(profileJson.data || profileJson);
    } catch (error) {
      console.error("Upload failed:", error);
      alert(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (!data) return <div className="text-white">Loading...</div>;

  return (
    <>
      <div
        className="w-24 h-24 rounded-full ring-1 ring-[#fff] overflow-hidden bg-black relative group cursor-pointer"
        onClick={handleImageClick}
      >
        <Image
          src={preview || `${BASE_URL}/user_image/${data.user?.image}`}
          alt="profile"
          width={100}
          height={100}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-sm">
            {uploading ? "Uploading..." : "Change"}
          </span>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="text-white pt-4 text-center">
        <h2 className="text-xl font-bold">{data.user?.name}</h2>
        <h2 className="text-xl font-bold py-3">Balance: ${data.amount}</h2>
      </div>
    </>
  );
}
