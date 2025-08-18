import Image from "next/image";

const PUBLIC_URL = process.env.NEXT_PUBLIC_URL ?? "";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";

export default async function AboutUs() {
    let TermsConditon = [];
    try {
        const res = await fetch(`${APP_URL}/terms-and-conditions/api`);
        if (!res.ok) throw new Error("Failed to fetch about us");
        const json = await res.json();
        TermsConditon = json.data;
    } catch (error) {
        return <p className="text-gray-400 pt-4">Failed to load Terms and conditions.</p>;
    }

    return <>
        <div className="bg-black">
            <div className="text-center px-6 py-4">
                <h1 className="text-white text-2xl inline-block p-5 after:content-[''] after:block after:border-b-2 after:border-blue-500 after:w-[80%] after:mx-auto after:mt-2">Terms and conditions</h1>
                <div
                    className="text-white"
                    dangerouslySetInnerHTML={{ __html: TermsConditon?.policy[0]?.terms_and_condition || "" }}
                />
            </div>
        </div>
    </>
}