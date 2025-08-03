// src/components/ExportButton.js
"use client";

import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";

export default function ExportButton({
  data = [],               // array of row-objects
  columns = [],            // array of { key, header }
  fileName = "export.xlsx",
  label = "تحميل اكسل",
  variant = "default",
  size = "default",
}) {
  const handleExport = () => {
    // 1) build plain-object rows with only the columns you care about
    const sheetData = data.map((row) =>
      columns.reduce((acc, col) => {
        // handle nested "company.name" if you ever need it:
        const value = col.key.split(".").reduce((o, p) => o?.[p], row);
        acc[col.header] = value;
        return acc;
      }, {})
    );

    // 2) convert → XLSX sheet + workbook
    const ws = XLSX.utils.json_to_sheet(sheetData, {
      header: columns.map((c) => c.header),
    });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // 3) write + download
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout]), fileName);
  };

  return (
    <Button onClick={handleExport} variant={variant} size={size}>
      {label}
    </Button>
  );
}
