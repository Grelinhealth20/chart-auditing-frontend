"use client"

import { useState } from "react"
import { FormButton } from "@/components/Input/form-button"
import { FormInput } from "@/components/Input/form-input"
import { StructuredInfoCard } from "@/components/Input/structured-info-card"
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Plus, Trash2, BookOpen } from "lucide-react"
import { ChartHeader } from "@/components/chart-header"

export default function FDALanguagePage() {
  const [highlightDiffs, setHighlightDiffs] = useState(false)

  const [originalNarrative, setOriginalNarrative] = useState("")
  const [fdaSafeNarrative, setFdaSafeNarrative] = useState("")

  const [forbiddenPhrases, setForbiddenPhrases] = useState<
    Array<{
      id: number
      forbidden: string
      approved: string
    }>
  >([])

  const addPhrase = () => {
    setForbiddenPhrases([...forbiddenPhrases, { id: Date.now(), forbidden: "", approved: "" }])
  }

  const removePhrase = (id: number) => {
    setForbiddenPhrases(forbiddenPhrases.filter((p) => p.id !== id))
  }

  const updatePhrase = (id: number, field: "forbidden" | "approved", value: string) => {
    setForbiddenPhrases(forbiddenPhrases.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const highlightForbiddenWords = (text: string) => {
    if (!highlightDiffs || forbiddenPhrases.length === 0) return text

    let result = text
    forbiddenPhrases.forEach((phrase) => {
      if (phrase.forbidden) {
        const regex = new RegExp(`(${phrase.forbidden})`, "gi")
        result = result.replace(regex, `<mark class="bg-red-200 dark:bg-red-900 px-1 rounded">$1</mark>`)
      }
    })
    return result
  }

  const allCompliant = originalNarrative.length > 0 && fdaSafeNarrative.length > 0

  return (
    <div className="min-h-screen bg-background">
      <ChartHeader />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Compliant Language Rewrite</h1>
          <p className="text-muted-foreground">
            Ensure all clinical notes meet FDA language requirements without guesswork.
          </p>
        </div>

        {/* Success Alert */}
        {allCompliant && (
          <StructuredInfoCard noHeader variant="success" className="mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <p className="text-green-700 dark:text-green-400">
                <strong>All FDA language requirements met.</strong> This note now meets Section 361 compliance
                requirements.
              </p>
            </div>
          </StructuredInfoCard>
        )}

        <div className="mb-6 flex items-center justify-end gap-3">
          <label htmlFor="highlight-toggle" className="text-sm text-muted-foreground cursor-pointer">
            Toggle to highlight differences
          </label>
          <button
            id="highlight-toggle"
            onClick={() => setHighlightDiffs(!highlightDiffs)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              highlightDiffs ? "bg-primary" : "bg-muted"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                highlightDiffs ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <StructuredInfoCard
          title="Language Comparison"
          description="Compare original narrative with FDA-safe wording"
          className="mb-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left: Original Narrative */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="font-medium text-red-700 dark:text-red-400">Original Narrative</span>
              </div>
              <div className="relative">
                {highlightDiffs && originalNarrative ? (
                  <div
                    className="min-h-[200px] w-full rounded-md border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-3 text-sm"
                    dangerouslySetInnerHTML={{ __html: highlightForbiddenWords(originalNarrative) }}
                  />
                ) : (
                  <FormInput
                    type={2}
                    rows={8}
                    placeholder='e.g., "Graft applied with metabolic activity to promote cellular regeneration and tissue healing..."'
                    value={originalNarrative}
                    onChange={(value) => setOriginalNarrative(value)}
                    className="border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20"
                  />
                )}
              </div>
            </div>

            {/* Right: FDA-Safe Wording */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="font-medium text-green-700 dark:text-green-400">FDA-Safe Wording</span>
              </div>
              <FormInput
                type={2}
                rows={8}
                placeholder='e.g., "Protective wound covering applied to provide barrier protection and support the wound healing environment..."'
                value={fdaSafeNarrative}
                onChange={(value) => setFdaSafeNarrative(value)}
                className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20"
              />
            </div>
          </div>
        </StructuredInfoCard>

        <StructuredInfoCard
          title="Replacement Dictionary"
          description="Forbidden phrases and their approved alternatives"
          className="mb-8"
        >
          <div className="space-y-3">
            {/* Dictionary Header */}
            <div className="flex items-center gap-4 px-3 py-2 text-sm font-medium text-muted-foreground border-b">
              <div className="flex-1 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                Forbidden Phrase
              </div>
              <div className="w-8" />
              <div className="flex-1 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Approved Alternative
              </div>
              <div className="w-10" />
            </div>

            {forbiddenPhrases.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <BookOpen className="h-10 w-10 text-muted-foreground/50 mb-3" />
                <p className="text-sm text-muted-foreground">
                  No phrases added yet. Build your replacement dictionary below.
                </p>
              </div>
            ) : (
              forbiddenPhrases.map((phrase) => (
                <div
                  key={phrase.id}
                  className="flex items-center gap-4 rounded-lg border p-3 text-sm transition-colors hover:bg-muted/50"
                >
                  <div className="flex-1">
                    <FormInput
                      type={0}
                      placeholder='e.g., "metabolic activity"'
                      value={phrase.forbidden}
                      onChange={(value) => updatePhrase(phrase.id, "forbidden", value)}
                      className="font-mono text-red-700 dark:text-red-400 bg-red-50/50 dark:bg-red-950/20"
                    />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex-1">
                    <FormInput
                      type={0}
                      placeholder='e.g., "barrier protection"'
                      value={phrase.approved}
                      onChange={(value) => updatePhrase(phrase.id, "approved", value)}
                      className="font-mono text-green-700 dark:text-green-400 bg-green-50/50 dark:bg-green-950/20"
                    />
                  </div>
                  <FormButton
                    variant="outline"
                    size="sm"
                    className="bg-transparent text-destructive hover:bg-destructive/10 shrink-0 whitespace-nowrap"
                    onClick={() => removePhrase(phrase.id)}
                    leftIcon={<Trash2 className="h-4 w-4" />}
                  />
                </div>
              ))
            )}
            <FormButton
              variant="outline"
              className="bg-transparent w-full whitespace-nowrap"
              onClick={addPhrase}
              leftIcon={<Plus className="h-4 w-4" />}
            >
              Add Phrase
            </FormButton>
          </div>
        </StructuredInfoCard>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <FormButton
            variant="outline"
            href="/wiser-audit"
            className="bg-transparent whitespace-nowrap"
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Back
          </FormButton>
          <FormButton
            className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap"
            href="/jw-wastage"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Next: JW Wastage
          </FormButton>
        </div>
      </div>
    </div>
  )
}
