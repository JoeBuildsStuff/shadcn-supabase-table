import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { OpenInV0Button } from "./button-open-in-v0";
import { ButtonCopyNpxInstallCmd } from "./button-copy-npx-install-cmd";
import { ButtonOpenGithubRepo } from "./button-open-github-repo";

export default function MainHeader() {


  return (
    <header className="sticky top-0 flex h-12 items-center justify-between bg-background px-3">
      <Logo />
      <div className="flex items-center gap-2">
        <ButtonCopyNpxInstallCmd />
        <OpenInV0Button url="https://shadcn-supabase-table.vercel.app/r/data-table-payments.json" />  
        <ButtonOpenGithubRepo />
        <ModeToggle />
      </div>
    </header>
  )
}