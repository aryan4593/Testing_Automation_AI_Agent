import React, { useEffect, useState } from "react";
import WorkSpaceHeader from "../components/WorkSpaceHeader";
import WorkspaceBody from "../components/WorkSpaceBody";
import EmptyWorkSpace from "../components/EmptyWorkSpace";
import {getProjects} from "../services/projectService"
import { useUser } from "@clerk/clerk-react";
import ProjectList from "@/components/ProjectList";


function WorkSpace() {
  const [projects, setProjects] = useState([]);
  const { user, isLoaded } = useUser();
  console.log("projects:",projects);

  useEffect(() => {
      if (!isLoaded || !user) return;

      const loadProjects = async () => {
          console.log(user.id);

          const data = await getProjects(user.id);
          setProjects(data);
      };

      loadProjects();
  }, [isLoaded, user]);

  return (
    <>
      <WorkSpaceHeader />

      <main className="max-w-5xl mx-auto px-6 py-10">
        
        <WorkspaceBody />

        <div className="mt-8">
            {
              projects.length === 0 ? (
                <EmptyWorkSpace />
              ) : (
                <ProjectList projects={projects} />
              )
            }

        </div>
      </main>
    </>
  );
}

export default WorkSpace;