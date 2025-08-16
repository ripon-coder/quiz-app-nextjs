import { fetchJoinQuiz } from "@/app/lib/api/joinQuizApi";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatDateToDDMMYYYY, stripHtml,truncateText } from "@/app/lib/helper";
import GeneralQuiz from "@/app/components/GeneralQuiz";
import ReadingQuiz from "@/app/components/ReadingQuiz";
import VideoQuiz from "@/app/components/VideoQuiz";
import SpellingQuiz from "@/app/components/SpellingQuiz";


export async function generateMetadata({ params, searchParams } : any) {
  const { id, status } = (await searchParams);
  if (!id || !status) {
    return {
      title: "Quiz Not Found",
      description: "The requested quiz does not exist.",
    };
  }

  let post;
  try {
    post = await fetchJoinQuiz(Number(id), Number(status));
  } catch (err) {
    console.error("Error fetching quiz:", err);
    return {
      title: "Quiz Not Found",
      description: "Unable to fetch quiz data.",
    };
  }

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

}


export default async function JoinQuizPage({ searchParams }: any) {
  const { id, status } = await searchParams;
  if (!id || !status) return notFound();
  const data = await fetchJoinQuiz(Number(id), Number(status));
  const quizImg = data.quiz_img;
  const quizzes = data.quiz;
  return (
    <div className="bg-black text-white min-h-screen">
      {String(status) === "1" && (
        <GeneralQuiz quizzes={quizzes} quizImg={quizImg} />
      )}
      {String(status) === "2" && (
        <SpellingQuiz quizzes={quizzes} quizImg={quizImg} />
      )}
      {String(status) === "3" && (
        <ReadingQuiz quizzes={quizzes} quizImg={quizImg} />
      )}
      {String(status) === "4" && (
        <VideoQuiz quizzes={quizzes} quizImg={quizImg} />
      )}

      {!["1", "2", "3", "4"].includes(String(status)) && (
        <div className="p-10 text-center">
          <h1 className="text-2xl font-bold">Quiz not found</h1>
          <p className="text-gray-400">Please select a valid quiz.</p>
        </div>
      )}
    </div>
  );
}
