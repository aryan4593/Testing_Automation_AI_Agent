import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import { Clock3, Loader2, Play, PlayCircle, XCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { runTestCase } from "@/services/browserbaseService";

const normalizeStatus = (status) => {
  const value = typeof status === "string" ? status.trim().toLowerCase() : "";

  if (!value) return "pending";
  if (["passed", "success", "succeeded", "completed"].includes(value)) return "passed";
  if (["failed", "error", "errored", "exception"].includes(value)) return "failed";
  if (["running", "inprogress", "in-progress", "processing", "generating"].includes(value)) return "running";

  return "pending";
};

const normalizeLogs = (logs) => {
  if (!Array.isArray(logs)) return [];

  return logs.map((log, index) => {
    if (typeof log === "string") {
      return { type: "log", text: log, id: index };
    }

    const text =
      typeof log?.text === "string"
        ? log.text
        : typeof log?.message === "string"
          ? log.message
          : String(log ?? "");

    return {
      type: typeof log?.type === "string" ? log.type : "log",
      text,
      id: index,
    };
  });
};

const getLogColorClass = (type) => {
  const normalizedType = (type || "log").toLowerCase();

  switch (normalizedType) {
    case "error":
    case "exception":
      return "text-red-400";
    case "warning":
      return "text-yellow-400";
    case "network":
      return "text-blue-400";
    case "pageerror":
      return "text-orange-400";
    default:
      return "text-green-300";
  }
};

function RunTestDialog({ open, onClose,onReload, project, testCases }) {
  const [selectedTestCase, setSelectedTestCase] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [results, setResults] = useState({});

  useEffect(() => {
    if (!open || !Array.isArray(testCases) || testCases.length === 0) return;

    setSelectedTestCase((prev) => {
      if (prev?._id) {
        return testCases.find((testCase) => testCase._id === prev._id) || testCases[0];
      }

      return testCases[0];
    });

    setResults((prev) => {
      const nextResults = {};

      testCases.forEach((testCase) => {
        const existingResult = prev[testCase._id] || {};

        nextResults[testCase._id] = {
          status: normalizeStatus(existingResult.status || testCase?.status),
          logs: normalizeLogs(existingResult.logs || testCase?.logs || []),
          sessionUrl: testCase?.sessionUrl || existingResult.sessionUrl || "",
          browserbaseScript: testCase?.browserbaseScript || existingResult.browserbaseScript || "",
          error: existingResult.error || null,
        };
      });

      return nextResults;
    });

    setCurrentIndex(-1);
    setIsExecuting(false);
  }, [open, testCases]);

  const handleStartExecution = () => {
    if (testCases.length === 0) return;

    setIsExecuting(true);
    setCurrentIndex(0);
  };

  const executeCurrentTest = async () => {
    if (currentIndex >= testCases.length) {
      setIsExecuting(false);
      return;
    }

    const currentTest = testCases[currentIndex];

    console.log("Executing:", currentTest.title);

    setResults((prev) => ({
      ...prev,
      [currentTest._id]: {
        ...prev[currentTest._id],
        status: "running",
      },
    }));

    // Simulate execution
    try {
      const response = await runTestCase(currentTest._id);
      setResults((prev) => ({
        ...prev,
        [currentTest._id]: {
          ...prev[currentTest._id],
          status: normalizeStatus(response?.status),
          logs: normalizeLogs(response?.logs || []),
          sessionUrl: response?.sessionUrl || "",
          browserbaseScript: response?.browserbaseScript || "",
          error: response?.error || null,
        },
      }));
      await onReload();
      // onClose();
    } catch (err) {
      setResults((prev) => ({
        ...prev,

        [currentTest._id]: {
          ...prev[currentTest._id],
          status: "failed",
          logs: [
            ...normalizeLogs(prev[currentTest._id]?.logs || []),
            { type: "exception", text: err.message, id: Date.now() },
          ],
          error: err.message,
        },
      }));
    } finally {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!isExecuting) return;

    executeCurrentTest();
  }, [currentIndex]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-350 h-[90vh] flex flex-col p-6">
        {/* Header */}

        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <PlayCircle className="h-6 w-6 text-green-600" />
            Browserbase Cloud Test Runner
          </DialogTitle>

          <DialogDescription>
            Run automation scripts completely in the cloud using Browserbase
            infrastructure.
          </DialogDescription>
        </DialogHeader>

        {/* Config */}

        <div className="border rounded-xl bg-gray-50 p-5">
          <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
            Target Website URL
          </label>

          <div className="flex gap-3 mt-3">
            <Input
              value={project?.targetDomain || ""}
              readOnly
              className="flex-1"
            />

            <Button variant="outline" disabled>
              Execution Options
            </Button>

            <Button
              onClick={handleStartExecution}
              disabled={isExecuting || testCases.length === 0}
              className="bg-green-600 hover:bg-green-700"
            >
              {isExecuting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start Execution
                </>
              )}
              Start Execution
            </Button>
          </div>
        </div>

        {/* Main */}

        <div className="grid grid-cols-12 gap-5 flex-1 min-h-0 overflow-hidden">
          {/* Queue */}

          <div className="col-span-3 border rounded-xl p-4 flex flex-col overflow-auto">
            <h3 className="text-sm font-semibold uppercase text-gray-500 mb-4">
              Execution Queue
            </h3>

            <div className="space-y-3 overflow-y-auto flex-1 pr-1">
              {testCases.map((testCase) => (
                <div
                  key={testCase._id}
                  onClick={() => setSelectedTestCase(testCase)}
                  className={`border rounded-xl p-4 cursor-pointer transition
                    ${
                      selectedTestCase?._id === testCase._id
                        ? "border-green-500 bg-green-50"
                        : "hover:border-gray-300"
                    }`}
                >
                  <h3 className="font-semibold line-clamp-1">
                    {testCase.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {testCase.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <Badge variant="outline">{testCase.type}</Badge>
                    {getStatusBadge(results[testCase._id]?.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="col-span-9 flex flex-col overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold">
                  {selectedTestCase?.title}
                </h2>

                <p className="text-gray-500 mt-2 max-w-3xl">
                  {selectedTestCase?.description}
                </p>
              </div>

              <Button
                variant="outline"
                disabled={!(results[selectedTestCase?._id]?.sessionUrl || selectedTestCase?.sessionUrl)}
                onClick={() =>
                  window.open(
                    results[selectedTestCase?._id]?.sessionUrl || selectedTestCase?.sessionUrl || "",
                    "_blank"
                  )
                }
              >
                Watch Recording
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
              <div className="border rounded-lg p-3">
                <p className="text-xs text-gray-500 uppercase">Status</p>
                <div className="mt-2">
                  {getStatusBadge(results[selectedTestCase?._id]?.status)}
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <p className="text-xs text-gray-500 uppercase">Priority</p>
                <p className="font-medium mt-2">
                  {selectedTestCase?.priority || "-"}
                </p>
              </div>

              <div className="border rounded-lg p-3">
                <p className="text-xs text-gray-500 uppercase">Type</p>
                <p className="font-medium mt-2">
                  {selectedTestCase?.type || "-"}
                </p>
              </div>

              <div className="border rounded-lg p-3">
                <p className="text-xs text-gray-500 uppercase">Target Route</p>
                <p className="font-medium mt-2 wrap-break-word">
                  {selectedTestCase?.targetRoute || "/"}
                </p>
              </div>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-auto my-6">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: "0%" }}
              />
            </div>

            <div className="bg-black rounded-xl flex-1 p-5 overflow-y-auto font-mono text-sm">
              <h3 className="text-green-400 font-semibold mb-4">
                Console Output
              </h3>

              {normalizeLogs(results[selectedTestCase?._id]?.logs || []).length > 0 ? (
                <div className="space-y-2">
                  {normalizeLogs(results[selectedTestCase?._id]?.logs || []).map((log, index) => (
                    <div
                      key={log.id ?? index}
                      className={`whitespace-pre-wrap wrap-break-word ${getLogColorClass(log.type)}`}
                    >
                      [{String(log.type || "LOG").toUpperCase()}] {log.text}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No execution logs available.</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose}>
            Close & Refresh Status
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const getStatusBadge = (status) => {
  const normalizedStatus = normalizeStatus(status);

  switch (normalizedStatus) {
    case "generating":
      return (
        <Badge className="bg-blue-100 text-blue-800 border-none flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          Generating
        </Badge>
      );

    case "running":
      return (
        <Badge className="bg-amber-100 text-amber-800 border-none flex items-center gap-1">
          <Loader2 className="h-3 w-3 animate-spin" />
          Running
        </Badge>
      );

    case "passed":
      return (
        <Badge className="bg-green-100 text-green-800 border-none flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Passed
        </Badge>
      );

    case "failed":
      return (
        <Badge className="bg-red-100 text-red-800 border-none flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Failed
        </Badge>
      );

    case "pending":
    default:
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          <Clock3 className="h-3 w-3" />
          Pending
        </Badge>
      );
  }
};

export default RunTestDialog;
