import React, { useState } from "react";
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
  Loader2Icon,
  Link2Icon,
  Settings2,
} from "lucide-react";

import { generateTestCases, getTestCases } from "@/services/aiService";
import TestCaseList from "./TestCaseList";
import { Button } from "./ui/button";
import RepoSettings from "./RepoSettings";

const normalizeTestStatus = (status) => {
  const value = typeof status === "string" ? status.trim().toLowerCase() : "";

  if (["passed", "success", "succeeded", "completed"].includes(value)) return "passed";
  if (["failed", "error", "errored", "exception"].includes(value)) return "failed";
  if (["running", "inprogress", "in-progress", "processing"].includes(value)) return "running";
  if (["generating"].includes(value)) return "generating";

  return "pending";
};

const summarizeTestStatuses = (testCases = []) => {
  const totalTests = testCases.length;
  let passed = 0;
  let failed = 0;

  testCases.forEach((testCase) => {
    const normalizedStatus = normalizeTestStatus(testCase?.status);

    if (normalizedStatus === "passed") {
      passed += 1;
    } else if (normalizedStatus === "failed") {
      failed += 1;
    }
  });

  return {
    totalTests,
    passed,
    failed,
    passRate: totalTests === 0 ? 0 : Math.round((passed / totalTests) * 100),
  };
};

function ProjectList({ projects }) {
  const [generatedTestCases, setGeneratedTestCases] = useState([]);
  const [openedProjectId, setOpenedProjectId] = useState(null);
  const [testCaseLoading, setTestCaseLoading] = useState(false);
  const [statusData, setStatusData] = useState({
    totalTests: 0,
    passed: 0,
    failed: 0,
    passRate: 0,
  });
  const handleGenerateTestCases = async (project) => {
    try {
      setTestCaseLoading(true);

      const result = await generateTestCases(project._id);

      setOpenedProjectId(project._id);
      setGeneratedTestCases(result.testCases || []);
      setStatusData(summarizeTestStatuses(result.testCases || []));
    } catch (error) {
      console.error(error);
    } finally {
      setTestCaseLoading(false);
    }
  };

  const handleAccordionOpen = async (projectId) => {
    try {
      setTestCaseLoading(true);
      setGeneratedTestCases([]);

      const response = await getTestCases(projectId);
      setOpenedProjectId(projectId);
      setGeneratedTestCases(response.testCases || []);
      setStatusData(summarizeTestStatuses(response.testCases || []));
    } catch (error) {
      console.error(error);
    } finally {
      setTestCaseLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-5">Connected Repositories</h2>
      <Accordion
        type="single"
        collapsible
        className="space-y-5"
        onValueChange={(value) => {
          if (value) {
            handleAccordionOpen(value);
          } else {
            setGeneratedTestCases([]);
            setOpenedProjectId(null);
            setStatusData({
              totalTests: 0,
              passed: 0,
              failed: 0,
              passRate: 0,
            });
          }
        }}
      >
        {projects.map((project) => (
          <AccordionItem
            value={project._id}
            key={project._id}
            className="border rounded-2xl shadow-sm px-6"
          >
            <AccordionTrigger className="hover:no-underline py-5">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
                  <FolderGit2 className="w-7 h-7 text-gray-700" />
                </div>

                <div className="text-left">
                  <h2 className="text-lg font-semibold">{project.fullName}</h2>

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

            <AccordionContent className="max-h-[70vh] overflow-y-auto">
              <div className="pt-2 pb-2 space-y-5">
                <div className="bg-gray-50 p-3 border rounded-xl flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Link2Icon className="text-primary h-5 w-5" />

                    <h2 className="font-medium">Target Domain:</h2>

                    <h2 className="bg-white p-1 px-2 border rounded-md text-primary font-medium">
                      {project?.targetDomain || "Not Configured"}
                    </h2>
                  </div>
                    <RepoSettings project={project}/>
                </div>
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
                    value={statusData.totalTests}
                    icon={<ListChecks className="h-5 w-5 text-blue-600" />}
                    bgColor="bg-blue-50"
                  />

                  <StatusCard
                    title="Passed"
                    value={statusData.passed}
                    icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
                    bgColor="bg-green-50"
                  />

                  <StatusCard
                    title="Failed"
                    value={statusData.failed}
                    icon={<XCircle className="h-5 w-5 text-red-600" />}
                    bgColor="bg-red-50"
                  />

                  <StatusCard
                    title="Pass Rate"
                    value={statusData.passRate}
                    icon={<TrendingUp className="h-5 w-5 text-purple-600" />}
                    bgColor="bg-purple-50"
                  />
                </div>

                {/* Generate Test Cases */}
                {!testCaseLoading &&
                  openedProjectId === project._id &&
                  generatedTestCases.length === 0 && (
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

                      <button
                        onClick={() => handleGenerateTestCases(project)}
                        disabled={testCaseLoading}
                        className="flex items-center gap-2 bg-black hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition"
                      >
                        <Sparkles className="h-4 w-4" />
                        Generate Test Cases
                      </button>
                    </div>
                  )}

                {/* Loading */}
                {testCaseLoading && (
                  <div className="border rounded-xl p-8 flex items-center justify-center gap-3">
                    <Loader2Icon className="animate-spin h-5 w-5" />
                    <span>Please wait while AI generates test cases...</span>
                  </div>
                )}

                {/* Generated Test Cases */}
                {!testCaseLoading && generatedTestCases.length > 0 && (
                  <TestCaseList
                    project={project}
                    testCases={generatedTestCases}
                    onReload={() => handleAccordionOpen(project._id)}
                  />
                )}

                {/* Empty State */}
                {!testCaseLoading && generatedTestCases.length === 0 && (
                  <div className="border rounded-xl p-8 text-center text-gray-500">
                    No test cases generated yet.
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

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

export default ProjectList;
