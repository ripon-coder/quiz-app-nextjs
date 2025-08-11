import Image from "next/image";
import Link from "next/link";
const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "";
import { formatDateToDDMMYYYY, stripHtml } from "@/app/lib/helper";

export default function GeneralQuiz({ quizzes, quizImg }: any) {
  // Helper function to get active languages per category
  function getActiveLanguages(category: any) {
    const langs = [];
    if (category.active_bangla === 1) langs.push("Bangla");
    if (category.active_english === 1) langs.push("English");
    return langs;
  }

  return (
    <>
      {quizzes.length > 0 ? (
        quizzes.map((category: any) => {
          const languages = getActiveLanguages(category);

          // For each active language, render a quiz block
          return languages.map((lang) => (
            <div
              key={`${category.id}-${lang}`}
              className="flex md:flex-row flex-col gap-4 px-6 py-4"
            >
              <div className="md:w-3/12 w-full border-2 border-gray-700 rounded-sm p-2">
                <div className="w-full h-48 relative">
                  <Image
                    src={`${BASE_URL}/homeImg/${quizImg.img}`}
                    alt="title"
                    fill
                    className="object-cover"
                  />
                </div>
                <h1 className="text-dark text-xl text-center pt-3 pb-2 font-bold">
                  {category.title}
                </h1>
                <div>
                  <ul className="text-sm text-[#afa5a5] italic">
                    <li className="pt-1.5">
                      Language: <span className="text-[#34cc21]">{lang}</span>
                    </li>
                    <li className="pt-1.5">
                      Quiz Play Time:{" "}
                      <span className="text-[100%] text-[#34cc21]">
                        {formatDateToDDMMYYYY(category.start_date)} -{" "}
                        {formatDateToDDMMYYYY(category.end_date)}&nbsp;
                        {category.end_time}
                      </span>
                    </li>
                    <li className="pt-1.5">
                      Total Prize Money:{" "}
                      <span className="text-[#34cc21]">${category.price}</span>
                    </li>
                    <li className="pt-1.5">
                      Total Winner:{" "}
                      <span className="text-[#34cc21]">{category.person}</span>
                    </li>
                    <li className="pt-1.5">
                      1<sup>st</sup> Top Scorrer Will Get:{" "}
                      <span className="text-[#34cc21]">
                        ${category.first_top_money ?? 0}
                      </span>
                    </li>
                    <li className="pt-1.5">
                      2 <sup>nd</sup> Top Scorrer Will Get:{" "}
                      <span className="text-[#34cc21]">
                        ${category.second_top_money ?? 0}
                      </span>
                    </li>
                    <li className="pt-1.5">
                      3 <sup>rd</sup> Top Scorrer Will Get:{" "}
                      <span className="text-[#34cc21]">
                        ${category.third_top_money ?? 0}
                      </span>
                    </li>
                    <li className="pt-1.5">
                      Total Question:{" "}
                      <span className="text-[#34cc21]">
                        {category.total_quistion}
                      </span>
                    </li>
                    <li className="pt-1.5">
                      Every Question Mark:{" "}
                      <span className="text-[#34cc21]">{category.mark}</span>
                    </li>
                  </ul>
                  <div className="flex justify-center">
                    <Link
                      href=""
                    >
                      <button className="bg-[#3572db] px-3 py-2 my-4 text-white rounded-xs cursor-pointer hover:bg-[#50678f] text-sm">
                        Start Quiz
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="md:w-9/12 w-full">
                <h2 className="bg-[#0736bb] block md:p-2 p-1 px-2 md:text-xl">
                  About The Quiz
                </h2>
                <p className="py-2 text-sm">{stripHtml(quizImg.content)}</p>
              </div>
            </div>
          ));
        })
      ) : (
        <h1>No quizzes found</h1>
      )}
    </>
  );
}
