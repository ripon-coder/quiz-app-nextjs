"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  formatDateToDDMMYYYY,
  stripHtml,
  getYoutubeEmbedUrl,
} from "@/app/lib/helper";
import Link  from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "";

export default function VideoQuiz({ quizzes, quizImg }: any) {
  const [modalOpen, setModalOpen] = useState(false);
  const [video, setVideo] = useState<any>(null); // for single object

  // Open modal and set PDF url
  function openModal(videoData: any) {
    setModalOpen(true);
    setVideo(videoData);
  }

  // Close modal
  function closeModal() {
    setModalOpen(false);
    setVideo(null);
  }

  if (quizzes.length === 0) return <h1>No quizzes found</h1>;

  return (
    <>
      {quizzes.map((category: any) =>
        category.active_videos.map((video: any) => (
          <div
            key={`${category.id}-${video.id}`}
            className="flex md:flex-row flex-col gap-4 px-3 md:px-6 py-4"
          >
            <div className="md:w-4/12 w-full border-2 border-gray-700 rounded-sm p-2">
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
              <ul className="text-sm text-[#afa5a5] italic">
                <li className="pt-1.5">
                  Language:{" "}
                  <span className="text-[#34cc21]">{video.language}</span>
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
                <button
                  onClick={() => openModal(video)} // make sure video.pdf_path exists and is the PDF URL
                  className="bg-[#3572db] px-3 py-2 my-4 text-white rounded-sm cursor-pointer hover:bg-[#50678f] text-sm"
                >
                  Watch video
                </button>
              </div>
            </div>
            <div className="md:w-8/12 w-full">
              <h2 className="bg-[#0736bb] block md:p-2 p-1 px-2 md:text-xl">
                About The Quiz
              </h2>
              <p className="py-2 text-sm">{stripHtml(quizImg.content)}</p>
            </div>
          </div>
        ))
      )}

      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full max-w-3xl md:max-w-5xl h-auto overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video area */}
            <div className="relative w-full aspect-video">
              {/* Close button inside video corner */}
              <button
                onClick={closeModal}
                aria-label="Close modal"
                className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center 
                   text-black font-bold text-xl rounded-full bg-white/60
                   hover:bg-white focus:outline-none transition z-10 hover:cursor-pointer"
              >
                &times;
              </button>

              <iframe
                src={getYoutubeEmbedUrl(video.video) || ""}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video"
              />
            </div>

            {/* Bottom bar */}
            <div className="p-2 bg-white/90 flex justify-center items-center gap-3 flex-shrink-0">
              <p className="text-black text-sm font-semibold">
                Are You Ready To Start Quiz?
              </p>
              <Link
                href={`/start-quiz?quiz_id=${video.quiz_id}&status=4&book_id=${
                  video.id ? video.id : ""
                }&lang=${video.language}`}
              >
                <button className="bg-blue-600 text-white px-3 py-1 text-sm hover:bg-blue-700 transition cursor-pointer">
                  Start Quiz
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
