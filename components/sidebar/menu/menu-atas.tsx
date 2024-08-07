"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { LogoExpandIcon, LogoShrinkIcon, PlusIcon } from "@/components/svg";
import { useModal } from "@/hooks/use-modal";
import Link from "next/link";

interface MenuAtasProps {
  isExpand: boolean;
  isAdmin?: boolean;
}

const MenuAtas = ({ isExpand, isAdmin }: MenuAtasProps) => {
  const { onOpen } = useModal();
  const buttonWidthVariant = {
    isExpand: { width: "100%" },
    isShrink: { width: 40 },
  };
  // logo opacity shrink variant
  const logoOpacityShrinkVariant = {
    isExpand: { display: "none" },
    isShrink: { display: "flex" },
  };
  // logo opacity expand variant
  const logoOpacityExpandVariant = {
    isExpand: { display: "flex" },
    isShrink: { display: "none" },
  };
  // button label opacity variant
  const buttonLabelOpacityVariant = {
    isExpand: { display: "flex" },
    isShrink: { display: "none" },
  };
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <Link href={isAdmin ? "/admin" : "/"}>
        <motion.button
          type="button"
          className={cn(
            "flex items-center leading-none h-10 transition-all rounded-md justify-center",
            isExpand
              ? "px-4 gap-4"
              : "hover:rounded-[20px] border border-gray-900 dark:border-gray-300"
          )}
          initial="isShrink"
          animate={isExpand ? "isExpand" : "isShrink"}
          variants={buttonWidthVariant}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            initial="isShrink"
            animate={isExpand ? "isExpand" : "isShrink"}
            variants={logoOpacityShrinkVariant}
            transition={
              isExpand
                ? { duration: 0.5, delay: 0.5 }
                : { duration: 0.5, delay: 0 }
            }
            className="w-6 h-6 stroke-gray-900"
          >
            <LogoShrinkIcon className="w-6 h-6 stroke-none" />
          </motion.span>
          <motion.span
            initial="isShrink"
            animate={isExpand ? "isExpand" : "isShrink"}
            variants={logoOpacityExpandVariant}
            transition={
              isExpand
                ? { duration: 0.5, delay: 0.5 }
                : { duration: 0.5, delay: 0 }
            }
            className="h-6 stroke-gray-900"
          >
            <LogoExpandIcon className="h-6 stroke-none" />
          </motion.span>
        </motion.button>
      </Link>
      {!isAdmin && (
        <motion.button
          type="button"
          className={cn(
            "flex items-center leading-none h-10 bg-green-400 hover:bg-green-500 transition-all rounded-md justify-center text-xs font-medium text-gray-900",
            isExpand ? "px-4 gap-2" : "hover:rounded-[20px]"
          )}
          initial="isShrink"
          animate={isExpand ? "isExpand" : "isShrink"}
          variants={buttonWidthVariant}
          transition={{ duration: 0.5 }}
          onClick={() => onOpen("add-resi")}
        >
          <span className="w-5 h-5 stroke-gray-900 text-gray-900">
            <PlusIcon className="w-5 h-5" />
          </span>
          <motion.p
            initial="isShrink"
            animate={isExpand ? "isExpand" : "isShrink"}
            variants={buttonLabelOpacityVariant}
            transition={
              isExpand
                ? { delay: 0.5, duration: 0.5 }
                : { delay: 0, duration: 0.5 }
            }
            className="pr-3 text-gray-900"
          >
            Tambah Resi
          </motion.p>
        </motion.button>
      )}
    </div>
  );
};

export default MenuAtas;
