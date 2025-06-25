"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save } from "lucide-react"
import { createContact, updateContact } from "../_lib/actions"
import { Contacts } from "../_lib/validations"

interface ContactFormProps {
  contact?: Contacts
  onSuccess?: () => void
  onCancel?: () => void
}

const tagOptions = [
  { label: "Engineering", value: "engineering" },
  { label: "Product", value: "product" },
  { label: "Analytics", value: "analytics" },
  { label: "Operations", value: "ops" },
  { label: "Marketing", value: "marketing" },
  { label: "Investing", value: "investing" },
  { label: "Developer", value: "developer" },
  { label: "AI", value: "ai" },
  { label: "CTO", value: "cto" },
  { label: "Design", value: "design" },
  { label: "Energy", value: "energy" },
  { label: "Sustainability", value: "sustainability" },
  { label: "Automation", value: "automation" },
  { label: "Leadership", value: "leadership" },
  { label: "Business", value: "business" },
  { label: "Founder", value: "founder" },
  { label: "Creative", value: "creative" },
  { label: "Compliance", value: "compliance" },
]

export function ContactForm({ contact, onSuccess, onCancel }: ContactFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditing = !!contact
  
  const [selectedTags, setSelectedTags] = useState<string[]>(contact?.tags || [])
  const [formData, setFormData] = useState<Omit<Contacts, "id" | "created_at" | "updated_at">>({
    first_name: contact?.first_name || "",
    last_name: contact?.last_name || "",
    display_name: contact?.display_name || "",
    nickname: contact?.nickname || "",
    primary_email: contact?.primary_email || "",
    primary_phone: contact?.primary_phone || "",
    company: contact?.company || "",
    job_title: contact?.job_title || "",
    birthday: contact?.birthday || "",
    notes: contact?.notes || "",
    is_favorite: contact?.is_favorite || false,
    tags: contact?.tags || [],
  })

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => {
      const newTags = prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
      setFormData(prevData => ({ ...prevData, tags: newTags }))
      return newTags
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const cleanedData = {
        first_name: formData.first_name?.trim() || undefined,
        last_name: formData.last_name?.trim() || undefined,
        display_name: formData.display_name?.trim() || undefined,
        nickname: formData.nickname?.trim() || null,
        primary_email: formData.primary_email?.trim() || undefined,
        primary_phone: formData.primary_phone?.trim() || undefined,
        company: formData.company?.trim() || undefined,
        job_title: formData.job_title?.trim() || undefined,
        birthday: formData.birthday?.trim() || undefined,
        notes: formData.notes?.trim() || undefined,
        is_favorite: formData.is_favorite,
        tags: selectedTags.length > 0 ? selectedTags : null,
      }

      let result
      if (isEditing) {
        const updateData = Object.fromEntries(
          Object.entries(cleanedData).filter(([, v]) => v !== undefined)
        )
        result = await updateContact(contact.id, updateData)
      } else {
        result = await createContact(cleanedData)
      }
      
      if (result.success) {
        router.refresh()
        onSuccess?.()
      } else {
        console.error(`Failed to ${isEditing ? 'update' : 'create'} contact:`, result.error)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 px-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            value={formData.first_name || ""}
            onChange={(e) => handleInputChange("first_name", e.target.value)}
            placeholder="John"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            value={formData.last_name || ""}
            onChange={(e) => handleInputChange("last_name", e.target.value)}
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="display_name">Display Name</Label>
        <Input
          id="display_name"
          value={formData.display_name || ""}
          onChange={(e) => handleInputChange("display_name", e.target.value)}
          placeholder="John Doe"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nickname">Nickname</Label>
        <Input
          id="nickname"
          value={formData.nickname || ""}
          onChange={(e) => handleInputChange("nickname", e.target.value)}
          placeholder="Johnny"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="primary_email">Email</Label>
          <Input
            id="primary_email"
            type="email"
            value={formData.primary_email || ""}
            onChange={(e) => handleInputChange("primary_email", e.target.value)}
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="primary_phone">Phone</Label>
          <Input
            id="primary_phone"
            value={formData.primary_phone || ""}
            onChange={(e) => handleInputChange("primary_phone", e.target.value)}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formData.company || ""}
            onChange={(e) => handleInputChange("company", e.target.value)}
            placeholder="Acme Corp"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="job_title">Job Title</Label>
          <Input
            id="job_title"
            value={formData.job_title || ""}
            onChange={(e) => handleInputChange("job_title", e.target.value)}
            placeholder="Software Engineer"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthday">Birthday</Label>
        <Input
          id="birthday"
          type="date"
          value={formData.birthday || ""}
          onChange={(e) => handleInputChange("birthday", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2">
          {tagOptions.map((tag) => (
            <Badge
              key={tag.value}
              variant={selectedTags.includes(tag.value) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleTag(tag.value)}
            >
              {tag.label}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_favorite"
          checked={formData.is_favorite || false}
          onCheckedChange={(checked) => handleInputChange("is_favorite", !!checked)}
        />
        <Label htmlFor="is_favorite">Mark as favorite</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes || ""}
          onChange={(e) => handleInputChange("notes", e.target.value)}
          placeholder="Additional notes about this contact..."
          rows={3}
        />
      </div>

      <div className="flex justify-between gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="w-1/2"
        >
          <X className="size-4 shrink-0" /> Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-1/2"
        >
          {isEditing ? (
            <>
              <Save className="size-4 shrink-0" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </>
          ) : (
            <>
              <Plus className="size-4 shrink-0" />
              {isSubmitting ? "Adding..." : "Add Contact"}
            </>
          )}
        </Button>
      </div>
    </form>
  )
}