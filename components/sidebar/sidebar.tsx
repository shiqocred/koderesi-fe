import React from "react";
import { ButtonSidebar } from "./button-sidebar";
import HomeIcon from "../svg/home-icon";
import TrackIcon from "../svg/track-icon";
import ArchiveIcon from "../svg/archive-icon";
import { Separator } from "../ui/separator";
import RocketIcon from "../svg/rocket-icon";
import AffiliateIcon from "../svg/affiliate-icon";
import { Button } from "../ui/button";
import PlusIcon from "../svg/plus-icon";
import LogoShrinkIcon from "../svg/logo-shrink-icon";

export const Sidebar = () => {
  return (
    <div className="w-16 h-full flex flex-col gap-2 items-center bg-white border-gray-500 border-r py-4 px-2">
      <div className="flex flex-col gap-2 items-center">
        <Button className="flex items-center leading-none w-10 h-10 bg-gray-100 hover:bg-gray-200 hover:rounded-[20px] transition-all">
          <span className="w-6 h-6 stroke-gray-900">
            <LogoShrinkIcon className="w-6 h-6 stroke-none" />
          </span>
        </Button>
        <Button className="flex items-center leading-none w-10 h-10 bg-green-400 hover:bg-green-500 hover:rounded-[20px] transition-all">
          <span className="w-5 h-5 stroke-gray-900">
            <PlusIcon className="w-5 h-5" />
          </span>
        </Button>
      </div>
      <Separator className="bg-gray-500" />
      <div className="flex flex-col gap-2 items-center">
        <ButtonSidebar
          label="Dashboard"
          icon={<HomeIcon className="w-5 h-5" />}
          href="/dashboard"
          active
        />
        <ButtonSidebar
          label="Dashboard"
          icon={<TrackIcon className="w-5 h-5" />}
          href="/dashboard"
        />
        <ButtonSidebar
          label="Dashboard"
          icon={<ArchiveIcon className="w-5 h-5" />}
          href="/dashboard"
        />
      </div>
      <Separator className="bg-gray-500" />
      <div className="flex flex-col gap-2 items-center">
        <ButtonSidebar
          label="Dashboard"
          icon={<RocketIcon className="w-5 h-5" />}
          href="/dashboard"
        />
        <ButtonSidebar
          label="Dashboard"
          icon={<AffiliateIcon className="w-5 h-5" />}
          href="/dashboard"
        />
      </div>
    </div>
  );
};
