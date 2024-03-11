"use client";

interface HeaderProps {
  title: string;
  description: string;
}

export const Header = ({ title, description }: HeaderProps) => {
  return (
    <div className="flex w-full justify-between md:items-center border-b border-gray-500 pb-4 md:flex-row flex-col items-start gap-4">
      <div className="flex flex-col">
        <h3 className="xl:text-xl text-lg font-bold">{title}</h3>
        <p className="font-light text-sm lg:text-base">{description}</p>
      </div>
      <div className="px-6 w-full md:w-auto flex flex-row items-center justify-between md:flex-col md:items-start bg-green-400 h-10 md:h-[50px] md:justify-center rounded-md">
        <p className="text-sm text-gray-900 leading-none">Kredit anda</p>
        <h3 className="font-bold text-sm lg:text-lg leading-none dark:text-gray-900">
          3500 kredit
        </h3>
      </div>
    </div>
  );
};
