"use client"

import { useState } from "react"
import { FormButton } from "@/components/Input/form-button"
import { StructuredInfoCard } from "@/components/Input/structured-info-card"
import { FormInput } from "@/components/Input/form-input"
import { FormSearchSelect } from "@/components/Input/form-search-select"
import { Mic, ArrowRight, User, Calendar, Clock, Building } from "lucide-react"
import { ChartHeader } from "@/components/chart-header"
import Link from "next/link"

export default function NoteCapturePagePage() {
  const [noteText, setNoteText] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState("")
  const [selectedEncounter, setSelectedEncounter] = useState("")

  const [providerName, setProviderName] = useState("")
  const [providerNPI, setProviderNPI] = useState("")
  const [facilityName, setFacilityName] = useState("")
  const [encounterDate, setEncounterDate] = useState("")
  const [encounterTime, setEncounterTime] = useState("")

  const charCount = noteText.length
  const maxChars = 10000

  const patientOptions = [
    { value: "pt-001", label: "John Smith (DOB: 03/15/1958)" },
    { value: "pt-002", label: "Mary Johnson (DOB: 07/22/1965)" },
    { value: "pt-003", label: "Robert Williams (DOB: 11/30/1972)" },
    { value: "pt-004", label: "Patricia Brown (DOB: 05/18/1980)" },
    { value: "pt-005", label: "James Davis (DOB: 09/04/1955)" },
  ]

  const encounterOptions = [
    { value: "enc-001", label: "Wound Care Follow-up - 01/15/2025" },
    { value: "enc-002", label: "Initial Wound Assessment - 01/10/2025" },
    { value: "enc-003", label: "Graft Application - 01/08/2025" },
    { value: "enc-004", label: "Post-Op Evaluation - 01/05/2025" },
    { value: "enc-005", label: "Debridement Procedure - 01/02/2025" },
  ]
  return (
    <div className="min-h-screen bg-background">
      <ChartHeader />

      <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-2 flex items-center justify-between text-xs sm:text-sm">
            <span className="font-medium text-foreground">Progress</span>
            <span className="text-muted-foreground">Step 1 of 9</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: "11%" }} />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Start Clinical Note</h1>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Patient & Encounter Selection */}
            <StructuredInfoCard title="Select Patient & Encounter" titleClassName="text-lg font-semibold">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormSearchSelect
                  label="Patient"
                  value={selectedPatient}
                  onChange={setSelectedPatient}
                  placeholder="Search patients..."
                  options={patientOptions}
                />
                <FormSearchSelect
                  label="Encounter"
                  value={selectedEncounter}
                  onChange={setSelectedEncounter}
                  placeholder="Search encounters..."
                  options={encounterOptions}
                />
              </div>
            </StructuredInfoCard>

            {/* Large Text Box for Note */}
            <StructuredInfoCard title="Clinical Note" titleClassName="text-lg font-semibold">
              <div className="space-y-3">
                {isRecording && (
                  <div className="flex items-center gap-2 rounded-md border border-destructive bg-destructive/10 p-3">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-destructive" />
                    <span className="text-sm font-medium text-destructive">
                      Recording in progress... Speak clearly into your microphone.
                    </span>
                  </div>
                )}
                <FormInput
                  type={2}
                  id="note"
                  placeholder="Type or dictate your encounter note here...

Document the patient encounter in your own words. Include relevant clinical observations, procedures performed, wound measurements, patient history, and any other pertinent details.

The system will automatically process and structure your note in the next step."
                  className="min-h-[400px] sm:min-h-[500px] font-mono text-sm"
                  value={noteText}
                  onChange={setNoteText}
                  rows={20}
                />
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${charCount > maxChars ? "text-destructive" : "text-muted-foreground"}`}>
                    {charCount.toLocaleString()} / {maxChars.toLocaleString()} characters
                  </span>
                  <FormButton
                    size="sm"
                    variant={isRecording ? "destructive" : "outline"}
                    className={`whitespace-nowrap ${isRecording ? "" : "border-primary text-primary hover:bg-primary/10"}`}
                    onClick={() => setIsRecording(!isRecording)}
                    leftIcon={<Mic className="h-4 w-4" />}
                  >
                    {isRecording ? "Stop Recording" : "Voice Dictation"}
                  </FormButton>
                </div>
              </div>
            </StructuredInfoCard>

            {/* Submit Button */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t pt-6">
              <Link href="/">
                <FormButton variant="outline" className="w-full sm:w-auto bg-transparent whitespace-nowrap" href="/">
                  Cancel
                </FormButton>
              </Link>
              <Link href="/structured-note">              
                <FormButton
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto text-base font-semibold whitespace-nowrap"
                  disabled={!noteText.trim() || !selectedPatient || !selectedEncounter}
                  href={"/structured-note"}
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Submit Note
                </FormButton>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {/* Provider Identity */}
            <StructuredInfoCard title="Provider Information" titleClassName="text-sm font-semibold">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <FormInput
                      label="Provider Name"
                      placeholder="Enter provider name"
                      value={providerName}
                      onChange={setProviderName}
                    />
                  </div>
                </div>
                <FormInput label="NPI Number" placeholder="Enter NPI" value={providerNPI} onChange={setProviderNPI} />
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-muted-foreground mt-1" />
                  <div className="flex-1">
                    <FormInput
                      label="Facility"
                      placeholder="Enter facility name"
                      value={facilityName}
                      onChange={setFacilityName}
                    />
                  </div>
                </div>
              </div>
            </StructuredInfoCard>

            {/* Encounter Details */}
            <StructuredInfoCard title="Encounter Details" titleClassName="text-sm font-semibold">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-1" />
                  <div className="flex-1">
                    <FormInput type={1} label="Encounter Date" value={encounterDate} onChange={setEncounterDate} />
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-1" />
                  <div className="flex-1">
                    <FormInput
                      label="Encounter Time"
                      placeholder="Enter time"
                      value={encounterTime}
                      onChange={setEncounterTime}
                    />
                  </div>
                </div>
              </div>
            </StructuredInfoCard>

            {/* Tips Card */}
            <StructuredInfoCard variant="info" title="Tips for Better Results" titleClassName="text-sm font-medium">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Include wound measurements (length x width x depth)</li>
                <li>Document previous wound sizes for comparison</li>
                <li>Note patient compliance with treatment</li>
                <li>Describe any procedures performed</li>
                <li>Include relevant patient history</li>
              </ul>
            </StructuredInfoCard>
          </div>
        </div>
      </div>
    </div>
  )
}
