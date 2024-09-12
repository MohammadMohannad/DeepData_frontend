export const fetchDashboardData = async () => {
  // Placeholder for backend integration
  // Fetch data from your backend API here

  // Example of mock data to test the functionality
  return {
    topProducts: [
      { product: "صابون", count: 186 },
      { product: "غسول وجه", count: 237 },
      { product: "عطر", count: 305 },
      { product: "مكياج", count: 73 },
      { product: "شامبو", count: 209 },
      { product: "حمرة", count: 214 },
    ],
    yearSummary: [
      { month: "January", income: 1860 },
      { month: "February", income: 3050 },
      { month: "March", income: 2370 },
      { month: "April", income: 730 },
      { month: "May", income: 2090 },
      { month: "June", income: 2140 },
      { month: "July", income: 1860 },
      { month: "August", income: 3050 },
      { month: "September", income: 2370 },
      { month: "October", income: 730 },
      { month: "November", income: 2090 },
      { month: "December", income: 2140 },
    ],
    topCities: [
      { city: "بغداد", count: 275 },
      { city: "بابل", count: 200 },
      { city: "اربيل", count: 187 },
      { city: "ديوانية", count: 173 },
      { city: "بصرة", count: 90 },
    ],
    customers: [
      {
        id: 1,
        name: "احمد محمد",
        count: 1999,
        avatar: null,
      },
      {
        id: 2,
        name: "علي حسن",
        count: 1500,
        avatar: null,
      },
      {
        id: 3,
        name: "فاطمة كاظم",
        count: 1200,
        avatar: null,
      },
      {
        id: 4,
        name: "احمد محمد",
        count: 1999,
        avatar: null,
      },
      {
        id: 5,
        name: "علي حسن",
        count: 1500,
        avatar: null,
      },
    ],
  };
};
