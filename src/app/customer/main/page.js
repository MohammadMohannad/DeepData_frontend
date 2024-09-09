"use client";
import Container from "@/components/container/Container";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
const formatter = new Intl.NumberFormat("en-US");

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  CreditCard,
  DollarSign,
  Layers,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { format } from "date-fns"; // Import date-fns for date formatting
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Signup() {
  const [date, setDate] = useState(null);

  return (
    <Container>
      <div className="w-full flex items-center justify-between py-[10px] mb-[14px]">
        <h3 className="text-3xl font-bold">لوحة التحكم</h3>
        <div className="min-h-full flex">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={`w-[300px] justify-start flex-row-reverse text-left font-normal ${
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
            <PopoverContent className=" w-auto p-0" align="start">
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
          <Button variant="default" className="w-28 mr-2 min-h-full">
            تحميل
          </Button>
        </div>
      </div>
      {/* menubar */}
      <div>
        <Tabs
          defaultValue="day"
          onValueChange={(value) => console.log(value)}
          className="w-fit"
        >
          <TabsList>
            <TabsTrigger value="day">هذا اليوم</TabsTrigger>
            <TabsTrigger value="week">الاسبوع السابق</TabsTrigger>
            <TabsTrigger value="month">هذا الشهر</TabsTrigger>
            <TabsTrigger value="year">هذا العام</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {/* cards */}
      <div className="grid grid-cols-12 gap-4 py-4">
        <Card className="col-span-3 p-6">
          <div className="flex items-center justify-between">
            <p>الزبائن</p>
            <Users className="w-4 h-4" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green_1">{"2135"}+</h3>
            <p className="text-zinc-500 text-xs">+{"180.1"}% عن الشهر الماضي</p>
          </div>
        </Card>
        <Card className="col-span-3 p-6">
          <div className="flex items-center justify-between">
            <p>المنتجات</p>
            <Layers className="w-4 h-4" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green_1">{"512"}+</h3>
          </div>
        </Card>
        <Card className="col-span-3 p-6">
          <div className="flex items-center justify-between">
            <p>الطلبات</p>
            <CreditCard className="w-4 h-4" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green_1">{"5473"}+</h3>
            <p className="text-zinc-500 text-xs">{"201"}+ منذ اليوم السابق</p>
          </div>
        </Card>
        <Card className="col-span-3 p-6">
          <div className="flex items-center justify-between">
            <p>إجمالي الإيرادات</p>
            <DollarSign className="w-4 h-4" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green_1">
              IQD {formatter.format(45231.89)}
            </h3>
            <p className="text-zinc-500 text-xs text-right" dir="ltr">+{20.1}% from last month</p>
          </div>
        </Card>
      </div>
    </Container>
  );
}

export default Signup;
