import DataTableExampleContactsPage from "@/components/data-table-example-contacts/data-table-example-contacts";

export default async function DataTableExamplePaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams

  return (
    <main className="px-3 py-10 w-full max-w-5xl mx-auto">
      <DataTableExampleContactsPage searchParams={params} />
    </main>
  )
}