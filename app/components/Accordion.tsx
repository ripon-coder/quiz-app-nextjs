"use client";

import { useState } from "react";

export default function Accordion({
  items,
}: {
  items: { id: string; question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="columns-1 gap-4 pb-6 px-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="mb-4 break-inside-avoid-column border border-gray-200 rounded-lg bg-gray-900" // Changed to break-inside-avoid-column
        >
          {/* Accordion Button */}
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between items-center p-4 text-left focus:outline-none text-white"
          >
            <span className="text-lg font-medium">
              {item.question || `Item ${index + 1}`}
            </span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Accordion Content */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-4 pt-0 text-gray-300">
              {item.answer || "No content"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}