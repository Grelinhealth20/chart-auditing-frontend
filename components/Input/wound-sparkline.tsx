"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface WoundSparklineProps {
  data: { label: string; size: number }[]
  height?: number
  showAxis?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  lineColor?: string
  className?: string
}

export function WoundSparkline({
  data,
  height = 200,
  showAxis = true,
  showGrid = true,
  showTooltip = true,
  lineColor = "#CF9455",
  className,
}: WoundSparklineProps) {
  if (!data || data.length === 0) {
    return (
      <div className={`flex items-center justify-center text-muted-foreground ${className}`} style={{ height }}>
        No data available
      </div>
    )
  }

  return (
    <div className={className} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />}
          {showAxis && (
            <>
              <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
                label={{ value: "Size (cm²)", angle: -90, position: "insideLeft" }}
              />
            </>
          )}
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
          )}
          <Line type="monotone" dataKey="size" stroke={lineColor} strokeWidth={3} dot={{ fill: lineColor, r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
