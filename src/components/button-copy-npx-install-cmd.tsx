"use client"

import { Terminal, Check } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export function ButtonCopyNpxInstallCmd({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`npx shadcn@latest add ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Button variant="outline" className="h-7" onClick={handleCopy} aria-label="Copy npx install command">
      {copied ? <Check className="size-4" /> : <Terminal className="size-4" />}
      npx shadcn@latest add...
    </Button>
  )
}