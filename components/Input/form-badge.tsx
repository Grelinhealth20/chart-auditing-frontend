"use client"
import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle, AlertCircle, Info, Sparkles } from "lucide-react"

export interface FormBadgeProps extends React.ComponentProps<typeof Badge> {
  // Semantic status types for medical compliance
  status?:
    | "success"
    | "error"
    | "warning"
    | "info"
    | "autofilled"
    | "required"
    | "missing"
    | "risk"
    | "version"
    | "step"
  // Show icon based on status
  showIcon?: boolean
  // Custom icon override
  icon?: React.ReactNode
}

const statusConfig = {
  success: {
    className: "bg-success/10 text-success border-success/20",
    icon: CheckCircle2,
  },
  error: {
    className: "bg-destructive/10 text-destructive border-destructive/20",
    icon: XCircle,
  },
  warning: {
    className: "bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-950 dark:text-orange-400",
    icon: AlertCircle,
  },
  info: {
    className: "border-primary text-primary bg-primary/5",
    icon: Info,
  },
  autofilled: {
    className: "bg-success/10 text-success border-success/20",
    icon: Sparkles,
  },
  required: {
    className: "bg-destructive text-white border-transparent",
    icon: AlertCircle,
  },
  missing: {
    className: "bg-destructive text-white border-transparent",
    icon: XCircle,
  },
  risk: {
    className: "bg-destructive text-white border-transparent",
    icon: AlertCircle,
  },
  version: {
    className: "bg-primary/10 text-primary border-primary/20",
    icon: undefined,
  },
  step: {
    className: "bg-primary/10 text-primary border-primary/20",
    icon: undefined,
  },
}

export const FormBadge = React.forwardRef<HTMLSpanElement, FormBadgeProps>(
  ({ className, status, showIcon = false, icon, children, ...props }, ref) => {
    const config = status ? statusConfig[status] : null
    const IconComponent = config?.icon
    const statusClassName = config?.className

    return (
      <Badge ref={ref} className={cn(statusClassName, className)} {...props}>
        {showIcon && icon && <span className="inline-flex">{icon}</span>}
        {showIcon && !icon && IconComponent && <IconComponent className="w-3 h-3" />}
        {children}
      </Badge>
    )
  },
)

FormBadge.displayName = "FormBadge"
