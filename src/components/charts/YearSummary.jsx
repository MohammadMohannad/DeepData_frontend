"use client";
import {
  Bar as RechartsBar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ChartContainer } from "../ui/chart"; // Assuming ChartContainer is a wrapper component

const formatter = new Intl.NumberFormat("en-US");

const CustomYAxisTick = ({ x, y, payload, type, align }) => {
  return (
    <text
      x={x}
      y={y}
      textAnchor={align}
      fontSize={9} // Adjust the font size if needed
      dy={3} // Adjust the vertical positioning of the text
    >
      {type === "income"
        ? formatter.format(payload.value) + "$"
        : type === "month"
        ? payload.value.slice(0, 3)
        : null}
    </text>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow-md flex items-center gap-2 text-right">
        <div className="aspect-[2/10] rounded w-2 bg-[#1AB68A]"></div>
        <div>
          <p className="text-zinc-500 mb-1">
            الشهر: {payload[0].payload.month}
          </p>
          <p className="text-zinc-500">
            الدخل: {formatter.format(payload[0].value)}$
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const chartConfig = {
  income: {
    label: "Income",
    color: "#1AB68A",
  },
};

export default function YearSummary({ data }) {
  return (
    <ChartContainer
      config={chartConfig}
      style={{ width: "100%", maxWidth: "800px" }}
    >
      <RechartsBarChart
        data={data}
        layout="horizontal"
        margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
      >
        <CartesianGrid vertical={false} horizontal={false} />
        <YAxis
          dataKey="income"
          type="number"
          tickLine={false}
          tickMargin={30}
          axisLine={false}
          orientation="right"
          width={36}
          tick={<CustomYAxisTick type={"income"} align={"right"} />}
        />
        <XAxis
          dataKey="month"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tick={<CustomYAxisTick type={"month"} align={"middle"} />}
          interval={0}
        />
        <Tooltip content={<CustomTooltip />} />
        <RechartsBar
          dataKey="income"
          fill="var(--color-income)"
          radius={[6, 6, 0, 0]}
          barSize={42}
        />
      </RechartsBarChart>
    </ChartContainer>
  );
}
