import Container from "@/components/container/Container";
import { DataPicker } from "@/components/dataPicker/DataPicker";
import { DataTable } from "@/components/dataTables/CustomersDataTable";
import { fetchDashboardData } from "@/lib/fakeData";
import axios from "axios";

async function customers() {
  const res = await axios.get("http://localhost:3002/api/v1/login", {
    withCredentials: true, 
  });;
  return res.storeCustomers;
}

async function Customers() {
  const data = await customers();
  return (
    <Container>
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
        <h3 className="text-3xl font-bold mb-4 sm:mb-0">العملاء</h3>
        <div className="min-h-full w-full sm:w-[380px] flex">
          <DataPicker />
        </div>
      </div>
      <DataTable customers={data} />
    </Container>
  );
}

export default Customers;
