"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export interface FormNumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: string
  required?: boolean
  error?: string
  helperText?: string
  unit?: string
  unitPosition?: "left" | "right"
  onChange?: (value: number | null) => void
  className?: string
  inputClassName?: string
  labelClassName?: string
  errorClassName?: string
  min?: number
  max?: number
  step?: number
}

export const FormNumberInput = React.forwardRef<HTMLInputElement, FormNumberInputProps>(
  (
    {
      label,
      required,
      error,
      helperText,
      unit,
      unitPosition = "right",
      onChange,
      className,
      inputClassName,
      labelClassName,
      errorClassName,
      min,
      max,
      step = 1,
      value,
      ...props
    },
    ref,
  ) => {
    const id = React.useId()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      if (val === "" || val === "-") {
        onChange?.(null)
      } else {
        const numValue = Number.parseFloat(val)
        if (!isNaN(numValue)) {
          onChange?.(numValue)
        }
      }
    }

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <label htmlFor={id} className={cn("text-sm font-medium text-foreground", labelClassName)}>
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </label>
        )}

        <div className="relative">
          {unit && unitPosition === "left" && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
              {unit}
            </div>
          )}

          <Input
            ref={ref}
            id={id}
            type="number"
            value={value === undefined || value === null ? "" : value}
            onChange={handleChange}
            min={min}
            max={max}
            step={step}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
            className={cn(
              unit && unitPosition === "left" && "pl-12",
              unit && unitPosition === "right" && "pr-12",
              error && "border-destructive focus-visible:ring-destructive",
              inputClassName,
            )}
            {...props}
          />

          {unit && unitPosition === "right" && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
              {unit}
            </div>
          )}
        </div>

        {helperText && !error && (
          <p id={`${id}-helper`} className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}

        {error && (
          <p id={`${id}-error`} className={cn("text-xs text-destructive animate-slide-in-up", errorClassName)}>
            {error}
          </p>
        )}
      </div>
    )
  },
)

FormNumberInput.displayName = "FormNumberInput"
