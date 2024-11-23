import TasksTab from "./components/ProductsTab";
import AddForm from "@/app/components/AddForm";

export default async function Home() {

  return (
   <div className="mt-6 w-full flex items-center justify-center flex-col pt-10">
      <AddForm/>
      <TasksTab/>
   </div>
  );
}
