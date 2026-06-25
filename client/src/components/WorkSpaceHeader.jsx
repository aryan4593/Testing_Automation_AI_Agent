import React from "react";
import { UserButton } from "@clerk/clerk-react";

function WorkspaceHeader() {
  return (
    <div className="flex w-full justify-between p-4">
      {/* Logo */}
      <img src="/logo.svg" alt="logo" width={40} height={200} />

      {/* Menu Options */}
      <ul className="flex gap-8 text-xl list-none">
        <li className="hover:text-blue-600 cursor-pointer">Workspace</li>
        <li className="hover:text-blue-600 cursor-pointer">Pricing</li>
        <li className="hover:text-blue-600 cursor-pointer">Support</li>
      </ul>

      {/* User Button */}
      <UserButton />
    </div>
  );
}

export default WorkspaceHeader;