import DataTableExamplePayments from "@/components/data-table-example-payments/data-table-example-payments";

export default async function DataTableExamplePaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams

  return (
    <main className="px-3 py-10 w-full max-w-5xl mx-auto">
      <DataTableExamplePayments searchParams={params} />
    </main>
  )
}