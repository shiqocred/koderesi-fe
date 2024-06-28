"use client";

import { Separator } from "@/components/ui/separator";
import { cn, formatNumber, formatThousand } from "@/lib/utils";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  Legend,
} from "recharts";
import { SelectedBarDataProps } from "./credits-client";

const ContentTooltip = ({
  active,
  payload,
  label,
}: {
  active: boolean | undefined;
  payload: any;
  label: string;
}) => {
  if (active && payload && label) {
    return (
      <div className="bg-white rounded px-3 py-1.5 border text-xs dark:bg-gray-900 shadow-sm">
        <p className="text-sm font-bold">{label}</p>
        <Separator className="mb-2 bg-gray-500 dark:bg-gray-300" />
        <p className="text-green-400">
          {formatNumber(payload[0].value)} Kredit
        </p>
        <p className="text-red-300">{formatNumber(payload[1].value)} Kredit</p>
      </div>
    );
  }
};

const ContentLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className="flex w-full justify-center gap-x-6 items-center text-xs">
      {payload.map((item: any) => (
        <div key={item.id} className="flex gap-x-2 items-center capitalize">
          <div
            className={cn(
              "h-2 w-3 rounded",
              item.value === "out" ? "bg-red-300" : "bg-green-400"
            )}
          />
          {item.value}
        </div>
      ))}
    </ul>
  );
};

export function ChartCredit({
  month,
  initialData,
}: Readonly<{
  month: string;
  initialData: SelectedBarDataProps[];
}>) {
  const dataMap = Array.from({ length: 31 }, (_, index) => {
    const existing = initialData.find(
      (item) => parseFloat(item.date.toString()) === index + 1
    );
    return existing || { date: index + 1, in: 0, out: 0 };
  });

  const data = dataMap.map((item) => ({
    ...item,
    date: `${item.date + " " + month}`,
  }));

  const fotmatedData =
    month === "feb"
      ? data.slice(0, 29)
      : month !== "jan" || "mar" || "mei" || "jul" || "agu" || "okt" || "des"
      ? data.slice(0, 30)
      : data;

  return (
    <ResponsiveContainer width="100%">
      <BarChart data={fotmatedData} barGap={2}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          interval={6}
          axisLine={false}
          className="capitalize"
        />
        <YAxis
          width={45}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${formatThousand(value)}`}
        />
        <ChartTooltip
          cursor={false}
          content={({ active, payload, label }) => (
            <ContentTooltip active={active} payload={payload} label={label} />
          )}
        />
        <Legend content={<ContentLegend />} />
        <Bar dataKey="in" barSize={7} fill="#4ade80" radius={[4, 4, 0, 0]} />
        <Bar dataKey="out" barSize={7} fill="#f87171" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
