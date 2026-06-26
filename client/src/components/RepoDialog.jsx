import React, { useEffect ,useMemo,useState} from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { getRepositories } from "@/services/githubService";
import { useUser } from "@clerk/clerk-react";
import { FolderGit2, Globe, Globe2Icon, Lock, Search } from "lucide-react";
import { addProject, getProjects } from "@/services/projectService";

function RepoDialog() {
  const { user, isLoaded } = useUser();
  const [repos,setRepos]  = React.useState([]);
  const [selectedRepo,setSelectedRepo]  = React.useState(null);
  const [search, setSearch] = useState("");
  
  const [open, setOpen] = useState(false);
  // getRepositories

  const saveToDb = async () => {
    if (!selectedRepo) {
      alert("Please select a repository first.");
      return;
    }

    try {
      const project = await addProject(user.id, selectedRepo);

      console.log("Project Added:", project);

      // TODO:

      // 1. Close the dialog

      // 2. Refresh project list

      // 3. Show success toast
      setOpen(false);

    } catch (err) {
      console.error(err);

      if (err.response?.status === 409) {
        alert("Repository already added.");
      } else {
        alert("Something went wrong.");
      }
    }

  };

  const loadProjects = async () => {
      if (!user) return;

      const data = await getRepositories(user.id);
      setRepos(data);
  };

  useEffect(() => {
        if (!isLoaded || !user) return;

        loadProjects();
  }, [isLoaded, user]);


  const filteredRepos = useMemo(() => {
    return repos.filter((repo) =>
      repo.name.toLowerCase().includes(search.toLowerCase())
    );

  }, [repos, search]);


  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-xl font-medium transition">
          + Add Repo
        </button> 
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Repository</DialogTitle>

          <DialogDescription>
            Search and select a GitHub repository to connect with your
            workspace.
          </DialogDescription>
        </DialogHeader>

        {/* Repository List */}

      <div>
          <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

              <input
                  type="text"
                  placeholder="Search repositories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-black"
              />
          </div>

          <ul className="max-h-72 overflow-y-auto border rounded-xl mt-4">
              {filteredRepos.map((repo) => (
                  <li
                      key={repo.id}
                      onClick={() => setSelectedRepo(repo)}
                      className={`flex items-center justify-between p-4 border-b cursor-pointer transition
                      ${
                          selectedRepo?.id === repo.id
                              ? "bg-gray-100"
                              : "hover:bg-gray-50"
                      }`}
                  >
                      <div className="flex items-center gap-3">
                          <FolderGit2 className="w-5 h-5 text-gray-600" />

                          <div>
                              <h3 className="font-medium">
                                  {repo.fullName}
                              </h3>

                              <p className="text-xs text-gray-500">
                                  {repo.language || "Unknown"} • {repo.defaultBranch}
                              </p>
                          </div>
                      </div>

                      {repo.private ? (
                          <Lock className="w-4 h-4 text-red-500" />
                      ) : (
                          <Globe2Icon className="w-4 h-4 text-green-600" />
                      )}
                  </li>
              ))}
          </ul>
      </div>
        <DialogFooter className="flex gap-5">
          <DialogClose asChild>
            <button className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100" onClick = {()=>{setOpen(false)}}>
              Cancel
            </button>
          </DialogClose>

          <button className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-900" onClick={saveToDb}>
            Add
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RepoDialog;