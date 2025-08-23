export default function ContactUs() {
  return (
    <>
      {" "}
      <h2 className="text-green-400 text-xl font-bold pb-2 text-center md:text-start">
        HAVE ANY QUESTIONS? SEND MESSAGE US
      </h2>
      <form>
        <div className="text-white py-2 flex flex-col md:flex-row gap-4">
          <div className="flex flex-col flex-1">
            <label className="py-1">Full Name</label>
            <input
              type="text"
              className="border border-gray-500 focus:outline-none p-1 pl-2"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="py-1">Phone</label>
            <input
              type="text"
              className="border border-gray-500 focus:outline-none p-1 pl-2"
            />
          </div>
        </div>
        <div className="text-white py-2 flex flex-col md:flex-row gap-4">
          <div className="flex flex-col flex-1">
            <label className="py-1">Email</label>
            <input
              type="text"
              className="border border-gray-500 focus:outline-none p-1 pl-2"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="py-1">Subject</label>
            <input
              type="text"
              className="border border-gray-500 focus:outline-none p-1 pl-2"
            />
          </div>
        </div>
        <div className="text-white py-2 flex gap-4">
          <div className="flex flex-col flex-1">
            <label className="py-1">Message</label>
            <textarea className="border border-gray-500 focus:outline-none p-1 pl-2"></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="mt-2 px-4 bg-blue-800 hover:bg-blue-700 transition-colors text-white font-semibold py-1 cursor-pointer"
        >
          Send
        </button>
      </form>
    </>
  );
}
