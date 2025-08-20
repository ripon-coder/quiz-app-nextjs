"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { time } from "console";

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
  answer: any;
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [examStatus, setExamStatus] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [resultStore, setResultStore] = useState<any>(null);
  const [isQuestionLoading, setIsQuestionLoading] = useState(false);

  // Initialize the quiz
  const startQuiz = async () => {
    try {
      setIsLoading(true);
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
      if (!res.ok) {
        throw new Error("Failed to start quiz");
      }
      const data = await res.json();

      setExamStatus(data?.message || null);

      if (data?.data?.question) {
        setQuizStarted(true);
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResult(false);
        loadQuestion(data, currentQuestionIndex);
      } else {
        setShowResult(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to create API request body
  const createRequestBody = (
    questionId?: number,
    variationId?: number,
    quesNumber?: number,
    includeAnswer = false
  ) => ({
    quiz_id: Number(quizId),
    status: Number(status),
    book_id: bookId ? Number(bookId) : null,
    lang,
    ...(questionId && { questionId }),
    ...(variationId && { variation_id: variationId }),
    ...(quesNumber !== undefined && { quesNumber }),
    ...(includeAnswer && { answer: selectedOption || "" }),
  });

  const loadNextQuestion = async () => {
    if (!questionData) return;
    try {
      setIsLoading(true);
      const res = await fetch("/start-quiz/quiz-next-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          createRequestBody(
            questionData.id,
            questionData.variation_id,
            currentQuestionIndex + 1,
            true // include answer only for next-question API
          )
        ),
      });

      const data = await res.json();

      if (data?.data?.result_done) {
        setResultStore(data.data);
        setShowResult(true);
      } else if (data?.data?.question) {
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        loadQuestion(data, nextIndex);
      } else {
        console.warn("No question returned from API.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadQuestion = (data: any, questionIndex: number) => {
    if (!data?.data?.question) {
      setQuestionData(null);
      setShowResult(true);
      return;
    }

    const q = data.data.question;
    setQuestionData({
      id: q.id || null,
      variation_id: q.variation_id,
      quesNumber: questionIndex,
      question: q.question,
      answer: q.answer || null,
      options: q.options || [],
    });
    setTotalQuestions(data.data.total_question || 0);
    setSelectedOption(null);
    setTimeLeft(60);
  };

  // Timer effect
  useEffect(() => {
    if (!quizStarted || showResult || !questionData) return; // add questionData check

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleQuestionProgression();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, showResult, currentQuestionIndex, questionData]);

  const handleOptionSelect = (option: string) => {
    if (!isLoading) {
      setSelectedOption(option);
    }
  };

  const handleQuestionProgression = async () => {
    if (!questionData || isQuestionLoading) return;
    setIsQuestionLoading(true);

    if (selectedOption === questionData?.answer) {
      setScore((prev) => prev + 1);
    }
    await loadNextQuestion();

    setIsQuestionLoading(false);
    setSelectedOption(null);
  };

  const handleNextClick = async () => {
    await handleQuestionProgression();
  };

  useEffect(() => {
    startQuiz();
  }, [quizId]);

  const maxTime = questionData?.time ?? 10;
  let color = timeLeft > maxTime / 2 ? "text-green-500" : "text-red-500";

  return (
    <div className="flex items-center justify-center bg-black text-white p-4 py-8">
      <div className="w-full max-w-2xl bg-gray-800 p-6 ">
        {quizStarted ? (
          !showResult && questionData ? (
            <>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </span>
                  <span className="text-sm font-medium px-3 py-1 bg-gray-700 rounded-full">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
                      <span
                        className={`text-2xl font-mono font-semibold drop-shadow-md ${color}`}
                      >
                        <span className="inline-block w-8 text-center">
                          {timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                        </span>
                        <span className="text-sm ml-1 opacity-80">seconds</span>
                      </span>
                    </div>
                  </span>
                </div>
                <h2 className="text-xl font-semibold">
                  {questionData.question}
                </h2>
              </div>

              <div className="grid grid-rows-1 md:grid-cols-2 gap-3 mb-6">
                {questionData.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.option)}
                    disabled={isLoading}
                    className={`p-4 text-left  border transition-all ${
                      selectedOption === option.option
                        ? "bg-blue-600 border-blue-600"
                        : "bg-gray-700 border-gray-600 hover:bg-gray-600"
                    } ${
                      isLoading
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    {option.option}
                  </button>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNextClick}
                  disabled={isLoading}
                  className={`px-6 py-2  font-medium ${
                    isLoading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 cursor-pointer"
                  }`}
                >
                  {isLoading
                    ? "Loading..."
                    : currentQuestionIndex + 1 === totalQuestions
                    ? "Finish Quiz"
                    : "Next Question"}
                </button>
              </div>
            </>
          ) : showResult ? (
            <div className="text-center">
              {resultStore ? (
                <div className="max-w-sm mx-auto p-6  rounded-lg  text-white">
                  <h2 className="text-2xl font-semibold mb-6">
                    Quiz Completed!
                  </h2>

                  <div className="space-y-4 text-left">
                    <div className="flex justify-between">
                      <span>Total Questions</span>
                      <span>{resultStore.quiz.total_quistion}</span>
                    </div>

                    <div className="flex justify-between items-center text-green-600">
                      <div className="flex items-center space-x-1">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Correct Answers</span>
                      </div>
                      <span>{resultStore.result.total_right_ans}</span>
                    </div>

                    <div className="flex justify-between items-center text-red-600">
                      <div className="flex items-center space-x-1">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span>Wrong Answers</span>
                      </div>
                      <span>{resultStore.result.total_worng_ans}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link href="/user/quiz-scores">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm cursor-pointer">
                        View All Quiz Results
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <p>No results available.</p>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p>Loading questions...</p>
            </div>
          )
        ) : (
          <div className="flex justify-center items-center bg-gray-800 p-4">
            <p className="text-white text-lg font-medium animate-pulse">
              {examStatus ? "Exam already completed." : "Preparing quiz..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
