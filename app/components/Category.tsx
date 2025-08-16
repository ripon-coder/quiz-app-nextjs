// Category.jsx
import React from "react";
import { NotebookTabs } from "lucide-react";
import Image from "next/image";
import { fetchCategoryData } from "@/app/lib/api/categoryApi";
import { stripHtml, truncateText } from "@/app/lib/helper";
import Link from "next/link";
const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "";

const Category = async () => {
  let categories: any = [];
  try {
    categories = await fetchCategoryData();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  if (!categories?.length) {
    return (
      <div className="text-center text-gray-400 p-4">
        No categories available.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2 md:px-8 py-8 bg-black">
        {categories.map((category: any) => (
          <div
            key={category.id}
            className="pt-1.5 px-3 bg-black border-2 border-gray-700 rounded-sm"
          >
            <div className="flex justify-center items-center">
              <NotebookTabs className="w-8 h-8 text-[#448AFF]" />
            </div>
            <h1 className="text-white text-center py-4 text-lg font-bold">
              {category.title}
            </h1>
            <p className="text-white text-sm">{truncateText(stripHtml(category.content), 300)}</p>

            <div className="w-full aspect-video my-4">
              {category.video ? (
                <div
                  className="w-full h-full"
                  dangerouslySetInnerHTML={{
                    __html: category.video.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="100%"'),
                  }}
                />
              ) : (
                <div className="w-full h-full relative">
                  <Image
                    src={`${BASE_URL}/homeImg/${category.img}`}
                    alt={category.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-center gap-4 my-4">
              <Link href={`/quiz-info/${category.id}`}><button className="quiz-btn">Quiz Info</button></Link>
              <button className="quiz-btn">Get Started</button>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#000] flex justify-center gap-4 pb-10 pt-2">
        <Link href="ongoing-quizzes"><button className="bg-[#3572db] px-3 py-2 text-white rounded-xs cursor-pointer hover:bg-[#50678f] text-sm uppercase
">All ongoing Quiz</button></Link>
        <Link href="upcoming-quizzes"><button className="bg-[#3572db] px-3 py-2 text-white rounded-xs cursor-pointer hover:bg-[#50678f] text-sm uppercase
">Upcoming Quiz</button></Link>
      </div>
    </>
  );
};

export default Category;
