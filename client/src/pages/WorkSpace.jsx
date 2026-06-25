import React from "react";
import WorkSpaceHeader from "../components/WorkSpaceHeader";
import WorkspaceBody from "../components/WorkSpaceBody";
import EmptyWorkSpace from "../components/EmptyWorkSpace";

function WorkSpace() {
  return (
    <>
      <WorkSpaceHeader />

      <main className="max-w-5xl mx-auto px-6 py-10">
        <WorkspaceBody />

        <div className="mt-8">
          <EmptyWorkSpace />
        </div>
      </main>
    </>
  );
}

export default WorkSpace;