"use client"

import type { AppState } from "@/app/page"
import { SectionExplainer } from "@/components/section-explainer"
import { HelpTooltip } from "@/components/help-tooltip"

interface StatsPanelProps {
  totalRmu: number
  achievements: number
  progress: AppState["dailyProgress"][number]
  streak: number
  completedDays: number
}

export function StatsPanel({ totalRmu, achievements, progress, streak, completedDays }: StatsPanelProps) {
  const todayComplete = progress?.morning && progress?.midday && progress?.evening
  const completionPercentage = Math.round((completedDays / 60) * 100)

  const stats = [
    {
      label: "Coherence Streak",
      value: `${streak} days`,
      icon: "🔥",
      color: "#ff0080",
      description: "Consecutive days of practice",
    },
    {
      label: "Quantum RMU",
      value: totalRmu.toLocaleString(),
      icon: "⚡",
      color: "#00d4ff",
      description: "Reality Manipulation Units earned",
    },
    {
      label: "Achievements",
      value: achievements,
      icon: "🏆",
      color: "#ffaa00",
      description: "Milestones unlocked",
    },
    {
      label: "Journey Progress",
      value: `${completionPercentage}%`,
      icon: "🎯",
      color: "#8b5cf6",
      description: "Overall completion",
    },
    {
      label: "Days Mastered",
      value: `${completedDays}/60`,
      icon: "✨",
      color: "#00ff88",
      description: "Complete days achieved",
    },
    {
      label: "Today's Status",
      value: todayComplete ? "Complete" : "In Progress",
      icon: todayComplete ? "💫" : "🌱",
      color: todayComplete ? "#00ff88" : "#ffaa00",
      description: "Current day progress",
    },
  ]

  return (
    <SectionExplainer
      title="Consciousness Evolution Metrics"
      description="Track your transformation with key performance indicators"
      icon="📊"
      helpContent={{
        whatIs:
          "These metrics track your consciousness evolution journey. Each number represents a different aspect of your growth and mastery.",
        howToUse:
          "Check these daily to see your progress. Focus on consistency (streak) and engagement (RMU) rather than perfection.",
        whyImportant:
          "Tracking progress helps maintain motivation and shows you concrete evidence of your transformation. The numbers reflect real changes in your consciousness.",
        tips: [
          "Aim for consistency over intensity - a 7-day streak is more valuable than sporadic high-RMU days",
          "RMU (Reality Manipulation Units) increase as you complete sessions and log evidence",
          "Achievements unlock automatically as you hit milestones",
          "Your completion percentage shows overall journey progress",
        ],
      }}
    >
      <div className="stats-panel" id="stats-panel">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="stat-card glass-card border rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-[0_0_32px_8px_rgba(0,212,255,0.3)]"
              style={{ borderColor: stat.color }}
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-2xl font-bold mb-2 font-mono" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="text-[#8888aa] text-sm uppercase tracking-wider font-semibold">{stat.label}</div>
                <HelpTooltip content={stat.description} />
              </div>
              <div className="text-xs text-[#666677] mt-1">{stat.description}</div>

              {stat.label === "Journey Progress" && (
                <div className="mt-3">
                  <div className="w-full bg-[rgba(136,136,170,0.2)] rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-1000"
                      style={{
                        width: `${completionPercentage}%`,
                        backgroundColor: stat.color,
                      }}
                    />
                  </div>
                </div>
              )}

              {stat.label === "Today's Status" && (
                <div className="mt-3 flex justify-center space-x-1">
                  <div
                    className={`w-2 h-2 rounded-full ${progress?.morning ? "bg-[#00ff88]" : "bg-[rgba(136,136,170,0.3)]"}`}
                  />
                  <div
                    className={`w-2 h-2 rounded-full ${progress?.midday ? "bg-[#00ff88]" : "bg-[rgba(136,136,170,0.3)]"}`}
                  />
                  <div
                    className={`w-2 h-2 rounded-full ${progress?.evening ? "bg-[#00ff88]" : "bg-[rgba(136,136,170,0.3)]"}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="glass-card border border-[#00ff88] rounded-xl p-4">
            <h3 className="font-bold text-[#00ff88] mb-2">🚀 Momentum Analysis</h3>
            <p className="text-sm text-[#e8e8ff]">
              {streak >= 7
                ? `Incredible! ${streak} days of consistent practice is building powerful neural pathways.`
                : streak >= 3
                  ? `Great momentum! ${streak} days in a row. Keep the energy flowing.`
                  : "Build momentum with daily practice. Consistency creates transformation."}
            </p>
          </div>

          <div className="glass-card border border-[#00d4ff] rounded-xl p-4">
            <h3 className="font-bold text-[#00d4ff] mb-2">⚡ Power Level</h3>
            <p className="text-sm text-[#e8e8ff]">
              {totalRmu >= 10000
                ? "Master level consciousness achieved! You're operating at quantum frequencies."
                : totalRmu >= 5000
                  ? "Advanced practitioner! Your reality manipulation abilities are strong."
                  : totalRmu >= 1000
                    ? "Solid foundation built. Your consciousness is expanding rapidly."
                    : "Beginning your journey. Every session builds your quantum power."}
            </p>
          </div>
        </div>
      </div>
    </SectionExplainer>
  )
}
