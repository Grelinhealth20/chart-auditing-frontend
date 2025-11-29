"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export interface FormInputProps {
  label?: string
  error?: string
  helperText?: string
  required?: boolean
  containerClassName?: string
  labelClassName?: string
  wrapperClassName?: string
  type?: 0 | 1 | 2 // 0 = textfield, 1 = datepicker, 2 = textarea
  value?: string
  onChange?: (value: string) => void
  rows?: number // For textarea
  placeholder?: string
  className?: string
  id?: string
  disabled?: boolean
}

const FormInput = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, FormInputProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      id,
      className,
      containerClassName,
      labelClassName,
      wrapperClassName,
      type = 0, // Default to textfield
      value = "",
      onChange,
      rows = 4,
      placeholder,
      disabled,
    },
    ref,
  ) => {
    const inputId = React.useId()
    const hasError = !!error

    const [date, setDate] = React.useState<Date | undefined>(value ? new Date(value) : undefined)
    const [open, setOpen] = React.useState(false)

    const handleDateSelect = (selectedDate: Date | undefined) => {
      setDate(selectedDate)
      if (selectedDate && onChange) {
        onChange(format(selectedDate, "yyyy-MM-dd"))
      }
      setOpen(false)
    }

    if (type === 2) {
      return (
        <div className={cn("space-y-2", containerClassName)}>
          {label && (
            <Label
              htmlFor={id || inputId}
              className={cn("text-sm font-medium text-foreground/90", hasError && "text-destructive", labelClassName)}
            >
              {label}
              {required && <span className="ml-1 text-destructive">*</span>}
            </Label>
          )}

          <div className={cn("relative", wrapperClassName)}>
            <Textarea
              ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
              id={id || inputId}
              aria-invalid={hasError}
              aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
              className={cn(
                "border-primary/20 focus:border-primary transition-colors",
                hasError && "border-destructive focus:border-destructive",
                className,
              )}
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              rows={rows}
              placeholder={placeholder}
              disabled={disabled}
            />
          </div>

          {error && (
            <p id={`${inputId}-error`} className="text-sm font-medium text-destructive animate-fade-in">
              {error}
            </p>
          )}

          {helperText && !error && (
            <p id={`${inputId}-helper`} className="text-sm text-muted-foreground/75">
              {helperText}
            </p>
          )}
        </div>
      )
    }

    if (type === 1) {
      return (
        <div className={cn("space-y-2", containerClassName)}>
          {label && (
            <Label
              htmlFor={id || inputId}
              className={cn("text-sm font-medium text-foreground/90", hasError && "text-destructive", labelClassName)}
            >
              {label}
              {required && <span className="ml-1 text-destructive">*</span>}
            </Label>
          )}

          <div className={cn("relative", wrapperClassName)}>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-primary/20 hover:border-primary transition-colors",
                    !date && "text-muted-foreground",
                    hasError && "border-destructive hover:border-destructive",
                    className,
                  )}
                  aria-invalid={hasError}
                  aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
                  disabled={disabled}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                  {date ? format(date, "PPP") : <span>{placeholder || "Pick a date"}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          {error && (
            <p id={`${inputId}-error`} className="text-sm font-medium text-destructive animate-fade-in">
              {error}
            </p>
          )}

          {helperText && !error && (
            <p id={`${inputId}-helper`} className="text-sm text-muted-foreground/75">
              {helperText}
            </p>
          )}
        </div>
      )
    }

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <Label
            htmlFor={id || inputId}
            className={cn("text-sm font-medium text-foreground/90", hasError && "text-destructive", labelClassName)}
          >
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </Label>
        )}

        <div className={cn("relative", wrapperClassName)}>
          <Input
            ref={ref as React.ForwardedRef<HTMLInputElement>}
            id={id || inputId}
            aria-invalid={hasError}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={cn(
              "border-primary/20 focus:border-primary transition-colors",
              hasError && "border-destructive focus:border-destructive",
              className,
            )}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>

        {error && (
          <p id={`${inputId}-error`} className="text-sm font-medium text-destructive animate-fade-in">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-sm text-muted-foreground/75">
            {helperText}
          </p>
        )}
      </div>
    )
  },
)

FormInput.displayName = "FormInput"

export { FormInput }
