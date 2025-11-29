"use client"

import { FormButton } from "@/components/Input/form-button"
import { StructuredInfoCard } from "@/components/Input/structured-info-card"
import { FormBadge } from "@/components/Input/form-badge"
import { FormInput } from "@/components/Input/form-input"
import { FormNumberInput } from "@/components/Input/form-number-input"
import { FormSelect } from "@/components/Input/form-select"
import { WoundSparkline } from "@/components/Input/wound-sparkline"
import { ArrowRight, CheckCircle2, AlertCircle, TrendingDown } from "lucide-react"
import { ChartHeader } from "@/components/chart-header"
import { useState } from "react"

export default function StructuredNotePage() {

  const [patientName, setPatientName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [mrn, setMrn] = useState("")
  const [encounterDate, setEncounterDate] = useState("")
  const [woundLength, setWoundLength] = useState<number | null>(null)
  const [woundWidth, setWoundWidth] = useState<number | null>(null)

  const [procedure, setProcedure] = useState<string | undefined>(undefined)
  const [procedureLocation, setProcedureLocation] = useState("")

  const [initialSize, setInitialSize] = useState<number | null>(null)
  const [currentSize, setCurrentSize] = useState<number | null>(null)

  const woundData = [
    { label: "Week 1", size: initialSize || 0 },
    { label: "Week 2", size: initialSize ? initialSize * 0.88 : 0 },
    { label: "Week 3", size: initialSize ? initialSize * 0.68 : 0 },
    { label: "Week 4", size: currentSize || 0 },
  ]

  const reductionPercentage =
    initialSize && currentSize ? Math.round(((initialSize - currentSize) / initialSize) * 100) : 0

  return (
    <div className="min-h-screen bg-background">
      <ChartHeader />

      <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-2 flex items-center justify-between text-xs sm:text-sm">
            <span className="font-medium text-foreground">Progress</span>
            <span className="text-muted-foreground">Step 2 of 9</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: "22%" }} />
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Structured Note Preview</h2>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                First draft — Review what the system understood
              </p>
            </div>
            <FormBadge status="version" className="w-fit text-xs sm:text-sm">
              Version 1
            </FormBadge>
          </div>
        </div>

        {/* Patient Information Card */}
        <StructuredInfoCard
          title="Patient Information"
          icon={<CheckCircle2></CheckCircle2>}
          className="mb-6 animate-slide-in-up border-primary/20"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              type={0}
              label="Patient Name"
              id="patientName"
              placeholder="Enter patient name"
              value={patientName}
              onChange={setPatientName}
            />
            <FormInput
              type={1}
              label="Date of Birth"
              id="dateOfBirth"
              placeholder="MM/DD/YYYY"
              value={dateOfBirth}
              onChange={setDateOfBirth}
            />
            <FormInput type={0} label="MRN" id="mrn" placeholder="Enter MRN" value={mrn} onChange={setMrn} />
            <FormInput
              type={1}
              label="Encounter Date"
              id="encounterDate"
              value={encounterDate}
              onChange={setEncounterDate}
            />
          </div>
        </StructuredInfoCard>

        {/* Detected Procedure Card */}
        <StructuredInfoCard
          title="Detected Procedure"
          description="Extracted from clinical note"
          icon={<CheckCircle2></CheckCircle2>}
          className="mb-6 animate-slide-in-up border-primary/20"
          style={{ animationDelay: "100ms" }}
        >
          <div className="space-y-4">
            <FormSelect
              label="Procedure Type"
              value={procedure}
              onChange={setProcedure}
              placeholder="Select procedure"
              options={[
                { value: "cellular-graft", label: "Cellular Skin Graft Application" },
                { value: "debridement", label: "Wound Debridement" },
                { value: "compression", label: "Compression Therapy" },
                { value: "negative-pressure", label: "Negative Pressure Wound Therapy" },
              ]}
            />
            <FormInput
              type={0}
              label="Procedure Location"
              id="procedureLocation"
              placeholder="Enter procedure location (e.g., Right Foot, Plantar 1st Metatarsal)"
              value={procedureLocation}
              onChange={setProcedureLocation}
            />
            {procedure && (
              <FormBadge status="success" showIcon>
                Procedure Identified
              </FormBadge>
            )}
          </div>
        </StructuredInfoCard>

        {/* Wound Trends Card */}
        <StructuredInfoCard
          title="Wound Trends"
          description="4-week healing progression"
          icon={<TrendingDown></TrendingDown>}
          className="mb-6 animate-slide-in-up border-primary/20"
          style={{ animationDelay: "200ms" }}
        >
          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <FormNumberInput
              label="Initial Wound Size (4 weeks ago)"
              value={initialSize ?? ""}
              onChange={setInitialSize}
              unit="cm²"
              unitPosition="right"
              placeholder="0.0"
              step={0.1}
              min={0}
            />
            <FormNumberInput
              label="Current Wound Size"
              value={currentSize ?? ""}
              onChange={setCurrentSize}
              unit="cm²"
              unitPosition="right"
              placeholder="0.0"
              step={0.1}
              min={0}
            />
          </div>

          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <FormNumberInput
              label="Current Wound Length"
              value={woundLength ?? ""}
              onChange={setWoundLength}
              unit="cm"
              unitPosition="right"
              placeholder="0.0"
              step={0.1}
              min={0}
            />
            <FormNumberInput
              label="Current Wound Width"
              value={woundWidth ?? ""}
              onChange={setWoundWidth}
              unit="cm"
              unitPosition="right"
              placeholder="0.0"
              step={0.1}
              min={0}
            />
          </div>

          {reductionPercentage > 0 && (
            <div className="mb-4">
              <FormBadge status="success">{reductionPercentage}% Reduction</FormBadge>
            </div>
          )}

          <WoundSparkline data={woundData} height={200} />

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Initial Size (4 weeks ago)</p>
              <p className="text-lg font-bold text-foreground">{initialSize || "—"} cm²</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Current Size</p>
              <p className="text-lg font-bold text-foreground">{currentSize || "—"} cm²</p>
            </div>
          </div>
        </StructuredInfoCard>

        {/* Missing Information Card */}
        <StructuredInfoCard
          title="Missing Information"
          description="Required fields need attention"
          icon={<AlertCircle></AlertCircle>}
          variant="destructive"
          className="mb-6 animate-slide-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-3">
              <span className="text-sm font-medium text-foreground">Vascular Status</span>
              <FormBadge status="missing" showIcon>
                Missing
              </FormBadge>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-3">
              <span className="text-sm font-medium text-foreground">Infection Status</span>
              <FormBadge status="missing" showIcon>
                Missing
              </FormBadge>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-3">
              <span className="text-sm font-medium text-foreground">Offloading Method</span>
              <FormBadge status="missing" showIcon>
                Missing
              </FormBadge>
            </div>
          </div>
        </StructuredInfoCard>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <FormButton variant="outline" className="w-full sm:w-auto bg-transparent" href="/note-capture"
            leftIcon = {<ArrowRight className="h-4 w-4 rotate-180" />}
          >
            ← Back
          </FormButton>
          <FormButton
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto text-sm sm:text-base"
            href="/lcd-compliance"
            rightIcon={<ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />}
          >
            Continue to LCD Check
          </FormButton>
        </div>
      </div>
    </div>
  )
}
