"use client"

import { useEffect, useState } from "react"

interface AchievementPopupProps {
  show: boolean
  achievement: string
  onClose: () => void
}

export function AchievementPopup({ show, achievement, onClose }: AchievementPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300) // Wait for animation to complete
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  const getAchievementData = (key: string) => {
    // Parse achievement key to get meaningful data
    if (key.includes("day_") && key.includes("_complete")) {
      const day = key.match(/day_(\d+)_complete/)?.[1]
      return {
        title: `Day ${day} Mastered!`,
        description: "Complete consciousness evolution protocol achieved",
        icon: "🎉",
        rmu: 500,
      }
    }
    if (key.includes("morning_day_")) {
      const day = key.match(/morning_day_(\d+)/)?.[1]
      return {
        title: "Morning Activation Complete",
        description: `Day ${day} morning session mastered`,
        icon: "🌅",
        rmu: 150,
      }
    }
    if (key.includes("evening_day_")) {
      const day = key.match(/evening_day_(\d+)/)?.[1]
      return {
        title: "Evening Integration Complete",
        description: `Day ${day} evening session mastered`,
        icon: "🌌",
        rmu: 200,
      }
    }
    if (key.includes("archetype_evolution_")) {
      const level = key.match(/archetype_evolution_(\d+)/)?.[1]
      return {
        title: `Archetype Evolution Level ${level}!`,
        description: "Your consciousness has transcended to a new level",
        icon: "🌟",
        rmu: 1000,
      }
    }
    if (key.includes("skill_unlock_")) {
      return {
        title: "New Skill Unlocked!",
        description: "Your mastery expands with new abilities",
        icon: "⚡",
        rmu: 250,
      }
    }

    // Default achievement
    return {
      title: "Achievement Unlocked!",
      description: "You've reached a new milestone in your journey",
      icon: "🏆",
      rmu: 100,
    }
  }

  const achievementData = getAchievementData(achievement)

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[200] transition-all duration-500 ease-out ${
        isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
      }`}
    >
      <div className="glass-card border-2 border-[#00ff88] rounded-3xl p-8 text-center shadow-[0_0_64px_8px_#00d4ff] backdrop-blur-2xl max-w-md">
        {/* Achievement Icon */}
        <div className="text-6xl mb-4 animate-bounce">{achievementData.icon}</div>

        {/* Achievement Title */}
        <h2 className="text-2xl font-bold text-[#00ff88] mb-2">{achievementData.title}</h2>

        {/* Achievement Description */}
        <p className="text-[#8888aa] mb-4">{achievementData.description}</p>

        {/* RMU Reward */}
        <div className="bg-[rgba(0,255,136,0.1)] border border-[#00ff88] rounded-xl p-3 mb-6">
          <div className="text-sm text-[#8888aa]">RMU Gained</div>
          <div className="text-2xl font-bold text-[#00ff88]">+{achievementData.rmu}</div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className="bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#ff0080] text-[#0a0a0f] border-none rounded-xl px-8 py-3 font-bold cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-[0_8px_32px_0_#00d4ff] uppercase tracking-wide"
        >
          Acknowledged
        </button>
      </div>
    </div>
  )
}
