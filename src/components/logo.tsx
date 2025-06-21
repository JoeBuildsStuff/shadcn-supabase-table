import { Table2 } from "lucide-react";
import { metadata } from "@/app/layout";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
    <div className="p-1.5 bg-foreground text-background dark:bg-secondary dark:text-foreground rounded-lg">
      <Table2 className="size-5" />
    </div>
    <span>{metadata?.title as string}</span>
  </div>
  )
}