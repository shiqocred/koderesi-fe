"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 800) + 100,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 800) + 100,
  },
];

export function ChartClient() {
  return (
    <ResponsiveContainer width="100%">
      <BarChart data={data}>
        <XAxis
          dataKey="name"
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
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
