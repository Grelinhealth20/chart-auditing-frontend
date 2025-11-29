"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

export interface StructuredInfoCardProps {
  // Header props
  title?: string
  description?: string
  icon?: React.ReactNode
  badge?: React.ReactNode

  // Content props
  children?: React.ReactNode

  // Styling props
  className?: string
  headerClassName?: string
  contentClassName?: string
  titleClassName?: string
  descriptionClassName?: string

  // Animation props
  animate?: boolean
  animationDelay?: string | number

  // Border/Background variants
  variant?: "default" | "primary" | "success" | "warning" | "destructive" | "info" | "error"

  // Optional action in header
  action?: React.ReactNode

  // Layout options
  noPadding?: boolean
  noHeader?: boolean
  headerOnly?: boolean

  // Custom element
  as?: "div" | "section" | "article"

  // Style attribute for inline styles
  style?: React.CSSProperties
}

const variantStyles = {
  default: "border-border bg-card text-card-foreground",
  primary: "border-primary/20 bg-card text-card-foreground",
  success: "border-success/20 bg-success/5 text-card-foreground",
  warning: "border-warning/30 bg-warning/5 text-card-foreground",
  destructive: "border-destructive/30 bg-destructive/5 text-card-foreground",
  error: "border-destructive/30 bg-destructive/5 text-card-foreground",
  info: "border-info/20 bg-info/5 text-card-foreground",
}

export function StructuredInfoCard({
  title,
  description,
  icon,
  badge,
  children,
  className,
  headerClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  animate = false,
  animationDelay,
  variant = "default",
  action,
  noPadding = false,
  noHeader = false,
  headerOnly = false,
  as: Component = "div",
  style,
}: StructuredInfoCardProps) {
  const animationStyle = animationDelay
    ? { animationDelay: typeof animationDelay === "number" ? `${animationDelay}ms` : animationDelay, ...style }
    : style

  const hasHeader = !noHeader && (title || description || icon || badge || action)

  return (
    <Component
      className={cn(
        // Base card styles
        "rounded-lg border shadow-sm",
        variantStyles[variant],
        animate && "animate-slide-in-up",
        className,
      )}
      style={animationStyle}
    >
      {/* Header */}
      {hasHeader && (
        <div className={cn("flex flex-col space-y-1.5", noPadding ? "" : "p-6 pb-3", headerClassName)}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Title with optional icon and badge */}
              {title && (
                <h3
                  className={cn(
                    "font-semibold leading-none tracking-tight",
                    icon ? "flex items-center gap-2 text-base sm:text-lg" : "text-lg",
                    titleClassName,
                  )}
                >
                  {icon}
                  {title}
                  {badge && <span className="ml-2">{badge}</span>}
                </h3>
              )}
              {/* Description */}
              {description && (
                <p className={cn("mt-1 text-xs sm:text-sm text-muted-foreground", descriptionClassName)}>
                  {description}
                </p>
              )}
            </div>
            {/* Action */}
            {action && <div className="ml-2">{action}</div>}
          </div>
        </div>
      )}

      {/* Content */}
      {!headerOnly && children && (
        <div className={cn(noPadding ? "" : hasHeader ? "px-6 pb-6 pt-0" : "p-6", contentClassName)}>{children}</div>
      )}
    </Component>
  )
}
