import { columns } from "./columns"
import { DataTable } from "@/components/data-table/data-table"
import { parseSearchParams, SearchParams } from "@/lib/data-table"
import { createClient } from "@/lib/supabase/client"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Contacts = {
    id: string, 
    created_at?: string, 
    updated_at?: string, 
    first_name?: string, 
    last_name?: string, 
    display_name?: string, 
    nickname?: string | null, 
    primary_email?: string, 
    primary_phone?: string, 
    company?: string, 
    job_title?: string, 
    birthday?: string, 
    notes?: string, 
    is_favorite?: boolean, 
    tags?: string[] | null, 
  }

  async function getData(): Promise<Contacts[]> {

    const supabase = await createClient()

    const { data, error } = await supabase
    .from("registry_contacts")
    .select("*")

    if (error) {
      console.error(error)
    }

    return data as Contacts[]
}

interface DataTableExampleContactsProps {
  searchParams?: SearchParams
}

export default async function DataTableExampleContacts({ 
  searchParams = {} 
}: DataTableExampleContactsProps) {
  const data = await getData()
  const initialState = parseSearchParams(searchParams)

  return (
    <div className="">
      <DataTable 
        columns={columns} 
        data={data} 
        initialState={initialState}
      />
    </div>
  )
}