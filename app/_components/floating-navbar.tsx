"use client";

import { cn } from "@/app/_components/utils";
import Link from "next/link";
import React from "react";

import ThemeToggle from "./theme-toggle";

export const FloatingNav = ({ className }: { className?: string }) => {
  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-4 z-[5000] mx-auto flex max-w-fit items-center justify-center space-x-4 rounded-full border border-transparent bg-white py-2 pl-6 pr-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-white/[0.2] dark:bg-black",
        className,
      )}
    >
      <Link
        key="blog"
        href="/"
        className={cn(
          "relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300",
        )}
      >
        <span className="text-sm">Blog</span>
      </Link>

      <div className="h-[24px] w-[1px] bg-neutral-200 dark:bg-neutral-800" />

      <ThemeToggle />
    </nav>
  );
};
