import * as React from "react"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export interface FormButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  loading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  href?: string
  fullWidth?: boolean
}

export const FormButton = React.forwardRef<HTMLButtonElement, FormButtonProps>(
  (
    {
      children,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      href,
      fullWidth = false,
      disabled,
      className,
      variant,
      size,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    const buttonContent = (
      <>
        {loading && <Loader2 className="size-4 animate-spin" />}
        {!loading && leftIcon && leftIcon}
        <span>{loading && loadingText ? loadingText : children}</span>
        {!loading && rightIcon && rightIcon}
      </>
    )

    const buttonClasses = cn(fullWidth && "w-full", className)

    if (href && !isDisabled) {
      return (
        <Link href={href} className={cn(buttonVariants({ variant, size, className: buttonClasses }))}>
          {buttonContent}
        </Link>
      )
    }

    return (
      <Button ref={ref} disabled={isDisabled} variant={variant} size={size} className={buttonClasses} {...props}>
        {buttonContent}
      </Button>
    )
  },
)

FormButton.displayName = "FormButton"
