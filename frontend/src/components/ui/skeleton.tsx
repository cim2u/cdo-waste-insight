// src/components/skeleton.tsx
import React from "react";
import { cn } from "./utils.ts"; // optional helper for combining classNames

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="skeleton"
            className={cn("bg-accent animate-pulse rounded-md", className)}
            {...props}
        />
    );
}

export { Skeleton };
