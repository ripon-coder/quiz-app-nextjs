import { notFound } from "next/navigation";
import { fetchCategoryDataByID } from "@/app/lib/api/CategoryIdApi";
import Image from "next/image";
import {
  stripHtml,
  truncateText,
  formatDateToDDMMYYYY,
} from "@/app/lib/helper";
const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;
  if (!id) return {};

  try {
    const data = await fetchCategoryDataByID(Number(id));
    const firstContent = data.content?.[0];

    return {
      title: firstContent?.title || "Quiz Info",
      description:
        firstContent?.content?.slice(0, 160) ||
        "Details about the quiz competition",
    };
  } catch (error) {
    console.error("Failed to generate metadata", error);
    return {};
  }
}

export default async function Quizinfo({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;
  if (!id || isNaN(Number(id))) {
    notFound();
  }
  let categories: any = [];
  try {
    categories = await fetchCategoryDataByID(Number(id));
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
  return (
    <div className="bg-[#000] p-6 text-white">
      {categories?.content?.length > 0 ? (
        <>
          <h1 className="text-white text-3xl font-bold pb-6">
            {categories.content[0].title}
          </h1>
          <div className="md:w-1/3 w-full h-64 relative">
            <Image
              src={`${BASE_URL}/homeImg/${categories.content[0].img}`}
              alt={categories.content[0].title}
              fill
              className="object-cover"
            />
          </div>
          <p className="pt-8 text-sm">{categories.content[0].content}</p>
        </>
      ) : (
        <p className="text-gray-400">No content available.</p>
      )}

      <div className="text-center pt-10">
        <h1 className="relative font-bold text-2xl inline-block after:content-[''] after:block after:border-b-3 after:border-blue-500 after:w-[80%] after:mx-auto after:mt-2">
          Recently Finished Quiz
        </h1>
      </div>

      {categories?.recent_finish?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-8 py-8 bg-black">
          {categories.recent_finish.map((category: any) => (
            <div
              key={category.id}
              className="pt-1.5 px-4 bg-black border-2 border-gray-700 rounded-lg"
            >
              <div className="w-full aspect-video my-4">
                {categories.content[0].video ? (
                  <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{
                      __html: categories.content[0].video
                        .replace(/width="\d+"/, 'width="100%"')
                        .replace(/height="\d+"/, 'height="100%"'),
                    }}
                  />
                ) : (
                  <div className="w-full h-full relative">
                    <Image
                      src={`${BASE_URL}/homeImg/${categories.content[0].img}`}
                      alt={category.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              <h1 className="text-white text-center py-1 text-lg font-bold">
                {category.title}
              </h1>
              <div>
                <ul className="text-sm py-3 text-[#afa5a5] italic">
                  <li className="pt-1.5">
                    Quiz Play Time:{" "}
                    <span className="text-[12.5px] text-[#34cc21]">
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
                      ${category.first_top_money}
                    </span>
                  </li>
                  <li className="pt-1.5">
                    2 <sup>nd</sup> Top Scorrer Will Get:{" "}
                    <span className="text-[#34cc21]">
                      ${category.second_top_money}
                    </span>
                  </li>
                  <li className="pt-1.5">
                    3 <sup>rd</sup> Top Scorrer Will Get:{" "}
                    <span className="text-[#34cc21]">
                      ${category.third_top_money}
                    </span>
                  </li>
                  <li className="pt-1.5">
                    Total Question:{" "}
                    <span className="text-[#34cc21]">{category.total_quistion}</span>
                  </li>
                  <li className="pt-1.5">
                    Every Question Mark:{" "}
                    <span className="text-[#34cc21]">{category.mark}</span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 pt-4">No recently finished quizzes.</p>
      )}
    </div>
  );
}
