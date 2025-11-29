"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "./utils";

const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
    [k in string]: {
        label?: React.ReactNode;
        icon?: React.ComponentType;
    } & (
        | { color?: string; theme?: never }
        | { color?: never; theme: Record<keyof typeof THEMES, string> }
    );
};

type ChartContextProps = {
    config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
    const context = React.useContext(ChartContext);
    if (!context) {
        throw new Error("useChart must be used within a <ChartContainer />");
    }
    return context;
}

function ChartContainer({
    id,
    className,
    children,
    config,
    ...props
}: React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<
        typeof RechartsPrimitive.ResponsiveContainer
    >["children"];
}) {
    const uniqueId = React.useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

    return (
        <ChartContext.Provider value={{ config }}>
            <div
                data-slot="chart"
                data-chart={chartId}
                className={cn(
                    `
            flex aspect-video justify-center text-xs

            /* Axis text */
            [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground

            /* Grid lines */
            [&_.recharts-cartesian-grid_line]:stroke-border/50

            /* Tooltip cursor */
            [&_.recharts-tooltip-cursor]:stroke-border
            [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted

            /* Polar chart grid */
            [&_.recharts-polar-grid_line]:stroke-border

            /* Radial bar background */
            [&_.recharts-radial-bar-background-sector]:fill-muted

            /* Remove outlines */
            [&_.recharts-layer]:outline-none
            [&_.recharts-sector]:outline-none
            [&_.recharts-surface]:outline-none
          `,
                    className
                )}
                {...props}
            >
                <ChartStyle id={chartId} config={config} />
                <RechartsPrimitive.ResponsiveContainer>
                    {children}
                </RechartsPrimitive.ResponsiveContainer>
            </div>
        </ChartContext.Provider>
    );
}

/* ------------------------ Chart Style ------------------------ */

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
    const colorConfig = Object.entries(config).filter(
        ([, cfg]) => cfg.theme || cfg.color
    );

    if (!colorConfig.length) return null;

    return (
        <style
            dangerouslySetInnerHTML={{
                __html: Object.entries(THEMES)
                    .map(
                        ([themeName, prefix]) => `
${prefix} [data-chart="${id}"] {
${colorConfig
                                .map(([key, cfg]) => {
                                    const color =
                                        cfg.theme?.[themeName as keyof typeof cfg.theme] || cfg.color;
                                    return color ? `--color-${key}: ${color};` : "";
                                })
                                .join("\n")}
}
`
                    )
                    .join("\n"),
            }}
        />
    );
};

/* ------------------------ Tooltip ------------------------ */

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
    active,
    payload,
    className,
    indicator = "dot",
    hideLabel = false,
    label,
    labelKey,
    nameKey,
    formatter,
    labelFormatter,
    labelClassName,
    hideIndicator = false,
}: any) {
    const { config } = useChart();

    if (!active || !payload?.length) return null;

    const first = payload[0];
    const key = labelKey || first?.dataKey || first?.name;

    const itemConfig = getPayloadConfigFromPayload(config, first, key);

    const resolvedLabel = labelFormatter
        ? labelFormatter(label, payload)
        : itemConfig?.label || label;

    return (
        <div
            className={cn(
                "grid min-w-[8rem] gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-xl",
                className
            )}
        >
            {!hideLabel && (
                <div className={cn("font-medium", labelClassName)}>
                    {resolvedLabel}
                </div>
            )}

            <div className="grid gap-1.5">
                {payload.map((item: any, index: number) => {
                    const key =
                        nameKey || item.name || item.dataKey || "value";

                    const cfg = getPayloadConfigFromPayload(config, item, key);
                    const indicatorColor = item.color || item.payload?.fill;

                    return (
                        <div key={index} className="flex items-center justify-between">
                            {!hideIndicator && (
                                <div
                                    className="h-2.5 w-2.5 rounded-sm"
                                    style={{ backgroundColor: indicatorColor }}
                                />
                            )}

                            <span className="text-muted-foreground">{cfg?.label || item.name}</span>

                            <span className="font-mono font-medium">
                                {item.value?.toLocaleString()}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ------------------------ Legend ------------------------ */

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({
    className,
    hideIcon = false,
    payload,
    nameKey,
}: any) {
    const { config } = useChart();

    if (!payload?.length) return null;

    return (
        <div
            className={cn(
                "flex items-center justify-center gap-4 pt-3",
                className
            )}
        >
            {payload.map((item: any, index: number) => {
                const key = nameKey || item.dataKey || "value";
                const itemConfig = getPayloadConfigFromPayload(config, item, key);

                return (
                    <div key={index} className="flex items-center gap-2">
                        {!hideIcon ? (
                            <div
                                className="h-2 w-2 rounded-sm"
                                style={{ backgroundColor: item.color }}
                            />
                        ) : null}
                        <span>{itemConfig?.label}</span>
                    </div>
                );
            })}
        </div>
    );
}

/* ------------------------ Helpers ------------------------ */

function getPayloadConfigFromPayload(
    config: ChartConfig,
    payload: any,
    key: string
) {
    if (!payload || typeof payload !== "object") return undefined;

    const inner = payload.payload || payload;

    const labelKey =
        typeof inner[key] === "string" ? inner[key] : key;

    return config[labelKey] || config[key];
}

export {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
    ChartStyle,
};
