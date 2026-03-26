import { motion } from "framer-motion"
import { fadeUp } from "@/lib/animations"

/**
 * ScrollReveal — wraps any content in a viewport-triggered animation.
 *
 * Props:
 *   variant   — animation variant (default: fadeUp)
 *   delay     — stagger delay in seconds (default: 0)
 *   className — passed through to the motion div
 *   once      — only animate once (default: true)
 *   amount    — how much of the element must be visible (default: 0.15)
 */
export default function ScrollReveal({
  children,
  variant = fadeUp,
  delay = 0,
  className = "",
  once = true,
  amount = 0.15,
  as = "div",
}) {
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: variant.hidden,
        visible: {
          ...variant.visible,
          transition: {
            ...variant.visible?.transition,
            delay,
          },
        },
      }}
    >
      {children}
    </MotionTag>
  )
}
