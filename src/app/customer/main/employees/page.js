import Container from "@/components/container/Container";
import { DataTable } from "@/components/dataTables/EmployeesDataTable";
import AddEmployee from "@/components/employeesModals/AddEmployee";
import { fetchDashboardData } from "@/lib/fakeData";

async function employees() {
  const res = await fetchDashboardData();
  return res.employees;
}

export default async function Employees() {
  const data = await employees();
  return (
    <Container>
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
        <h3 className="text-3xl font-bold mb-4 sm:mb-0">طلبات العملاء</h3>
        <div className="min-h-full min-w-full sm:min-w-[120px] flex">
          <AddEmployee />
        </div>
      </div>
      <DataTable employees={data} />
    </Container>
  );
}
