export const fetchDashboardData = async () => {
  return {
    employees: [
      {
        id: 1,
        name: "الامين احمد مليح",
        firstPhoneNumber: "01234567890",
        secondPhoneNumber: "01234567890",
        email: "0gWZy@example.com",
        password: "12345678",
      },
      {
        id: 2,
        name: "محمد الامين احمد مليح",
        firstPhoneNumber: "01234567890",
        secondPhoneNumber: "01234567890",
        email: "0gWZy@example.com",
        password: "12345678",
      },
      {
        id: 3,
        name: "محمد الامين مليح",
        firstPhoneNumber: "01234567890",
        secondPhoneNumber: "01234567890",
        email: "0gWZy@example.com",
        password: "12345678",
      },
      {
        id: 4,
        name: "محمد الامين مليح",
        firstPhoneNumber: "01234567890",
        secondPhoneNumber: "01234567890",
        email: "0gWZy@example.com",
        password: "12345678",
      },
    ],
    storeCustomersOrders: [
      {
        id: 1,
        name: "الامين احمد مليح",
        products: [
          { id: 1, product: "صابون" },
          { id: 2, product: "شامبو" },
          { id: 3, product: "غسول وجة" },
        ],
        price: "12000",
        phoneNumber: "01234567890",
        city: "بابل",
        status: "الطلب مكتمل",
      },
      {
        id: 2,
        name: "محمد الامين احمد مليح",
        products: [
          { id: 1, product: "صابون" },
          { id: 2, product: "شامبو" },
          { id: 3, product: "غسول وجة" },
        ],
        price: "12000",
        phoneNumber: "01234567890",
        city: "بابل",
        status: "ملغى",
      },
      {
        id: 3,
        name: "محمد الامين مليح",
        products: [
          { id: 1, product: "صابون" },
          { id: 2, product: "شامبو" },
          { id: 3, product: "غسول وجة" },
        ],
        price: "12000",
        phoneNumber: "01234567890",
        city: "بابل",
        status: "الطلب مكتمل",
      },
      {
        id: 4,
        name: "محمد احمد مليح",
        products: [
          { id: 1, product: "صابون" },
          { id: 2, product: "شامبو" },
          { id: 3, product: "غسول وجة" },
        ],
        price: "12000",
        phoneNumber: "01234567890",
        city: "صلاح الدين",
        status: "ملغى",
      },
      {
        id: 5,
        name: "محمد الامين احمد مليح",
        products: [
          { id: 1, product: "صابون" },
          { id: 2, product: "شامبو" },
          { id: 3, product: "غسول وجة" },
          { id: 4, product: "غسول وجة" },
          { id: 5, product: "غسول وجة" },
          { id: 6, product: "غسول وجة" },
          { id: 7, product: "غسول وجة" },
        ],
        city: "صلاح الدين",
        price: "12000",
        phoneNumber: "01234567890",
        status: "الطلب مكتمل",
      },
      {
        id: 6,
        name: "محمد الامين احمد",
        products: [
          { id: 1, product: "صابون" },
          { id: 2, product: "شامبو" },
          { id: 3, product: "غسول وجة" },
        ],
        price: "17000",
        phoneNumber: "01234567890",
        city: "صلاح الدين",
        status: "ملغى",
      },
      {
        id: 7,
        name: "محمد الامين احمد مليح",
        products: [
          { id: 1, product: "صابون" },
          { id: 2, product: "شامبو" },
          { id: 3, product: "غسول وجة" },
        ],
        price: "17000",
        phoneNumber: "01234567890",
        city: "بابل",
        status: "الطلب مكتمل",
      },
      {
        id: 8,
        name: "محمد الامين مليح",
        products: [
          { id: 1, product: "صابون" },
          { id: 2, product: "شامبو" },
          { id: 3, product: "غسول وجة" },
        ],
        price: "17000",
        phoneNumber: "01234567890",
        city: "بابل",
        status: "ملغى",
      },
      {
        id: 9,
        name: "الامين احمد مليح",
        products: [
          { id: 1, product: "صابون" },
          { id: 2, product: "شامبو" },
          { id: 3, product: "غسول وجة" },
        ],
        price: "17000",
        phoneNumber: "01234567890",
        city: "بابل",
        status: "الطلب مكتمل",
      },
      {
        id: 10,
        name: "محمد احمد مليح",
        products: [
          { id: 1, product: "صابون" },
          { id: 2, product: "شامبو" },
          { id: 3, product: "غسول وجة" },
        ],
        price: "17000",
        phoneNumber: "01234567890",
        city: "صلاح الدين",
        status: "ملغى",
      },
      {
        id: 11,
        name: "محمد الامين مليح",
        products: [
          { id: 1, product: "صابون" },
          { id: 2, product: "شامبو" },
          { id: 3, product: "غسول وجة" },
        ],
        city: "صلاح الدين",
        price: "17000",
        phoneNumber: "01234567890",
        status: "الطلب مكتمل",
      },
      {
        id: 12,
        name: "محمد الامين احمد",
        products: [
          { id: 1, product: "صابون" },
          { id: 2, product: "شامبو" },
          { id: 3, product: "غسول وجة" },
        ],
        city: "صلاح الدين",
        price: "17000",
        phoneNumber: "01234567890",
        status: "ملغى",
      },
    ],
    storeCustomers: [
      {
        id: 1,
        name: "علي احمد كريم",
        age: 22,
        gender: "ذكر",
        joinDate: "2024/8/13",
        city: "بابل",
        state: "الحلة",
        country: "العراق",
        location: "العراق الحلة بابل",
        phone: "1",
        sec_phone: "2",
        instagram_user: "@ddd",
        dateOfBirth: "2000-03-21",
        orders: [
          {
            id: 1,
            productName: "صابون",
            productRepetition: "شهري",
            productType: "عناية",
            time: "1234",
            productPrice: 1000,
          },
          {
            id: 2,
            productName: "غسول وجة",
            productRepetition: "شهري",
            productType: "عناية",
            time: "5678",
            productPrice: 1100,
          },
          {
            id: 3,
            productName: "عطر",
            productRepetition: "شهري",
            productType: "عناية",
            time: "9101",
            productPrice: 1200,
          },
          {
            id: 4,
            productName: "معطر",
            productRepetition: "شهري",
            productType: "عناية",
            time: "1213",
            productPrice: 1300,
          },
          {
            id: 5,
            productName: "مرطب",
            productRepetition: "شهري",
            productType: "عناية",
            time: "1415",
            productPrice: 1400,
          },
        ],
      },
      {
        id: 2,
        name: "كاظم احمد كريم",
        age: 24,
        gender: "ذكر",
        joinDate: "2024/3/13",
        city: "بابل",
        subCity: "الحلة",
        country: "العراق",
        location: "العراق الحلة بابل",
        firstPhoneNumber: "1",
        secondPhoneNumber: "2",
        instagram_user: "@ddd",
        dateOfBirth: "2000-03-21",
        orders: [],
      },
      {
        id: 3,
        name: "محمد جاسم كريم",
        age: 28,
        gender: "ذكر",
        joinDate: "2024/1/13",
        city: "بابل",
        subCity: "الحلة",
        country: "العراق",
        location: "العراق الحلة بابل",
        firstPhoneNumber: "1",
        secondPhoneNumber: "2",
        instagram_user: "@ddd",
        dateOfBirth: "2000-03-21",
        orders: [],
      },
      {
        id: 4,
        name: "محمد جاسم كريم",
        age: 28,
        gender: "ذكر",
        joinDate: "2024/1/13",
        city: "بابل",
        subCity: "الحلة",
        country: "العراق",
        location: "العراق الحلة بابل",
        firstPhoneNumber: "1",
        secondPhoneNumber: "2",
        instagram_user: "@ddd",
        dateOfBirth: "2000-03-21",
        orders: [],
      },
      {
        id: 5,
        name: "محمد جاسم كريم",
        age: 28,
        gender: "ذكر",
        joinDate: "2024/1/13",
        city: "بابل",
        subCity: "الحلة",
        country: "العراق",
        location: "العراق الحلة بابل",
        firstPhoneNumber: "1",
        secondPhoneNumber: "2",
        instagram_user: "@ddd",
        dateOfBirth: "2000-03-21",
        orders: [],
      },
      {
        id: 6,
        name: "محمد جاسم كريم",
        age: 28,
        gender: "ذكر",
        joinDate: "2024/1/13",
        city: "بابل",
        subCity: "الحلة",
        country: "العراق",
        location: "العراق الحلة بابل",
        firstPhoneNumber: "1",
        secondPhoneNumber: "2",
        instagram_user: "@ddd",
        dateOfBirth: "2000-03-21",
        orders: [],
      },
      {
        id: 7,
        name: "محمد جاسم كريم",
        age: 28,
        gender: "ذكر",
        joinDate: "2024/1/13",
        city: "بابل",
        subCity: "الحلة",
        country: "العراق",
        location: "العراق الحلة بابل",
        firstPhoneNumber: "1",
        secondPhoneNumber: "2",
        instagram_user: "@ddd",
        dateOfBirth: "2000-03-21",
        orders: [],
      },
      {
        id: 8,
        name: "محمد جاسم كريم",
        age: 28,
        gender: "ذكر",
        joinDate: "2024/1/13",
        city: "بابل",
        subCity: "الحلة",
        country: "العراق",
        location: "العراق الحلة بابل",
        firstPhoneNumber: "1",
        secondPhoneNumber: "2",
        instagram_user: "@ddd",
        dateOfBirth: "2000-03-21",
        orders: [],
      },
      {
        id: 9,
        name: "محمد جاسم كريم",
        age: 28,
        gender: "ذكر",
        joinDate: "2024/1/13",
        city: "بابل",
        subCity: "الحلة",
        country: "العراق",
        location: "العراق الحلة بابل",
        firstPhoneNumber: "1",
        secondPhoneNumber: "2",
        instagram_user: "@ddd",
        dateOfBirth: "2000-03-21",
        orders: [],
      },
      {
        id: 10,
        name: "محمد جاسم كريم",
        age: 28,
        gender: "ذكر",
        joinDate: "2024/1/13",
        city: "بابل",
        subCity: "الحلة",
        country: "العراق",
        location: "العراق الحلة بابل",
        firstPhoneNumber: "1",
        secondPhoneNumber: "2",
        instagram_user: "@ddd",
        dateOfBirth: "2000-03-21",
        orders: [],
      },
      {
        id: 11,
        name: "محمد جاسم كريم",
        age: 28,
        gender: "ذكر",
        joinDate: "2024/1/13",
        city: "بابل",
        subCity: "الحلة",
        country: "العراق",
        location: "العراق الحلة بابل",
        firstPhoneNumber: "1",
        secondPhoneNumber: "2",
        instagram_user: "@ddd",
        dateOfBirth: "2000-03-21",
        orders: [],
      },
    ],
    products: [
      {
        id: 1,
        productName: "صابون",
        productRepetition: "شهري",
        productType: "عناية",
        time: "1234",
        productPrice: 1000,
      },
      {
        id: 2,
        productName: "غسول وجة",
        productRepetition: "شهري",
        productType: "عناية",
        time: "5678",
        productPrice: 1100,
      },
      {
        id: 3,
        productName: "عطر",
        productRepetition: "شهري",
        productType: "عناية",
        time: "9101",
        productPrice: 1200,
      },
      {
        id: 4,
        productName: "معطر",
        productRepetition: "شهري",
        productType: "عناية",
        time: "1213",
        productPrice: 1300,
      },
      {
        id: 5,
        productName: "مرطب",
        productRepetition: "شهري",
        productType: "عناية",
        time: "1415",
        productPrice: 1400,
      },
      {
        id: 6,
        productName: "صابون",
        productRepetition: "شهري",
        productType: "عناية",
        time: "1617",
        productPrice: 1500,
      },
      {
        id: 7,
        productName: "صابون",
        productRepetition: "شهري",
        productType: "عناية",
        time: "1819",
        productPrice: 1600,
      },
      {
        id: 8,
        productName: "صابون",
        productRepetition: "شهري",
        productType: "عناية",
        time: "2020",
        productPrice: 1700,
      },
      {
        id: 9,
        productName: "صابون",
        productRepetition: "شهري",
        productType: "عناية",
        time: "2222",
        productPrice: 1800,
      },
      {
        id: 10,
        productName: "صابون",
        productRepetition: "شهري",
        productType: "عناية",
        time: "2424",
        productPrice: 1900,
      },
      {
        id: 11,
        productName: "صابون",
        productRepetition: "شهري",
        productType: "عناية",
        time: "2626",
        productPrice: 2000,
      },
    ],
    topProducts: [
      { name: "صابون", count: 186 },
      { name: "غسول وجه", count: 237 },
      { name: "عطر", count: 305 },
      { name: "مكياج", count: 73 },
      { name: "شامبو", count: 209 },
      { name: "حمرة", count: 214 },
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
      { name: "بغداد", count: 275 },
      { name: "بابل", count: 200 },
      { name: "اربيل", count: 187 },
      { name: "ديوانية", count: 173 },
      { name: "بصرة", count: 90 },
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
