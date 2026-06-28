import {useState} from "react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


import { Button } from "@/components/ui/button";
import { SettingsIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateTestCase } from "@/services/testcaseService";

function TestCaseSettingDialog({testCase}) {
    const [formTestCase, setFormTestCase] = useState({
        title: testCase?.title || "",
        description: testCase?.description ,
        targetRoute: testCase?.targetRoute ,
        expectedResult: testCase?.expectedResult,
    });
    // console.log(testCase);

    const handleInputChange = (fieldName, value) => {
        setFormTestCase((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const updateCase = async () => {
      try {
        const result = await updateTestCase(testCase._id, {
          ...formTestCase,
        });

        // console.log(result);

      } catch (error) {
        console.error(error);
      }
    };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <SettingsIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Testing Requirements </DialogTitle>

          <DialogDescription>
            Modify these params
          </DialogDescription>
        </DialogHeader>

        {/* Your settings go here */}

        <div className="space-y-5">

            <div>
                <label className="text-sm text-gray-500">
                TEST TITLE
                </label>

                <Input
                    value={formTestCase.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Test Title"
                    className="mt-1"
                />
            </div>

            <div>
                <label className="text-sm text-gray-500">
                DESCRIPTION / ACTION
                </label>

                <Textarea
                    value={formTestCase.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}


                placeholder="Description"
                className="mt-1"
                rows={4}
                />
            </div>

            <div>
                <label className="text-sm text-gray-500">
                TARGET ROUTE / PATH
                </label>

                <Input value={formTestCase.targetRoute}
                  onChange={(e) => handleInputChange("targetRoute", e.target.value)}

                placeholder="Target Route"
                className="mt-1"
                />
            </div>

            <div>
                <label className="text-sm text-gray-500">
                EXPECTED RESULT
                </label>

                <Input
                    value={formTestCase.expectedResult}
                    onChange={(e) => handleInputChange("ExpectedResult", e.target.value)}

                    placeholder="Expected Result"
                    className="mt-1"
                />
            </div>

            </div>
        <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">
                Cancel
                </Button>
            </DialogClose>

            <Button onClick={updateCase}>
                Update Case
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TestCaseSettingDialog;