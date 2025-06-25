"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { PencilRuler } from "lucide-react"
import { Contacts } from "../_lib/validations"
import { ContactForm } from "./contact-form"

interface ContactsEditRowProps {
  contact: Contacts
}

export default function ContactsEditRow({ contact }: ContactsEditRowProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <PencilRuler className="size-4 shrink-0" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Contact</SheetTitle>
          <SheetDescription>
            Make changes to the contact information. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <ContactForm
          contact={contact}
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  )
}