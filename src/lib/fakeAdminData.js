import { sub } from "date-fns";

export const fetchDashboardData = async () => {
  return {
    subscriptions: {
      subscription_plans: [
        {
          id: 1,
          name: "برو",
          amount: 250000,
          periodicity: "yearly",
          status: "active",
        },
        {
          id: 2,
          name: "ايكو",
          amount: 50000,
          periodicity: "monthly",
          status: "active",
        },
        {
          id: 3,
          name: "بريميوم",
          amount: 500000,
          periodicity: "yearly",
          status: "active",
        },
      ],
      subscription_records: [
        {
          id: 1,
          entity_id: 2,
          subscription_plan_id: 1,
          amount: 250000,
          period_amount: 3,
          status: "active",
          start_date: "2024-11-01",
          end_date: "2026-05-01",
        },
        {
          id: 2,
          entity_id: 1,
          subscription_plan_id: 2,
          amount: 50000,
          period_amount: 1,
          status: "inactive",
          start_date: "2024-11-01",
          end_date: "2024-12-01",
        },
        {
          id: 3,
          entity_id: 2,
          subscription_plan_id: 3,
          amount: 500000,
          period_amount: 1,
          status: "active",
          start_date: "2024-11-01",
          end_date: "2025-11-01",
        },
        {
          id: 4,
          entity_id: 4,
          subscription_plan_id: 1,
          amount: 50000,
          period_amount: 5,
          status: "active",
          start_date: "2024-11-01",
          end_date: "2025-11-01",
        },
        {
          id: 5,
          entity_id: 4,
          subscription_plan_id: 2,
          amount: 250000,
          period_amount: 2,
          status: "active",
          start_date: "2024-11-01",
          end_date: "2025-11-01",
        },
      ],
      subscription_requests: [
        {
          id: 1,
          entity_id: 1,
          subscription_plan_id: 3,
          subscription_record_id: 1,
          status: "pending",
          start_date: "2024-11-01",
          end_date: "2025-11-01",
        },
        {
          id: 2,
          entity_id: 2,
          subscription_plan_id: 3,
          subscription_record_id: 2,
          status: "pending",
          start_date: "2024-11-01",
          end_date: "2025-11-01",
        },
        {
          id: 3,
          entity_id: 3,
          subscription_plan_id: 3,
          subscription_record_id: 3,
          status: "pending",
          start_date: "2024-11-01",
          end_date: "2025-11-01",
        },
        {
          id: 4,
          entity_id: 4,
          subscription_plan_id: 2,
          subscription_record_id: 4,
          status: "rejected",
          start_date: "2024-11-01",
          end_date: "2025-11-01",
        },
        {
          id: 5,
          entity_id: 5,
          subscription_plan_id: 1,
          subscription_record_id: 5,
          status: "accepted",
          start_date: "2024-11-01",
          end_date: "2025-11-01",
        },
      ],
    },

    payments: {
      financial: [
        {
          id: 1,
          date: "2022-10-10",
          amount: "1000",
          entity_id: 4,
          status: "paid",
        },
        {
          id: 2,
          date: "2022-10-10",
          amount: "1000",
          entity_id: 3,
          status: "unpaid",
        },
        {
          id: 3,
          date: "2022-10-10",
          amount: "1000",
          entity_id: 1,
          status: "partially paid",
        },
        {
          id: 4,
          date: "2022-10-10",
          amount: "1000",
          entity_id: 2,
          status: "partially paid",
        },
      ],
      // allStores is refered by entity_id
      allStores: [
        {
          id: 1,
          name: "متجر السعادة",
          owner: "محمد كاظم علي",
        },
        {
          id: 2,
          name: "متجر النور",
          owner: "جابر كاظم محمد",
        },
        {
          id: 3,
          name: "متجر الحرية",
          owner: "محمد علي عبدالحسين",
        },
        {
          id: 4,
          name: "متجر الوصل",
          owner: "حسين جمال ناصر",
        },
        {
          id: 5,
          name: "متجر غافر",
          owner: "علي محمود حسن",
        },
      ],
    },
    employees: [{}],
    allStores: [
      {
        id: 1,
        name: "متجر السعادة",
      },
      {
        id: 2,
        name: "متجر السعادة",
      },
      {
        id: 3,
        name: "متجر السعادة",
      },
      {
        id: 4,
        name: "متجر السعادة",
      },
      {
        id: 5,
        name: "متجر السعادة",
      },
      {
        id: 6,
        name: "متجر السعادة",
      },
      {
        id: 7,
        name: "متجر السعادة",
      },
      {
        id: 8,
        name: "متجر السعادة",
      },
      {
        id: 9,
        name: "متجر السعادة",
      },
      {
        id: 10,
        name: "متجر السعادة",
      },
      {
        id: 11,
        name: "متجر السعادة",
      },
      {
        id: 12,
        name: "متجر السعادة",
      },
      {
        id: 13,
        name: "متجر السعادة",
      },
      {
        id: 14,
        name: "متجر السعادة",
      },
      {
        id: 15,
        name: "متجر السعادة",
      },
      {
        id: 16,
        name: "متجر السعادة",
      },
      {
        id: 17,
        name: "متجر السعادة",
      },
      {
        id: 18,
        name: "متجر السعادة",
      },
      {
        id: 19,
        name: "متجر السعادة",
      },
      {
        id: 20,
        name: "متجر السعادة",
      },
      {
        id: 21,
        name: "متجر السعادة",
      },
      {
        id: 22,
        name: "متجر السعادة",
      },
      {
        id: 23,
        name: "متجر السعادة",
      },
      {
        id: 24,
        name: "متجر السعادة",
      },
      {
        id: 25,
        name: "متجر السعادة",
      },
      {
        id: 26,
        name: "متجر السعادة",
      },
    ],

    trainers: [
      {
        id: 1,
        name: "الامين احمد مليح",
        phoneNumber: "01234567890",
        email: "0gWZy@example.com",
        date: "2022/10/10",
        password: "12345678",
        confirmPassword: "12345678",
        stores: [
          {
            id: 1,
            name: "متجر السعادة",
          },
          {
            id: 2,
            name: "متجر السعادة",
          },
          {
            id: 3,
            name: "متجر السعادة",
          },
          {
            id: 4,
            name: "متجر السعادة",
          },
          {
            id: 5,
            name: "متجر السعادة",
          },
        ],
      },
      {
        id: 2,
        name: "محمد الامين احمد مليح",
        phoneNumber: "01234567890",
        email: "0gWZy@example.com",
        date: "2022/10/10",
        password: "12345678",
        confirmPassword: "12345678",
        stores: [
          {
            id: 6,
            name: "متجر السعادة",
          },
          {
            id: 7,
            name: "متجر السعادة",
          },
          {
            id: 8,
            name: "متجر السعادة",
          },
        ],
      },
      {
        id: 3,
        name: "محمد الامين مليح",
        phoneNumber: "01234567890",
        email: "0gWZy@example.com",
        date: "2022/10/10",
        password: "12345678",
        confirmPassword: "12345678",
        stores: [
          {
            id: 10,
            name: "متجر السعادة",
          },
          {
            id: 12,
            name: "متجر السعادة",
          },
        ],
      },
      {
        id: 4,
        name: "محمد الامين مليح",
        phoneNumber: "01234567890",
        email: "0gWZy@example.com",
        date: "2022/10/10",
        password: "12345678",
        confirmPassword: "12345678",
        stores: [
          {
            id: 15,
            name: "متجر السعادة",
          },
        ],
      },
      {
        id: 5,
        name: "محمد الامين مليح",
        phoneNumber: "01234567890",
        email: "0gWZy@example.com",
        date: "2022/10/10",
        password: "12345678",
        confirmPassword: "12345678",
        stores: [
          {
            id: 20,
            name: "متجر السعادة",
          },
        ],
      },
    ],
    disabledAccounts: [
      { id: 1, name: "متجر السعادة", fees: "1000" },
      { id: 2, name: "النور ستور", fees: "34500" },
      { id: 3, name: "متجر السعادة", fees: "15700" },
      { id: 4, name: "متجر الوداد", fees: "2400" },
      { id: 5, name: "النور ستور", fees: "34500" },
    ],
    topAdmins: [
      { name: "روان علي", count: 186 },
      { name: "احمد محمد", count: 237 },
      { name: "علي جبار", count: 305 },
      { name: "احمد محسن", count: 73 },
      { name: "ذوالفقار علي عبدالحسين", count: 209 },
      { name: "حمزة جاسم", count: 214 },
    ],
    yearSummary: [
      { month: "January", income: 4860 },
      { month: "February", income: 5050 },
      { month: "March", income: 6370 },
      { month: "April", income: 1730 },
      { month: "May", income: 2090 },
      { month: "June", income: 2140 },
      { month: "July", income: 1860 },
      { month: "August", income: 5050 },
      { month: "September", income: 2370 },
      { month: "October", income: 730 },
      { month: "November", income: 2090 },
      { month: "December", income: 2140 },
    ],
    topCities: [
      { name: "سنة", count: 275 },
      { name: "ستة اشهر", count: 200 },
      { name: "شهر", count: 187 },
    ],
    stores: [
      {
        id: 1,
        name: "الامين احمد مليح",
        businessName: "متجر السعادة",
        joinDate: "2024/1/01",
        endDate: "2024/2/01",
        state: "بغداد",
        email: "e9pC8@example.com",
        country: "العراق",
        phoneNumber: "07781231234",
        status: "inactive",
        instagram_user: "@eee",
        meta_id: "@www",
        logo: null,
        entity_type: "",
        businessPhoneNumber: "",
        sec_phone: "",
        plan: "monthly",
        type: "",
        password: "1234",
        confirmPassword: "1234",
      },
      {
        id: 2,
        name: "جبار كاظم احمد",
        businessName: "متجر الوداد",
        joinDate: "2024/5/11",
        endDate: "2024/11/11",
        state: "بغداد",
        city: "التاجي",
        email: "e9e3vegvpC8@example.com",
        country: "العراق",
        phoneNumber: "07801231234",
        status: "active",
        instagram_user: "",
        meta_id: "",
        logo: null,
        entity_type: "",
        businessPhoneNumber: "",
        sec_phone: "",
        plan: "",
        type: "",
        password: "",
        confirmPassword: "",
        entity_id: 3,
        tempContent:
          "lorim ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        tempName: "lorem ipsum",
      },
      {
        id: 3,
        name: "احمد محسن احمد",
        businessName: "النور ستور",
        joinDate: "2024/10/10",
        endDate: "2024/11/10",
        state: "بغداد",
        city: "المنصور",
        email: "e9e3vpC8@example.com",
        country: "العراق",
        phoneNumber: "07501231234",
        status: "pending",
        instagram_user: "",
        meta_id: "",
        logo: null,
        entity_type: "",
        businessPhoneNumber: "",
        sec_phone: "",
        plan: "",
        type: "",
        password: "",
        confirmPassword: "",
        entity_id: 3,
        tempContent:
          "lorim ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        tempName: "lorem ipsum",
      },
      {
        id: 4,
        name: "محمد الامين احمد مليح",
        businessName: "متجر السعادة",
        joinDate: "2024/1/01",
        endDate: "2024/2/01",
        state: "بغداد",
        city: "الدورة",
        email: "e9e3vpC8@example.com",
        country: "العراق",
        phoneNumber: "07781231234",
        status: "inactive",
        instagram_user: "",
        meta_id: "",
        logo: null,
        entity_type: "",
        businessPhoneNumber: "",
        sec_phone: "",
        plan: "",
        type: "",
        password: "",
        confirmPassword: "",
        entity_id: 4,
        tempContent:
          "lorim ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        tempName: "lorem ipsum",
      },
      {
        id: 5,
        name: "ذوالفقار علي عبدالحسين",
        businessName: "متجر الوداد",
        joinDate: "2024/5/11",
        endDate: "2024/11/11",
        state: "بغداد",
        city: "التاجي",
        email: "e9e3vpC8@example.com",
        country: "العراق",
        phoneNumber: "07801231234",
        status: "active",
        instagram_user: "",
        meta_id: "",
        logo: null,
        entity_type: "",
        businessPhoneNumber: "",
        sec_phone: "",
        plan: "",
        type: "",
        password: "",
        confirmPassword: "",
        entity_id: 5,
        tempContent:
          "lorim ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        tempName: "lorem ipsum",
      },
      {
        id: 6,
        name: "حمزة جاسم",
        businessName: "النور ستور",
        joinDate: "2024/10/10",
        endDate: "2024/11/10",
        state: "بغداد",
        city: "المنصور",
        email: "e9e3vpC8@example.com",
        country: "العراق",
        phoneNumber: "07501231234",
        status: "pending",
        instagram_user: "",
        meta_id: "",
        logo: null,
        entity_type: "",
        businessPhoneNumber: "",
        sec_phone: "",
        plan: "",
        type: "",
        password: "",
        confirmPassword: "",
        entity_id: 6,
        tempContent:
          "lorim ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        tempName: "lorem ipsum",
      },
      {
        id: 7,
        name: "محمد الامين احمد مليح",
        businessName: "متجر السعادة",
        joinDate: "2024/1/01",
        endDate: "2024/2/01",
        state: "بغداد",
        city: "الدورة",
        email: "e9e3vpC8@example.com",
        country: "العراق",
        phoneNumber: "07781231234",
        status: "inactive",
        instagram_user: "",
        meta_id: "",
        logo: null,
        entity_type: "",
        businessPhoneNumber: "",
        sec_phone: "",
        plan: "",
        type: "",
        password: "",
        confirmPassword: "",
        entity_id: 7,
        tempContent:
          "lorim ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        tempName: "lorem ipsum",
      },
      {
        id: 8,
        name: "ذوالفقار علي عبدالحسين",
        businessName: "متجر الوداد",
        joinDate: "2024/5/11",
        endDate: "2024/11/11",
        state: "بغداد",
        city: "التاجي",
        email: "e9e3vpC8@example.com",
        country: "العراق",
        phoneNumber: "07801231234",
        status: "active",
        instagram_user: "",
        meta_id: "",
        logo: null,
        entity_type: "",
        businessPhoneNumber: "",
        sec_phone: "",
        plan: "",
        type: "",
        password: "",
        confirmPassword: "",
        entity_id: 9,
        tempContent:
          "lorim ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        tempName: "lorem ipsum",
      },
      {
        id: 9,
        name: "حمزة جاسم",
        businessName: "النور ستور",
        joinDate: "2024/10/10",
        endDate: "2024/11/10",
        state: "بغداد",
        city: "المنصور",
        email: "e9e3vpC8@example.com",
        country: "العراق",
        phoneNumber: "07501231234",
        status: "pending",
        instagram_user: "",
        meta_id: "",
        logo: null,
        entity_type: "",
        businessPhoneNumber: "",
        sec_phone: "",
        plan: "",
        type: "",
        password: "",
        confirmPassword: "",
        entity_id: 12,
        tempContent:
          "lorim ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        tempName: "lorem ipsum",
      },
      {
        id: 10,
        name: "محمد الامين احمد مليح",
        businessName: "متجر السعادة",
        joinDate: "2024/1/01",
        endDate: "2024/2/01",
        state: "بغداد",
        city: "الدورة",
        email: "e9e3vpC8@example.com",
        country: "العراق",
        phoneNumber: "07781231234",
        status: "inactive",
        instagram_user: "",
        meta_id: "",
        logo: null,
        entity_type: "",
        businessPhoneNumber: "",
        sec_phone: "",
        plan: "",
        type: "",
        password: "",
        confirmPassword: "",
        entity_id: 22,
        tempContent:
          "lorim ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        tempName: "lorem ipsum",
      },
      {
        id: 11,
        name: "ذوالفقار علي عبدالحسين",
        businessName: "متجر الوداد",
        joinDate: "2024/5/11",
        endDate: "2024/11/11",
        state: "بغداد",
        city: "التاجي",
        email: "e9e3vpC8@example.com",
        country: "العراق",
        phoneNumber: "07801231234",
        status: "active",
        instagram_user: "",
        meta_id: "",
        logo: null,
        entity_type: "",
        businessPhoneNumber: "",
        sec_phone: "",
        plan: "",
        type: "",
        password: "",
        confirmPassword: "",
        entity_id: 32,
        tempContent:
          "lorim ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        tempName: "lorem ipsum",
      },
      {
        id: 12,
        name: "حمزة جاسم",
        businessName: "النور ستور",
        joinDate: "2024/10/10",
        endDate: "2024/11/10",
        state: "بغداد",
        city: "المنصور",
        email: "e9e3vpC8@example.com",
        country: "العراق",
        phoneNumber: "07501231234",
        status: "pending",
        instagram_user: "",
        meta_id: "",
        logo: null,
        entity_type: "",
        businessPhoneNumber: "",
        sec_phone: "",
        plan: "",
        type: "",
        password: "",
        confirmPassword: "",
        entity_id: 62,
        tempContent:
          "lorim ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        tempName: "lorem ipsum",
      },
    ],
  };
};
