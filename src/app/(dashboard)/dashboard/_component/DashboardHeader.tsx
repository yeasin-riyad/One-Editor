"use client";
import Logo from "@/components/Logo";

import {  SidebarTrigger } from "@/components/ui/sidebar";
import UserAvatar from "@/components/UserAvatar";

import {  useSession } from "next-auth/react";

const DashboardHeader = () => {
  const session = useSession();
  return (
    <div className="h-14 bg-white flex items-center justify-between px-4 sticky top-0 z-40">
      <div className="md:hidden">
        <Logo w={80} />
      </div>

      <div className="hidden md:block">
        <span className="font-semibold">Hi Welcome</span>{" "}
        <span>{session?.data?.user?.name}</span>
      </div>

      <div className="hidden md:block">
        {session?.data?.user && <UserAvatar user={session?.data?.user} />}


      </div>

      <div className="md:hidden">
        <SidebarTrigger/>
      </div>
    </div>
  );
};

export default DashboardHeader;
