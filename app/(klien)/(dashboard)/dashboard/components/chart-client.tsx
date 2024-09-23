"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Jan",
    pakai: Math.floor(Math.random() * 800) + 100,
    beli: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "Feb",
    pakai: Math.floor(Math.random() * 800) + 100,
    beli: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "Mar",
    pakai: Math.floor(Math.random() * 800) + 100,
    beli: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "Apr",
    pakai: Math.floor(Math.random() * 800) + 100,
    beli: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "May",
    pakai: Math.floor(Math.random() * 800) + 100,
    beli: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "Jun",
    pakai: Math.floor(Math.random() * 800) + 100,
    beli: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "Jul",
    pakai: Math.floor(Math.random() * 800) + 100,
    beli: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "Aug",
    pakai: Math.floor(Math.random() * 800) + 100,
    beli: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "Sep",
    pakai: Math.floor(Math.random() * 800) + 100,
    beli: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "Oct",
    pakai: Math.floor(Math.random() * 800) + 100,
    beli: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "Nov",
    pakai: Math.floor(Math.random() * 800) + 100,
    beli: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "Dec",
    pakai: Math.floor(Math.random() * 800) + 100,
    beli: Math.floor(Math.random() * 800) + 100,
  },
];

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
        <p className="text-red-300">pakai: {payload[0].value} kredit</p>
        <p className="text-green-400">beli: {payload[1].value} kredit</p>
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
              item.value === "pakai" ? "bg-red-300" : "bg-green-400"
            )}
          />
          {item.value}
        </div>
      ))}
    </ul>
  );
};

export function ChartClient({
  initialData,
}: Readonly<{
  initialData: any[];
}>) {
  return (
    <ResponsiveContainer width="100%">
      <BarChart data={initialData}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <ChartTooltip
          cursor={false}
          content={({ active, payload, label }) => (
            <ContentTooltip active={active} payload={payload} label={label} />
          )}
        />
        <Legend content={<ContentLegend />} />
        <Bar
          dataKey="out"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-red-400"
        />
        <Bar
          dataKey="in"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-green-400"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
