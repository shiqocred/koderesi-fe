"use client";

interface HeaderProps {
  title: string;
  description: string;
}

export const Header = ({ title, description }: HeaderProps) => {
  return (
    <div className="flex w-full justify-between items-center border-b border-gray-500 pb-4">
      <div className="flex flex-col">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="font-light">{description}</p>
      </div>
      <div className="px-6 flex flex-col items-start bg-green-400 h-[50px] justify-center rounded-md">
        <p className="text-xs text-gray-900">Kredit anda</p>
        <h3 className="font-bold text-lg leading-none dark:text-gray-900">
          3500 kredit
        </h3>
      </div>
    </div>
  );
};
