import { columns } from "./columns"
import { DataTable } from "@/components/data-table/data-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "a1b2c3d4",
      amount: 250,
      status: "success",
      email: "alice@example.com",
    },
    {
      id: "e5f6g7h8",
      amount: 75,
      status: "failed",
      email: "bob@example.com",
    },
    {
      id: "i9j0k1l2",
      amount: 150,
      status: "processing",
      email: "charlie@example.com",
    },
    {
      id: "m3n4o5p6",
      amount: 200,
      status: "pending",
      email: "dave@example.com",
    },
    {
      id: "q7r8s9t0",
      amount: 300,
      status: "success",
      email: "eve@example.com",
    },
    {
      id: "u1v2w3x4",
      amount: 125,
      status: "pending",
      email: "frank@example.com",
    },
    {
      id: "y5z6a7b8",
      amount: 90,
      status: "failed",
      email: "grace@example.com",
    },
    {
      id: "c9d0e1f2",
      amount: 60,
      status: "processing",
      email: "heidi@example.com",
    },
    {
      id: "g3h4i5j6",
      amount: 180,
      status: "success",
      email: "ivan@example.com",
    },
    {
      id: "k7l8m9n0",
      amount: 220,
      status: "pending",
      email: "judy@example.com",
    },
    {
      id: "o1p2q3r4",
      amount: 95,
      status: "success",
      email: "kevin@example.com",
    },
    {
      id: "s5t6u7v8",
      amount: 340,
      status: "failed",
      email: "lisa@example.com",
    },
    {
      id: "w9x0y1z2",
      amount: 175,
      status: "processing",
      email: "mike@example.com",
    },
    {
      id: "a3b4c5d6",
      amount: 280,
      status: "success",
      email: "nancy@example.com",
    },
    {
      id: "e7f8g9h0",
      amount: 45,
      status: "pending",
      email: "oscar@example.com",
    },
    {
      id: "i1j2k3l4",
      amount: 195,
      status: "failed",
      email: "penny@example.com",
    },
    {
      id: "m5n6o7p8",
      amount: 315,
      status: "processing",
      email: "quinn@example.com",
    },
    {
      id: "q9r0s1t2",
      amount: 85,
      status: "success",
      email: "rachel@example.com",
    },
    {
      id: "u3v4w5x6",
      amount: 265,
      status: "pending",
      email: "steve@example.com",
    },
    {
      id: "y7z8a9b0",
      amount: 155,
      status: "failed",
      email: "tina@example.com",
    },
    
  ]
}

export default async function DataTableExamplePayments() {
  const data = await getData()

  return (
    <div className="">
      <DataTable columns={columns} data={data} />
    </div>
  )
}