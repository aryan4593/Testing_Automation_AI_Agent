import React from "react";
import { FolderGit2, Lock, Globe2, GitBranch } from "lucide-react";

function ProjectCard({ project }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 cursor-pointer">

      <div className="flex justify-between items-start">
        <FolderGit2 className="w-10 h-10 text-gray-700" />

        {project.private ? (
          <Lock className="w-5 h-5 text-red-500" />
        ) : (
          <Globe2 className="w-5 h-5 text-green-600" />
        )}
      </div>

      <h2 className="mt-5 text-xl font-semibold">
        {project.name}
      </h2>

      <p className="text-gray-500 text-sm mt-1 truncate">
        {project.fullName}
      </p>

      <p className="text-sm mt-4 text-gray-600 line-clamp-2">
        {project.description || "No description available"}
      </p>

      <div className="flex justify-between items-center mt-6">

        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          {project.language || "Unknown"}
        </span>

        <div className="flex items-center gap-1 text-sm text-gray-600">
          <GitBranch className="w-4 h-4" />
          {project.defaultBranch}
        </div>

      </div>

    </div>
  );
}

export default ProjectCard;