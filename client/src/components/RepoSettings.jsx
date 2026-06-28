import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react"
import { Settings2 } from "lucide-react";
import { updateProjectSettings } from "@/services/projectService";

function RepoSettings({ project }) {
    const [repoSettings, setRepoSettings] = React.useState({
        targetDomain: project.targetDomain || "",
        globalTestInstructions: project.globalTestInstructions || "",
    });

    const [isOpen,setIsOpen] = React.useState(false);

    const handleSaveSettings = async () => {
        try {
            const result = await updateProjectSettings(
            project._id,
            repoSettings
            );
            setIsOpen(false);

        } catch (error) {
            console.error(error);
        }
    };
  return (
    <Dialog 
    open ={isOpen} onOpenChange={(open)=>setIsOpen(open)}
    >
      <DialogTrigger asChild>
        <Button>
          <Settings2 className="h-4 w-4 mr-1" />
          Project Config
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Project Configuration
          </DialogTitle>

          <DialogDescription>
            Configure project-level defaults used during script generation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">

          <div>
            <label className="text-sm text-gray-500">
              APP URL / DEFAULT WEBSITE
            </label>

            <Input
              placeholder="App URL / Domain"
                value = {repoSettings.targetDomain}
                onChange={(e) =>
                    setRepoSettings((prev) => ({
                        ...prev,
                        targetDomain: e.target.value,
                    }))
                }

              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              GLOBAL TEST INSTRUCTIONS
            </label>

            <Textarea
              placeholder="Example:
            - Login before every test.
            - Ignore cookie banner.
            - Use admin credentials.
            - Wait for dashboard to load."
              value = {repoSettings.globalTestInstructions}
              onChange={(e) =>
                    setRepoSettings((prev) => ({
                        ...prev,
                        globalTestInstructions: e.target.value,
                    }))
                }
              className="mt-1 min-h-32"
            />
          </div>

        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={handleSaveSettings}>
            Update Config
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}

export default RepoSettings;