"use client"

import { useState } from "react"
import type { SomaticDay, SomaticStep } from "@/data/somatic-program"

interface SessionContentDisplayProps {
  dayData: SomaticDay
  sessionType: "morning" | "midday" | "evening"
  userArchetype: string
  onStartSession: () => void
}

export function SessionContentDisplay({
  dayData,
  sessionType,
  userArchetype,
  onStartSession,
}: SessionContentDisplayProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)

  const session = dayData.sessions[sessionType]

  const getMasteryColor = () => {
    switch (dayData.masteryLevel) {
      case "foundation":
        return "#00ff88"
      case "activation":
        return "#00d4ff"
      case "integration":
        return "#ff0080"
      case "mastery":
        return "#ffaa00"
      case "transcendence":
        return "#8b5cf6"
      default:
        return "#00ff88"
    }
  }

  const getMasteryIcon = () => {
    switch (dayData.masteryLevel) {
      case "foundation":
        return "🌱"
      case "activation":
        return "⚡"
      case "integration":
        return "🔥"
      case "mastery":
        return "👑"
      case "transcendence":
        return "🌟"
      default:
        return "🌱"
    }
  }

  const getArchetypeContent = (step: SomaticStep, field: string) => {
    if (
      step.archetypeVariation &&
      step.archetypeVariation[userArchetype] &&
      step.archetypeVariation[userArchetype][field]
    ) {
      return step.archetypeVariation[userArchetype][field]
    }
    return step[field]
  }

  const getSessionIcon = () => {
    switch (sessionType) {
      case "morning":
        return "🌅"
      case "midday":
        return "⚡"
      case "evening":
        return "🌌"
    }
  }

  return (
    <div className="session-content-display glass-card p-6 mb-6 border-2" style={{ borderColor: getMasteryColor() }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getSessionIcon()}</span>
          <div>
            <h3 className="text-xl font-bold" style={{ color: getMasteryColor() }}>
              {session.title}
            </h3>
            <div className="text-sm text-[#8888aa]">
              {dayData.masteryLevel.toUpperCase()} • {session.duration} • {dayData.element} Element
            </div>
          </div>
        </div>

        <button
          onClick={onStartSession}
          className="px-6 py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${getMasteryColor()}, #00d4ff)`,
            color: "#0a0a0f",
          }}
        >
          {getMasteryIcon()} Start Session
        </button>
      </div>

      {/* Session Steps Preview */}
      <div className="space-y-4">
        {session.steps.map((step, index) => (
          <div
            key={index}
            className="border rounded-xl overflow-hidden transition-all duration-300"
            style={{
              borderColor: expandedStep === index ? getMasteryColor() : "rgba(136,136,170,0.3)",
              backgroundColor: expandedStep === index ? `${getMasteryColor()}11` : "rgba(20,20,32,0.5)",
            }}
          >
            <div
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => setExpandedStep(expandedStep === index ? null : index)}
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold"
                  style={{ borderColor: getMasteryColor(), color: getMasteryColor() }}
                >
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-bold text-[#e8e8ff]">{step.title}</h4>
                  <p className="text-sm text-[#8888aa]">{step.description}</p>
                </div>
              </div>
              <div className="text-[#8888aa]">{expandedStep === index ? "−" : "+"}</div>
            </div>

            {expandedStep === index && (
              <div className="px-4 pb-4 space-y-4">
                {/* Instructions */}
                {(getArchetypeContent(step, "instructions") || step.instructions) && (
                  <div>
                    <h5 className="font-bold text-sm mb-2" style={{ color: getMasteryColor() }}>
                      {userArchetype.charAt(0).toUpperCase() + userArchetype.slice(1)} Instructions:
                    </h5>
                    <ul className="text-[#e8e8ff] space-y-1 text-sm">
                      {(getArchetypeContent(step, "instructions") || step.instructions)?.map(
                        (instruction: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <span className="text-[#00d4ff] mr-2">•</span>
                            {instruction}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}

                {/* Affirmation */}
                {(getArchetypeContent(step, "affirmation") || step.affirmation) && (
                  <div className="bg-[rgba(255,0,128,0.1)] border border-[#ff0080] rounded-lg p-3">
                    <h5 className="font-bold text-[#ff0080] text-sm mb-1">Power Affirmation:</h5>
                    <p className="text-[#e8e8ff] italic">
                      "{getArchetypeContent(step, "affirmation") || step.affirmation}"
                    </p>
                  </div>
                )}

                {/* Visualization */}
                {(getArchetypeContent(step, "visualization") || step.visualization) && (
                  <div className="bg-[rgba(0,212,255,0.1)] border border-[#00d4ff] rounded-lg p-3">
                    <h5 className="font-bold text-[#00d4ff] text-sm mb-1">Visualization:</h5>
                    <p className="text-[#e8e8ff] text-sm">
                      {getArchetypeContent(step, "visualization") || step.visualization}
                    </p>
                  </div>
                )}

                {/* Duration */}
                {step.duration && <div className="text-xs text-[#8888aa]">Duration: {step.duration}</div>}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Archetype Missions for this day */}
      {dayData.archetypeMissions[userArchetype] && (
        <div className="mt-6 pt-6 border-t border-[rgba(136,136,170,0.3)]">
          <h4 className="font-bold mb-3" style={{ color: getMasteryColor() }}>
            Today's {userArchetype.charAt(0).toUpperCase() + userArchetype.slice(1)} Missions:
          </h4>
          <div className="space-y-2">
            {dayData.archetypeMissions[userArchetype].map((mission, index) => (
              <div
                key={index}
                className="flex items-start space-x-2 p-3 rounded-lg"
                style={{ backgroundColor: `${getMasteryColor()}11`, border: `1px solid ${getMasteryColor()}` }}
              >
                <span style={{ color: getMasteryColor() }}>🎯</span>
                <span className="text-[#e8e8ff] text-sm">{mission}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
