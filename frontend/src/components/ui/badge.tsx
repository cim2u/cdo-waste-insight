import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils.ts";

// Custom colors
const LEVEL_COLORS: Record<"Low" | "Medium" | "High", string> = {
    Low: "#22c55e",    // green
    Medium: "#eab308", // yellow
    High: "#ef4444"    // red
};

const badgeVariants = cva(
    "inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 transition-colors overflow-hidden",
    {
        variants: {
            variant: {
                low: "",
                medium: "",
                high: "",
                default: ""
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }
);

interface BadgeProps
    extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
    asChild?: boolean;
    predictionLevel?: "Low" | "Medium" | "High";
}

export function Badge({
    className,
    asChild = false,
    predictionLevel,
    ...props
}: BadgeProps) {
    const Comp = asChild ? Slot : "span";

    const appliedVariant = predictionLevel?.toLowerCase() as
        | "low"
        | "medium"
        | "high"
        | undefined;

    const appliedStyle = predictionLevel
        ? {
            backgroundColor: LEVEL_COLORS[predictionLevel],
            border: `1px solid ${LEVEL_COLORS[predictionLevel]}`,
            color: "#fff",
        }
        : {};

    return (
        <Comp
            className={cn(
                badgeVariants({ variant: appliedVariant }),
                "!text-white !rounded-md",
                className
            )}
            style={appliedStyle}
            {...props}
        />
    );
}
