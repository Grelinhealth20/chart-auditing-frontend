import * as React from "react"
import { CheckCircle2, Info, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export interface AutofillBannerProps {
  variant?: "success" | "info" | "default"
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export const AutofillBanner = React.forwardRef<HTMLDivElement, AutofillBannerProps>(
  ({ variant = "default", icon, children, className }, ref) => {
    const defaultIcons = {
      success: <CheckCircle2 className="h-5 w-5" />,
      info: <Info className="h-5 w-5" />,
      default: <Sparkles className="h-5 w-5" />,
    }

    const variantStyles = {
      success: "bg-green-50 border-green-200 text-green-800",
      info: "bg-blue-50 border-blue-200 text-blue-800",
      default: "bg-green-50 border-green-200 text-green-800",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start gap-3 p-4 rounded-lg border-2 animate-slide-in-up",
          variantStyles[variant],
          className,
        )}
      >
        <div className="flex-shrink-0 mt-0.5">{icon || defaultIcons[variant]}</div>
        <div className="flex-1 text-sm font-medium">{children}</div>
      </div>
    )
  },
)

AutofillBanner.displayName = "AutofillBanner"
