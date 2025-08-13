// "use client";

// import Image from "next/image";
// // import { fetchProfileCard } from "@/app/lib/api/profileApi";
// import { useRef, useState, useEffect } from "react";

// const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "";

// export default async function ProfileCard() {
//   const [preview, setPreview] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [uploading, setUploading] = useState(false);

//   // You may want to fetch data with SWR or useEffect for client-side updates
//   const [data, setData] = useState<any>(null);

//   // Fetch profile data on mount (client-side)
//   useEffect(() => {
//     fetchProfileCard().then(setData);
//   }, []);

//   const handleImageClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploading(true);

//     // Preview image (optional)
//     setPreview(URL.createObjectURL(file));

//     // Prepare form data
//     const formData = new FormData();
//     formData.append("image", file);

//     // Call your API endpoint to upload image
//     const res = await fetch("/user/profile/api/image", {
//       method: "POST",
//       body: formData,
//     });

//     if (res.ok) {
//       // Optionally refetch profile data or update state
//       const updated = await fetchProfileCard();
//       setData(updated);
//       setPreview(null);
//     }
//     setUploading(false);
//   };

//   if (!data) return null;

//   return (
//     <>
//       <div
//         className="w-24 h-24 rounded-full ring-1 ring-[#fff] overflow-hidden bg-black relative group cursor-pointer"
//         onClick={handleImageClick}
//       >
//         <Image
//           src={preview || `${BASE_URL}/user_image/${data.user.image}`}
//           alt="quiz"
//           width={100}
//           height={100}
//           className="object-cover w-full h-full"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//           <span className="text-white text-sm font-semibold">
//             {uploading ? "Uploading..." : "Update Image"}
//           </span>
//         </div>
//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           className="hidden"
//           onChange={handleFileChange}
//         />
//       </div>
//       <div className="text-white pt-4">
//         <h2 className="text-xl font-bold text-center">{data.user.name ? data.user.name : null}</h2>
//         <h2 className="text-xl font-bold py-3 text-center">Balance: ${data.amount ? data.amount : null}</h2>
//       </div>
//     </>
//   );
// }
