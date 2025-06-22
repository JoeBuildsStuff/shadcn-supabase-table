import DataTableExampleContacts from "@/components/data-table-example-contacts/data-table-example-contacts";

export default async function DataTableExampleContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams

  return (
    <main className="px-3 py-10 w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Data Table Example</h1>
        <p className="text-muted-foreground">
          A complete data table with sorting, filtering, pagination, and URL state management.
        </p>
      </div>
      <DataTableExampleContacts searchParams={params} />
    </main>
  )
}