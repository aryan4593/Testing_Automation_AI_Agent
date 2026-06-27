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

function TestCaseList({testCases = [],onReload,loading = false}) {
  const [selected, setSelected] = useState([]);
  console.log(selected);
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

              <Badge variant="secondary">
                Pending
              </Badge>

              <Button
                size="icon"
                variant="outline"
              >
                <Settings className="h-4 w-4" />
              </Button>

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
          >
            <Play className="h-4 w-4" />
            Run Selected
          </Button>

        </div>

      </div>

    </div>
  );
}

export default TestCaseList;