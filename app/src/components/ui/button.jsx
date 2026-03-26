import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { motion } from "framer-motion"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-bold font-label ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:brightness-110 hover:shadow-glow-blue",
        outline:
          "border border-primary text-pce-blue-dim bg-transparent hover:bg-primary/10",
        secondary:
          "bg-secondary text-secondary-foreground hover:brightness-110",
        ghost:
          "hover:bg-muted hover:text-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",
        cyan:
          "border border-[var(--pce-cyan)] text-[var(--pce-cyan)] bg-transparent hover:bg-[var(--pce-cyan)]/10",
        destructive:
          "bg-destructive text-destructive-foreground hover:brightness-110",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm:      "h-9 rounded-md px-4 text-xs",
        lg:      "h-12 px-8 text-base",
        xl:      "h-14 px-10 text-lg",
        icon:    "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size:    "default",
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="inline-flex"
        style={{ display: "inline-flex" }}
      >
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      </motion.div>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
