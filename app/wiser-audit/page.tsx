"use client"

import { useState } from "react"
import { FormButton } from "@/components/Input/form-button"
import { FormBadge } from "@/components/Input/form-badge"
import { FormInput } from "@/components/Input/form-input"
import { FormNumberInput } from "@/components/Input/form-number-input"
import { FormSelect } from "@/components/Input/form-select"
import { StructuredInfoCard } from "@/components/Input/structured-info-card"
import { RiskGauge } from "@/components/Input/risk-gauge"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Plus,
  Trash2,
  Gauge,
  FileText,
  Syringe,
  MapPin,
  TrendingUp,
} from "lucide-react"
import { ChartHeader } from "@/components/chart-header"

export default function WISERAuditPage() {
  const [riskScore, setRiskScore] = useState<number | undefined>(undefined)

  const [graftFrequency, setGraftFrequency] = useState<string>("")
  const [graftFrequencyCount, setGraftFrequencyCount] = useState<number | undefined>(undefined)
  const [documentationSimilarity, setDocumentationSimilarity] = useState<number | undefined>(undefined)
  const [clonedAlert, setClonedAlert] = useState<boolean>(false)
  const [jwWastagePattern, setJwWastagePattern] = useState<string>("")
  const [jwWastageTrend, setJwWastageTrend] = useState<string | undefined>(undefined)

  const [selectedState, setSelectedState] = useState<string | undefined>(undefined)
  const [stateRules, setStateRules] = useState<string[]>([])

  const isGraftComplete = graftFrequency !== "" && graftFrequencyCount !== undefined
  const isDocSimilarityComplete = documentationSimilarity !== undefined
  const isJwComplete = jwWastagePattern !== "" && jwWastageTrend !== undefined
  const allChecksComplete = isGraftComplete && isDocSimilarityComplete && isJwComplete

  const addStateRule = () => {
    setStateRules([...stateRules, ""])
  }

  const removeStateRule = (index: number) => {
    setStateRules(stateRules.filter((_, i) => i !== index))
  }

  const updateStateRule = (index: number, value: string) => {
    const updated = [...stateRules]
    updated[index] = value
    setStateRules(updated)
  }

  const stateOptions = [
    { value: "TX", label: "Texas" },
    { value: "CA", label: "California" },
    { value: "FL", label: "Florida" },
    { value: "NY", label: "New York" },
    { value: "PA", label: "Pennsylvania" },
  ]

  const wastageOptions = [
    { value: "increasing", label: "Increasing" },
    { value: "stable", label: "Stable" },
    { value: "decreasing", label: "Decreasing" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <ChartHeader />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">WISER Audit Risk Assessment</h1>
          <p className="text-muted-foreground">
            Give providers a clear sense of audit risk to encourage compliant documentation.
          </p>
        </div>

        {/* Risk Gauge Section */}
        <StructuredInfoCard
          title={
            <div className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-primary" /> Risk Gauge
            </div>
          }
          description="Enter audit risk score (0-100 scale, normalized to 0-1)"
          className="mb-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Risk Score Input */}
            <div>
              <FormNumberInput
                label="Audit Risk Score"
                unit="/100"
                placeholder="0"
                value={riskScore}
                onChange={setRiskScore}
                min={0}
                max={100}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Normalized: {riskScore !== undefined ? (riskScore / 100).toFixed(2) : "0.00"} (0-1 scale)
              </p>
            </div>

            {riskScore !== undefined && <RiskGauge score={riskScore} />}
          </div>
        </StructuredInfoCard>

        {/* Outlier Checks Section */}
        <StructuredInfoCard
          title={
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" /> Outlier Checks
            </div>
          }
          description="Document patterns that may trigger federal audit attention"
          className="mb-6"
        >
          <div className="space-y-6">
            {/* Frequency of Graft Use */}
            <div
              className={`p-4 rounded-lg border ${isGraftComplete ? "border-green-200 bg-green-50" : "border-border"}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Syringe className="h-5 w-5 text-primary" />
                <h4 className="font-medium text-foreground">Frequency of Graft Use</h4>
                {isGraftComplete ? (
                  <FormBadge status="success" variant="outline">
                    Complete
                  </FormBadge>
                ) : (
                  <FormBadge status="info" variant="outline">
                    Pending
                  </FormBadge>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Graft Type"
                  placeholder="Enter graft type used..."
                  value={graftFrequency}
                  onChange={(value) => setGraftFrequency(value)}
                />
                <FormNumberInput
                  label="Uses This Month"
                  unit="times"
                  placeholder="0"
                  value={graftFrequencyCount}
                  onChange={setGraftFrequencyCount}
                  min={0}
                />
              </div>
            </div>

            {/* Documentation Similarity */}
            <div
              className={`p-4 rounded-lg border ${isDocSimilarityComplete ? (clonedAlert ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50") : "border-border"}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-5 w-5 text-primary" />
                <h4 className="font-medium text-foreground">Similarity to Previous Notes</h4>
                {isDocSimilarityComplete ? (
                  clonedAlert ? (
                    <FormBadge status="required" showIcon>
                      Cloned Documentation Alert
                    </FormBadge>
                  ) : (
                    <FormBadge status="success" variant="outline">
                      Complete
                    </FormBadge>
                  )
                ) : (
                  <FormBadge status="info" variant="outline">
                    Pending
                  </FormBadge>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormNumberInput
                  label="Similarity Percentage"
                  unit="%"
                  placeholder="0"
                  value={documentationSimilarity}
                  onChange={(value) => {
                    setDocumentationSimilarity(value)
                    setClonedAlert(value !== undefined && value > 80)
                  }}
                  min={0}
                  max={100}
                />
                <div className="flex items-end">
                  {documentationSimilarity !== undefined && documentationSimilarity > 80 && (
                    <div className="p-3 bg-red-100 rounded-lg text-red-800 text-sm">
                      Warning: High similarity ({documentationSimilarity}%) may indicate cloned documentation.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* JW Usage Patterns */}
            <div className={`p-4 rounded-lg border ${isJwComplete ? "border-green-200 bg-green-50" : "border-border"}`}>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h4 className="font-medium text-foreground">JW Usage Patterns (Wastage Trends)</h4>
                {isJwComplete ? (
                  <FormBadge status="success" variant="outline">
                    Complete
                  </FormBadge>
                ) : (
                  <FormBadge status="info" variant="outline">
                    Pending
                  </FormBadge>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="JW Modifier Details"
                  placeholder="Enter JW usage pattern details..."
                  value={jwWastagePattern}
                  onChange={(value) => setJwWastagePattern(value)}
                />
                <FormSelect
                  label="Wastage Trend"
                  placeholder="Select trend..."
                  options={wastageOptions}
                  value={jwWastageTrend}
                  onChange={setJwWastageTrend}
                />
              </div>
            </div>
          </div>
        </StructuredInfoCard>

        {/* State-Specific Rules */}
        <StructuredInfoCard
          title={
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" /> State-Specific Rules
            </div>
          }
          description="Compliance requirements vary by state"
          className="mb-6"
        >
          <div className="space-y-4">
            <FormSelect
              label="Select State"
              placeholder="Choose your state..."
              options={stateOptions}
              value={selectedState}
              onChange={setSelectedState}
            />

            {selectedState === "TX" && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 font-medium">Texas WISER Pilot Program Applies</p>
                <p className="text-blue-700 text-sm mt-1">
                  Additional documentation requirements apply under the Texas WISER pilot program.
                </p>
              </div>
            )}

            <div className="border-t pt-4">
              <h4 className="font-medium text-foreground mb-3">Additional State Rules</h4>
              {stateRules.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No additional state-specific rules added. Click below to add one.
                </p>
              ) : (
                <div className="space-y-3">
                  {stateRules.map((rule, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <FormInput
                        placeholder="Enter state-specific rule..."
                        value={rule}
                        onChange={(value) => updateStateRule(index, value)}
                        className="flex-1"
                      />
                      <FormButton
                        variant="outline"
                        size="sm"
                        className="bg-transparent text-destructive hover:bg-destructive/10 shrink-0"
                        onClick={() => removeStateRule(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </FormButton>
                    </div>
                  ))}
                </div>
              )}
              <FormButton
                variant="outline"
                className="bg-transparent w-full mt-3 whitespace-nowrap"
                onClick={addStateRule}
                leftIcon={<Plus className="h-4 w-4" />}
              >
                Add State Rule
              </FormButton>
            </div>
          </div>
        </StructuredInfoCard>

        {/* Compliance Status Banner */}
        {allChecksComplete && riskScore !== undefined && riskScore <= 33 && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-medium text-green-800">Low Audit Risk - Documentation Compliant</p>
              <p className="text-green-700 text-sm">
                All outlier checks passed and risk score is within acceptable range.
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <FormButton
            variant="outline"
            href="/cms-validation"
            className="bg-transparent whitespace-nowrap text-sm"
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Back
          </FormButton>
          <FormButton
            className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap text-sm"
            href="/fda-language"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Next: FDA Language
          </FormButton>
        </div>
      </div>
    </div>
  )
}
