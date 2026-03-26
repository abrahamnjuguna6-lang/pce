import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold font-label transition-colors",
  {
    variants: {
      variant: {
        default:     "border-primary/30 bg-primary/10 text-pce-blue-dim",
        cyan:        "border-[var(--pce-cyan)]/30 bg-[var(--pce-cyan)]/10 text-[var(--pce-cyan)]",
        emerald:     "border-[var(--pce-emerald)]/30 bg-[var(--pce-emerald)]/10 text-[var(--pce-emerald)]",
        muted:       "border-border bg-muted text-muted-foreground",
        destructive: "border-destructive/30 bg-destructive/10 text-destructive",
        outline:     "border-border text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
