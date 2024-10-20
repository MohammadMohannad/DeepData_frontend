"use client";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FileUploader({ className, onFileChange, file, ...props }) {
  const [fileName, setFileName] = useState(file ? file.name : ""); // Safely access file.name
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // Set the file name in the state
      if (onFileChange) {
        onFileChange(file); // Pass the selected file to the parent component
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input
  };

  return (
    <div className={className} {...props}>
      <Label
        htmlFor="picture"
        className="w-full text-right block text-zinc-400 font-normal text-[14px]"
      >
        ارفع شعار المتجر
      </Label>
      <div
        className="mt-2 left bg-primary-foreground flex items-center border rounded justify-start h-12 space-x-2"
        onClick={triggerFileInput}
      >
        {/* Hidden file input */}
        <Input
          ref={fileInputRef}
          accept="image/*"
          id="picture"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
        <p className="text-base">Choose File</p>
        {/* Display selected file name */}
        <p className="text-sm">{fileName || "No file chosen"}</p>
      </div>
    </div>
  );
}
