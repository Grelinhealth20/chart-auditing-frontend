"use client"

import { FormButton } from "@/components/Input/form-button"
import { StructuredInfoCard } from "@/components/Input/structured-info-card"
import { FormBadge } from "@/components/Input/form-badge"
import {
  FileText,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  FileCheck,
  Calculator,
  Send,
} from "lucide-react"
import { ChartHeader } from "@/components/chart-header"

export default function HomePage() {
  const steps = [
    {
      number: 1,
      title: "Raw Note Capture",
      description: "Write or dictate clinical encounter",
      icon: <FileText className="h-5 w-5 sm:h-6 sm:w-6" />,
      href: "/note-capture",
      status: "start",
    },
    {
      number: 2,
      title: "Structured Preview",
      description: "System-generated first draft",
      icon: <FileCheck className="h-5 w-5 sm:h-6 sm:w-6" />,
      href: "/structured-note",
      status: "pending",
    },
    {
      number: 3,
      title: "LCD Compliance",
      description: "Coverage rules check",
      icon: <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />,
      href: "/lcd-compliance",
      status: "pending",
    },
    {
      number: 4,
      title: "Autofill & Confirm",
      description: "Fix missing information",
      icon: <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />,
      href: "/autofill-confirm",
      status: "pending",
    },
    {
      number: 5,
      title: "CMS Validation",
      description: "Billing requirements check",
      icon: <FileCheck className="h-5 w-5 sm:h-6 sm:w-6" />,
      href: "/cms-validation",
      status: "pending",
    },
    {
      number: 6,
      title: "WISER Audit Risk",
      description: "Audit risk simulation",
      icon: <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6" />,
      href: "/wiser-audit",
      status: "pending",
    },
    {
      number: 7,
      title: "FDA Language",
      description: "Clinical wording compliance",
      icon: <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />,
      href: "/fda-language",
      status: "pending",
    },
    {
      number: 8,
      title: "JW Wastage",
      description: "Product usage calculation",
      icon: <Calculator className="h-5 w-5 sm:h-6 sm:w-6" />,
      href: "/jw-wastage",
      status: "pending",
    },
    {
      number: 9,
      title: "Final Note",
      description: "Export & send to EMR",
      icon: <Send className="h-5 w-5 sm:h-6 sm:w-6" />,
      href: "/final-note",
      status: "pending",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <ChartHeader />

      {/* Hero Section */}
      <section className="container px-4 py-8 sm:py-12 mx-auto max-w-7xl">
        <div className="mx-auto max-w-5xl text-center">
          <FormBadge status="info" className="mb-4 hover:bg-primary/20 text-xs sm:text-sm">
            Automated Compliance System
          </FormBadge>
          <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground/90">
            Transform Notes into <span className="text-primary">Audit-Ready Records</span>
          </h2>
          <p className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg text-muted-foreground/80 px-2">
            Automated end-to-end clinical documentation compliance system that converts incomplete provider notes into
            fully compliant, CMS-safe, FDA-safe, and LCD L36377-compliant medical records.
          </p>
          <FormButton
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm sm:text-base"
            href="/note-capture"
            rightIcon={<FileText className="h-4 w-4 sm:h-5 sm:w-5" />}
          >
            <span className="hidden sm:inline">Start New Clinical Note</span>
            <span className="sm:hidden">Start Note</span>
          </FormButton>
        </div>
      </section>

      {/* Workflow Steps */}
      <section className="container px-4 pb-12 sm:pb-16 mx-auto max-w-7xl">
        <div className="mx-auto max-w-5xl">
          <h3 className="mb-6 sm:mb-8 text-center text-xl sm:text-2xl font-bold text-foreground/90">
            9-Step Compliance Workflow
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {steps.map((step, index) => {
              return (
                <StructuredInfoCard
                  key={step.number}
                  noHeader
                  noPadding
                  className="group transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-lg hover:shadow-primary/10 hover:bg-primary/5"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    opacity: 0,
                    animation: "slideInUp 0.5s ease-out forwards",
                  }}
                >
                  <div className="pb-3 p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 sm:gap-4 flex-1">
                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg border-2 border-primary bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          {step.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <FormBadge status="step" variant="outline" className="text-xs">
                              Step {step.number}
                            </FormBadge>
                            <h3 className="text-sm sm:text-base md:text-lg text-foreground/85 font-semibold">
                              {step.title}
                            </h3>
                          </div>
                          <p className="mt-1 text-xs sm:text-sm text-muted-foreground/75">{step.description}</p>
                        </div>
                      </div>
                      <FormButton
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/70 hover:bg-transparent shrink-0 text-xs sm:text-sm"
                        href={step.href}
                      >
                        <span className="hidden sm:inline">View</span> →
                      </FormButton>
                    </div>
                  </div>
                </StructuredInfoCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-t bg-muted/30 py-12 sm:py-16">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl">
            <h3 className="mb-6 sm:mb-8 text-center text-xl sm:text-2xl font-bold text-foreground/90">
              Compliance Features
            </h3>
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <StructuredInfoCard
                title="LCD L36377 Compliant"
                description="Enforces hard LCD rules before note signing"
                icon={<ShieldCheck className="h-5 w-5 text-primary" />}
                titleClassName="text-base sm:text-lg"
                descriptionClassName="text-xs sm:text-sm"
              />
              <StructuredInfoCard
                title="WISER Protection"
                description="Simulates and pre-blocks federal audit triggers"
                icon={<AlertTriangle className="h-5 w-5 text-primary" />}
                titleClassName="text-base sm:text-lg"
                descriptionClassName="text-xs sm:text-sm"
              />
              <StructuredInfoCard
                title="JW Wastage"
                description="Accurate calculations for fixed-size grafts (48 cm²)"
                icon={<TrendingUp className="h-5 w-5 text-primary" />}
                titleClassName="text-base sm:text-lg"
                descriptionClassName="text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
