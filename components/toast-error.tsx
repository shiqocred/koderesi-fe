import { AlertCircle, X } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export const ToastError = ({
  label,
  t,
  error,
}: {
  label: string;
  t: any;
  error: any;
}) => {
  return (
    <div className="flex gap-3 relative w-full items-center">
      <div className="flex gap-3 w-full">
        <AlertCircle className="w-4 h-4 dark:fill-white dark:text-red-800 text-red-500" />
        <div className="flex flex-col gap-1">
          <h5 className="font-medium dark:text-white text-sm leading-none text-red-500">
            {label}
          </h5>
          {Array.isArray(error.response.data.message) ? (
            <ul className="*:before:content-['-'] *:before:pr-3 dark:text-red-200 text-xs text-red-400">
              {error.response.data.message.map((item: any) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <ul className="*:before:content-['-'] *:before:pr-3 dark:text-red-200 text-xs text-red-400">
              <li>{error.response.data.message}</li>
            </ul>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={() => toast.dismiss(t)}
        className="w-5 h-5 text-white flex-none bg-red-500 ml-auto flex items-center justify-center rounded-full hover:scale-110 transition-all shadow"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};
