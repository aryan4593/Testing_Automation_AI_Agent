import React from "react";
import { Link } from "lucide-react";

function EmptyWorkSpace() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm py-16 px-10 flex flex-col items-center">
      <img
        src="/folder.png"
        alt="Folder"
        className="w-28 h-28"
      />

      <h2 className="text-4xl font-bold mt-6">
        No Repository Connected
      </h2>

      <p className="text-gray-500 text-center mt-4 max-w-lg leading-7">
        Connect your GitHub account and add a repository to
        generate and run automated test cases.
      </p>

      <button className="mt-8 flex items-center gap-3 bg-black hover:bg-gray-900 text-white font-medium px-7 py-3 rounded-xl transition">
        <Link size={20} />
        Connect Repository
      </button>
    </div>
  );
}

export default EmptyWorkSpace;