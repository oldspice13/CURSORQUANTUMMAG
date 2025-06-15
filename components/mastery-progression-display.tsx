"use client"

import { useState, useEffect } from "react"

interface MasteryProgressionProps {
  currentDay: number
  completedDays: number[]
  totalRmu: number
  archetype: string
}

export function MasteryProgressionDisplay({ currentDay, completedDays, totalRmu, archetype }: MasteryProgressionProps) {
  const [activePhase, setActivePhase] = useState(0)

  const phases = [
    {
      name: "Foundation",
      days: "1-14",
      icon: "🌱",
      color: "#00ff88",
      description: "Building the bedrock of consciousness mastery",
      abilities: ["Grounding mastery", "Breath control", "Heart coherence", "Energy awareness"],
      unlocked: currentDay >= 1,
    },
    {
      name: "Activation",
      days: "15-28",
      icon: "⚡",
      color: "#00d4ff",
      description: "Awakening dormant consciousness abilities",
      abilities: ["Flow state mastery", "Emotional alchemy", "Mental programming", "Reality sensing"],
      unlocked: currentDay >= 15,
    },
    {
      name: "Integration",
      days: "29-42",
      icon: "🔥",
      color: "#ff0080",
      description: "Unifying all systems into coherent power",
      abilities: ["Element mastery", "Timeline shifting", "Manifestation control", "Collective influence"],
      unlocked: currentDay >= 29,
    },
    {
      name: "Mastery",
      days: "43-56",
      icon: "👑",
      color: "#ffaa00",
      description: "Transcending ordinary human limitations",
      abilities: ["Reality manipulation", "Dimensional awareness", "Quantum healing", "Consciousness teaching"],
      unlocked: currentDay >= 43,
    },
    {
      name: "Transcendence",
      days: "57-60",
      icon: "🌟",
      color: "#8b5cf6",
      description: "Service to collective consciousness evolution",
      abilities: ["Planetary healing", "Collective awakening", "Dimensional bridging", "Cosmic consciousness"],
      unlocked: currentDay >= 57,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % phases.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const getCurrentPhase = () => {
    if (currentDay >= 57) return 4
    if (currentDay >= 43) return 3
    if (currentDay >= 29) return 2
    if (currentDay >= 15) return 1
    return 0
  }

  const currentPhaseIndex = getCurrentPhase()

  return (
    <div className="mastery-progression glass-card p-6 mb-8 border-2 border-[#8b5cf6]">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[#8b5cf6] mb-2">CONSCIOUSNESS EVOLUTION PATHWAY</h3>
        <div className="text-[#8888aa]">Your journey through the 5 phases of mastery</div>
      </div>

      {/* Phase Timeline */}
      <div className="relative mb-8">
        <div className="flex justify-between items-center">
          {phases.map((phase, index) => (
            <div key={index} className="flex flex-col items-center relative">
              {/* Connection Line */}
              {index < phases.length - 1 && (
                <div
                  className="absolute top-6 left-12 h-0.5 w-16 transition-all duration-1000"
                  style={{
                    backgroundColor: index < currentPhaseIndex ? phase.color : "rgba(136,136,170,0.3)",
                    boxShadow: index < currentPhaseIndex ? `0 0 10px ${phase.color}` : "none",
                  }}
                />
              )}

              {/* Phase Icon */}
              <div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl transition-all duration-500 ${
                  phase.unlocked ? "animate-pulse" : ""
                }`}
                style={{
                  borderColor: phase.unlocked ? phase.color : "rgba(136,136,170,0.3)",
                  backgroundColor: index === currentPhaseIndex ? `${phase.color}22` : "transparent",
                  boxShadow: phase.unlocked ? `0 0 20px ${phase.color}` : "none",
                }}
              >
                <span style={{ filter: phase.unlocked ? "none" : "grayscale(100%)" }}>{phase.icon}</span>
              </div>

              {/* Phase Info */}
              <div className="text-center mt-2">
                <div className="font-bold text-sm" style={{ color: phase.unlocked ? phase.color : "#8888aa" }}>
                  {phase.name}
                </div>
                <div className="text-xs text-[#8888aa]">{phase.days}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Phase Details */}
      <div
        className="border-2 rounded-xl p-6"
        style={{
          borderColor: phases[currentPhaseIndex].color,
          backgroundColor: `${phases[currentPhaseIndex].color}11`,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{phases[currentPhaseIndex].icon}</span>
            <div>
              <h4 className="text-xl font-bold" style={{ color: phases[currentPhaseIndex].color }}>
                {phases[currentPhaseIndex].name} Phase
              </h4>
              <div className="text-[#8888aa] text-sm">{phases[currentPhaseIndex].description}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-[#8888aa]">Progress</div>
            <div className="text-lg font-bold" style={{ color: phases[currentPhaseIndex].color }}>
              {Math.round(((currentDay - (currentPhaseIndex * 14 + 1)) / 14) * 100)}%
            </div>
          </div>
        </div>

        {/* Abilities Grid */}
        <div className="grid grid-cols-2 gap-3">
          {phases[currentPhaseIndex].abilities.map((ability, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 p-2 rounded-lg"
              style={{ backgroundColor: `${phases[currentPhaseIndex].color}22` }}
            >
              <span style={{ color: phases[currentPhaseIndex].color }}>✓</span>
              <span className="text-[#e8e8ff] text-sm">{ability}</span>
            </div>
          ))}
        </div>

        {/* Next Phase Preview */}
        {currentPhaseIndex < phases.length - 1 && (
          <div className="mt-4 pt-4 border-t border-[rgba(136,136,170,0.3)]">
            <div className="text-sm text-[#8888aa] mb-2">Next Phase Unlocks:</div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">{phases[currentPhaseIndex + 1].icon}</span>
              <span className="font-bold" style={{ color: phases[currentPhaseIndex + 1].color }}>
                {phases[currentPhaseIndex + 1].name}
              </span>
              <span className="text-[#8888aa]">- {phases[currentPhaseIndex + 1].description}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
