"use client"

import { useEffect, useState } from "react"

interface ProgressRingProps {
  day: number
  completedDays: number
  totalRmu: number
  streak: number
}

export function ProgressRing({ day, completedDays, totalRmu, streak }: ProgressRingProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const [animatedRmu, setAnimatedRmu] = useState(0)

  const journeyProgress = Math.round((completedDays / 60) * 100)
  const circumference = 2 * Math.PI * 120 // radius of 120
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (journeyProgress / 100) * circumference

  // Animate progress on mount and updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(journeyProgress)
    }, 500)
    return () => clearTimeout(timer)
  }, [journeyProgress])

  // Animate RMU counter
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = totalRmu / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= totalRmu) {
        setAnimatedRmu(totalRmu)
        clearInterval(timer)
      } else {
        setAnimatedRmu(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [totalRmu])

  const getPhaseInfo = () => {
    if (day <= 14) return { phase: "Foundation", color: "#00ff88", icon: "🌱" }
    if (day <= 28) return { phase: "Activation", color: "#00d4ff", icon: "⚡" }
    if (day <= 42) return { phase: "Integration", color: "#ff0080", icon: "🔥" }
    if (day <= 56) return { phase: "Mastery", color: "#ffaa00", icon: "👑" }
    return { phase: "Transcendence", color: "#8b5cf6", icon: "🌟" }
  }

  const phaseInfo = getPhaseInfo()

  return (
    <div className="progress-ring-container flex flex-col items-center">
      {/* Main Progress Ring */}
      <div className="relative">
        <svg width="280" height="280" className="transform -rotate-90">
          {/* Background Circle */}
          <circle cx="140" cy="140" r="120" stroke="rgba(136,136,170,0.2)" strokeWidth="8" fill="transparent" />

          {/* Progress Circle */}
          <circle
            cx="140"
            cy="140"
            r="120"
            stroke={phaseInfo.color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-2000 ease-out"
            style={{
              filter: `drop-shadow(0 0 10px ${phaseInfo.color})`,
            }}
          />

          {/* Glow Effect */}
          <circle
            cx="140"
            cy="140"
            r="120"
            stroke={phaseInfo.color}
            strokeWidth="2"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-2000 ease-out opacity-50"
            style={{
              filter: `blur(4px)`,
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {/* Phase Icon */}
          <div className="text-4xl mb-2">{phaseInfo.icon}</div>

          {/* Day Number */}
          <div className="text-3xl font-bold text-[#e8e8ff] mb-1">Day {day}</div>

          {/* Phase Name */}
          <div className="text-sm font-bold mb-2" style={{ color: phaseInfo.color }}>
            {phaseInfo.phase.toUpperCase()}
          </div>

          {/* Progress Percentage */}
          <div className="text-lg font-bold text-[#8888aa]">{animatedProgress}%</div>
        </div>
      </div>

      {/* Stats Below Ring */}
      <div className="mt-6 grid grid-cols-3 gap-6 text-center">
        {/* RMU */}
        <div className="stat-item">
          <div className="text-2xl font-bold text-[#00d4ff] font-mono">{animatedRmu.toLocaleString()}</div>
          <div className="text-xs text-[#8888aa] uppercase tracking-wider">Quantum RMU</div>
        </div>

        {/* Streak */}
        <div className="stat-item">
          <div className="text-2xl font-bold text-[#ff0080] font-mono">{streak}</div>
          <div className="text-xs text-[#8888aa] uppercase tracking-wider">Day Streak</div>
        </div>

        {/* Completed */}
        <div className="stat-item">
          <div className="text-2xl font-bold text-[#00ff88] font-mono">{completedDays}</div>
          <div className="text-xs text-[#8888aa] uppercase tracking-wider">Completed</div>
        </div>
      </div>

      {/* Phase Description */}
      <div className="mt-4 text-center max-w-md">
        <p className="text-sm text-[#8888aa]">
          {phaseInfo.phase === "Foundation" &&
            "Building the bedrock of consciousness mastery through fundamental practices."}
          {phaseInfo.phase === "Activation" &&
            "Awakening dormant abilities and amplifying your natural consciousness powers."}
          {phaseInfo.phase === "Integration" &&
            "Weaving all elements into a unified field of quantum coherence and mastery."}
          {phaseInfo.phase === "Mastery" &&
            "Transcending ordinary limitations and operating at master consciousness levels."}
          {phaseInfo.phase === "Transcendence" &&
            "Moving beyond individual evolution into service of collective awakening."}
        </p>
      </div>
    </div>
  )
}
