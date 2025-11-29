"use client"

interface ProductUsageBarProps {
  productSize: number
  usedAmount: number
  height?: number
  showLabels?: boolean
  showLegend?: boolean
  className?: string
}

export function ProductUsageBar({
  productSize,
  usedAmount,
  height = 80,
  showLabels = true,
  showLegend = true,
  className,
}: ProductUsageBarProps) {
  const wastage = Math.max(0, productSize - usedAmount)
  const usedPercent = productSize > 0 ? ((Math.min(usedAmount, productSize) / productSize) * 100).toFixed(1) : "0"
  const wastagePercent = productSize > 0 ? ((wastage / productSize) * 100).toFixed(1) : "0"

  if (productSize <= 0) {
    return (
      <div className={`flex items-center justify-center text-muted-foreground ${className}`} style={{ height }}>
        Enter product size to see usage breakdown
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Visual Bar */}
      <div className="mb-2 text-sm font-medium text-muted-foreground">Product Utilization</div>
      <div className="flex overflow-hidden rounded-lg border-2" style={{ height }}>
        <div
          className="flex flex-col items-center justify-center bg-green-500 text-white transition-all"
          style={{ width: `${Math.min(100, (usedAmount / productSize) * 100)}%` }}
        >
          {showLabels && (
            <>
              <span className="text-lg font-bold">{Math.min(usedAmount, productSize)} cm²</span>
              <span className="text-xs">USED</span>
            </>
          )}
        </div>
        {wastage > 0 && (
          <div
            className="flex flex-col items-center justify-center bg-orange-500 text-white transition-all"
            style={{ width: `${(wastage / productSize) * 100}%` }}
          >
            {showLabels && (
              <>
                <span className="text-lg font-bold">{wastage} cm²</span>
                <span className="text-xs">WASTED</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3 dark:bg-green-950">
            <div className="h-4 w-4 rounded bg-green-500"></div>
            <div>
              <div className="text-sm font-medium text-green-700 dark:text-green-400">Used Product</div>
              <div className="text-lg font-bold text-green-800 dark:text-green-300">{usedPercent}%</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-orange-50 p-3 dark:bg-orange-950">
            <div className="h-4 w-4 rounded bg-orange-500"></div>
            <div>
              <div className="text-sm font-medium text-orange-700 dark:text-orange-400">Wasted Product</div>
              <div className="text-lg font-bold text-orange-800 dark:text-orange-300">{wastagePercent}%</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
            <div className="h-4 w-4 rounded bg-blue-500"></div>
            <div>
              <div className="text-sm font-medium text-blue-700 dark:text-blue-400">JW Modifier</div>
              <div className="text-lg font-bold text-blue-800 dark:text-blue-300">
                {wastage > 0 ? "Required" : "Not Needed"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
