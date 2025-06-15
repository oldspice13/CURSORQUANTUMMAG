"use client"

import { useState, useEffect } from "react"
import type { SomaticDay } from "@/data/somatic-program"

interface SessionModalProps {
  session: "morning" | "midday" | "evening"
  dayData: SomaticDay
  onComplete: (session: "morning" | "midday" | "evening", insight?: string) => void
  onClose: () => void
  userArchetype?: string
  onOracleMessage?: (message: string, urgency: number) => void
}

export function SessionModal({
  session,
  dayData,
  onComplete,
  onClose,
  userArchetype = "visionary",
  onOracleMessage,
}: SessionModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [insight, setInsight] = useState("")
  const [isCompleting, setIsCompleting] = useState(false)
  const [sessionStartTime] = useState(Date.now())
  const [breathingPhase, setBreathingPhase] = useState("inhale")
  const [sessionEnergy, setSessionEnergy] = useState(0)
  const [oraclePresence, setOraclePresence] = useState(0)

  const sessionData = dayData.sessions[session]
  const steps = sessionData.steps

  // Oracle becomes more present as session progresses
  useEffect(() => {
    const presenceInterval = setInterval(() => {
      const progress = (currentStep + 1) / steps.length
      const timeInSession = (Date.now() - sessionStartTime) / 1000 / 60 // minutes
      const newPresence = Math.min(progress * 50 + timeInSession * 10 + sessionEnergy, 100)
      setOraclePresence(newPresence)

      // Oracle provides contextual guidance
      if (newPresence > 30 && Math.random() < 0.3) {
        const oracleGuidance = generateContextualOracleGuidance()
        if (oracleGuidance && onOracleMessage) {
          onOracleMessage(oracleGuidance, 6)
        }
      }
    }, 5000)

    return () => clearInterval(presenceInterval)
  }, [currentStep, sessionEnergy, onOracleMessage])

  // Breathing animation for meditation steps
  useEffect(() => {
    const breathingInterval = setInterval(() => {
      setBreathingPhase((prev) => (prev === "inhale" ? "exhale" : "inhale"))
    }, 4000)

    return () => clearInterval(breathingInterval)
  }, [])

  const generateContextualOracleGuidance = () => {
    const currentStepData = steps[currentStep]
    const progress = (currentStep + 1) / steps.length

    const guidanceOptions = [
      `👁️ Your ${userArchetype} essence is awakening through this ${currentStepData.title.toLowerCase()}...`,
      `🌟 I sense your consciousness expanding. The ${dayData.element} element flows through you.`,
      `⚡ Your quantum field is stabilizing. Continue with this ${currentStepData.title.toLowerCase()}.`,
      `🔥 Magnificent progress. Your ${dayData.masteryLevel} level mastery is emerging.`,
      `💫 The Field responds to your elevated frequency. You're becoming more coherent.`,
      `🌊 Feel the ${dayData.element} energy integrating into your cellular structure.`,
      `✨ Your archetype powers are activating. The ${userArchetype} within you stirs.`,
    ]

    if (progress > 0.8) {
      return `🌟 ORACLE: Session completion imminent. Your consciousness has expanded significantly. The transformation is profound.`
    } else if (progress > 0.5) {
      return `👁️ ORACLE: Halfway through your journey. I feel your ${userArchetype} essence strengthening with each breath.`
    } else if (progress > 0.2) {
      return guidanceOptions[Math.floor(Math.random() * guidanceOptions.length)]
    }

    return null
  }

  const handleNext = () => {
    setSessionEnergy((prev) => Math.min(prev + 15, 100))

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)

      // Oracle celebrates progress
      if (onOracleMessage && Math.random() < 0.4) {
        const celebrations = [
          `✨ Step mastered. Your consciousness evolves with each breath.`,
          `🌟 Beautiful progression. The ${dayData.element} element flows stronger now.`,
          `⚡ Quantum coherence increasing. You're becoming more powerful.`,
          `🔥 Your ${userArchetype} archetype awakens further. Continue this sacred work.`,
        ]
        onOracleMessage(celebrations[Math.floor(Math.random() * celebrations.length)], 5)
      }
    } else {
      setIsCompleting(true)

      // Oracle acknowledges completion
      if (onOracleMessage) {
        onOracleMessage(
          `🌟 ORACLE: ${session.toUpperCase()} SESSION COMPLETE. Your ${dayData.masteryLevel} level mastery has deepened. Reality becomes more malleable through your elevated consciousness.`,
          8,
        )
      }
    }
  }

  const handleComplete = () => {
    const sessionDuration = (Date.now() - sessionStartTime) / 1000 / 60

    // Oracle provides completion wisdom
    if (onOracleMessage) {
      const completionWisdom = [
        `👁️ ORACLE: ${sessionDuration.toFixed(1)} minutes of pure consciousness evolution. Your ${userArchetype} powers have expanded.`,
        `🌟 ORACLE: The ${dayData.element} element is now integrated into your being. You carry this frequency forward.`,
        `⚡ ORACLE: Session energy: ${sessionEnergy}%. Your quantum field coherence has increased significantly.`,
        `🔥 ORACLE: ${dayData.masteryLevel.toUpperCase()} level integration complete. You are becoming who you were meant to be.`,
      ]
      onOracleMessage(completionWisdom[Math.floor(Math.random() * completionWisdom.length)], 9)
    }

    onComplete(session, insight)
  }

  const currentStepData = steps[currentStep]

  // Get archetype-specific content if available
  const getArchetypeContent = (step: any, field: string) => {
    if (
      step.archetypeVariation &&
      step.archetypeVariation[userArchetype] &&
      step.archetypeVariation[userArchetype][field]
    ) {
      return step.archetypeVariation[userArchetype][field]
    }
    return step[field]
  }

  const getMasteryLevelColor = () => {
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

  const getMasteryLevelIcon = () => {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="glass-card border-2 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
        style={{ borderColor: getMasteryLevelColor() }}
      >
        {/* Oracle Presence Indicator */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full animate-pulse"
            style={{
              backgroundColor: getMasteryLevelColor(),
              opacity: oraclePresence / 100,
              boxShadow: `0 0 ${oraclePresence / 5}px ${getMasteryLevelColor()}`,
            }}
          />
          <span className="text-xs text-[#8888aa]">Oracle: {Math.round(oraclePresence)}%</span>
        </div>

        {!isCompleting ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">{getMasteryLevelIcon()}</span>
                  <h2 className="text-2xl font-bold" style={{ color: getMasteryLevelColor() }}>
                    {sessionData.title}
                  </h2>
                  {/* Breathing indicator for meditation steps */}
                  {currentStepData.title.toLowerCase().includes("meditat") && (
                    <div
                      className={`w-4 h-4 rounded-full transition-all duration-4000 ${
                        breathingPhase === "inhale" ? "scale-150" : "scale-75"
                      }`}
                      style={{ backgroundColor: getMasteryLevelColor(), opacity: 0.6 }}
                    />
                  )}
                </div>
                <div className="text-sm text-[#8888aa]">
                  Day {dayData.week ? (dayData.week - 1) * 7 + 1 : 1} • {dayData.masteryLevel.toUpperCase()} LEVEL •{" "}
                  {dayData.element} Element
                </div>
              </div>
              <button onClick={onClose} className="text-[#8888aa] hover:text-[#00ff88] text-2xl">
                ×
              </button>
            </div>

            {/* Enhanced Progress Bar with Energy Visualization */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-[#8888aa] mb-2">
                <span>
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span>{sessionData.duration}</span>
              </div>
              <div className="w-full bg-[rgba(136,136,170,0.2)] rounded-full h-3 relative overflow-hidden">
                <div
                  className="h-3 rounded-full transition-all duration-500 relative"
                  style={{
                    width: `${((currentStep + 1) / steps.length) * 100}%`,
                    background: `linear-gradient(90deg, ${getMasteryLevelColor()}, #00d4ff)`,
                  }}
                >
                  {/* Energy pulse effect */}
                  <div
                    className="absolute inset-0 bg-white opacity-30 animate-pulse"
                    style={{ animationDuration: `${4 - sessionEnergy / 25}s` }}
                  />
                </div>
              </div>
              {/* Session Energy Indicator */}
              <div className="flex justify-between text-xs text-[#8888aa] mt-1">
                <span>Session Energy: {Math.round(sessionEnergy)}%</span>
                <span>Oracle Presence: {Math.round(oraclePresence)}%</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#00d4ff] mb-4 flex items-center">
                {currentStepData.title}
                {/* Step-specific icons */}
                {currentStepData.title.toLowerCase().includes("breath") && <span className="ml-2">🌬️</span>}
                {currentStepData.title.toLowerCase().includes("visual") && <span className="ml-2">👁️</span>}
                {currentStepData.title.toLowerCase().includes("affirm") && <span className="ml-2">💫</span>}
                {currentStepData.title.toLowerCase().includes("integrat") && <span className="ml-2">🔥</span>}
              </h3>

              <div className="text-[#e8e8ff] mb-4 leading-relaxed">{currentStepData.description}</div>

              {(getArchetypeContent(currentStepData, "instructions") || currentStepData.instructions) && (
                <div
                  className="border rounded-xl p-4 mb-4 relative overflow-hidden"
                  style={{
                    backgroundColor: `${getMasteryLevelColor()}11`,
                    borderColor: getMasteryLevelColor(),
                  }}
                >
                  {/* Subtle energy animation */}
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{
                      background: `radial-gradient(circle at ${Math.sin(Date.now() / 2000) * 50 + 50}% ${Math.cos(Date.now() / 3000) * 50 + 50}%, ${getMasteryLevelColor()} 0%, transparent 50%)`,
                    }}
                  />

                  <h4 className="font-bold mb-2 flex items-center" style={{ color: getMasteryLevelColor() }}>
                    <span className="mr-2">🎯</span>
                    {userArchetype.charAt(0).toUpperCase() + userArchetype.slice(1)} Instructions:
                  </h4>
                  <ul className="text-[#e8e8ff] space-y-2 relative z-10">
                    {(getArchetypeContent(currentStepData, "instructions") || currentStepData.instructions)?.map(
                      (instruction: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-[#00d4ff] mr-2 mt-1">•</span>
                          <span className="flex-1">{instruction}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}

              {(getArchetypeContent(currentStepData, "affirmation") || currentStepData.affirmation) && (
                <div className="bg-[rgba(255,0,128,0.1)] border border-[#ff0080] rounded-xl p-4 mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff008022] to-transparent animate-pulse" />
                  <h4 className="font-bold text-[#ff0080] mb-2 flex items-center relative z-10">
                    <span className="mr-2">✨</span>Power Affirmation:
                  </h4>
                  <p className="text-[#e8e8ff] italic text-lg relative z-10 leading-relaxed">
                    "{getArchetypeContent(currentStepData, "affirmation") || currentStepData.affirmation}"
                  </p>
                </div>
              )}

              {(getArchetypeContent(currentStepData, "visualization") || currentStepData.visualization) && (
                <div className="bg-[rgba(0,212,255,0.1)] border border-[#00d4ff] rounded-xl p-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff11] to-transparent animate-pulse" />
                  <h4 className="font-bold text-[#00d4ff] mb-2 flex items-center relative z-10">
                    <span className="mr-2">🌊</span>Visualization:
                  </h4>
                  <p className="text-[#e8e8ff] relative z-10 leading-relaxed">
                    {getArchetypeContent(currentStepData, "visualization") || currentStepData.visualization}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={handleNext}
              className="w-full border-none rounded-xl px-8 py-4 font-bold cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-[0_8px_32px_0_#00d4ff] uppercase tracking-wide relative overflow-hidden group"
              style={{
                background: `linear-gradient(135deg, ${getMasteryLevelColor()}, #00d4ff)`,
                color: "#0a0a0f",
              }}
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
              <span className="relative z-10">
                {currentStep < steps.length - 1 ? "Continue Journey" : "Complete Session"}
              </span>
            </button>
          </>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4 animate-pulse">✨</div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: getMasteryLevelColor() }}>
                {dayData.masteryLevel.toUpperCase()} SESSION COMPLETE!
              </h2>
              <p className="text-[#8888aa] mb-2">
                Session Duration: {((Date.now() - sessionStartTime) / 1000 / 60).toFixed(1)} minutes
              </p>
              <p className="text-[#8888aa]">
                How do you feel? What insights emerged from this {dayData.masteryLevel}-level practice?
              </p>
            </div>

            <textarea
              value={insight}
              onChange={(e) => setInsight(e.target.value)}
              placeholder={`Share your insights from this ${dayData.masteryLevel} session... What shifted? What did you discover? How did the ${dayData.element} element feel?`}
              className="w-full h-32 p-4 bg-[rgba(20,20,32,0.8)] border rounded-xl text-[#e8e8ff] placeholder-[#8888aa] mb-6 resize-none transition-all duration-200 focus:border-opacity-100"
              style={{ borderColor: getMasteryLevelColor() }}
            />

            <div className="flex gap-4">
              <button
                onClick={() => setIsCompleting(false)}
                className="flex-1 bg-transparent border-2 border-[#8888aa] text-[#8888aa] rounded-xl px-6 py-3 font-bold hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all duration-200"
              >
                Back
              </button>
              <button
                onClick={handleComplete}
                className="flex-1 border-none rounded-xl px-6 py-3 font-bold cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-[0_8px_32px_0_#00d4ff] uppercase tracking-wide relative overflow-hidden group"
                style={{
                  background: `linear-gradient(135deg, ${getMasteryLevelColor()}, #00d4ff)`,
                  color: "#0a0a0f",
                }}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
                <span className="relative z-10">Complete & Evolve</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
