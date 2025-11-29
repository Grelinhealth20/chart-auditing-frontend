"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface FormSelectProps {
  label?: string
  id?: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  options: SelectOption[]
  required?: boolean
  error?: string
  helperText?: string
  disabled?: boolean
  className?: string
  labelClassName?: string
  selectClassName?: string
}

export const FormSelect = React.forwardRef<HTMLButtonElement, FormSelectProps>(
  (
    {
      label,
      id,
      value,
      onChange,
      placeholder = "Select an option...",
      options,
      required = false,
      error,
      helperText,
      disabled = false,
      className,
      labelClassName,
      selectClassName,
    },
    ref,
  ) => {
    const selectId = React.useId()
    const errorId = `${selectId}-error`
    const helperTextId = `${selectId}-helper`

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <Label
            htmlFor={id || selectId}
            className={cn("text-sm font-medium text-foreground", error && "text-destructive", labelClassName)}
          >
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </Label>
        )}

        <Select value={value} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger
            ref={ref}
            id={id || selectId}
            className={cn(
              "w-full transition-colors",
              error && "border-destructive focus:border-destructive focus:ring-destructive/20",
              selectClassName,
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? errorId : helperText ? helperTextId : undefined}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {error && (
          <p id={errorId} className="text-sm font-medium text-destructive animate-fade-in" role="alert">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={helperTextId} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    )
  },
)

FormSelect.displayName = "FormSelect"
