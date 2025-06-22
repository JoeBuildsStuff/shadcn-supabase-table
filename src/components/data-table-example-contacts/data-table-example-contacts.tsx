import { columns } from "./columns"
import { DataTable } from "@/components/data-table/data-table"
import { parseSearchParams, SearchParams } from "@/lib/data-table"

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
    // Fetch data from your API here.
    return [
    {
      "id": "f8b8d0f1-1e14-42b3-94ae-7cd7c9985272",
      "created_at": "2025-06-08 10:12:33.123456+00",
      "updated_at": "2025-06-18 08:45:12.987654+00",
      "first_name": "Alice",
      "last_name": "Johnson",
      "nickname": "Ally",
      "primary_email": "alice.johnson@acme.com",
      "primary_phone": "2125551200",
      "company": "Acme Inc.",
      "job_title": "Software Engineer",
      "birthday": "1990-03-12",
      "notes": "Loves hiking and cats.",
      "is_favorite": true,
      "tags": ["engineering", "hiking"],
      "display_name": "Alice Johnson"
    },
    {
      "id": "c5ee7db2-5e91-40e9-b450-254b1625665b",
      "created_at": "2025-06-07 07:11:10.568923+00",
      "updated_at": "2025-06-15 16:22:08.333222+00",
      "first_name": "Brian",
      "last_name": "Wong",
      "nickname": "Bri",
      "primary_email": "brian.wong@starventures.io",
      "primary_phone": "3105559876",
      "company": "Star Ventures",
      "job_title": "Product Manager",
      "birthday": "1987-08-19",
      "notes": "Interested in AI and blockchain.",
      "is_favorite": false,
      "tags": ["product", "ai"],
      "display_name": "Brian Wong"
    },
    {
      "id": "2c3f80a2-1cb7-4445-92d1-70e577aa2c7e",
      "created_at": "2025-06-10 14:33:54.987654+00",
      "updated_at": "2025-06-12 11:17:22.465132+00",
      "first_name": "Camila",
      "last_name": "Santos",
      "nickname": null,
      "primary_email": "camila.santos@fintech.co",
      "primary_phone": "6465553344",
      "company": "FinTech Co.",
      "job_title": "Data Analyst",
      "birthday": "1992-02-05",
      "notes": "Speaks fluent Spanish and French.",
      "is_favorite": true,
      "tags": ["analytics"],
      "display_name": "Camila Santos"
    },
    {
      "id": "b6853a48-5ec5-4ed5-b25e-d2de48c3121f",
      "created_at": "2025-06-11 05:44:21.123987+00",
      "updated_at": "2025-06-18 21:35:58.779431+00",
      "first_name": "Daniel",
      "last_name": "Lee",
      "nickname": "Dan",
      "primary_email": "dan.lee@healthsolutions.com",
      "primary_phone": "4085557766",
      "company": "Health Solutions",
      "job_title": "Operations Manager",
      "birthday": "1985-09-17",
      "notes": "Enjoys tennis and weekend trips.",
      "is_favorite": false,
      "tags": ["ops"],
      "display_name": "Daniel Lee"
    },
    {
      "id": "ca17f07c-2155-4347-b9fd-52e1e8fd1c62",
      "created_at": "2025-06-05 19:21:08.456321+00",
      "updated_at": "2025-06-19 09:14:47.221098+00",
      "first_name": "Elena",
      "last_name": "Martinez",
      "nickname": null,
      "primary_email": "elena.martinez@globalco.com",
      "primary_phone": "3125550101",
      "company": "GlobalCo",
      "job_title": "Marketing Director",
      "birthday": "1979-06-23",
      "notes": "Responsible for global brand strategy.",
      "is_favorite": true,
      "tags": ["marketing"],
      "display_name": "Elena Martinez"
    },
    {
      "id": "e7587fa1-45c2-40c7-b065-5a931789c2c2",
      "created_at": "2025-06-03 11:08:42.678998+00",
      "updated_at": "2025-06-14 07:29:33.889222+00",
      "first_name": "Felix",
      "last_name": "Brown",
      "nickname": "Flex",
      "primary_email": "felix.brown@venturefunds.com",
      "primary_phone": "9175554488",
      "company": "Venture Funds",
      "job_title": "Investor",
      "birthday": "1988-01-01",
      "notes": "Venture capitalist focused on fintech.",
      "is_favorite": false,
      "tags": ["investing"],
      "display_name": "Felix Brown"
    },
    {
      "id": "e76e56ef-8386-4882-a46e-0dbbf059308a",
      "created_at": "2025-06-09 08:10:17.234567+00",
      "updated_at": "2025-06-17 23:58:04.897332+00",
      "first_name": "Grace",
      "last_name": "Cheng",
      "nickname": "G",
      "primary_email": "grace.cheng@opensource.io",
      "primary_phone": "4155559801",
      "company": "OpenSource IO",
      "job_title": "Developer Advocate",
      "birthday": "1995-12-19",
      "notes": "Active speaker at conferences.",
      "is_favorite": true,
      "tags": ["developer"],
      "display_name": "Grace Cheng"
    },
    {
      "id": "2257e442-093e-4017-8aa8-cab03b1c378c",
      "created_at": "2025-06-01 10:58:26.553890+00",
      "updated_at": "2025-06-13 18:22:01.334201+00",
      "first_name": "Haruki",
      "last_name": "Tanaka",
      "nickname": null,
      "primary_email": "haruki.tanaka@tokyotech.jp",
      "primary_phone": "81805554321",
      "company": "Tokyo Tech",
      "job_title": "AI Researcher",
      "birthday": "1993-07-14",
      "notes": "Specializes in NLP and machine learning.",
      "is_favorite": false,
      "tags": ["ai"],
      "display_name": "Haruki Tanaka"
    },
    {
      "id": "57f2efb2-8cdd-42aa-8712-90b29c70ca76",
      "created_at": "2025-06-06 04:10:05.877213+00",
      "updated_at": "2025-06-16 22:11:44.221677+00",
      "first_name": "Ibrahim",
      "last_name": "Al-Fayed",
      "nickname": "Ibi",
      "primary_email": "ibrahim.alfayed@desertlabs.com",
      "primary_phone": "2025553490",
      "company": "Desert Labs",
      "job_title": "Chief Technical Officer",
      "birthday": "1982-04-29",
      "notes": "Loves chess and puzzle games.",
      "is_favorite": true,
      "tags": ["cto"],  
      "display_name": "Ibrahim Al-Fayed"
    },
    {
      "id": "64dd1f18-5be8-413a-93ea-2c4451afc244",
      "created_at": "2025-06-04 17:38:12.556712+00",
      "updated_at": "2025-06-19 14:00:01.772266+00",
      "first_name": "Jasmine",
      "last_name": "Smith",
      "nickname": "Jazz",
      "primary_email": "jasmine.smith@nextgen.co",
      "primary_phone": "2125557788",
      "company": "NextGen Co.",
      "job_title": "Product Designer",
      "birthday": "1994-11-12",
      "notes": "Passionate about accessible design.",
      "is_favorite": false,
      "tags": ["design"],
      "display_name": "Jasmine Smith"
    },
    {
      "id": "01e2c173-b1ff-49a1-84c2-2eea2536bd6b",
      "created_at": "2025-06-02 09:31:56.879222+00",
      "updated_at": "2025-06-11 23:10:40.443555+00",
      "first_name": "Kurt",
      "last_name": "Anderson",
      "nickname": null,
      "primary_email": "kurt.anderson@solarinc.com",
      "primary_phone": "2125559810",
      "company": "Solar Inc.",
      "job_title": "Energy Consultant",
      "birthday": "1989-03-24",
      "notes": "Speaks at renewable energy forums.",
      "is_favorite": false,
      "tags": ["energy"],
      "display_name": "Kurt Anderson"
    },
    {
      "id": "8b963e93-57db-49cd-85da-5e84a9233983",
      "created_at": "2025-06-08 08:22:14.110320+00",
      "updated_at": "2025-06-18 08:14:03.321900+00",
      "first_name": "Lena",
      "last_name": "Kovacs",
      "nickname": "Len",
      "primary_email": "lena.kovacs@greeneco.org",
      "primary_phone": "9175555530",
      "company": "GreenEco",
      "job_title": "Sustainability Officer",
      "birthday": "1975-10-28",
      "notes": "Passionate about environmental justice.",
      "is_favorite": true,
      "tags": ["sustainability"],
      "display_name": "Lena Kovacs"
    },
    {
      "id": "fa02e1dd-9300-4e7a-91a5-4df299d2b063",
      "created_at": "2025-06-07 12:03:34.645912+00",
      "updated_at": "2025-06-19 15:55:31.992122+00",
      "first_name": "Mason",
      "last_name": "Cole",
      "nickname": null,
      "primary_email": "mason.cole@finops.co",
      "primary_phone": "4155556732",
      "company": "FinOps",
      "job_title": "Analyst",
      "birthday": "1996-06-11",
      "notes": "Focused on automation and process optimization.",
      "is_favorite": false,
      "tags": ["automation"],
      "display_name": "Mason Cole"
    },
    {
      "id": "0ed2ee9e-d97b-41b8-8119-7cc164c6e874",
      "created_at": "2025-06-12 18:45:28.900234+00",
      "updated_at": "2025-06-16 10:12:01.554132+00",
      "first_name": "Nina",
      "last_name": "Olsen",
      "nickname": "Nini",
      "primary_email": "nina.olsen@globalstream.com",
      "primary_phone": "4085557231",
      "company": "GlobalStream",
      "job_title": "Director of Engineering",
      "birthday": "1983-12-24",
      "notes": "Leads distributed engineering teams.",
      "is_favorite": true,
      "tags": ["leadership"],
      "display_name": "Nina Olsen"
    },
    {
      "id": "5ff66cd6-df57-48f2-9e29-abb2e07cbff2",
      "created_at": "2025-06-13 11:03:50.431563+00",
      "updated_at": "2025-06-17 17:50:20.912132+00",
      "first_name": "Oscar",
      "last_name": "Diaz",
      "nickname": null,
      "primary_email": "oscar.diaz@startups.io",
      "primary_phone": "2135558809",
      "company": "Startups.io",
      "job_title": "Investor Relations",
      "birthday": "1986-05-15",
      "notes": "Skilled at strategic partnerships.",
      "is_favorite": false,
      "tags": ["business"],
      "display_name": "Oscar Diaz"
    },
    {
      "id": "8fdb2852-21e3-452e-8bf7-2388651c4567",
      "created_at": "2025-06-15 06:13:19.992211+00",
      "updated_at": "2025-06-19 01:28:51.345277+00",
      "first_name": "Priya",
      "last_name": "Patel",
      "nickname": "P",
      "primary_email": "priya.patel@innoventures.com",
      "primary_phone": "9175552021",
      "company": "InnoVentures",
      "job_title": "Founder",
      "birthday": "1991-01-10",
      "notes": "Startup advisor and mentor.",
      "is_favorite": true,
      "tags": ["founder"],
      "display_name": "Priya Patel"
    },
    {
      "id": "77b1dfcb-c145-4f91-9360-35a46ec7c2e1",
      "created_at": "2025-06-03 10:19:19.344091+00",
      "updated_at": "2025-06-19 19:42:11.123456+00",
      "first_name": "Quentin",
      "last_name": "Richards",
      "nickname": "Q",
      "primary_email": "quentin.richards@scalebuild.com",
      "primary_phone": "2125551199",
      "company": "ScaleBuild",
      "job_title": "Operations Manager",
      "birthday": "1980-07-01",
      "notes": "Worked on international expansion strategy.",
      "is_favorite": false,
      "tags": ["operations"], 
      "display_name": "Quentin Richards"
    },
    {
      "id": "a612d52a-8c87-41cd-808b-0f6632f17f99",
      "created_at": "2025-06-06 19:24:12.988654+00",
      "updated_at": "2025-06-17 22:11:19.667100+00",
      "first_name": "Rosa",
      "last_name": "Gomez",
      "nickname": null,
      "primary_email": "rosa.gomez@artech.com",
      "primary_phone": "3235559988",
      "company": "ArTech",
      "job_title": "Creative Director",
      "birthday": "1990-04-22",
      "notes": "Loves designing interactive installations.",
      "is_favorite": true,
      "tags": ["creative"],
      "display_name": "Rosa Gomez"
    },
    {
      "id": "c5fda8ee-37ff-4570-8073-c99b545ae985",
      "created_at": "2025-06-02 08:18:26.456789+00",
      "updated_at": "2025-06-14 20:40:28.821988+00",
      "first_name": "Sophie",
      "last_name": "Anders",
      "nickname": "Soph",
      "primary_email": "sophie.anders@finsecure.com",
      "primary_phone": "2125554441",
      "company": "FinSecure",
      "job_title": "Compliance Officer",
      "birthday": "1978-12-31",
      "notes": "Strong background in financial compliance.",
      "is_favorite": false,
      "tags": ["compliance"],
      "display_name": "Sophie Anders"
    }
  ]
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