import React from "react";
import { NotebookTabs } from "lucide-react";

const Category: React.FC = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 px-4 py-8 bg-[#000]">
        <div className="md:w-1/4 p-4 bg-[#000]">
          <div className="flex justify-center align-center text-lg">
            <NotebookTabs className="w-[2em] h-[2em]" />
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
