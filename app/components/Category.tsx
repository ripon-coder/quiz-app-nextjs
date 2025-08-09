import React from "react";
import { NotebookTabs } from "lucide-react";

const Category: React.FC = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 px-4 py-8 bg-[#000]">
        <div className="md:w-1/4 p-4 bg-[#000] border-2">
          <div className="flex justify-center align-center">
            <NotebookTabs className="w-[2em] h-[2em] text-[#448AFF]" />
          </div>
          <div>
            <h1 className="text-white text-center py-4 text-[18px] font-bold">General Quiz Competition</h1>
          </div>
          <p className="text-white text-sm word-spacing-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae sapiente voluptas quas! Sint deleniti facere exercitationem sed id. Distinctio eaque quidem eligendi corrupti ipsa modi maiores perspiciatis? Totam, esse quaerat. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro tenetur nulla magnam corrupti beatae quibusdam vel exercitationem, pariatur magni error hic laudantium doloribus commodi officiis voluptatum quos aspernatur, tempora delectus?</p>
        <div className="flex justify-center gap-4">
            <button className="bg-[#448AFF]">Quiz Info</button>
            <button className="bg-[#448AFF]">Get Started</button>
        </div>
        </div>
        <div className="md:w-1/4 bg-gray-100 p-4">Category 2</div>
        <div className="md:w-1/4 bg-gray-100 p-4">Category 3</div>
        <div className="md:w-1/4 bg-gray-100 p-4">Category 4</div>
      </div>
    </>
  );
};

export default Category;
