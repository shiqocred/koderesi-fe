import { SunnyIcon } from "@/components/svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const MenuAkun = ({ isExpand }: { isExpand: boolean }) => {
  const buttonWidthVariant = {
    isExpand: { width: "100%" },
    isShrink: { width: 40 },
  };
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <Button className="flex items-center leading-none w-10 h-10 bg-transparent hover:bg-gray-100 hover:rounded-[20px] transition-all border border-gray-900">
        <span className="w-5 h-5 ">
          <SunnyIcon className="w-5 h-5 fill-gray-900" />
        </span>
      </Button>
      <motion.button
        className={cn(
          "flex items-center leading-none h-10 bg-transparent text-xs hover:bg-gray-100 rounded-md justify-between transition-all",
          !isExpand &&
            "hover:rounded-[20px] text-green-400 border  border-gray-900"
        )}
        initial="isShrink"
        animate={isExpand ? "isExpand" : "isShrink"}
        variants={buttonWidthVariant}
        transition={
          isExpand ? { delay: 0.5, duration: 0.5 } : { delay: 0, duration: 0.5 }
        }
      >
        <div
          className={cn(
            "gap-x-2 flex items-center justify-center w-full",
            isExpand && "justify-start"
          )}
        >
          <div
            className={cn(
              isExpand &&
                "border border-gray-900 w-10 h-10 rounded-md flex items-center justify-center text-green-400"
            )}
          >
            AN
          </div>
          <p className={cn(isExpand ? "flex " : "hidden")}>Anthonio Nerf</p>
        </div>
        <div>more</div>
      </motion.button>
    </div>
  );
};

export default MenuAkun;
