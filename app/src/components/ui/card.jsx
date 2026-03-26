import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Animated card — lifts and glows on hover
const Card = React.forwardRef(({ className, glow = false, animate = false, ...props }, ref) => {
  if (animate || glow) {
    return (
      <motion.div
        ref={ref}
        whileHover={{
          y: -6,
          scale: 1.015,
          boxShadow: "0 0 28px rgba(37,99,235,0.18), 0 8px 32px rgba(0,0,0,0.4)",
          borderColor: "rgba(37,99,235,0.45)",
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "rounded-xl border border-[var(--pce-border)] bg-card text-card-foreground",
          className
        )}
        {...props}
      />
    )
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-[var(--pce-border)] bg-card text-card-foreground transition-all duration-300",
        glow && "hover:border-primary/50 hover:shadow-card-hover",
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-headline font-bold tracking-tight text-foreground", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
