import Link from "next/link"

export default function Footer() {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-center gap-4 bg-[#1a1c1d] py-8">
                <div className="md:w-1/4 text-white text-center">
                    <h1 className="relative text-xl inline-block after:content-[''] after:block after:border-b-3 after:border-blue-500 after:w-[80%] after:mx-auto after:mt-2">
                        About Us
                    </h1>
                    <ul className="text-sm pt-7">
                        <Link href="/about-us"><li>About Us</li></Link>
                        <li className="pt-3">Terms and Conditions</li>
                        <li className="pt-3">Privacy Policy</li>
                    </ul>
                </div>

                <div className="md:w-1/4 text-white text-center mt-8 md:mt-0">
                    <h1 className="relative text-xl inline-block after:content-[''] after:block after:border-b-3 after:border-blue-500 after:w-[80%] after:mx-auto after:mt-2">
                    Help & support
                    </h1>
                    <ul className="text-sm pt-7 ">
                        <li className="">FAQ</li>
                        <li className="pt-3">Contact Us</li>
                        <li className="pt-3"></li>
                    </ul>
                </div>
                <div className="md:w-1/4 text-white text-center mt-8 md:mt-0">
                    <h1 className="relative text-xl inline-block after:content-[''] after:block after:border-b-3 after:border-blue-500 after:w-[80%] after:mx-auto after:mt-2">
                    Quick Links
                    </h1>
                    <ul className="text-sm pt-7">
                        <li className="">Login</li>
                        <li className="pt-3">Register</li>
                    </ul>
                </div>
                <div className="md:w-1/4 text-white text-center mt-8 md:mt-0">
                    <h1 className="relative text-xl inline-block after:content-[''] after:block after:border-b-3 after:border-blue-500 after:w-[80%] after:mx-auto after:mt-2">
                    Download Our App
                    </h1>
                    <ul className="text-sm pt-7">
                        <li>About Us</li>
                        <li className="pt-3">Terms and Conditions</li>
                        <li className="pt-3">Privacy Policy</li>
                    </ul>
                </div>

            </div>
        </>
    )
}