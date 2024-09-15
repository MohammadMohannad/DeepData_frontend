"use client";
import {
  Bar as RechartsBar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ChartContainer } from "../ui/chart"; // Assuming ChartContainer is a wrapper component

const chartConfig = {
  product: {
    label: "المنتج",
    color: "#1AB68A",
  },
};

// CustomTooltip function component with default parameter
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow-md text-right">
        <p className=" text-zinc-500 mb-1">
          المنتج: {payload[0].payload.product}
        </p>
        <p className="text-zinc-500">العدد: {payload[0].value}</p>
      </div>
    );
  }

  return null;
};

// Main component
export default function BestProducts({ data }) {
  return (
    <ChartContainer config={chartConfig}>
      <RechartsBarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{ right: 16 }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="product"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          hide
        />
        <XAxis dataKey="count" type="number" hide />
        <Tooltip content={<CustomTooltip />} />
        <RechartsBar dataKey="count" fill="#1AB68A" radius={4} barSize={26}>
          <LabelList
            dataKey="product"
            position="left"
            offset={-8}
            className="fill-white"
            fontSize={12}
          />
          <LabelList
            dataKey="count"
            position="right"
            offset={22}
            className="fill-foreground"
            fontSize={12}
          />
        </RechartsBar>
      </RechartsBarChart>
    </ChartContainer>
  );
}
