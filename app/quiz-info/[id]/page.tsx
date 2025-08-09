import { notFound } from "next/navigation";

export default function Quizinfo({ params }: { params: { id?: string } }) {
  const { id } = params;

  if (!id || isNaN(Number(id))) {
    notFound();
  }

  return (
    <div className="bg-[#000] p-8 text-white">
      <h1 className="text-[#8ec124] text-3xl font-bold">
        General Quiz Competition
      </h1>
      <p className="pt-8 text-sm">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </p>
    </div>
  );
}
