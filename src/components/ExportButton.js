// components/ExportButton.js
"use client";

import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";   // ← import your styled Button

export default function ExportButton({
  table,
  fileName = "export.xlsx",
  label = "تحميل اكسل",
  variant = "default",  // you can expose variant/size as props if you want
  size = "default",
}) {
  const handleExport = () => {
    const cols = table
      .getAllLeafColumns()
      .filter((col) => col.getIsVisible() && col.id !== "actions");

    const headers = cols.map((col) =>
      typeof col.columnDef.header === "string" ? col.columnDef.header : col.id
    );

    const data = table.getFilteredRowModel().rows.map((row) => {
      const obj = {};
      cols.forEach((col, idx) => {
        obj[headers[idx]] = row.getValue(col.id);
      });
      return obj;
    });

    const ws = XLSX.utils.json_to_sheet(data, { header: headers });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout]), fileName);
  };

  return (
    <Button
      onClick={handleExport}
      variant={variant}
      size={size}
    >
      {label}
    </Button>
  );
}
