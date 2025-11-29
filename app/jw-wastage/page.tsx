"use client"

import { useState } from "react"
import { FormButton } from "@/components/Input/form-button"
import { FormBadge } from "@/components/Input/form-badge"
import { FormNumberInput } from "@/components/Input/form-number-input"
import { StructuredInfoCard } from "@/components/Input/structured-info-card"
import { AutofillBanner } from "@/components/Input/autofill-banner"
import { ProductUsageBar } from "@/components/Input/product-usage-bar"
import { ArrowLeft, ArrowRight, CheckCircle2, Package, Ruler } from "lucide-react"
import { ChartHeader } from "@/components/chart-header"

export default function JWWastagePage() {
  const [woundLength, setWoundLength] = useState<number | undefined>(undefined)
  const [woundWidth, setWoundWidth] = useState<number | undefined>(undefined)
  const [productSize, setProductSize] = useState<number | undefined>(undefined)
  const [productName, setProductName] = useState("")
  const [hcpcsCode, setHcpcsCode] = useState("")
  const [unitPrice, setUnitPrice] = useState<number | undefined>(undefined)

  // Calculate wound area from length x width
  const woundArea = woundLength && woundWidth ? woundLength * woundWidth : 0

  // Calculate derived values
  const wastage = productSize && woundArea ? Math.max(0, productSize - woundArea) : 0
  const wastagePercent = productSize && wastage ? ((wastage / productSize) * 100).toFixed(1) : "0"
  const usedAmount = unitPrice && woundArea ? (unitPrice * Math.min(woundArea, productSize || 0)).toFixed(2) : "0.00"
  const discardedAmount = unitPrice && wastage ? (unitPrice * wastage).toFixed(2) : "0.00"
  const totalAmount = unitPrice && productSize ? (unitPrice * productSize).toFixed(2) : "0.00"

  // Check if JW modifier is needed
  const jwModifierNeeded = wastage > 0

  return (
    <div className="min-h-screen bg-background">
      <ChartHeader />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Product Usage & Wastage Calculator</h1>
          <p className="text-muted-foreground">Make wastage clear and ensure documentation supports JW modifiers</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">88%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: "88%" }} />
          </div>
        </div>

        <StructuredInfoCard
          title="Auto-filled Wound Size"
          description="Wound measurements retrieved from clinical note"
          className="mb-6 animate-slide-in-up"
        >
          <AutofillBanner
            title="Wound measurements auto-filled from structured note"
            description="Review and adjust if needed"
          />
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            <FormNumberInput
              label="Wound Length"
              unit="cm"
              placeholder="0"
              value={woundLength}
              onChange={setWoundLength}
            />
            <FormNumberInput
              label="Wound Width"
              unit="cm"
              placeholder="0"
              value={woundWidth}
              onChange={setWoundWidth}
            />
            <div className="flex flex-col justify-end">
              <div className="rounded-lg border-2 border-green-500 bg-green-50 p-4 text-center dark:bg-green-950">
                <Ruler className="mx-auto mb-1 h-5 w-5 text-green-600" />
                <div className="text-2xl font-bold text-green-700 dark:text-green-400">{woundArea} cm²</div>
                <div className="text-xs text-green-600">Calculated Wound Area</div>
              </div>
            </div>
          </div>
        </StructuredInfoCard>

        <StructuredInfoCard
          title="Product Size vs. Wound Area"
          description="Compare product dimensions to wound coverage needs"
          className="mb-6 animate-slide-in-up"
          style={{ animationDelay: "100ms" }}
        >
          <div className="grid gap-6 md:grid-cols-4">
            <FormNumberInput
              label="Product Size"
              unit="cm²"
              placeholder="0"
              value={productSize}
              onChange={setProductSize}
            />
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Product Name</label>
              <input
                type="text"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">HCPCS Code</label>
              <input
                type="text"
                placeholder="e.g., Q4122"
                value={hcpcsCode}
                onChange={(e) => setHcpcsCode(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
              />
            </div>
            <FormNumberInput
              label="Unit Price"
              unit="$/cm²"
              placeholder="0"
              value={unitPrice}
              onChange={setUnitPrice}
              step={0.01}
            />
          </div>

          {/* Comparison visualization */}
          {productSize && woundArea > 0 && (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border-2 border-primary p-4 text-center">
                <Package className="mx-auto mb-2 h-8 w-8 text-primary" />
                <div className="text-3xl font-bold text-foreground">{productSize}</div>
                <div className="text-sm text-muted-foreground">Product Size (cm²)</div>
              </div>
              <div className="flex items-center justify-center text-2xl font-bold text-muted-foreground">vs</div>
              <div className="rounded-lg border-2 border-green-500 p-4 text-center">
                <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-green-600" />
                <div className="text-3xl font-bold text-foreground">{woundArea}</div>
                <div className="text-sm text-muted-foreground">Wound Area (cm²)</div>
              </div>
            </div>
          )}
        </StructuredInfoCard>

        {productSize && woundArea > 0 && (
          <StructuredInfoCard
            title="Used vs. Wasted Product"
            description="Visual breakdown of product utilization"
            className="mb-6 animate-slide-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <ProductUsageBar productSize={productSize} usedAmount={woundArea} />
          </StructuredInfoCard>
        )}

        {productSize && woundArea > 0 && unitPrice && (
          <StructuredInfoCard
            title="Claim Lines Preview for JW Billing"
            description="Generated billing lines with JW modifier for wastage documentation"
            className="mb-8 animate-slide-in-up"
            style={{ animationDelay: "300ms" }}
          >
            {jwModifierNeeded && (
              <div className="mb-4 rounded-lg border-2 border-orange-300 bg-orange-50 p-3 dark:bg-orange-950">
                <div className="flex items-center gap-2">
                  <FormBadge status="warning">JW Modifier Applied</FormBadge>
                  <span className="text-sm text-orange-700 dark:text-orange-300">
                    Wastage of {wastage} cm² ({wastagePercent}%) requires JW modifier documentation
                  </span>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Header */}
                <div className="grid grid-cols-5 gap-4 border-b pb-3 text-sm font-medium text-muted-foreground">
                  <div>HCPCS Code</div>
                  <div>Description</div>
                  <div className="text-right">Units (cm²)</div>
                  <div>Modifier</div>
                  <div className="text-right">Amount</div>
                </div>
                {/* Used portion */}
                <div className="grid grid-cols-5 gap-4 border-b py-3 text-sm">
                  <div className="font-mono font-medium">{hcpcsCode || "Q4XXX"}</div>
                  <div>{productName || "Product"} - Used portion</div>
                  <div className="text-right font-medium">{Math.min(woundArea, productSize)}</div>
                  <div>
                    <span className="text-muted-foreground">—</span>
                  </div>
                  <div className="text-right">${usedAmount}</div>
                </div>
                {/* Discarded portion with JW */}
                {wastage > 0 && (
                  <div className="grid grid-cols-5 gap-4 border-b bg-orange-50 py-3 text-sm dark:bg-orange-950/30">
                    <div className="font-mono font-medium">{hcpcsCode || "Q4XXX"}</div>
                    <div>{productName || "Product"} - Discarded (Wastage)</div>
                    <div className="text-right font-medium">{wastage}</div>
                    <div>
                      <FormBadge status="warning" variant="outline">
                        JW
                      </FormBadge>
                    </div>
                    <div className="text-right">${discardedAmount}</div>
                  </div>
                )}
                {/* Total */}
                <div className="grid grid-cols-5 gap-4 py-3 text-sm font-medium">
                  <div className="col-span-4">Total Billable Amount</div>
                  <div className="text-right text-lg">${totalAmount}</div>
                </div>
              </div>
            </div>
          </StructuredInfoCard>
        )}

        <div className="flex items-center justify-between">
          <FormButton
            variant="outline"
            href="/fda-language"
            leftIcon={<ArrowLeft className="h-4 w-4" />}
            className="whitespace-nowrap bg-transparent"
          >
            Back
          </FormButton>
          <FormButton
            href="/final-note"
            rightIcon={<ArrowRight className="h-4 w-4" />}
            className="whitespace-nowrap bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Next: Final Note
          </FormButton>
        </div>
      </div>
    </div>
  )
}
