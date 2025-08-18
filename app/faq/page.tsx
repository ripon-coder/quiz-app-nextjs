import Accordion from "@/app/components/Accordion";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";

export default async function AboutUs() {
  let faqData: any = null;

  try {
    const res = await fetch(`${APP_URL}/faq/api`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch FAQ");
    const json = await res.json();
    faqData = json.data;
  } catch (error) {
    return <p className="text-gray-400 pt-4">Failed to load FAQ</p>;
  }

  return (
    <div className="bg-black">
      <div className="text-center px-6 py-4">
        <h1 className="text-white text-2xl inline-block p-5 after:content-[''] after:block after:border-b-2 after:border-blue-500 after:w-[80%] after:mx-auto after:mt-2">
          Frequently asked questions (FAQ)
        </h1>
        <div
          className="text-white"
          dangerouslySetInnerHTML={{ __html: faqData?.faq[0]?.desc || "" }}
        />
      </div>
      <div className="text-center px-6 py-4">
        <h1 className="text-white text-2xl inline-block p-5 after:content-[''] after:block after:border-b-2 after:border-blue-500 after:w-[80%] after:mx-auto after:mt-2">
          Questions and Answers
        </h1>
      </div>
      {/* Pass faqData to Accordion */}
      <Accordion items={faqData?.qnas || []} />
    </div>
  );
}
