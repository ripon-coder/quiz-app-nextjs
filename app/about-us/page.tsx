import Image from "next/image";

const PUBLIC_URL = process.env.NEXT_PUBLIC_URL ?? "";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";

export default async function AboutUs() {
    let AboutUs = [];
    try {
        const res = await fetch(`${APP_URL}/about-us/api`);
        if (!res.ok) throw new Error("Failed to fetch about us");
        const json = await res.json();
        AboutUs = json.data;
    } catch (error) {
        return <p className="text-gray-400 pt-4">Failed to load About Us.</p>;
    }

    return <>
        <div className="bg-black">
            <div className="text-center px-6 py-4">
                <h1 className="text-white text-2xl inline-block p-5 after:content-[''] after:block after:border-b-2 after:border-blue-500 after:w-[80%] after:mx-auto after:mt-2">{AboutUs?.about[0]?.title}</h1>
                <div
                    className="text-white"
                    dangerouslySetInnerHTML={{ __html: AboutUs?.about[0]?.desc || "" }}
                />
            </div>
            <div className="text-center px-2 md:px-6 py-4">
                <h1 className="text-white text-2xl inline-block p-5 after:content-[''] after:block after:border-b-2 after:border-blue-500 after:w-[80%] after:mx-auto after:mt-2">Our Team</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    {AboutUs?.teams?.length > 0 ? (
                        AboutUs.teams.map((item: any) => (
                            <div
                                key={item.id}
                                className="relative w-full h-80 overflow-hidden group"
                            >
                                <Image
                                    src={`${PUBLIC_URL}/teams/${item.img}`}
                                    alt={item.name || "Team member"}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute bottom-0 w-full bg-black/60 p-2 text-center text-white text-sm">
                                    <h2 className="font-semibold">{item.name || "Unnamed"}</h2>
                                    <p>{item.deg || "Team Member"}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-white">No team members found.</p>
                    )}
                </div>




            </div>
        </div>
    </>
}