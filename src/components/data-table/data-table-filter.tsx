import { Button } from "../ui/button";
import { ListFilter } from "lucide-react";

export default function DataTableFilter() {
  return (
    <div>
      <Button variant="outline">
        <ListFilter className="w-4 h-4" />
      </Button>
    </div>
  )
}