"use client"

interface RiskGaugeProps {
  score: number // 0-100 scale
  width?: number
  height?: number
  showScore?: boolean
  showLabel?: boolean
  className?: string
}

export function RiskGauge({
  score,
  width = 200,
  height = 120,
  showScore = true,
  showLabel = true,
  className,
}: RiskGaugeProps) {
  // Normalize to 0-1 scale
  const normalizedScore = Math.max(0, Math.min(100, score)) / 100
  const riskLevel = normalizedScore <= 0.33 ? "low" : normalizedScore <= 0.66 ? "medium" : "high"

  const riskColors = {
    low: { bg: "bg-green-100", text: "text-green-700", label: "Low Risk" },
    medium: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Medium Risk" },
    high: { bg: "bg-red-100", text: "text-red-700", label: "High Risk" },
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg width={width} height={height} viewBox="0 0 200 120">
        {/* Background arc */}
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#e5e7eb" strokeWidth="20" strokeLinecap="round" />
        {/* Green zone (low: 0-0.33) */}
        <path d="M 20 100 A 80 80 0 0 1 70 37" fill="none" stroke="#10b981" strokeWidth="20" strokeLinecap="round" />
        {/* Yellow zone (medium: 0.33-0.66) */}
        <path d="M 70 37 A 80 80 0 0 1 131 37" fill="none" stroke="#f59e0b" strokeWidth="20" strokeLinecap="round" />
        {/* Red zone (high: 0.66-1) */}
        <path d="M 131 37 A 80 80 0 0 1 180 100" fill="none" stroke="#ef4444" strokeWidth="20" strokeLinecap="round" />
        {/* Needle */}
        <line
          x1="100"
          y1="100"
          x2={100 + 70 * Math.cos(Math.PI - normalizedScore * Math.PI)}
          y2={100 - 70 * Math.sin(Math.PI - normalizedScore * Math.PI)}
          stroke="#1f2937"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="100" cy="100" r="8" fill="#1f2937" />
      </svg>

      {showScore && <div className="mt-2 text-3xl font-bold text-foreground">{normalizedScore.toFixed(2)}</div>}

      {showLabel && (
        <div
          className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${riskColors[riskLevel].bg} ${riskColors[riskLevel].text}`}
        >
          {riskColors[riskLevel].label}
        </div>
      )}
    </div>
  )
}
