"use client"

import { useState } from "react"

interface ArchetypeMasteryProps {
  archetype: string
  level: number
  currentDay: number
  totalRmu: number
}

export function ArchetypeMasteryDisplay({ archetype, level, currentDay, totalRmu }: ArchetypeMasteryProps) {
  const [showEvolution, setShowEvolution] = useState(false)

  const archetypeData = {
    visionary: {
      icon: "🔮",
      color: "#8b5cf6",
      name: "Quantum Visionary",
      description: "Master of timeline perception and reality architecture",
      powers: {
        1: ["Future glimpses", "Pattern recognition", "Intuitive knowing"],
        2: ["Timeline shifting", "Probability sensing", "Quantum visioning"],
        3: ["Reality weaving", "Dimensional sight", "Collective influence"],
        4: ["Timeline mastery", "Reality architecture", "Cosmic vision"],
        5: ["Omniversal sight", "Timeline creation", "Reality transcendence"],
      },
      evolutionThresholds: [0, 5000, 15000, 35000, 75000],
    },
    creator: {
      icon: "✨",
      color: "#00ff88",
      name: "Reality Creator",
      description: "Master of manifestation and dimensional building",
      powers: {
        1: ["Creative flow", "Inspiration channeling", "Beauty creation"],
        2: ["Matter shaping", "Energy crafting", "Reality sculpting"],
        3: ["World building", "Dimensional creation", "Collective manifestation"],
        4: ["Universe design", "Reality programming", "Cosmic creation"],
        5: ["Omniverse building", "Reality transcendence", "Creation mastery"],
      },
      evolutionThresholds: [0, 5000, 15000, 35000, 75000],
    },
    warrior: {
      icon: "⚔️",
      color: "#ff0080",
      name: "Consciousness Warrior",
      description: "Master of limitation destruction and reality conquest",
      powers: {
        1: ["Fear dissolution", "Courage cultivation", "Boundary breaking"],
        2: ["Limitation destruction", "Reality breaking", "Impossible achievement"],
        3: ["Dimensional conquest", "Collective liberation", "Reality mastery"],
        4: ["Consciousness liberation", "Reality domination", "Cosmic warriorship"],
        5: ["Omniversal conquest", "Reality transcendence", "Ultimate freedom"],
      },
      evolutionThresholds: [0, 5000, 15000, 35000, 75000],
    },
    mystic: {
      icon: "🌟",
      color: "#00d4ff",
      name: "Divine Mystic",
      description: "Master of cosmic consciousness and divine connection",
      powers: {
        1: ["Divine reception", "Energy sensing", "Spiritual connection"],
        2: ["Wisdom channeling", "Akashic access", "Collective consciousness"],
        3: ["Cosmic bridging", "Universal healing", "Divine transmission"],
        4: ["Cosmic consciousness", "Universal oneness", "Divine mastery"],
        5: ["Omniversal unity", "Divine transcendence", "Cosmic service"],
      },
      evolutionThresholds: [0, 5000, 15000, 35000, 75000],
    },
  }

  const data = archetypeData[archetype as keyof typeof archetypeData]
  if (!data) return null

  const currentPowers = data.powers[level as keyof typeof data.powers] || []
  const nextLevelPowers = data.powers[(level + 1) as keyof typeof data.powers] || []
  const evolutionProgress =
    level < 5
      ? ((totalRmu - data.evolutionThresholds[level - 1]) /
          (data.evolutionThresholds[level] - data.evolutionThresholds[level - 1])) *
        100
      : 100

  const getMasteryTitle = () => {
    if (level === 1) return "Initiate"
    if (level === 2) return "Adept"
    if (level === 3) return "Master"
    if (level === 4) return "Grandmaster"
    return "Transcendent"
  }

  return (
    <div className="archetype-mastery glass-card p-6 mb-8 border-2" style={{ borderColor: data.color }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div
            className="w-16 h-16 rounded-full border-2 flex items-center justify-center text-2xl"
            style={{
              borderColor: data.color,
              backgroundColor: `${data.color}22`,
              boxShadow: `0 0 20px ${data.color}`,
            }}
          >
            {data.icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold" style={{ color: data.color }}>
              {data.name}
            </h3>
            <div className="text-[#8888aa]">{data.description}</div>
            <div className="text-sm" style={{ color: data.color }}>
              Level {level} {getMasteryTitle()}
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowEvolution(!showEvolution)}
          className="px-4 py-2 rounded-xl border-2 font-bold transition-all duration-200 hover:scale-105"
          style={{
            borderColor: data.color,
            color: data.color,
            backgroundColor: showEvolution ? `${data.color}22` : "transparent",
          }}
        >
          {showEvolution ? "Hide Evolution" : "Show Evolution"}
        </button>
      </div>

      {/* Current Powers */}
      <div className="mb-6">
        <h4 className="font-bold text-[#00d4ff] mb-3">Current Abilities:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {currentPowers.map((power, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 p-3 rounded-xl border"
              style={{
                borderColor: data.color,
                backgroundColor: `${data.color}11`,
              }}
            >
              <span style={{ color: data.color }}>⚡</span>
              <span className="text-[#e8e8ff] text-sm font-semibold">{power}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Evolution Progress */}
      {level < 5 && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-[#8888aa] mb-2">
            <span>Evolution to Level {level + 1}</span>
            <span>{Math.round(evolutionProgress)}%</span>
          </div>
          <div className="w-full bg-[rgba(136,136,170,0.2)] rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-1000"
              style={{
                width: `${Math.min(evolutionProgress, 100)}%`,
                background: `linear-gradient(90deg, ${data.color}, #00d4ff)`,
              }}
            />
          </div>
          <div className="text-xs text-[#8888aa] mt-1 text-center">
            {totalRmu.toLocaleString()} / {data.evolutionThresholds[level].toLocaleString()} RMU
          </div>
        </div>
      )}

      {/* Next Level Preview */}
      {level < 5 && nextLevelPowers.length > 0 && (
        <div className="border-t border-[rgba(136,136,170,0.3)] pt-4">
          <h4 className="font-bold text-[#ff0080] mb-3">Level {level + 1} Unlocks:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {nextLevelPowers.map((power, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-3 rounded-xl border opacity-60"
                style={{
                  borderColor: "#8888aa",
                  backgroundColor: "rgba(136,136,170,0.1)",
                }}
              >
                <span className="text-[#8888aa]">🔒</span>
                <span className="text-[#8888aa] text-sm">{power}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evolution Tree */}
      {showEvolution && (
        <div className="mt-6 border-t border-[rgba(136,136,170,0.3)] pt-6">
          <h4 className="font-bold text-[#8b5cf6] mb-4">Complete Evolution Path:</h4>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <div
                key={lvl}
                className={`flex items-center space-x-4 p-3 rounded-xl border transition-all duration-300 ${
                  lvl <= level ? "opacity-100" : "opacity-40"
                }`}
                style={{
                  borderColor: lvl <= level ? data.color : "#8888aa",
                  backgroundColor: lvl <= level ? `${data.color}11` : "rgba(136,136,170,0.05)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold"
                  style={{
                    borderColor: lvl <= level ? data.color : "#8888aa",
                    color: lvl <= level ? data.color : "#8888aa",
                  }}
                >
                  {lvl}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm" style={{ color: lvl <= level ? data.color : "#8888aa" }}>
                    Level {lvl}{" "}
                    {lvl === 1
                      ? "Initiate"
                      : lvl === 2
                        ? "Adept"
                        : lvl === 3
                          ? "Master"
                          : lvl === 4
                            ? "Grandmaster"
                            : "Transcendent"}
                  </div>
                  <div className="text-xs text-[#8888aa]">
                    {(data.powers[lvl as keyof typeof data.powers] || []).join(" • ")}
                  </div>
                </div>
                {lvl <= level && <span style={{ color: data.color }}>✓</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
