"use client";

import React, { useState, useEffect } from "react";
import Container from "@/components/container/Container";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  ChartColumnBig,
  ChartPie,
  CreditCard,
  DollarSign,
  Layers,
  MessageCirclePlus,
  TrendingUp,
  Users,
} from "lucide-react";
import { format, set } from "date-fns";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { fetchDashboardData } from "@/lib/fakeCustomerData";
import GeneralMainPageCards from "@/components/cards/GeneralMainPageCards";
import BestProducts from "@/components/charts/BestProducts";
import avatar from "@/assets/Avatar.svg";
import YearSummary from "@/components/charts/YearSummary";
import TopCities from "@/components/charts/TopCities";
import ChatModal from "@/components/chat/ChatModal";
import withAuth from "@/components/withAuth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formatter = new Intl.NumberFormat("en-US");
const fetchEntityData = async (fromDate, toDate) => {
  console.log(fromDate, toDate);
  try {
    const params = {
      from_date: fromDate ? new Date(fromDate).toISOString() : "2024-01-01",
      to_date: toDate ? new Date(toDate).toISOString() : "2024-12-31",
      // or use fromDate/toDate dynamically if needed
    };
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/entity_customer_count`,
      {
        withCredentials: true,
        params,
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
const useDateFilter = () => {
  const [date, setDate] = useState({ from: null, to: null });
  const [selectedFilter, setSelectedFilter] = useState("day"); // Default filter


  const handleFilterChange = (filter) => {
    console.log(filter);
    setSelectedFilter(filter);
    const now = new Date();
    let startDate;
    let endDate;

    switch (filter) {
      case "day":
        startDate = new Date(now.setHours(0, 0, 0, 0)); // Start of today
        endDate = new Date(now.setHours(23, 59, 59, 999)); // End of today
        setDate({ from: startDate, to: endDate });
        break;
      case "week":
        startDate = new Date(now.setDate(now.getDate() - 7)); // Start of last week
        endDate = new Date(); // End of the week
        setDate({ from: startDate, to: endDate });
        break;
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Start of this month
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // End of this month
        setDate({ from: startDate, to: endDate });
        break;
      case "year":
        startDate = new Date(now.getFullYear(), 0, 1); // Start of this year
        endDate = new Date(now.getFullYear(), 11, 31); // End of this year
        setDate({ from: startDate, to: endDate });
        break;
      default:
        break;
    }
    if (startDate && endDate) {
      fetchEntityData(startDate, endDate);
    }
  };

  const handleDateSelect = (selectedDate) => {
    if (selectedDate.length === 2) {
      setDate({ from: selectedDate[0], to: selectedDate[1] }); // Update with selected range
    }
  };

  return {
    date,
    selectedFilter,
    handleFilterChange,
    handleDateSelect,
  };
};

function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState("day");  // Manage selected tab
  const [customerCount, setCustomerCount] = useState(null);
  const [orderCount, setOrderCount] = useState(null);
  const [productCount, setProductCount] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [revenue, setRevenue] = useState(null);
  const [topCities, setTopCities] = useState([]);
  const [yearSummary, setYearSummary] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({});
  const [open, setOpen] = useState(false);
  const { date, setDate, handleFilterChange } = useDateFilter();  // Now setDate is available



  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const { from, to } = date;

        // Fetch both customer count and dashboard data concurrently
        const [dashboardDataResponse, entityData] = await Promise.all([
          fetchDashboardData(),
          fetchEntityData(from, to),
        ]);

        setDashboardData(dashboardDataResponse);
        setCustomerCount(entityData.customer_count);
        setOrderCount(entityData.orders_count);
        setProductCount(entityData.product_count);
        setRevenue(entityData.revenue);
        setTopProducts(entityData.topProducts);
        setTopCities(entityData.topCities);
        setYearSummary(entityData.yearSummary);
        setTopCustomers(entityData.topCustomers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [date]); // Re-run whenever `date` changes

  const handleTabChange = (value) => {
    handleFilterChange(value);  // Call the filter change on tab change
  };

  if (loading) return <div>Loading...</div>;  // Loading state UI
  if (error) return <div>Error: {error}</div>;  // Error state UI


  return (
    <>
      <ChatModal open={open} setOpen={setOpen} />
      <Button
        variant="default"
        className="dropShadow p-0 w-[55px] h-[55px] sm:w-[70px] sm:h-[70px] lg:h-[55px] lg:w-[55px] rounded-full bg-green_1 fixed bottom-3 right-3 sm:bottom-6 sm:left-10 lg:bottom-5 hover:bg-green_1 z-30"
        onClick={() => setOpen(true)}
      >
        <MessageCirclePlus
          strokeWidth={1.25}
          className="w-[25px] h-[25px] sm:h-6 sm:w-6"
        />
      </Button>
      <Container className={"pb-4"}>
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
          <h3 className="text-3xl font-bold mb-4 sm:mb-0">لوحة التحكم</h3>
          <div className="min-h-full w-full sm:w-[380px] flex">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                 
                  variant={"outline"}
                  className={`w-4/6 justify-start flex-row-reverse text-left font-normal ${
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
                  selected={[date.from, date.to]}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

        {/* Fetch Data Button */}
        <Button variant="default" className="w-2/6 mr-2 min-h-full" >
          تحميل
        </Button>
</div>
        </div>

        <Tabs
          defaultValue={selectedFilter}
          onValueChange={handleTabChange}
          className="w-full sm:w-fit"
        >
          <TabsList className="w-full">
            <TabsTrigger className="w-1/4 px-4" value="day" >
              هذا اليوم
            </TabsTrigger>
            <TabsTrigger className="w-1/4 px-4" value="week" >
              الاسبوع السابق
            </TabsTrigger>
            <TabsTrigger className="w-1/4 px-4" value="month" >
              هذا الشهر
            </TabsTrigger>
            <TabsTrigger className="w-1/4 px-4" value="year" >
              هذا العام
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="w-full mt-2.5 grid grid-cols-4 gap-4 right">
  <GeneralMainPageCards
    className={"order-4 sm:order-1"}
    title="الزبائن"
    value={`${customerCount !== null ? customerCount : 'N/A'}+`}  // Dynamically display customer count
    description="+180.1% عن الشهر الماضي"
    icon={Users}
  />
  <GeneralMainPageCards
    className={"order-3 sm:order-2"}
    title="المنتجات"
    value={`${productCount !== null ? productCount : 'N/A'}+`}  // Dynamically display product count
    icon={Layers}
  />
  <GeneralMainPageCards
    className={"order-2 sm:order-3"}
    title="الطلبات"
    value={`${orderCount !== null ? orderCount : 'N/A'}+`}  // Dynamically display order count
    description={`201+ منذ اليوم السابق`}
    icon={CreditCard}
  />
  <GeneralMainPageCards
    className={"order-1 sm:order-4"}
    title="إجمالي الإيرادات"
    value={`IQD ${revenue !== null ? formatter.format(revenue) : 'N/A'}`}  // Dynamically display revenue
    description={`+20.1% from last month`}
    icon={DollarSign}
  />
</div>


        <div className="w-full mt-4 grid grid-cols-3 gap-4">
          {/* top products chart */}
          <Card className="order-2 sm:order-2 col-span-4 sm:col-span-1 min-h-[444px]">
            <div className="flex items-center gap-1.5 p-3">
              <ChartColumnBig className="w-[15px] h-[15px] text-zinc-500" />
              <p className="text-[13px] text-zinc-500">المنتجات الاكثر طلبا</p>
            </div>
            <Separator />
            <CardHeader className="pb-8">
              <CardTitle className="text-base">
                مخطط بياني يوضح المنتجات الاكثر طلبا
              </CardTitle>
              <CardDescription>Sep - Aug 2024</CardDescription>
            </CardHeader>
            <CardContent className="pb-8">
              <BestProducts data={topProducts || []} />
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 items-start font-medium leading-none">
                ارتفاع بنسبة {5.2}% هذا الشهر{" "}
                <TrendingUp className="h-4 w-4 scale-x-[-1]" />
              </div>
              <div className="leading-none text-muted-foreground">
                إظهار إجمالي عدد طلبات المنتجات خلال هذا الشهر
              </div>
            </CardFooter>
          </Card>
          {/* top customers */}
          <Card className="order-1 sm:order-2 col-span-4 sm:col-span-2 min-h-[444px]">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                أفضل الزبائن
              </CardTitle>
              <CardDescription className="text-base">
                العملاء الذين قاموا بأعلى عدد من عمليات الشراء
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-7">
              {topCustomers &&
                topCustomers.map((item, index) => (
                  <div
                    className="flex items-center justify-between"
                    key={index}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 relative overflow-hidden rounded-full">
                        <Image
                          src={item.avatar ? item.avatar : avatar}
                          alt={`Avatar of ${item.name}`}
                          fill
                          sizes="(100vw, 100vh)"
                          priority
                        />
                      </div>

                      <p className="text-base font-medium">{item.name}</p>
                    </div>
                    <p dir="ltr">+{formatter.format(item.count)}</p>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full mt-4 grid grid-cols-3 gap-4 ">
          {/*year summary chart*/}
          <Card className="order-2 sm:order-1 col-span-3 sm:col-span-2 h-fit ">
            <CardHeader className="text-base font-semibold">
              ملخص العام
            </CardHeader>
            <CardContent>

              <YearSummary data={yearSummary || []} />
            </CardContent>
          </Card>
          {/* top cities */}
          <Card className="order-1 sm:order-2 col-span-3 sm:col-span-1 h-full ">
            <div className="flex items-center gap-1.5 p-3">
              <ChartPie className="w-[15px] h-[15px] text-zinc-500" />
              <p className="text-[13px] text-zinc-500">المحافظات الاكثر طلبا</p>
            </div>
            <Separator />
            <CardContent className="pt-8">
              <TopCities data={topCities || []} />
            </CardContent>
            <div className="flex gap-2 items-center justify-center px-2 mb-4 font-medium leading-none">
              ارتفاع بنسبة {5.2}% هذا الشهر{" "}
              <TrendingUp className="h-4 w-4 scale-x-[-1]" />
            </div>
          </Card>
        </div>
      </Container>
    <ToastContainer position="bottom-center" autoClose={3000} />

    </>
  );
}

export default withAuth(Dashboard,'customer');
