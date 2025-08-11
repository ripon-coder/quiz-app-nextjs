import { fetchJoinQuiz } from "@/app/lib/api/joinQuizApi";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatDateToDDMMYYYY, stripHtml } from "@/app/lib/helper";
import GeneralQuiz from "@/app/components/GeneralQuiz";
import ReadingQuiz from "@/app/components/ReadingQuiz";

export default async function JoinQuizPage({ searchParams }: any) {
  const { id, status } = await searchParams;
  if (!id || !status) return notFound();
  const data = await fetchJoinQuiz(Number(id), Number(status));
  const quizImg = data.quiz_img;
  const quizzes = data.quiz;
  return (
    <>
      <div className=" bg-black text-white">
           {status === "1" && <GeneralQuiz quizzes={quizzes} quizImg={quizImg} />}
           {status === "3" && <ReadingQuiz quizzes={quizzes} quizImg={quizImg} />}
      </div>
    </>
  );
}
