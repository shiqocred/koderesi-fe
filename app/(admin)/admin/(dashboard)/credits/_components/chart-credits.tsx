"use client";

import { Separator } from "@/components/ui/separator";
import { cn, formatRupiah } from "@/lib/utils";
import { ArrowDownCircle } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

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
        <p className="text-red-300">{payload[0].value} Kredit</p>
        <p className="text-green-400">{payload[1].value} Kredit</p>
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

export function ChartCredit({ month }: { month: string }) {
  const data = [
    {
      name: `1 ${month}`,
      pakai: 20,
      beli: 50,
    },
    {
      name: `2 ${month}`,
      pakai: 25,
      beli: 30,
    },
    {
      name: `3 ${month}`,
      pakai: 25,
      beli: 50,
    },
    {
      name: `4 ${month}`,
      pakai: 20,
      beli: 20,
    },
    {
      name: `5 ${month}`,
      pakai: 30,
      beli: 15,
    },
    {
      name: `6 ${month}`,
      pakai: 15,
      beli: 30,
    },
    {
      name: `7 ${month}`,
      pakai: 30,
      beli: 15,
    },
    {
      name: `8 ${month}`,
      pakai: 15,
      beli: 20,
    },
    {
      name: `9 ${month}`,
      pakai: 20,
      beli: 30,
    },
    {
      name: `10 ${month}`,
      pakai: 30,
      beli: 15,
    },
    {
      name: `11 ${month}`,
      pakai: 20,
      beli: 50,
    },
    {
      name: `12 ${month}`,
      pakai: 15,
      beli: 30,
    },
    {
      name: `13 ${month}`,
      pakai: 15,
      beli: 20,
    },
    {
      name: `14 ${month}`,
      pakai: 25,
      beli: 15,
    },
    {
      name: `15 ${month}`,
      pakai: 30,
      beli: 30,
    },
    {
      name: `16 ${month}`,
      pakai: 20,
      beli: 20,
    },
    {
      name: `17 ${month}`,
      pakai: 25,
      beli: 15,
    },
    {
      name: `18 ${month}`,
      pakai: 30,
      beli: 30,
    },
    {
      name: `19 ${month}`,
      pakai: 10,
      beli: 15,
    },
    {
      name: `20 ${month}`,
      pakai: 20,
      beli: 20,
    },
    {
      name: `21 ${month}`,
      pakai: 10,
      beli: 15,
    },
    {
      name: `22 ${month}`,
      pakai: 15,
      beli: 50,
    },
    {
      name: `23 ${month}`,
      pakai: 10,
      beli: 15,
    },
    {
      name: `24 ${month}`,
      pakai: 15,
      beli: 15,
    },
    {
      name: `25 ${month}`,
      pakai: 25,
      beli: 15,
    },
    {
      name: `26 ${month}`,
      pakai: 30,
      beli: 20,
    },
    {
      name: `27 ${month}`,
      pakai: 10,
      beli: 15,
    },
    {
      name: `28 ${month}`,
      pakai: 20,
      beli: 30,
    },
    {
      name: `29 ${month}`,
      pakai: 25,
      beli: 20,
    },
    {
      name: `30 ${month}`,
      pakai: 15,
      beli: 30,
    },
    {
      name: `31 ${month}`,
      pakai: 20,
      beli: 50,
    },
  ];

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
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          interval={6}
          axisLine={false}
        />
        <YAxis
          width={30}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={({ active, payload, label }) => (
            <ContentTooltip active={active} payload={payload} label={label} />
          )}
        />
        <Legend content={<ContentLegend />} />
        <Bar dataKey="pakai" barSize={7} fill="#f87171" radius={[4, 4, 0, 0]} />
        <Bar dataKey="beli" barSize={7} fill="#4ade80" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
