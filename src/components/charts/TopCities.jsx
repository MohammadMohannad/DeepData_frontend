"use client";
import { Pie, PieChart, Tooltip, LabelList } from "recharts";
import { ChartContainer } from "../ui/chart";

const formatter = new Intl.NumberFormat("en-US");

// Predefined color palette
const colorPalette = [
  "#1ABC9C", // Turquoise
  "#2ECC71", // Emerald
  "#3498DB", // Peter River
  "#9B59B6", // Amethyst
  "#F1C40F", // Sun Flower
  "#E67E22", // Carrot
  "#E74C3C", // Alizarin
  "#34495E", // Wet Asphalt
  "#95A5A6", // Concrete
  "#16A085", // Green Sea
];

// Create a mapping of cities to colors
const cityColorMapping = (cities) => {
  const mapping = {};
  cities.forEach((city, index) => {
    mapping[city] = colorPalette[index % colorPalette.length]; // Cycle through colors for each city
  });
  return mapping;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow-md flex items-center gap-2 text-right">
        <div
          className="aspect-[5/10] rounded w-2"
          style={{ backgroundColor: payload[0].payload.fill }}
        ></div>
        <div className="flex items-center">
          <p className="text-zinc-500">{payload[0].payload.city}</p>
          <p className="text-zinc-500">
            : {formatter.format(payload[0].value)}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function TopCities({ data }) {
  const cities = data.map((d) => d.city); // Extract city names from data
  const colorMapping = cityColorMapping(cities); // Map cities to colors

  // Assign colors to data based on the city-color mapping
  const coloredData = data.map((entry) => ({
    ...entry,
    fill: colorMapping[entry.city],
  }));

  return (
    <ChartContainer
      config={{ city: { label: "city" } }}
      className="mx-auto aspect-square min-w-full min-h-full"
    >
      <PieChart>
        <Tooltip content={<CustomTooltip />} />
        <Pie data={coloredData} dataKey="count">
          <LabelList
            dataKey="city"
            className="fill-background"
            stroke="none"
            fontSize={12}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
