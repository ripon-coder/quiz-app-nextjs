import { fetchStartedQuizApi } from "@/app/lib/api/fetchStartedQuizApi";
import { fetchJoinQuiz } from "@/app/lib/api/joinQuizApi";
import { notFound } from "next/navigation";
import GeneralQuiz from "@/app/components/GeneralQuiz";
import ReadingQuiz from "@/app/components/ReadingQuiz";
import VideoQuiz from "@/app/components/VideoQuiz";
import SpellingQuiz from "@/app/components/SpellingQuiz";
import { stripHtml, truncateText } from "@/app/lib/helper";

export async function generateMetadata({ searchParams }: any) {
  const { status } = await searchParams;

  if (!status) {
    return {
      title: "Quiz Not Found",
      description: "The requested quiz does not exist.",
    };
  }

  try {
    // fetch quiz start status
    const statusData = await fetchStartedQuizApi(Number(status));
    if (!statusData?.length) {
      return {
        title: "Quiz Not Found",
        description: "No quiz found for this category.",
      };
    }

    // fetch quiz details
    const post = await fetchJoinQuiz(Number(statusData[0]?.id), Number(status));
    const quiz = post?.quiz?.[0];

    if (!quiz) {
      return {
        title: "Quiz Not Found",
        description: "The requested quiz does not exist.",
      };
    }

    return {
      title: quiz.title || "Quiz Title",
      description: truncateText(stripHtml(quiz.home_content?.content || ""), 150),
    };
  } catch (err: any) {
    console.error("Error in generateMetadata:", err);
    return {
      title: "Quiz Not Found",
      description: err?.message || "Unable to fetch quiz data.",
    };
  }
}

export default async function JoinQuizPage({ searchParams }: any) {
  const { status } = await searchParams;
  if (!status) return notFound();

  let data: any = { quiz: [], quiz_img: null };

  try {
    // fetch quiz start status
    const statusData = await fetchStartedQuizApi(Number(status));
    if (!statusData?.length) {
      return (
        <div className="p-10 text-center text-white bg-black">
          <h1 className="text-2xl font-bold">Quiz not found</h1>
          <p className="text-white">No quiz is available for this category.</p>
        </div>
      );
    }

    // fetch quiz details
    const fetchedData = await fetchJoinQuiz(Number(statusData[0]?.id), Number(status));
    if (!fetchedData || !fetchedData.quiz?.length) {
      return (
        <div className="p-10 text-center text-white bg-black">
          <h1 className="text-2xl font-bold">Quiz not found</h1>
          <p className="text-gray-400">Unable to retrieve quiz details.</p>
        </div>
      );
    }

    data = fetchedData;
  } catch (err: any) {
    console.error("Error fetching quiz:", err);
    return (
      <div className="p-10 text-center text-white bg-black">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="text-gray-400">{err?.message || "Failed to load quiz data."}</p>
      </div>
    );
  }

  const quizImg = data.quiz_img;
  const quizzes = data.quiz;

  return (
    <div className="bg-black text-white min-h-screen">
      {String(status) === "1" && <GeneralQuiz quizzes={quizzes} quizImg={quizImg} />}
      {String(status) === "2" && <SpellingQuiz quizzes={quizzes} quizImg={quizImg} />}
      {String(status) === "3" && <ReadingQuiz quizzes={quizzes} quizImg={quizImg} />}
      {String(status) === "4" && <VideoQuiz quizzes={quizzes} quizImg={quizImg} />}

      {!["1", "2", "3", "4"].includes(String(status)) && (
        <div className="p-10 text-center">
          <h1 className="text-2xl font-bold">Quiz not found</h1>
          <p className="text-gray-400">Please select a valid quiz.</p>
        </div>
      )}
    </div>
  );
}
