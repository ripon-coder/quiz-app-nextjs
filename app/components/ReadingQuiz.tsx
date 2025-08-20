"use client";

import React, { useState } from "react";
import Image from "next/image";
import { formatDateToDDMMYYYY, stripHtml } from "@/app/lib/helper";
import Link from "next/link";
const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "";

export default function ReadingQuiz({ quizzes, quizImg }: any) {
  const [modalOpen, setModalOpen] = useState(false);
  const [book, setBook] = useState<string | null>(null);
  // Open modal and set PDF url
  function openModal(bookData: any) {
    // setPdfUrl(`${BASE_URL}/books/${pdfPath}`);
    setBook(bookData);
    setModalOpen(true);
  }
  // Close modal
  function closeModal() {
    setModalOpen(false);
    setBook(null);
  }

  if (quizzes.length === 0) return <h1>No quizzes found</h1>;

  return (
    <>
      {quizzes.map((category: any) =>
        category.active_books.map((book: any) => (
          <div
            key={`${category.id}-${book.id}`}
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
                  <span className="text-[#34cc21]">{book.language}</span>
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
                  onClick={() => openModal(book)} // make sure book.pdf_path exists and is the PDF URL
                  className="bg-[#3572db] px-3 py-2 my-4 text-white rounded-sm cursor-pointer hover:bg-[#50678f] text-sm"
                >
                  Read Book
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

      {modalOpen && book && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full max-w-5xl h-[90vh] relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="
          absolute top-1 right-1
          text-black font-bold text-3xl 
          px-3 py-1 
          bg-gray-200 rounded-full 
          hover:bg-gray-300 
          focus:outline-none
          shadow-md
          cursor-pointer
        "
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>

            <iframe
              src={`${BASE_URL}/books/${book.book}`!}
              className="flex-grow w-full min-h-0"
              frameBorder="0"
              title="Book PDF"
            />

            <div className="p-4 bg-gray-100 flex justify-center flex-shrink-0 items-center gap-2">
              <p className="block text-black text-sm font-bold">
                Are You Ready To Start Quiz?
              </p>
              <Link
                href={`/start-quiz?quiz_id=${book?.quiz_id || ""}&status=3&book_id=${
                  book.id ? book.id : ""
                }&lang=${book?.language || ""}`}
              >
                <button className="bg-blue-600 text-white px-2 py-1 text-sm rounded hover:bg-blue-700 inline-block cursor-pointer">
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
