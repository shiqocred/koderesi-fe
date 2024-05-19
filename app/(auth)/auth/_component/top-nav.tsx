import { LogoExpandIcon } from "@/components/svg";

export const TopNav = () => {
  return (
    <div className="absolute top-0 left-0 flex w-full px-3 md:px-5 py-4 items-center">
      <a href="/">
        <LogoExpandIcon className="h-6 md:h-8" />
      </a>
    </div>
  );
};
