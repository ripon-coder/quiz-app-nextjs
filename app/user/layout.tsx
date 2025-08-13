// import ProfileCard from "../components/ProfileCard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="py-6  w-full md:w-[20%] bg-[#131415] flex justify-center items-center flex-col">
        {/* <ProfileCard /> */}
        <div className="text-white w-full">
          <ul className="w-full">
            <li className="w-full block py-2 pl-6 hover:bg-black cursor-pointer my-1">
              My Profile Information
            </li>
            <li className="w-full block py-2 pl-6 hover:bg-black cursor-pointer my-1">
              My Quize Scores
            </li>
            <li className="w-full block py-2 pl-6 hover:bg-black cursor-pointer my-1">
              Payment Request
            </li>
            <li className="w-full block py-2 pl-6 hover:bg-black cursor-pointer my-1">
              Change Password
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full md:w-[80%] bg-black text-white">{children}</div>
    </div>
  );
}
