import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { ButtonOpenGithubRepo } from "./button-open-github-repo";
import { ButtonCopyNpxInstallCmd } from "./button-copy-npx-install-cmd";
import { ButtonOpenInV0 } from "./button-open-in-v0";

export default function MainHeader() {


  return (
    <header className="sticky top-0 flex h-12 items-center justify-between bg-background px-3">
      <Logo />
      <div className="flex items-center gap-2">
        <ButtonCopyNpxInstallCmd url="https://shadcn-supabase-table.vercel.app/r/data-table-contacts.json" />  
        <ButtonOpenInV0 url="https://shadcn-supabase-table.vercel.app/r/data-table-payments.json" />  
        <ButtonOpenGithubRepo />
        <ModeToggle />
      </div>
    </header>
  )
}