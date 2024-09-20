"use client";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useState } from "react";

export const DataPicker = ({ withButton = true, className }) => {
  const [date, setDate] = useState(false);
  return (
    <>
      <Popover className={className}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={`${className} ${
              withButton && "w-4/6"
            } justify-start flex-row-reverse text-left font-normal ${
              !date ? "text-muted-foreground" : ""
            }`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      {withButton && (
        <Button variant="default" className="w-2/6 mr-2 min-h-full">
          تحميل
        </Button>
      )}
    </>
  );
};
