import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  FolderGit2,
  Globe2,
  Lock,
  ListChecks,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Sparkles,
} from "lucide-react";

function StatusCard({ title, value, icon, bgColor }) {
  return (
    <div className="border rounded-xl px-5 py-4 flex items-center justify-between bg-white">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-semibold mt-1">{value}</h3>
      </div>

      <div
        className={`h-10 w-10 rounded-full flex items-center justify-center ${bgColor}`}
      >
        {icon}
      </div>
    </div>
  );
}

function ProjectList({ projects }) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-5">
        Connected Repositories
      </h2>

      {projects.map((project) => (
        <Accordion
          key={project._id}
          type="single"
          collapsible
          className="mb-5"
        >
          <AccordionItem
            value={project._id}
            className="border rounded-2xl shadow-sm px-6"
          >
            <AccordionTrigger className="hover:no-underline py-5">
              <div className="flex items-center gap-5">

                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
                  <FolderGit2 className="w-7 h-7 text-gray-700" />
                </div>

                <div className="text-left">
                  <h2 className="text-lg font-semibold">
                    {project.fullName}
                  </h2>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <span>{project.defaultBranch}</span>
                    <span>•</span>
                    <span>{project.language || "Unknown"}</span>

                    {project.private ? (
                      <Lock className="w-4 h-4 text-red-500 ml-2" />
                    ) : (
                      <Globe2 className="w-4 h-4 text-green-600 ml-2" />
                    )}
                  </div>
                </div>

              </div>
            </AccordionTrigger>

            <AccordionContent>

              <div className="pt-2 pb-2 space-y-5">

                {/* Description */}

                <div>
                  <p className="text-gray-600">
                    {project.description || "No description available."}
                  </p>
                </div>

                {/* Statistics */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                  <StatusCard
                    title="Total Tests"
                    value="0"
                    icon={
                      <ListChecks className="h-5 w-5 text-blue-600" />
                    }
                    bgColor="bg-blue-50"
                  />

                  <StatusCard
                    title="Passed"
                    value="0"
                    icon={
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    }
                    bgColor="bg-green-50"
                  />

                  <StatusCard
                    title="Failed"
                    value="0"
                    icon={
                      <XCircle className="h-5 w-5 text-red-600" />
                    }
                    bgColor="bg-red-50"
                  />

                  <StatusCard
                    title="Pass Rate"
                    value="0%"
                    icon={
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                    }
                    bgColor="bg-purple-50"
                  />

                </div>

                {/* Generate Test Cases */}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between border rounded-xl p-5 bg-gray-50 gap-4">

                  <div>
                    <h3 className="font-semibold text-lg">
                      Generate AI Test Cases
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Analyze this repository and automatically generate
                      AI-powered test cases.
                    </p>
                  </div>

                  <button className="flex items-center gap-2 bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition">
                    <Sparkles className="h-4 w-4" />
                    Generate Test Cases
                  </button>

                </div>

                {/* Generated Test Cases */}

                <div>

                  <h3 className="font-semibold text-lg mb-3">
                    Generated Test Cases
                  </h3>

                  <div className="border rounded-xl p-8 text-center text-gray-500">
                    No test cases generated yet.
                  </div>

                </div>

              </div>

            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}

export default ProjectList;