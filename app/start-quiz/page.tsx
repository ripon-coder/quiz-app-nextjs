"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface OptionType {
  id: number;
  question_id: number;
  option: string;
}

interface QuestionType {
  id: number;
  variation_id: number;
  quesNumber: number;
  question: string;
  answer: string;
  options: OptionType[];
  time?: number;
}

export default function Quiz() {
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quiz_id") || "";
  const status = searchParams.get("status") || "";
  const bookId = searchParams.get("book_id") || "";
  const lang = searchParams.get("lang") || "";

  const [questionData, setQuestionData] = useState<QuestionType | null>(null);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResut] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(60);

  // Load first question
  const fetchStartQuiz = async () => {
    try {
      const res = await fetch("/start-quiz/quiz-start-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quiz_id: Number(quizId),
          status: Number(status),
          book_id: bookId ? Number(bookId) : null,
          lang,
        }),
      });

      const data = await res.json();
      if (data?.data?.question) {
        setCurrentNumber(0);
        setScore(0);
        setShowResult(false);
        loadQuestion(data);
      } else {
        setShowResult(true);
      }
    } catch (err) {
      console.error(err);
      setShowResult(true);
    }
  };

  // Load next question
  const fetchNextQuiz = async () => {
    try {
      const res = await fetch("/start-quiz/quiz-next-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quiz_id: Number(quizId),
          variation_id: questionData?.variation_id,
          questionId: questionData?.id,
          status: Number(status),
          book_id: bookId ? Number(bookId) : null,
          lang,
          answer: selected,
          quesNumber: currentNumber + 1, // next question number
        }),
      });

      if (!res.ok) return;

      const data = await res.json();

      if (data?.data?.question) {
        loadQuestion(data);
        setCurrentNumber((prev) => prev + 1);
      } else {
        setShowResult(true); // finished
        setResut(data.data);
      }
    } catch (err) {
      console.error(err);
      setShowResult(true);
    }
  };

  const loadQuestion = (data: any) => {
    const q = data.data.question;
    setQuestionData({
      id: q.id,
      variation_id: q.variation_id,
      quesNumber: currentNumber,
      question: q.question,
      answer: q.answer,
      options: q.options || [],
      time: 60,
    });
    setTotalQuestions(data.data.total_question || 0);
    setSelected(null);
    setTimeLeft(60);
  };

  useEffect(() => {
    fetchStartQuiz();
  }, [quizId]);

  useEffect(() => {
    if (!questionData || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questionData, showResult]);

  const handleOptionClick = (opt: string) => setSelected(opt);

  const handleNext = async () => {
    if (selected === questionData?.answer) setScore((prev) => prev + 1);

    if (currentNumber >= totalQuestions) {
      setShowResult(true);
      return;
    }
    await fetchNextQuiz();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4 py-8">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-md p-6">
        {!showResult && questionData ? (
          <>
            <div className="mb-4">
              <h1 className="text-xl font-semibold m-2">
                Q{currentNumber + 1}. {questionData.question}
              </h1>
              <p className="text-sm text-gray-300 m-2">
                Time Left:{" "}
                <span>{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>s
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {questionData.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleOptionClick(opt.option)}
                  className={`text-left px-4 py-3 my-1 mx-1 rounded border border-gray-600 hover:bg-blue-600 transition-colors cursor-pointer ${
                    selected === opt.option ? "bg-blue-500" : "bg-gray-700"
                  }`}
                >
                  {opt.option}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="bg-green-600 px-4 py-2 m-1 rounded hover:bg-green-700 transition-colors cursor-pointer"
            >
              {currentNumber + 1 === totalQuestions ? "Finish" : "Next"}
            </button>
          </>
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-xl w-full text-center space-y-6">
              <h2 className="text-3xl font-bold text-green-400">
                🎉 Congratulations! 🎉
              </h2>
              <p className="text-gray-300 text-lg font-semibold">
                {result.quiz.title}
              </p>

              <div className="flex justify-around mt-4">
                <div className="bg-green-600 rounded-lg px-4 py-2 w-28">
                  <p className="text-white font-semibold">Right</p>
                  <p className="text-white text-xl">{result.result.total_right_ans}</p>
                </div>
                <div className="bg-red-600 rounded-lg px-4 py-2 w-28">
                  <p className="text-white font-semibold">Wrong</p>
                  <p className="text-white text-xl">{result.result.total_worng_ans}</p>
                </div>
              </div>

              <p className="text-yellow-400 text-2xl font-bold mt-4">
                Total Mark: {result.total_mark} / {result.total_quistion}
              </p>

              <p className="text-gray-300 mt-2">
                {result.quiz.price
                  ? `You may get prize money: $${result.result.price}`
                  : "No prize money for this quiz."}
              </p>

              <p className="text-gray-300 text-sm">
                If you win any prize for this quiz, we will confirm you. Thanks!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
