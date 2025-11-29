import Link from "next/link"
import { FormButton } from "@/components/Input/form-button"
import { Calendar } from "lucide-react"

export function ChartHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-[#1B2B4D]">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16">
        <Link href="/" className="group flex items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 border-[#CF9455] transition-transform duration-300 group-hover:scale-110">
            <span className="text-lg sm:text-xl font-bold text-[#CF9455]">G</span>
          </div>
          <div>
            <h1 className="text-sm sm:text-base md:text-lg font-bold text-white transition-colors duration-300 group-hover:text-[#CF9455]">
              Grelin Health
            </h1>
            <p className="text-[10px] sm:text-xs text-[#CF9455]">HEALTHCARE INNOVATION</p>
          </div>
        </Link>

        <FormButton
          className="bg-[#CF9455] text-white hover:bg-[#B8814A] text-xs sm:text-sm px-3 sm:px-4"
          leftIcon={<Calendar className="h-3 w-3 sm:h-4 sm:w-4" />}
        >
          <span className="hidden sm:inline">New Clinical Note</span>
          <span className="sm:hidden">New Note</span>
        </FormButton>
      </div>
    </header>
  )
}
