import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Play,
  RefreshCcw,
  Settings,
  ListChecks,
} from "lucide-react";
import TestCaseSettingDialog from "./TestCaseSettingDialog";
import RunTestDialog from "./RunTestDialog";

const normalizeTestStatus = (status) => {
  const value = typeof status === "string" ? status.trim().toLowerCase() : "";

  if (["passed", "success", "succeeded", "completed"].includes(value)) return "passed";
  if (["failed", "error", "errored", "exception"].includes(value)) return "failed";
  if (["running", "inprogress", "in-progress", "processing"].includes(value)) return "running";
  if (["generating"].includes(value)) return "generating";

  return "pending";
};

const getStatusBadge = (status) => {
  const normalizedStatus = normalizeTestStatus(status);

  switch (normalizedStatus) {
    case "passed":
      return <Badge className="bg-green-100 text-green-800">Passed</Badge>;
    case "failed":
      return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
    case "running":
      return <Badge className="bg-amber-100 text-amber-800">Running</Badge>;
    case "generating":
      return <Badge className="bg-blue-100 text-blue-800">Generating</Badge>;
    default:
      return <Badge variant="secondary">Pending</Badge>;
  }
};

function TestCaseList({project,testCases = [],onReload,loading = false}) {
  const [selected, setSelected] = useState([]);
  const [runDialogOpen, setRunDialogOpen] = useState(false);
  // console.log(selected);
  const toggleSelection = (testCase) => {
    setSelected((prev) =>
      prev.includes(testCase)
        ? prev.filter((item) => item !== testCase)
        : [...prev, testCase]
    );
  };

  if (testCases.length === 0) {
    return (
      <div className="border rounded-xl py-12 text-center bg-gray-50">
        <ListChecks className="mx-auto h-10 w-10 text-gray-400" />

        <h3 className="mt-3 font-semibold">
          No Test Cases Found
        </h3>

        <p className="text-gray-500 text-sm mt-2">
          Generate AI test cases to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          Generated Test Cases
        </h2>

        <Button
          size="lg"
          variant="outline"
          disabled={loading}
          onClick={onReload}
        >
          <RefreshCcw
            className={`h-4 w-4 mr-2 ${
              loading ? "animate-spin" : ""
            }`}
          />
          Refresh
        </Button>

      </div>

      <div className="border rounded-xl overflow-hidden bg-white">

        {testCases.map((testCase) => (

          <div
            key={testCase._id}
            className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 transition"
          >

            <div className="flex items-center gap-4">

              <Checkbox
                checked={selected.includes(testCase)}
                onCheckedChange={() =>
                  toggleSelection(testCase)
                }
              />

              <div>
                <h3 className="font-medium">
                  {testCase.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {testCase.description}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-2">

              <Badge>
                {testCase.type}
              </Badge>

              {getStatusBadge(testCase.status)}

              <TestCaseSettingDialog testCase = {testCase}/>

            </div>

          </div>

        ))}

        <div className="border-t bg-gray-50 p-4 flex items-center justify-between">

          <p className="text-sm text-gray-600">
            {selected.length} test case(s) selected
          </p>

          <Button
            disabled={selected.length === 0}
            className="gap-2"
            onClick={() => setRunDialogOpen(true)}

          >
            <Play className="h-4 w-4" />
            Run Selected
          </Button>

        </div>

      </div>
        <RunTestDialog
            open={runDialogOpen}
            onClose={() => setRunDialogOpen(false)}
            onReload={onReload}
            project={project}
            testCases={selected}
        />
    </div>
  );
}

export default TestCaseList;