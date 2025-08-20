"use client";
import { useEffect, useState } from "react";

export default function QuizScoresPage() {
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      try {
        const response = await fetch("/user/quiz-scores/api", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            page_no: pageNo,
            per_page: perPage,
          }),
        });
        const result = await response.json();
        // Handle new API shape: result.data.scores
        setScores(Array.isArray(result?.data?.scores) ? result.data.scores : []);
      } catch (e) {
        setScores([]);
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, [pageNo]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Quiz Scores</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black rounded shadow">
          <thead>
            <tr>
              <th className="px-3 py-2 border-b text-left text-xs font-semibold text-white">Date</th>
              <th className="px-3 py-2 border-b text-left text-xs font-semibold text-white">Quiz Title</th>
              <th className="px-3 py-2 border-b text-left text-xs font-semibold text-white">Category</th>
              <th className="px-3 py-2 border-b text-left text-xs font-semibold text-white">Book/Video</th>
              <th className="px-3 py-2 border-b text-left text-xs font-semibold text-white">Language</th>
              <th className="px-3 py-2 border-b text-left text-xs font-semibold text-white">Right</th>
              <th className="px-3 py-2 border-b text-left text-xs font-semibold text-white">Worng</th>
              <th className="px-3 py-2 border-b text-left text-xs font-semibold text-white">Score Got</th>
              <th className="px-3 py-2 border-b text-left text-xs font-semibold text-white">Total Mark</th>
              <th className="px-3 py-2 border-b text-left text-xs font-semibold text-white">Position</th>
              <th className="px-3 py-2 border-b text-left text-xs font-semibold text-white">Prize Money</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={11} className="text-center text-white py-4">
                  Loading...
                </td>
              </tr>
            ) : scores.length === 0 ? (
              <tr>
                <td colSpan={11} className="text-center text-white py-4">
                  No data found.
                </td>
              </tr>
            ) : (
              scores.map((row, idx) => {
                // Map status to category
                let category = "";
                if (row.status === 1) category = "General Quiz";
                else if (row.status === 2) category = "Spelling Quiz";
                else if (row.status === 3) category = "Reading Quiz";
                else if (row.status === 4) category = "Video Quiz";
                return (
                  <tr key={row.id ?? idx}>
                    <td className="px-3 py-2 border-b text-sm text-white">{row.date}</td>
                    <td className="px-3 py-2 border-b text-sm text-white">{row.quiz_title}</td>
                    <td className="px-3 py-2 border-b text-sm text-white">{category}</td>
                    <td className="px-3 py-2 border-b text-sm text-white">
                      {row.book_title
                        ? "Book: " + row.book_title
                        : row.video_title
                        ? "Video: " + row.video_title
                        : ""}
                    </td>
                    <td className="px-3 py-2 border-b text-sm text-white">
                      {row.book_language
                        ? row.book_language
                        : row.video_language
                        ? row.video_language
                        : ""}
                    </td>
                    <td className="px-3 py-2 border-b text-sm text-green-400">{row.total_right_ans}</td>
                    <td className="px-3 py-2 border-b text-sm text-red-400">{row.total_worng_ans}</td>
                    <td className="px-3 py-2 border-b text-sm text-white">{row.total_mark}</td>
                    <td className="px-3 py-2 border-b text-sm text-white">{row.total_quistion*row.mark}</td>
                    <td className="px-3 py-2 border-b text-sm text-white">{row.position ?? ""}</td>
                    <td className="px-3 py-2 border-b text-sm text-yellow-400">${row.aword ?? "0.00"}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {/* Show pagination only if scores.length === perPage */}
      {scores.length === perPage && (
        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            className="px-3 text-sm py-1 rounded bg-gray-700 text-white hover:bg-gray-600 transition"
            onClick={() => setPageNo((p) => Math.max(1, p - 1))}
            disabled={pageNo === 1}
          >
            Previous
          </button>
          <span className="text-white text-sm">Page {pageNo}</span>
          <button
            className="px-3 text-sm py-1 rounded bg-gray-700 text-white hover:bg-gray-600 transition"
            onClick={() => setPageNo((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}