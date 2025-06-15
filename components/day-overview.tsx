"use client"

import { useState } from "react"
import type { SomaticDay } from "@/data/somatic-program"
import { SessionContentDisplay } from "./session-content-display"

interface DayOverviewProps {
  dayData: SomaticDay
  dayNumber: number
  userArchetype: string
  progress: { morning: boolean; midday: boolean; evening: boolean }
  onStartSession: (session: "morning" | "midday" | "evening") => void
}

export function DayOverview({ dayData, dayNumber, userArchetype, progress, onStartSession }: DayOverviewProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "morning" | "midday" | "evening">("overview")

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

  const getCompletionPercentage = () => {
    const completed = [progress.morning, progress.midday, progress.evening].filter(Boolean).length
    return Math.round((completed / 3) * 100)
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: "📋" },
    { id: "morning", label: "Morning", icon: "🌅", completed: progress.morning },
    { id: "midday", label: "Midday", icon: "⚡", completed: progress.midday },
    { id: "evening", label: "Evening", icon: "🌌", completed: progress.evening },
  ]

  return (
    <div className="day-overview">
      {/* Day Header */}
      <div className="glass-card p-6 mb-6 border-2" style={{ borderColor: getMasteryColor() }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div
              className="w-16 h-16 rounded-full border-2 flex items-center justify-center text-2xl"
              style={{
                borderColor: getMasteryColor(),
                backgroundColor: `${getMasteryColor()}22`,
                boxShadow: `0 0 20px ${getMasteryColor()}`,
              }}
            >
              {getMasteryIcon()}
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: getMasteryColor() }}>
                Day {dayNumber}: {dayData.theme}
              </h1>
              <p className="text-[#8888aa] text-lg">{dayData.focus}</p>
              <div className="flex items-center space-x-4 text-sm text-[#00d4ff] mt-2">
                <span className="capitalize">{dayData.masteryLevel} Level</span>
                <span>•</span>
                <span>{dayData.element} Element</span>
                <span>•</span>
                <span>Week {dayData.week}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl font-bold" style={{ color: getMasteryColor() }}>
              {getCompletionPercentage()}%
            </div>
            <div className="text-sm text-[#8888aa]">Complete</div>
            <div className="w-24 bg-[rgba(136,136,170,0.2)] rounded-full h-2 mt-2">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${getCompletionPercentage()}%`,
                  backgroundColor: getMasteryColor(),
                }}
              />
            </div>
          </div>
        </div>

        {/* Quantum Upgrade Notice */}
        {dayData.quantumUpgrade && (
          <div className="bg-[rgba(139,92,246,0.1)] border border-[#8b5cf6] rounded-xl p-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🌟</span>
              <div>
                <div className="font-bold text-[#8b5cf6]">QUANTUM UPGRADE AVAILABLE</div>
                <div className="text-[#e8e8ff] text-sm">{dayData.quantumUpgrade}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-bold transition-all duration-200 whitespace-nowrap ${
              activeTab === tab.id ? "scale-105" : "hover:scale-105"
            }`}
            style={{
              background:
                activeTab === tab.id ? `linear-gradient(135deg, ${getMasteryColor()}, #00d4ff)` : "rgba(20,20,32,0.8)",
              color: activeTab === tab.id ? "#0a0a0f" : "#e8e8ff",
              border: `2px solid ${activeTab === tab.id ? getMasteryColor() : "rgba(136,136,170,0.3)"}`,
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.completed && <span className="text-xs">✓</span>}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Day Summary */}
          <div className="glass-card p-6 border" style={{ borderColor: getMasteryColor() }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: getMasteryColor() }}>
              Today's Consciousness Evolution Journey
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl mb-2">🌅</div>
                <h4 className="font-bold text-[#00d4ff] mb-2">{dayData.sessions.morning.title}</h4>
                <p className="text-sm text-[#8888aa]">{dayData.sessions.morning.duration}</p>
                <div className="text-xs text-[#8888aa] mt-2">{dayData.sessions.morning.steps.length} steps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-bold text-[#00d4ff] mb-2">{dayData.sessions.midday.title}</h4>
                <p className="text-sm text-[#8888aa]">{dayData.sessions.midday.duration}</p>
                <div className="text-xs text-[#8888aa] mt-2">{dayData.sessions.midday.steps.length} steps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🌌</div>
                <h4 className="font-bold text-[#00d4ff] mb-2">{dayData.sessions.evening.title}</h4>
                <p className="text-sm text-[#8888aa]">{dayData.sessions.evening.duration}</p>
                <div className="text-xs text-[#8888aa] mt-2">{dayData.sessions.evening.steps.length} steps</div>
              </div>
            </div>
          </div>

          {/* Archetype Missions Overview */}
          {dayData.archetypeMissions[userArchetype] && (
            <div className="glass-card p-6 border" style={{ borderColor: getMasteryColor() }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: getMasteryColor() }}>
                Your {userArchetype.charAt(0).toUpperCase() + userArchetype.slice(1)} Missions Today
              </h3>
              <div className="grid gap-3">
                {dayData.archetypeMissions[userArchetype].map((mission, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 rounded-xl"
                    style={{
                      backgroundColor: `${getMasteryColor()}11`,
                      border: `1px solid ${getMasteryColor()}`,
                    }}
                  >
                    <span className="text-xl">🎯</span>
                    <div>
                      <div className="font-bold text-[#e8e8ff]">Mission {index + 1}</div>
                      <div className="text-[#8888aa] text-sm">{mission}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "morning" && (
        <SessionContentDisplay
          dayData={dayData}
          sessionType="morning"
          userArchetype={userArchetype}
          onStartSession={() => onStartSession("morning")}
        />
      )}

      {activeTab === "midday" && (
        <SessionContentDisplay
          dayData={dayData}
          sessionType="midday"
          userArchetype={userArchetype}
          onStartSession={() => onStartSession("midday")}
        />
      )}

      {activeTab === "evening" && (
        <SessionContentDisplay
          dayData={dayData}
          sessionType="evening"
          userArchetype={userArchetype}
          onStartSession={() => onStartSession("evening")}
        />
      )}
    </div>
  )
}
