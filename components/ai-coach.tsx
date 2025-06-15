"use client"

import { useState, useEffect } from "react"

// 🤖 AI QUANTUM CONSCIOUSNESS COACH
export function QuantumAICoach() {
  const [coachMessage, setCoachMessage] = useState("")
  const [coachPersonality, setCoachPersonality] = useState("wise_sage")
  const [isTyping, setIsTyping] = useState(false)

  const personalities = {
    wise_sage: { name: "Sage Quantum", emoji: "🧙‍♂️", color: "#8b5cf6" },
    loving_guide: { name: "Heart Guide", emoji: "💖", color: "#ff0080" },
    cosmic_scientist: { name: "Dr. Cosmos", emoji: "🔬", color: "#00d4ff" },
    playful_mystic: { name: "Cosmic Jester", emoji: "🃏", color: "#00ff88" },
  }

  const generateCoachMessage = () => {
    const messages = [
      "I sense your consciousness expanding beautifully today. Your coherence patterns show remarkable growth! 🌟",
      "The quantum field is responding to your elevated state. Notice how synchronicities are increasing? ✨",
      "Your heart coherence just hit 94%! You're literally rewiring reality right now. Keep going! 💫",
      "I'm detecting some resistance in your energy field. Try the 4-7-8 breath to release and realign. 🌊",
      "Magnificent! Your manifestation frequency is perfectly aligned. The universe is listening intently. 🎯",
      "Your soul tribe's collective coherence is amplifying your personal field by 23%. Feel that support! 👥",
      "Time for a quantum leap! I recommend the Merkaba activation sequence for your next session. 🔺",
    ]

    return messages[Math.floor(Math.random() * messages.length)]
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true)
      setTimeout(() => {
        setCoachMessage(generateCoachMessage())
        setIsTyping(false)
      }, 2000)
    }, 30000) // New message every 30 seconds

    // Initial message
    setCoachMessage(generateCoachMessage())

    return () => clearInterval(interval)
  }, [])

  const currentPersonality = personalities[coachPersonality]

  return (
    <div className="ai-coach glass-card p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold" style={{ color: currentPersonality.color }}>
          {currentPersonality.emoji} AI Quantum Coach
        </h3>
        <select
          value={coachPersonality}
          onChange={(e) => setCoachPersonality(e.target.value)}
          className="bg-[rgba(20,20,32,0.8)] border border-[#00d4ff] rounded-xl px-3 py-1 text-[#e8e8ff] text-sm"
        >
          {Object.entries(personalities).map(([key, personality]) => (
            <option key={key} value={key}>
              {personality.emoji} {personality.name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-[rgba(139,92,246,0.1)] border border-[#8b5cf6] rounded-xl p-4 mb-4">
        {isTyping ? (
          <div className="flex items-center space-x-2">
            <div className="text-[#8b5cf6]">{currentPersonality.emoji}</div>
            <div className="text-[#8888aa]">
              <span className="animate-pulse">Analyzing your quantum field</span>
              <span className="animate-bounce">...</span>
            </div>
          </div>
        ) : (
          <div className="flex items-start space-x-3">
            <div className="text-2xl">{currentPersonality.emoji}</div>
            <div>
              <div className="text-sm font-bold" style={{ color: currentPersonality.color }}>
                {currentPersonality.name}
              </div>
              <div className="text-[#e8e8ff] text-sm leading-relaxed mt-1">{coachMessage}</div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button className="bg-[rgba(0,255,136,0.2)] border border-[#00ff88] rounded-xl py-2 text-xs font-bold text-[#00ff88] hover:bg-[rgba(0,255,136,0.3)] transition-all duration-200">
          💡 Get Insight
        </button>
        <button className="bg-[rgba(0,212,255,0.2)] border border-[#00d4ff] rounded-xl py-2 text-xs font-bold text-[#00d4ff] hover:bg-[rgba(0,212,255,0.3)] transition-all duration-200">
          🎯 Optimize
        </button>
        <button className="bg-[rgba(255,0,128,0.2)] border border-[#ff0080] rounded-xl py-2 text-xs font-bold text-[#ff0080] hover:bg-[rgba(255,0,128,0.3)] transition-all duration-200">
          🚀 Accelerate
        </button>
      </div>
    </div>
  )
}
