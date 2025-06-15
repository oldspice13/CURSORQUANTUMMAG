"use client"

import { useState } from "react"
import { HelpCircle } from "lucide-react"

interface HelpTooltipProps {
  content: string
  position?: "top" | "bottom" | "left" | "right"
}

export function HelpTooltip({ content, position = "top" }: HelpTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  }

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        className="text-[#8888aa] hover:text-[#00d4ff] transition-colors"
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      {showTooltip && (
        <div className={`absolute z-50 ${positionClasses[position]}`}>
          <div className="glass-card border border-[#00d4ff] rounded-xl p-3 max-w-xs shadow-lg">
            <p className="text-sm text-[#e8e8ff] leading-relaxed">{content}</p>
          </div>
        </div>
      )}
    </div>
  )
}
