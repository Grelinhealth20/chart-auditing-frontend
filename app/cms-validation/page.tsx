"use client"

import { useState, useRef } from "react"
import { FormButton } from "@/components/Input/form-button"
import { FormBadge } from "@/components/Input/form-badge"
import { FormInput } from "@/components/Input/form-input"
import { StructuredInfoCard } from "@/components/Input/structured-info-card"
import { CheckCircle2, ArrowLeft, ArrowRight, AlertTriangle, Plus, Trash2 } from "lucide-react"
import { ChartHeader } from "@/components/chart-header"

export default function CMSValidationPage() {
  const kxModifierRef = useRef<HTMLDivElement>(null)
  const woundMeasurementsRef = useRef<HTMLDivElement>(null)
  const runInDocRef = useRef<HTMLDivElement>(null)

  const [claimLines, setClaimLines] = useState<
    Array<{
      code: string
      description: string
      units: string
      modifier: string
    }>
  >([])

  const [kxModifierJustification, setKxModifierJustification] = useState("")
  const [woundMeasurements, setWoundMeasurements] = useState({ length: "", width: "", depth: "" })
  const [runInDocumentation, setRunInDocumentation] = useState("")

  const addClaimLine = () => {
    setClaimLines([...claimLines, { code: "", description: "", units: "", modifier: "" }])
  }

  const removeClaimLine = (index: number) => {
    setClaimLines(claimLines.filter((_, i) => i !== index))
  }

  const updateClaimLine = (index: number, field: string, value: string) => {
    const updated = [...claimLines]
    updated[index] = { ...updated[index], [field]: value }
    setClaimLines(updated)
  }

  const isKxMissing = !kxModifierJustification.trim()
  const isWoundMissing = !woundMeasurements.length.trim() || !woundMeasurements.width.trim()
  const isRunInMissing = !runInDocumentation.trim()

  const allPassed = !isKxMissing && !isWoundMissing && !isRunInMissing
  const hasMissingItems = isKxMissing || isWoundMissing || isRunInMissing

  const handleFixIssues = () => {
    if (isKxMissing && kxModifierRef.current) {
      kxModifierRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    } else if (isWoundMissing && woundMeasurementsRef.current) {
      woundMeasurementsRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    } else if (isRunInMissing && runInDocRef.current) {
      runInDocRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  const getVariant = (isMissing: boolean): "destructive" | "success" => {
    return isMissing ? "destructive" : "success"
  }

  return (
    <div className="min-h-screen bg-background">
      <ChartHeader />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">CMS Billing Requirements</h1>
          <p className="text-muted-foreground">Prevent billing errors before the note is finalized</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">55%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: "55%" }} />
          </div>
        </div>

        {allPassed && (
          <StructuredInfoCard noHeader variant="success" className="mb-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <p className="text-green-700 dark:text-green-400 font-medium text-lg">All CMS checks passed</p>
            </div>
          </StructuredInfoCard>
        )}

        {hasMissingItems && (
          <StructuredInfoCard
            title="Missing Requirements"
            icon={<AlertTriangle className="h-5 w-5" />}
            variant="destructive"
            className="mb-6"
          >
            <div className="space-y-3">
              {isKxMissing && (
                <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span className="text-red-700 dark:text-red-400">Missing KX modifier justification</span>
                </div>
              )}
              {isWoundMissing && (
                <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span className="text-red-700 dark:text-red-400">No wound measurements</span>
                </div>
              )}
              {isRunInMissing && (
                <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span className="text-red-700 dark:text-red-400">Missing run-in documentation</span>
                </div>
              )}
              <FormButton
                variant="outline"
                className="w-full bg-transparent border-red-300 text-red-600 hover:bg-red-50 mt-4"
                onClick={handleFixIssues}
              >
                Fix Issues
              </FormButton>
            </div>
          </StructuredInfoCard>
        )}

        <StructuredInfoCard
          title="Claim Lines Preview"
          description="Table of codes, units, and modifiers for billing"
          className="mb-6"
        >
          <div className="space-y-4">
            {claimLines.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No claim lines added yet. Click the button below to add one.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-foreground">Code</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Description</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Units</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Modifier</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {claimLines.map((line, index) => (
                      <tr key={index} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <FormInput
                            type={0}
                            placeholder="Q4122"
                            value={line.code}
                            onChange={(value) => updateClaimLine(index, "code", value)}
                          />
                        </td>
                        <td className="py-3 px-4">
                          <FormInput
                            type={0}
                            placeholder="Description"
                            value={line.description}
                            onChange={(value) => updateClaimLine(index, "description", value)}
                          />
                        </td>
                        <td className="py-3 px-4">
                          <FormInput
                            type={0}
                            placeholder="1"
                            value={line.units}
                            onChange={(value) => updateClaimLine(index, "units", value)}
                          />
                        </td>
                        <td className="py-3 px-4">
                          <FormInput
                            type={0}
                            placeholder="KX"
                            value={line.modifier}
                            onChange={(value) => updateClaimLine(index, "modifier", value)}
                          />
                        </td>
                        <td className="py-3 px-4">
                          <FormButton
                            variant="outline"
                            size="sm"
                            className="bg-transparent text-destructive hover:bg-destructive/10"
                            onClick={() => removeClaimLine(index)}
                            leftIcon={<Trash2 className="h-4 w-4" />}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <FormButton
              variant="outline"
              className="bg-transparent w-full whitespace-nowrap"
              onClick={addClaimLine}
              leftIcon={<Plus className="h-4 w-4" />}
            >
              Add Claim Line
            </FormButton>
          </div>
        </StructuredInfoCard>

        <div ref={kxModifierRef}>
          <StructuredInfoCard
            title="KX Modifier Justification"
            description="Provide justification for KX modifier usage"
            variant={getVariant(isKxMissing)}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-3">
              {isKxMissing ? (
                <FormBadge status="missing" showIcon icon={<AlertTriangle className="w-3 h-3" />}>
                  Required
                </FormBadge>
              ) : (
                <FormBadge status="success" showIcon icon={<CheckCircle2 className="w-3 h-3" />}>
                  Complete
                </FormBadge>
              )}
            </div>
            <FormInput
              type={2}
              rows={4}
              placeholder="Enter KX modifier justification..."
              value={kxModifierJustification}
              onChange={(value) => setKxModifierJustification(value)}
            />
          </StructuredInfoCard>
        </div>

        <div ref={woundMeasurementsRef}>
          <StructuredInfoCard
            title="Wound Measurements"
            description="Enter current wound dimensions"
            variant={getVariant(isWoundMissing)}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-3">
              {isWoundMissing ? (
                <FormBadge status="missing" showIcon icon={<AlertTriangle className="w-3 h-3" />}>
                  Required
                </FormBadge>
              ) : (
                <FormBadge status="success" showIcon icon={<CheckCircle2 className="w-3 h-3" />}>
                  Complete
                </FormBadge>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormInput
                type={0}
                label="Length (cm)"
                placeholder="0.0"
                value={woundMeasurements.length}
                onChange={(value) => setWoundMeasurements({ ...woundMeasurements, length: value })}
              />
              <FormInput
                type={0}
                label="Width (cm)"
                placeholder="0.0"
                value={woundMeasurements.width}
                onChange={(value) => setWoundMeasurements({ ...woundMeasurements, width: value })}
              />
              <FormInput
                type={0}
                label="Depth (cm)"
                placeholder="0.0"
                value={woundMeasurements.depth}
                onChange={(value) => setWoundMeasurements({ ...woundMeasurements, depth: value })}
              />
            </div>
          </StructuredInfoCard>
        </div>

        <div ref={runInDocRef}>
          <StructuredInfoCard
            title="Run-in Documentation"
            description="Document the run-in period and prior treatments"
            variant={getVariant(isRunInMissing)}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-3">
              {isRunInMissing ? (
                <FormBadge status="missing" showIcon icon={<AlertTriangle className="w-3 h-3" />}>
                  Required
                </FormBadge>
              ) : (
                <FormBadge status="success" showIcon icon={<CheckCircle2 className="w-3 h-3" />}>
                  Complete
                </FormBadge>
              )}
            </div>
            <FormInput
              type={2}
              rows={4}
              placeholder="Enter run-in documentation details..."
              value={runInDocumentation}
              onChange={(value) => setRunInDocumentation(value)}
            />
          </StructuredInfoCard>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <FormButton
            variant="outline"
            href="/autofill-confirm"
            className="bg-transparent text-sm whitespace-nowrap"
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Back
          </FormButton>
          <FormButton
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm whitespace-nowrap"
            href="/wiser-audit"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Next: WISER Audit Risk
          </FormButton>
        </div>
      </div>
    </div>
  )
}
