"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export interface SearchSelectOption {
  value: string
  label: string
}

export interface FormSearchSelectProps {
  label?: string
  required?: boolean
  error?: string
  helperText?: string
  placeholder?: string
  options: SearchSelectOption[]
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
  labelClassName?: string
  errorClassName?: string
}

export const FormSearchSelect = React.forwardRef<HTMLButtonElement, FormSearchSelectProps>(
  (
    {
      label,
      required,
      error,
      helperText,
      placeholder = "Select option...",
      options,
      value,
      onChange,
      disabled,
      className,
      labelClassName,
      errorClassName,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false)
    const id = React.useId()

    const selectedOption = options.find((option) => option.value === value)

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <label htmlFor={id} className={cn("text-sm font-medium text-foreground", labelClassName)}>
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </label>
        )}

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              id={id}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
              disabled={disabled}
              className={cn(
                "w-full justify-between",
                !value && "text-muted-foreground",
                error && "border-destructive focus-visible:ring-destructive",
              )}
            >
              {selectedOption ? selectedOption.label : placeholder}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search..." className="h-9" />
              <CommandList>
                <CommandEmpty>No option found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={(currentValue) => {
                        onChange?.(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      {option.label}
                      <Check className={cn("ml-auto h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

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

FormSearchSelect.displayName = "FormSearchSelect"
