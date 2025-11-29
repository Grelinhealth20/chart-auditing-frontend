"use client"

import { useState } from "react"
import { FormButton } from "@/components/Input/form-button"
import { FormInput } from "@/components/Input/form-input"
import { StructuredInfoCard } from "@/components/Input/structured-info-card"
import { FormBadge } from "@/components/Input/form-badge"
import { Send, ArrowLeft, Download, CheckCircle2, FileText, FileJson, FileCode, Circle } from "lucide-react"
import { ChartHeader } from "@/components/chart-header"

export default function FinalNotePage() {
  const [noteSubmitted, setNoteSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState("narrative")
  const [narrativeNote, setNarrativeNote] = useState("")

  const [checklistItems, setChecklistItems] = useState([
    { id: 1, label: "Patient Demographics", checked: false },
    { id: 2, label: "Procedure Details", checked: false },
    { id: 3, label: "JW Modifier Documentation", checked: false },
    { id: 4, label: "FDA-Compliant Language", checked: false },
    { id: 5, label: "Wound Measurements", checked: false },
    { id: 6, label: "LCD Compliance", checked: false },
    { id: 7, label: "CMS Billing Requirements", checked: false },
    { id: 8, label: "WISER Audit Risk Score", checked: false },
  ])

  const toggleChecklistItem = (id: number) => {
    setChecklistItems((items) => items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  const allChecked = checklistItems.every((item) => item.checked)

  const jsonPreview = {
    resourceType: "ClinicalNote",
    status: "final",
    patient: {
      identifier: "",
      name: "",
      dob: "",
    },
    encounter: {
      date: "",
      provider: "",
      facility: "",
    },
    procedure: {
      code: "",
      description: "",
      modifiers: [],
    },
    wound: {
      location: "",
      size_cm2: 0,
      healing_progress: "",
    },
    compliance: {
      lcd_l36377: "pending",
      cms_validated: false,
      fda_compliant: false,
      wiser_score: 0,
    },
    billing: {
      claim_lines: [],
      jw_modifier: false,
      wastage_documented: false,
    },
  }

  const fhirPreview = {
    resourceType: "DocumentReference",
    status: "current",
    type: {
      coding: [
        {
          system: "http://loinc.org",
          code: "11506-3",
          display: "Progress note",
        },
      ],
    },
    subject: {
      reference: "Patient/",
    },
    date: new Date().toISOString(),
    author: [
      {
        reference: "Practitioner/",
      },
    ],
    content: [
      {
        attachment: {
          contentType: "text/plain",
          data: "",
        },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <ChartHeader />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Final Audit-Proof Note Review</h1>
          <p className="text-muted-foreground">
            Deliver a clean, compliant, export-ready note that is safe for any audit
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">100%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: "100%" }} />
          </div>
        </div>

        {/* Success Alert */}
        {noteSubmitted && (
          <StructuredInfoCard noHeader variant="success" className="mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <p className="text-green-700 dark:text-green-400">
                <strong>Note submitted successfully!</strong> Your audit-ready clinical note has been sent to the EMR
                system.
              </p>
            </div>
          </StructuredInfoCard>
        )}

        <StructuredInfoCard
          title="Export Summary"
          description="Checklist of included items - verify all elements are complete"
          className="mb-6 animate-slide-in-up"
        >
          <div className="grid gap-3 md:grid-cols-2">
            {checklistItems.map((item) => (
              <div
                key={item.id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                  item.checked
                    ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                    : "border-border hover:bg-muted/50"
                }`}
                onClick={() => toggleChecklistItem(item.id)}
              >
                {item.checked ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
                ) : (
                  <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />
                )}
                <span className={item.checked ? "text-green-700 dark:text-green-400" : "text-foreground"}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          {allChecked && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-700 dark:text-green-400">
                All items verified - Note is ready for export
              </span>
            </div>
          )}
        </StructuredInfoCard>

        <StructuredInfoCard
          title="JSON Viewer"
          description="Structured export format (read-only)"
          className="mb-6 animate-slide-in-up"
          style={{ animationDelay: "100ms" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <FormBadge status="info">Read-Only</FormBadge>
            <span className="text-sm text-muted-foreground">For structured data export</span>
          </div>
          <div className="rounded-lg border bg-muted/50 p-4">
            <pre className="max-h-64 overflow-auto text-xs text-foreground font-mono">
              {JSON.stringify(jsonPreview, null, 2)}
            </pre>
          </div>
        </StructuredInfoCard>

        <StructuredInfoCard
          title="Final Narrative Note"
          description="Plain-text version of the final, compliant clinical note"
          className="mb-6 animate-slide-in-up"
          style={{ animationDelay: "200ms" }}
        >
          <div className="w-full">
            <div className="grid w-full grid-cols-3 gap-1 rounded-lg bg-muted p-1 mb-4">
              <button
                onClick={() => setActiveTab("narrative")}
                className={`flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === "narrative"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileText className="h-4 w-4" />
                Narrative
              </button>
              <button
                onClick={() => setActiveTab("json")}
                className={`flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === "json"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileJson className="h-4 w-4" />
                JSON
              </button>
              <button
                onClick={() => setActiveTab("fhir")}
                className={`flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === "fhir"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileCode className="h-4 w-4" />
                FHIR
              </button>
            </div>

            {activeTab === "narrative" && (
              <FormInput
                type={2}
                rows={12}
                placeholder="Enter your final clinical narrative note here. This will be the plain-text version of your compliant documentation..."
                value={narrativeNote}
                onChange={(value) => setNarrativeNote(value)}
              />
            )}

            {activeTab === "json" && (
              <div className="rounded-lg border bg-muted/50 p-4">
                <pre className="max-h-72 overflow-auto text-xs text-foreground font-mono">
                  {JSON.stringify(jsonPreview, null, 2)}
                </pre>
              </div>
            )}

            {activeTab === "fhir" && (
              <div className="rounded-lg border bg-muted/50 p-4">
                <pre className="max-h-72 overflow-auto text-xs text-foreground font-mono">
                  {JSON.stringify(fhirPreview, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </StructuredInfoCard>

        <StructuredInfoCard
          title="Download Options"
          description="Export note in various formats"
          className="mb-8 animate-slide-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <div className="grid gap-3 md:grid-cols-3">
            <FormButton
              variant="outline"
              className="justify-start bg-transparent whitespace-nowrap"
              leftIcon={<Download className="h-4 w-4" />}
            >
              Download PDF
            </FormButton>
            <FormButton
              variant="outline"
              className="justify-start bg-transparent whitespace-nowrap"
              leftIcon={<Download className="h-4 w-4" />}
            >
              Download HL7
            </FormButton>
            <FormButton
              variant="outline"
              className="justify-start bg-transparent whitespace-nowrap"
              leftIcon={<Download className="h-4 w-4" />}
            >
              Download FHIR JSON
            </FormButton>
          </div>
        </StructuredInfoCard>

        <div className="flex items-center justify-between">
          <FormButton
            variant="outline"
            href="/jw-wastage"
            className="bg-transparent whitespace-nowrap"
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Back
          </FormButton>
          <FormButton
            size="lg"
            className="bg-green-600 text-white hover:bg-green-700 whitespace-nowrap"
            onClick={() => setNoteSubmitted(true)}
            disabled={noteSubmitted}
            leftIcon={noteSubmitted ? <CheckCircle2 className="h-5 w-5" /> : undefined}
            rightIcon={!noteSubmitted ? <Send className="h-5 w-5" /> : undefined}
          >
            {noteSubmitted ? "Note Submitted" : "SEND NOTE"}
          </FormButton>
        </div>
      </div>
    </div>
  )
}
