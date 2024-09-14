import React from "react";
import { Card } from "../ui/card";

export default function GeneralMainPageCards({
  title,
  value,
  description,
  icon: Icon,
  additionalInfo,
  className,
}) {
  return (
    <Card className={`${className} col-span-4 sm:col-span-2 lg:col-span-1 p-6`}>
      <div className="flex items-center justify-between">
        <p>{title}</p>
        <Icon className="w-4 h-4" strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-green_1">{value}</h3>
        {description && <p className="text-zinc-500 text-xs">{description}</p>}
      </div>
      {additionalInfo && (
        <p className="text-zinc-500 text-xs">{additionalInfo}</p>
      )}
    </Card>
  );
}
