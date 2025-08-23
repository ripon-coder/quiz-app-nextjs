const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";
import Image from "next/image";
import facebook from "@/public/facebook.png";
import youtube from "@/public/youtube.png";
import instragram from "@/public/instragram.png";
import pinterest from "@/public/pinterest.png";
import twitter from "@/public/twitter.png";

export default async function ContactUs() {
  let storeData = [];
  try {
    const res = await fetch(`${APP_URL}/contact-us/api`);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    storeData = data.data.contact;
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error in fetch:", err.message);
    } else {
      console.error("Unknown error:", err);
    }
  }
  console.log(storeData);

  return (
    <>
      <div className="bg-black">
        <div className="p-4 md:p-8 flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-5/12">
            {storeData.length > 0 && (
              <>
                <h2 className="text-green-400 text-xl font-bold uppercase text-center md:text-start">
                  Quick Contact
                </h2>
                <div className="text-white list-none py-6 text-base">
                  <li>{storeData[0].company_name}</li>
                  <li className="pt-1">
                    Tel:{" "}
                    <a
                      className="text-blue-400"
                      href={`tel:${storeData[0].telephone}`}
                    >
                      {storeData[0].telephone}
                    </a>
                  </li>
                  <li className="pt-1">
                    Cell :{" "}
                    <a
                      className="text-blue-400"
                      href={`tel:${storeData[0].cellphone}`}
                    >
                      {storeData[0].cellphone}
                    </a>
                  </li>
                  <li className="pt-1">{storeData[0].address}</li>
                </div>
                <h2 className="text-green-400 text-xl font-bold uppercase text-center md:text-start ">
                  More Information
                </h2>
                <div className="flex justify-center md:justify-start gap-3 w-full">
                  <li>
                    <Image src={facebook} alt="facebook" className="w-10 h-10 rounded hover:bg-amber-200 hover:cursor-pointer"/>
                  </li>
                  <li>
                    <Image src={instragram} alt="instragram" className="w-10 h-10 rounded hover:bg-amber-200 hover:cursor-pointer"/>
                  </li>
                  <li>
                    <Image src={twitter} alt="twitter" className="w-10 h-10 rounded hover:bg-amber-200 hover:cursor-pointer"/>
                  </li>
                  <li>
                    <Image src={pinterest} alt="pinterest" className="w-10 h-10 rounded hover:bg-amber-200 hover:cursor-pointer"/>
                  </li>
                </div>
              </>
            )}
          </div>

          <div className="w-full md:w-7/12 mt-5 md:mt-0">
            {" "}
            <h2 className="text-green-400 text-xl font-bold pb-2 text-center md:text-start">
              HAVE ANY QUESTIONS? SEND MESSAGE US
            </h2>
            <form>
              <div className="text-white py-2 flex flex-col md:flex-row gap-4">
                <div className="flex flex-col flex-1">
                  <label className="py-1">Full Name</label>
                  <input
                    type="text"
                    className="border border-gray-500 focus:outline-none p-1 pl-2"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="py-1">Phone</label>
                  <input
                    type="text"
                    className="border border-gray-500 focus:outline-none p-1 pl-2"
                  />
                </div>
              </div>
              <div className="text-white py-2 flex flex-col md:flex-row gap-4">
                <div className="flex flex-col flex-1">
                  <label className="py-1">Email</label>
                  <input
                    type="text"
                    className="border border-gray-500 focus:outline-none p-1 pl-2"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="py-1">Subject</label>
                  <input
                    type="text"
                    className="border border-gray-500 focus:outline-none p-1 pl-2"
                  />
                </div>
              </div>
              <div className="text-white py-2 flex gap-4">
                <div className="flex flex-col flex-1">
                  <label className="py-1">Message</label>
                  <textarea className="border border-gray-500 focus:outline-none p-1 pl-2"></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="mt-2 px-4 bg-blue-800 hover:bg-blue-700 transition-colors text-white font-semibold py-1 cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
