import React, { useContext } from "react";
import { UserDetailsContext } from "../context/userDetailContext";

function WorkspaceBody() {
  const { userDetails } = useContext(UserDetailsContext);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold tracking-tight">
          Workspace
        </h1>

        <span className="bg-blue-100 text-blue-700 text-sm font-medium px-5 py-2 rounded-full">
          Remaining Credits: {userDetails?.credits ?? 0}
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <img
            src="/github.png"
            alt="GitHub"
            className="w-14 h-14"
          />

          <h2 className="text-2xl font-medium">
            Connect GitHub &amp; Add Repository
          </h2>
        </div>

        <button className="bg-black hover:bg-gray-900 text-white font-semibold px-8 py-3 rounded-xl transition">
          + Add
        </button>
      </div>
    </>
  );
}

export default WorkspaceBody;