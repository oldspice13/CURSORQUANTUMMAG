"use client"

import { useState } from "react"
import { ArrowRight, ArrowLeft } from "lucide-react"

interface OnboardingModalProps {
  show: boolean
  onComplete: (data: { identity: string; goal: string; onboarding: boolean }) => void
}

export function OnboardingModal({ show, onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(1)
  const [selectedArchetype, setSelectedArchetype] = useState("")
  const [goal, setGoal] = useState("")

  if (!show) return null

  const archetypes = [
    {
      id: "visionary",
      name: "Quantum Visionary",
      icon: "🔮",
      color: "#8b5cf6",
      description: "Master of timeline perception and reality architecture",
      traits: ["Future sight", "Pattern recognition", "Timeline shifting", "Quantum intuition"],
    },
    {
      id: "creator",
      name: "Reality Creator",
      icon: "✨",
      color: "#00ff88",
      description: "Master of manifestation and dimensional building",
      traits: ["Creative flow", "Matter shaping", "Reality sculpting", "Dimensional creation"],
    },
    {
      id: "warrior",
      name: "Consciousness Warrior",
      icon: "⚔️",
      color: "#ff0080",
      description: "Master of limitation destruction and reality conquest",
      traits: ["Fear dissolution", "Boundary breaking", "Unstoppable force", "Reality domination"],
    },
    {
      id: "mystic",
      name: "Divine Mystic",
      icon: "🌟",
      color: "#00d4ff",
      description: "Master of cosmic consciousness and divine connection",
      traits: ["Divine reception", "Cosmic bridging", "Universal healing", "Sacred service"],
    },
  ]

  const handleComplete = () => {
    if (selectedArchetype && goal) {
      onComplete({
        identity: selectedArchetype,
        goal,
        onboarding: true,
      })
    }
  }

  const selectedArchetypeData = archetypes.find((a) => a.id === selectedArchetype)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[100] p-4">
      <div className="glass-card border-2 border-[#8b5cf6] rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🌟</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#ff0080] bg-clip-text text-transparent mb-2">
            Welcome to Quantum Magnetism
          </h1>
          <p className="text-[#8888aa] text-lg">Your 60-day consciousness evolution journey begins now</p>
        </div>

        {/* Step 1: Archetype Selection */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-[#e8e8ff] mb-6 text-center">Choose Your Consciousness Archetype</h2>
            <p className="text-[#8888aa] text-center mb-8">
              Your archetype determines your unique path through the quantum field
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {archetypes.map((archetype) => (
                <div
                  key={archetype.id}
                  className={`archetype-card border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedArchetype === archetype.id ? "ring-2" : ""
                  }`}
                  style={{
                    borderColor: selectedArchetype === archetype.id ? archetype.color : "rgba(136,136,170,0.3)",
                    backgroundColor: selectedArchetype === archetype.id ? `${archetype.color}11` : "rgba(20,20,32,0.5)",
                    ringColor: archetype.color,
                  }}
                  onClick={() => setSelectedArchetype(archetype.id)}
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{archetype.icon}</div>
                    <h3 className="text-xl font-bold text-[#e8e8ff] mb-2">{archetype.name}</h3>
                    <p className="text-sm text-[#8888aa]">{archetype.description}</p>
                  </div>

                  <div className="space-y-2">
                    {archetype.traits.map((trait, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span style={{ color: archetype.color }}>•</span>
                        <span className="text-sm text-[#e8e8ff]">{trait}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setStep(2)}
                disabled={!selectedArchetype}
                className="flex items-center space-x-2 px-8 py-4 rounded-xl font-bold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: selectedArchetype
                    ? `linear-gradient(135deg, ${selectedArchetypeData?.color}, #8b5cf6)`
                    : "rgba(136,136,170,0.3)",
                  color: selectedArchetype ? "#0a0a0f" : "#8888aa",
                }}
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Goal Setting */}
        {step === 2 && (
          <div>
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">{selectedArchetypeData?.icon}</div>
              <h2 className="text-2xl font-bold text-[#e8e8ff] mb-2">Welcome, {selectedArchetypeData?.name}</h2>
              <p className="text-[#8888aa]">Set your transformation intention for the next 60 days</p>
            </div>

            <div className="max-w-2xl mx-auto mb-8">
              <label className="block text-[#e8e8ff] font-bold mb-4">
                What do you want to achieve through this consciousness evolution journey?
              </label>
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="I want to develop my intuitive abilities and create a life of purpose and abundance..."
                className="w-full h-32 p-4 bg-[rgba(20,20,32,0.8)] border rounded-xl text-[#e8e8ff] placeholder-[#8888aa] resize-none"
                style={{ borderColor: selectedArchetypeData?.color }}
              />
              <p className="text-xs text-[#8888aa] mt-2">
                Be specific about your desires. The quantum field responds to clear intention.
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setStep(1)}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl border-2 border-[#8888aa] text-[#8888aa] font-bold hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <button
                onClick={handleComplete}
                disabled={!goal.trim()}
                className="flex items-center space-x-2 px-8 py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: goal.trim()
                    ? `linear-gradient(135deg, ${selectedArchetypeData?.color}, #8b5cf6)`
                    : "rgba(136,136,170,0.3)",
                  color: goal.trim() ? "#0a0a0f" : "#8888aa",
                }}
              >
                <span>Begin Journey</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
