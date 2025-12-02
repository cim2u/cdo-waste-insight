"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "./utils";

export function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <div className="font-[system-ui,Inter,Segoe UI,Roboto,sans-serif]">
      <SwitchPrimitive.Root
        className={cn(
          "peer relative inline-flex h-[1.6rem] w-11 cursor-pointer items-center rounded-full",
          "transition-all duration-300",
          // OFF State Track
          "bg-gray-300 dark:bg-neutral-700",
          "border border-black/5 shadow-inner",

          // ON State Track
          "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600",

          // Focus ring
          "focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:outline-none",

          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "block h-[1.25rem] w-[1.25rem] rounded-full bg-white shadow-md",
            "transition-transform duration-300 ease-out",
            "data-[state=unchecked]:translate-x-[3px]",
            "data-[state=checked]:translate-x-[22px]"
          )}
        />
      </SwitchPrimitive.Root>
    </div>
  );
}
