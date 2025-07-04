import { ProductsList } from "@/widgets/products-list/ui/products-list";
import { Sidebar } from "@/widgets/user-sidebar/user-sidebar";

export default function Profile() {
  return (
    <div className="flex-1 pl-20 pr-32">
      <ProductsList />
    </div>
  );
}
