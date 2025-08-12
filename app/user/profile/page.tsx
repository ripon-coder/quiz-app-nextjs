export default function Profile() {
  return (
    <div className="px-5 py-5">
      <form action="">
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="flex flex-col grow">
            <label className="py-0.5 text-sm">Full Name</label>
            <input
              className="border border-gray-300 focus:outline-none p-1 pl-2"
              type="text"
            />
          </div>
          <div className="flex flex-col grow">
            <label className="py-0.5 text-sm">Email</label>
            <input
              className="border border-gray-300 focus:outline-none p-1 pl-2"
              type="text"
            />
          </div>
          <div className="flex flex-col grow">
            <label className="py-0.5 text-sm">Date of Birth</label>
            <input
              className="border border-gray-300 focus:outline-none p-1 pl-2"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5 mt-5">
          <div className="flex flex-col grow">
            <label className="py-0.5 text-sm">Grade</label>
            <input
              className="border border-gray-300 focus:outline-none p-1 pl-2"
              type="text"
            />
          </div>
          <div className="flex flex-col grow">
            <label className="py-0.5 text-sm">Occupation</label>
            <input
              className="border border-gray-300 focus:outline-none p-1 pl-2"
              type="text"
            />
          </div>
          <div className="flex flex-col grow">
            <label className="py-0.5 text-sm">Phone</label>
            <input
              className="border border-gray-300 focus:outline-none p-1 pl-2"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5 mt-5">
          <div className="flex flex-col grow">
            <label className="py-0.5 text-sm">Address</label>
            <input
              className="border border-gray-300 focus:outline-none p-1 pl-2"
              type="text"
            />
          </div>
          <div className="flex flex-col grow">
            <label className="py-0.5 text-sm">City</label>
            <input
              className="border border-gray-300 focus:outline-none p-1 pl-2"
              type="text"
            />
          </div>
          <div className="flex flex-col grow">
            <label className="py-0.5 text-sm">State</label>
            <input
              className="border border-gray-300 focus:outline-none p-1 pl-2"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5 mt-5">
          <div className="flex flex-col grow">
            <label className="py-0.5 text-sm">Relation with Guardian</label>
            <input
              className="border border-gray-300 focus:outline-none p-1 pl-2"
              type="text"
            />
          </div>
          <div className="flex flex-col grow">
            <label className="py-0.5 text-sm">Guardian Phone</label>
            <input
              className="border border-gray-300 focus:outline-none p-1 pl-2"
              type="text"
            />
          </div>

          <div className="flex flex-col grow">
            <label className="py-0.5 text-sm">Guardian Email</label>
            <input
              className="border border-gray-300 focus:outline-none p-1 pl-2"
              type="text"
            />
          </div>
        </div>
        <div className="pt-5">
          <button className="bg-[#1e60d3] py-1.5 px-5 cursor-pointer hover:bg-[#122f61]" type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
