"use client"

import { useState } from "react"

interface EmbodimentSession {
  id: string
  practice: string
  category: string
  intensity: number
  insights: string
  timestamp: Date
  duration: number
}

interface EmbodimentProgressTrackerProps {
  embodimentSessions: EmbodimentSession[]
  archetype: string
}

export function EmbodimentProgressTracker({ embodimentSessions, archetype }: EmbodimentProgressTrackerProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"week" | "month" | "all">("week")

  const getFilteredSessions = () => {
    const now = new Date()
    const cutoff =
      selectedTimeframe === "week"
        ? new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        : selectedTimeframe === "month"
          ? new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          : new Date(0)

    return embodimentSessions.filter((session) => new Date(session.timestamp) >= cutoff)
  }

  const getCategoryStats = () => {
    const sessions = getFilteredSessions()
    const categories = ["breathwork", "movement", "energy", "grounding", "integration"]

    return categories.map((category) => {
      const categorySessions = sessions.filter((s) => s.category === category)
      const totalIntensity = categorySessions.reduce((sum, s) => sum + s.intensity, 0)
      const avgIntensity = categorySessions.length > 0 ? totalIntensity / categorySessions.length : 0
      const totalDuration = categorySessions.reduce((sum, s) => sum + s.duration, 0)

      return {
        category,
        sessions: categorySessions.length,
        avgIntensity: Math.round(avgIntensity * 10) / 10,
        totalDuration,
        progress: Math.min((categorySessions.length / 10) * 100, 100), // Max 10 sessions per category for 100%
      }
    })
  }

  const getEmbodimentLevel = () => {
    const totalSessions = embodimentSessions.length
    const totalIntensity = embodimentSessions.reduce((sum, s) => sum + s.intensity, 0)
    const avgIntensity = totalSessions > 0 ? totalIntensity / totalSessions : 0

    const level = Math.floor((totalSessions * avgIntensity) / 10)
    return Math.min(level, 100)
  }

  const getEmbodimentTitle = () => {
    const level = getEmbodimentLevel()
    if (level < 10) return "Embodiment Initiate"
    if (level < 25) return "Somatic Explorer"
    if (level < 50) return "Body-Mind Integrator"
    if (level < 75) return "Consciousness Embodier"
    return "Quantum Embodiment Master"
  }

  const categories = [
    { id: "breathwork", name: "Breathwork", icon: "🌬️", color: "#00d4ff" },
    { id: "movement", name: "Movement", icon: "💃", color: "#ff0080" },
    { id: "energy", name: "Energy Work", icon: "⚡", color: "#ffaa00" },
    { id: "grounding", name: "Grounding", icon: "🌍", color: "#00ff88" },
    { id: "integration", name: "Integration", icon: "🌟", color: "#8b5cf6" },
  ]

  const categoryStats = getCategoryStats()
  const recentSessions = getFilteredSessions().slice(0, 5)

  return (
    <div className="embodiment-progress-tracker glass-card p-6 mb-6 border-2 border-[#8b5cf6]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#8b5cf6] mb-2">📊 Embodiment Progress</h2>
          <p className="text-[#8888aa]">Track your somatic integration journey</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-[#8888aa]">Embodiment Level</div>
          <div className="text-2xl font-bold text-[#8b5cf6]">{getEmbodimentLevel()}</div>
          <div className="text-xs text-[#8888aa]">{getEmbodimentTitle()}</div>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex space-x-2 mb-6">
        {[
          { id: "week", label: "This Week" },
          { id: "month", label: "This Month" },
          { id: "all", label: "All Time" },
        ].map((timeframe) => (
          <button
            key={timeframe.id}
            onClick={() => setSelectedTimeframe(timeframe.id as any)}
            className={`px-4 py-2 rounded-xl font-bold transition-all duration-200 ${
              selectedTimeframe === timeframe.id ? "scale-105" : "hover:scale-105"
            }`}
            style={{
              background:
                selectedTimeframe === timeframe.id ? "linear-gradient(135deg, #8b5cf6, #00d4ff)" : "rgba(20,20,32,0.8)",
              color: selectedTimeframe === timeframe.id ? "#0a0a0f" : "#e8e8ff",
              border: `2px solid ${selectedTimeframe === timeframe.id ? "#8b5cf6" : "rgba(136,136,170,0.3)"}`,
            }}
          >
            {timeframe.label}
          </button>
        ))}
      </div>

      {/* Category Progress */}
      <div className="grid md:grid-cols-5 gap-4 mb-6">
        {categoryStats.map((stat) => {
          const category = categories.find((c) => c.id === stat.category)!
          return (
            <div
              key={stat.category}
              className="category-stat border rounded-xl p-4 text-center"
              style={{
                borderColor: category.color,
                backgroundColor: `${category.color}11`,
              }}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="font-bold text-[#e8e8ff] text-sm mb-1">{category.name}</div>
              <div className="text-xs text-[#8888aa] mb-2">{stat.sessions} sessions</div>

              <div className="w-full bg-[rgba(136,136,170,0.2)] rounded-full h-2 mb-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${stat.progress}%`,
                    backgroundColor: category.color,
                  }}
                />
              </div>

              <div className="text-xs" style={{ color: category.color }}>
                Avg Intensity: {stat.avgIntensity}/10
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Sessions */}
      {recentSessions.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-[#8b5cf6] mb-4">Recent Embodiment Sessions</h3>
          <div className="space-y-3">
            {recentSessions.map((session) => {
              const category = categories.find((c) => c.id === session.category)!
              return (
                <div
                  key={session.id}
                  className="session-item border rounded-xl p-4"
                  style={{
                    borderColor: category.color,
                    backgroundColor: `${category.color}11`,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{category.icon}</span>
                      <div>
                        <div className="font-bold text-[#e8e8ff]">{session.practice}</div>
                        <div className="text-sm text-[#8888aa]">
                          {new Date(session.timestamp).toLocaleDateString()} • Intensity {session.intensity}/10 •
                          {session.duration} min
                        </div>
                      </div>
                    </div>
                  </div>

                  {session.insights && (
                    <div className="mt-3 p-3 rounded-lg bg-[rgba(20,20,32,0.5)]">
                      <div className="text-xs text-[#8888aa] mb-1">INSIGHTS:</div>
                      <div className="text-sm text-[#e8e8ff] italic">"{session.insights}"</div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* No Sessions Message */}
      {embodimentSessions.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🧘‍♀️</div>
          <div className="text-[#8888aa] mb-2">No embodiment sessions yet</div>
          <div className="text-sm text-[#666677]">Start your somatic integration journey above</div>
        </div>
      )}
    </div>
  )
}
