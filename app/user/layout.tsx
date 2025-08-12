import Image from "next/image";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="py-6  w-full md:w-[20%] bg-[#131415] flex justify-center items-center flex-col">
        <div className="w-24 h-24 rounded-full ring-1 ring-[#fff] overflow-hidden bg-black">
          <Image
            src="https://quiz.bijoytech.com/user_image/1676459762.png"
            alt="quiz"
            width={100}
            height={100}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="text-white pt-4">
          <h2 className="text-xl font-bold">Ripon Shikder</h2>
          <h2 className="text-xl font-bold py-3">Balance: $20</h2>
        </div>
        <div className="text-white w-full">
          <ul className="w-full">
            <li className="w-full block py-2 pl-6 hover:bg-black cursor-pointer my-1">
              My Profile Information
            </li>
            <li className="w-full block py-2 pl-6 hover:bg-black cursor-pointer my-1">My Quize Scores</li>
            <li className="w-full block py-2 pl-6 hover:bg-black cursor-pointer my-1">Payment Request</li>
            <li className="w-full block py-2 pl-6 hover:bg-black cursor-pointer my-1">Change Password</li>
          </ul>
        </div>
      </div>
      <div className="w-full md:w-[80%] bg-black text-white">{children}</div>
    </div>
  );
}
