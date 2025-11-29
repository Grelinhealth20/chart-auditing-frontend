"use client"

import { FormButton } from "@/components/Input/form-button"
import { StructuredInfoCard } from "@/components/Input/structured-info-card"
import { FormBadge } from "@/components/Input/form-badge"
import { FormSearchSelect } from "@/components/Input/form-search-select"
import { ArrowRight, Sparkles, CheckCircle2, Clock } from "lucide-react"
import { useState } from "react"
import { ChartHeader } from "@/components/chart-header"
import { AutofillBanner } from "@/components/Input/autofill-banner"

export default function AutofillConfirmPage() {
  const [offloadingMethod, setOffloadingMethod] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <ChartHeader />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">Progress</span>
            <span className="text-muted-foreground">Step 4 of 9</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: "44%" }} />
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground">Autofill & Provider Confirmation</h2>
          <p className="mt-1 text-muted-foreground">Review autofilled data and complete required fields</p>
        </div>

        {/* Version Tracking */}
        <StructuredInfoCard noHeader className="mb-6 animate-slide-in-up border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Version History</p>
                <p className="text-sm text-muted-foreground">Track note changes throughout workflow</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FormBadge status="version" variant="outline">
                v1 → v2
              </FormBadge>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span className="text-muted-foreground">ABI value added from recent exam</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span className="text-muted-foreground">Infection status updated</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-warning">
              <span className="h-4 w-4 rounded-full border-2 border-warning" />
              <span>Offloading method still needed</span>
            </div>
          </div>
        </StructuredInfoCard>

        {/* Autofilled Information */}
        <div className="mb-6 space-y-4">
          <AutofillBanner>
            <div className="flex items-center justify-between">
              <div>
                <strong>Autofill Successful!</strong> The system retrieved vascular status and infection data from your
                patient's medical history.
              </div>
            </div>
          </AutofillBanner>

          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Sparkles className="h-5 w-5 text-success" />
            Autofilled Information
          </h3>

          <StructuredInfoCard
            title="Vascular Status"
            description="Retrieved from patient history"
            badge={
              <FormBadge status="autofilled" showIcon>
                Autofilled
              </FormBadge>
            }
            className="autofill-indicator animate-slide-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="rounded-lg border border-success/20 bg-success/5 p-4">
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-foreground">Ankle-Brachial Index (ABI)</p>
                  <p className="text-lg font-bold text-success">0.72</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Exam Date: 12/10/2024</p>
                  <p>Result: Adequate perfusion (≥0.6 required)</p>
                  <p className="mt-2 text-xs">Source: Vascular lab study performed by Dr. Martinez</p>
                </div>
              </div>
            </div>
          </StructuredInfoCard>

          <StructuredInfoCard
            title="Infection Status"
            description="Based on clinical observations"
            badge={
              <FormBadge status="autofilled" showIcon>
                Autofilled
              </FormBadge>
            }
            className="autofill-indicator animate-slide-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium text-foreground">Status</p>
                <p className="text-lg font-bold text-success">No Active Infection</p>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>• No purulent drainage noted</p>
                <p>• Minimal erythema confined to wound edges</p>
                <p>• No systemic signs of infection</p>
                <p>• Temperature within normal limits</p>
              </div>
            </div>
          </StructuredInfoCard>
        </div>

        {/* Provider Required Input */}
        <div className="mb-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Provider Required Inputs</h3>

          <StructuredInfoCard
            title="Offloading Method"
            description="Select the offloading modality used"
            badge={
              <FormBadge status="required" showIcon>
                Required
              </FormBadge>
            }
            variant="warning"
            className="animate-slide-in-up"
            style={{ animationDelay: "300ms" }}
          >
            <div className="space-y-2">
              <FormSearchSelect
                label="Offloading Modality"
                required
                value={offloadingMethod}
                onChange={setOffloadingMethod}
                placeholder="Search offloading methods..."
                options={[
                  { value: "tcc", label: "Total Contact Cast (TCC)" },
                  { value: "cam", label: "CAM Walker Boot" },
                  { value: "dh", label: "DH Offloading Shoe" },
                  { value: "custom", label: "Custom Orthotic Boot" },
                  { value: "felted", label: "Felted Foam Dressing" },
                  { value: "crutches", label: "Crutches/Walker" },
                ]}
                error={!offloadingMethod ? "This field is required to proceed" : undefined}
              />
            </div>
          </StructuredInfoCard>
        </div>

        {/* Validation Summary */}
        <StructuredInfoCard noHeader variant="primary" className="mb-6">
          <div className="flex items-start gap-3">
            {offloadingMethod ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-success" />
                <div>
                  <p className="font-medium text-foreground">Ready to Continue</p>
                  <p className="text-sm text-muted-foreground">
                    All required fields are complete. You can proceed to CMS validation.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="h-5 w-5 animate-pulse rounded-full border-2 border-warning" />
                <div>
                  <p className="font-medium text-foreground">1 Field Remaining</p>
                  <p className="text-sm text-muted-foreground">Please select an offloading method to continue.</p>
                </div>
              </>
            )}
          </div>
        </StructuredInfoCard>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <FormButton variant="outline" href="/lcd-compliance">
            ← Back
          </FormButton>
          <FormButton
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={!offloadingMethod}
            href="/cms-validation"
            rightIcon={<ArrowRight className="h-5 w-5" />}
          >
            Continue to CMS Validation
          </FormButton>
        </div>
      </div>
    </div>
  )
}
