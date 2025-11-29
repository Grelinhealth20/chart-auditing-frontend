"use client"

import { useState } from "react"
import { FormButton } from "@/components/Input/form-button"
import { StructuredInfoCard } from "@/components/Input/structured-info-card"
import { FormBadge } from "@/components/Input/form-badge"
import { FormInput } from "@/components/Input/form-input"
import { ArrowRight, Check, X, ChevronDown, ChevronUp, Sparkles, AlertTriangle, Info } from "lucide-react"
import { ChartHeader } from "@/components/chart-header"

type Severity = "must-fix" | "recommended" | "info"
type RuleStatus = "pass" | "fail" | "pending"

interface ComplianceRule {
  id: number
  title: string
  status: RuleStatus
  severity: Severity
  explanation: string
  evidence: string
  expanded: boolean
}

export default function LCDCompliancePage() {
  const [rules, setRules] = useState<ComplianceRule[]>([
    {
      id: 1,
      title: "4-week run-in",
      status: "pending",
      severity: "must-fix",
      explanation:
        "Standard wound care must be attempted for at least 4 weeks before applying cellular grafts. This demonstrates that conventional treatments were insufficient and justifies the use of advanced therapies.",
      evidence: "",
      expanded: false,
    },
    {
      id: 2,
      title: "<50% wound reduction",
      status: "pending",
      severity: "must-fix",
      explanation:
        "The wound must show less than 50% healing after the run-in period to qualify for graft coverage. This proves the wound is non-healing and requires advanced intervention.",
      evidence: "",
      expanded: false,
    },
    {
      id: 3,
      title: "Vascular status documented",
      status: "pending",
      severity: "must-fix",
      explanation:
        "Adequate blood flow must be confirmed (ABI ≥0.6 or TBI >30). Poor vascular status can prevent wound healing regardless of treatment applied.",
      evidence: "",
      expanded: false,
    },
    {
      id: 4,
      title: "Infection status documented",
      status: "pending",
      severity: "must-fix",
      explanation:
        "Active infection must be ruled out or treated before graft application. Applying grafts to infected wounds leads to treatment failure and potential complications.",
      evidence: "",
      expanded: false,
    },
    {
      id: 5,
      title: "Offloading documented",
      status: "pending",
      severity: "must-fix",
      explanation:
        "Specific offloading modality must be documented (TCC, CAM boot, DH shoe, wheelchair, etc.). Pressure relief is essential for diabetic foot ulcer healing.",
      evidence: "",
      expanded: false,
    },
    {
      id: 6,
      title: "Wound etiology documented",
      status: "pending",
      severity: "recommended",
      explanation:
        "Documenting the cause of the wound helps justify treatment selection and supports medical necessity for coverage.",
      evidence: "",
      expanded: false,
    },
    {
      id: 7,
      title: "Prior treatments listed",
      status: "pending",
      severity: "info",
      explanation:
        "Listing previous treatments attempted provides context and demonstrates the progressive approach to wound care.",
      evidence: "",
      expanded: false,
    },
  ])

  const toggleExpand = (id: number) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, expanded: !rule.expanded } : rule)))
  }

  const updateRuleStatus = (id: number, status: RuleStatus) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, status } : rule)))
  }

  const updateRuleEvidence = (id: number, evidence: string) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, evidence } : rule)))
  }

  const autofillMissing = () => {
    setRules(
      rules.map((rule) => {
        if (rule.status === "pending") {
          return {
            ...rule,
            status: "pass" as RuleStatus,
            evidence: `Auto-filled: ${rule.title} requirement has been verified from patient records.`,
          }
        }
        return rule
      }),
    )
  }

  const getSeverityBadge = (severity: Severity) => {
    switch (severity) {
      case "must-fix":
        return (
          <FormBadge status="required" className="bg-destructive/10 text-destructive border-destructive/20">
            Must Fix
          </FormBadge>
        )
      case "recommended":
        return (
          <FormBadge status="warning" className="bg-orange-500/10 text-orange-600 border-orange-500/20">
            Recommended
          </FormBadge>
        )
      case "info":
        return (
          <FormBadge status="info" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
            Info Only
          </FormBadge>
        )
    }
  }

  const getStatusIcon = (status: RuleStatus) => {
    switch (status) {
      case "pass":
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success text-white">
            <Check className="h-4 w-4" />
          </div>
        )
      case "fail":
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-white">
            <X className="h-4 w-4" />
          </div>
        )
      case "pending":
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <X className="h-4 w-4" />
          </div>
        )
    }
  }

  const passCount = rules.filter((r) => r.status === "pass").length
  const failCount = rules.filter((r) => r.status === "fail").length
  const pendingMustFix = rules.filter((r) => r.status !== "pass" && r.severity === "must-fix").length
  const allPassed = rules.every((r) => r.status === "pass")

  return (
    <div className="min-h-screen bg-background">
      <ChartHeader />

      <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-2 flex items-center justify-between text-xs sm:text-sm">
            <span className="font-medium text-foreground">Progress</span>
            <span className="text-muted-foreground">Step 3 of 9</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: "33%" }} />
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">LCD L36377 Compliance Check</h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            See exactly which coverage requirements are satisfied and which need attention
          </p>
        </div>

        {/* All Passed Banner */}
        {allPassed && (
          <StructuredInfoCard noHeader variant="success" className="mb-4 sm:mb-6 border-success/30 bg-success/5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success text-white">
                <Check className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-success">All LCD Requirements Satisfied</p>
                <p className="text-sm text-muted-foreground">
                  Documentation meets all coverage requirements for LCD L36377
                </p>
              </div>
            </div>
          </StructuredInfoCard>
        )}

        {/* Status Summary */}
        <StructuredInfoCard noHeader className="mb-4 sm:mb-6 animate-slide-in-up border-primary/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success text-white">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{passCount}</p>
                  <p className="text-xs text-muted-foreground">Passed</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-white">
                  <X className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{pendingMustFix}</p>
                  <p className="text-xs text-muted-foreground">Need Attention</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{rules.length}</p>
                  <p className="text-xs text-muted-foreground">Total Rules</p>
                </div>
              </div>
            </div>
            <FormButton
              variant="outline"
              className="whitespace-nowrap"
              onClick={autofillMissing}
              leftIcon={<Sparkles className="h-4 w-4" />}
            >
              Autofill Missing Info
            </FormButton>
          </div>
        </StructuredInfoCard>

        {/* Severity Legend */}
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
          <span className="text-muted-foreground">Severity:</span>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-destructive" />
            <span>Must Fix</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-orange-500" />
            <span>Recommended</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span>Info Only</span>
          </div>
        </div>

        {/* Checklist Card */}
        <StructuredInfoCard title="Compliance Checklist" icon={<AlertTriangle></AlertTriangle>} className="mb-4 sm:mb-6">
          <div className="space-y-2">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className={`rounded-lg border transition-all ${
                  rule.status === "pass"
                    ? "border-success/30 bg-success/5"
                    : rule.severity === "must-fix"
                      ? "border-destructive/30 bg-destructive/5"
                      : rule.severity === "recommended"
                        ? "border-orange-500/30 bg-orange-500/5"
                        : "border-blue-500/30 bg-blue-500/5"
                }`}
              >
                {/* Rule Header */}
                <div
                  className="flex items-center justify-between p-3 sm:p-4 cursor-pointer"
                  onClick={() => toggleExpand(rule.id)}
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(rule.status)}
                    <span className={`font-medium ${rule.status === "pass" ? "text-success" : "text-foreground"}`}>
                      {rule.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getSeverityBadge(rule.severity)}
                    {rule.expanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Expandable Explanation */}
                {rule.expanded && (
                  <div className="border-t px-3 sm:px-4 py-3 sm:py-4 space-y-3">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Why this matters: </span>
                        {rule.explanation}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1">
                        <FormInput
                          label="Evidence/Notes"
                          placeholder="Add supporting documentation..."
                          value={rule.evidence}
                          onChange={(value) => updateRuleEvidence(rule.id, value)}
                        />
                      </div>
                      <div className="flex items-end gap-2">
                        <FormButton
                          size="sm"
                          variant={rule.status === "pass" ? "default" : "outline"}
                          onClick={() => updateRuleStatus(rule.id, "pass")}
                          className={rule.status === "pass" ? "bg-success hover:bg-success/90" : ""}
                          leftIcon={<Check className="h-4 w-4" />}
                        >
                          Pass
                        </FormButton>
                        <FormButton
                          size="sm"
                          variant={rule.status === "fail" ? "destructive" : "outline"}
                          onClick={() => updateRuleStatus(rule.id, "fail")}
                          leftIcon={<X className="h-4 w-4" />}
                        >
                          Fail
                        </FormButton>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </StructuredInfoCard>

        {/* Warning Banner */}
        {pendingMustFix > 0 && (
          <StructuredInfoCard noHeader variant="destructive" className="mb-6 border-destructive/30 bg-destructive/5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-destructive">Action Required</p>
                <p className="text-sm text-muted-foreground">
                  {pendingMustFix} required rule{pendingMustFix > 1 ? "s" : ""} must be satisfied before proceeding.
                  Click on each item to expand and add documentation, or use "Autofill Missing Info" to auto-populate
                  from records.
                </p>
              </div>
            </div>
          </StructuredInfoCard>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <FormButton
            variant="outline"
            className="w-full sm:w-auto bg-transparent whitespace-nowrap"
            href="/structured-note"
            leftIcon={<ArrowRight className="h-4 w-4 rotate-180" />}
          >
            Back
          </FormButton>
          <FormButton
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto text-sm whitespace-nowrap"
            href="/autofill-confirm"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Next: Autofill Confirm
          </FormButton>
        </div>
      </div>
    </div>
  )
}
