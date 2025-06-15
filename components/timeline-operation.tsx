"use client"

import { useState, useEffect } from "react"

interface Mission {
  id: string
  archetype: string
  action: string
  deadline: Date
  completed: boolean
  impact: number
}

interface TimelineOperationProps {
  mission: Mission
  onComplete: () => void
  quantumField: any
}

export function TimelineOperation({ mission, onComplete, quantumField }: TimelineOperationProps) {
  const [timeRemaining, setTimeRemaining] = useState("")
  const [urgencyLevel, setUrgencyLevel] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const deadline = new Date(mission.deadline).getTime()
      const remaining = deadline - now

      if (remaining <= 0) {
        setTimeRemaining("EXPIRED")
        setUrgencyLevel(10)
      } else {
        const hours = Math.floor(remaining / (1000 * 60 * 60))
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
        setTimeRemaining(`${hours}h ${minutes}m`)

        // Calculate urgency based on time remaining
        const totalTime = 24 * 60 * 60 * 1000 // 24 hours in ms
        const urgency = Math.max(0, 10 - Math.floor((remaining / totalTime) * 10))
        setUrgencyLevel(urgency)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [mission.deadline])

  const getUrgencyColor = () => {
    if (urgencyLevel >= 8) return "#ff0080"
    if (urgencyLevel >= 6) return "#ffaa00"
    if (urgencyLevel >= 4) return "#00d4ff"
    return "#00ff88"
  }

  const getArchetypeIcon = (archetype: string) => {
    const icons = {
      visionary: "🔮",
      creator: "✨",
      warrior: "⚔️",
      mystic: "🌟",
    }
    return icons[archetype as keyof typeof icons] || "🎯"
  }

  return (
    <div
      className="timeline-operation glass-card p-6 mb-8 border-2 relative overflow-hidden"
      style={{ borderColor: getUrgencyColor() }}
    >
      {/* Urgency Pulse Effect */}
      {urgencyLevel >= 7 && (
        <div className="absolute inset-0 animate-pulse opacity-20" style={{ backgroundColor: getUrgencyColor() }} />
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{getArchetypeIcon(mission.archetype)}</div>
            <div>
              <h3 className="text-xl font-bold" style={{ color: getUrgencyColor() }}>
                TIMELINE OPERATION
              </h3>
              <div className="text-sm text-[#8888aa]">{mission.archetype.toUpperCase()} PROTOCOL ACTIVE</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-lg font-bold font-mono" style={{ color: getUrgencyColor() }}>
              {timeRemaining}
            </div>
            <div className="text-xs text-[#8888aa]">REMAINING</div>
          </div>
        </div>

        {/* Mission Description */}
        <div
          className="border-2 rounded-xl p-4 mb-4"
          style={{
            borderColor: getUrgencyColor(),
            backgroundColor: `${getUrgencyColor()}11`,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-bold" style={{ color: getUrgencyColor() }}>
              MISSION DIRECTIVE
            </div>
            <div
              className="text-xs px-2 py-1 rounded-full"
              style={{
                backgroundColor: `${getUrgencyColor()}22`,
                color: getUrgencyColor(),
                border: `1px solid ${getUrgencyColor()}`,
              }}
            >
              PRIORITY {urgencyLevel}
            </div>
          </div>
          <div className="text-[#e8e8ff] font-semibold text-lg">{mission.action}</div>
          <div className="text-sm text-[#8888aa] mt-2">
            Impact: +{mission.impact} RMU • Quantum Field Amplification:{" "}
            {quantumField.synchronicityAmplification.toFixed(1)}x
          </div>
        </div>

        {/* Quantum Field Enhancement */}
        {quantumField.manifestationWindow && (
          <div className="bg-[rgba(255,0,128,0.1)] border border-[#ff0080] rounded-xl p-3 mb-4">
            <div className="text-sm text-[#ff0080] font-bold mb-1">⚡ MANIFESTATION WINDOW ACTIVE ⚡</div>
            <div className="text-xs text-[#e8e8ff]">
              Mission impact amplified by {Math.round(quantumField.realityMalleability)}%! Reality is highly malleable.
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onComplete}
            className="flex-1 font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${getUrgencyColor()}, #00ff88)`,
              color: "#0a0a0f",
            }}
          >
            ✅ MISSION ACCOMPLISHED
          </button>

          <button className="px-4 py-3 border-2 rounded-xl text-[#8888aa] border-[#8888aa] hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all duration-200">
            📝 LOG PROGRESS
          </button>
        </div>

        {/* Mission Tips */}
        <div className="mt-4 text-xs text-[#8888aa] text-center">
          💡 Tip: Complete missions during high coherence for maximum reality impact
        </div>
      </div>
    </div>
  )
}
