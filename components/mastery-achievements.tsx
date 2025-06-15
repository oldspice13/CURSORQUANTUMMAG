"use client"

import { useState, useEffect } from "react"

interface MasteryAchievement {
  id: string
  name: string
  description: string
  icon: string
  color: string
  rarity: "common" | "rare" | "epic" | "legendary" | "mythic"
  unlocked: boolean
  unlockedAt?: Date
  requirements: string[]
}

interface MasteryAchievementsProps {
  archetype: string
  unlockedSkills: string[]
  totalMasteryLevel: number
  completedDays: number
  onAchievementUnlock: (achievement: MasteryAchievement) => void
}

export function MasteryAchievements({
  archetype,
  unlockedSkills,
  totalMasteryLevel,
  completedDays,
  onAchievementUnlock,
}: MasteryAchievementsProps) {
  const [achievements, setAchievements] = useState<MasteryAchievement[]>([])
  const [showAchievements, setShowAchievements] = useState(false)

  const masteryAchievements: MasteryAchievement[] = [
    // Common Achievements
    {
      id: "first_skill",
      name: "First Steps",
      description: "Unlock your first mastery skill",
      icon: "🌱",
      color: "#00ff88",
      rarity: "common",
      unlocked: false,
      requirements: ["Unlock 1 skill"],
    },
    {
      id: "skill_collector",
      name: "Skill Collector",
      description: "Unlock 5 mastery skills",
      icon: "📚",
      color: "#00d4ff",
      rarity: "common",
      unlocked: false,
      requirements: ["Unlock 5 skills"],
    },
    {
      id: "dedicated_student",
      name: "Dedicated Student",
      description: "Reach 25% total mastery",
      icon: "🎓",
      color: "#ffaa00",
      rarity: "common",
      unlocked: false,
      requirements: ["25% total mastery"],
    },

    // Rare Achievements
    {
      id: "skill_master",
      name: "Skill Master",
      description: "Unlock 10 mastery skills",
      icon: "⚡",
      color: "#ff0080",
      rarity: "rare",
      unlocked: false,
      requirements: ["Unlock 10 skills"],
    },
    {
      id: "advanced_practitioner",
      name: "Advanced Practitioner",
      description: "Reach 50% total mastery",
      icon: "🔥",
      color: "#ff0080",
      rarity: "rare",
      unlocked: false,
      requirements: ["50% total mastery"],
    },
    {
      id: "category_master",
      name: "Category Master",
      description: "Master all skills in one category",
      icon: "👑",
      color: "#ffaa00",
      rarity: "rare",
      unlocked: false,
      requirements: ["Complete one skill category"],
    },

    // Epic Achievements
    {
      id: "consciousness_adept",
      name: "Consciousness Adept",
      description: "Reach 75% total mastery",
      icon: "🌟",
      color: "#8b5cf6",
      rarity: "epic",
      unlocked: false,
      requirements: ["75% total mastery"],
    },
    {
      id: "skill_virtuoso",
      name: "Skill Virtuoso",
      description: "Unlock 15 mastery skills",
      icon: "✨",
      color: "#8b5cf6",
      rarity: "epic",
      unlocked: false,
      requirements: ["Unlock 15 skills"],
    },
    {
      id: "multi_category_master",
      name: "Multi-Category Master",
      description: "Master skills in all categories",
      icon: "🎭",
      color: "#8b5cf6",
      rarity: "epic",
      unlocked: false,
      requirements: ["Master all categories"],
    },

    // Legendary Achievements
    {
      id: "consciousness_master",
      name: "Consciousness Master",
      description: "Reach 90% total mastery",
      icon: "🏆",
      color: "#ffaa00",
      rarity: "legendary",
      unlocked: false,
      requirements: ["90% total mastery"],
    },
    {
      id: "skill_transcendent",
      name: "Skill Transcendent",
      description: "Unlock all mastery skills",
      icon: "💫",
      color: "#ffaa00",
      rarity: "legendary",
      unlocked: false,
      requirements: ["Unlock all skills"],
    },

    // Mythic Achievements
    {
      id: "reality_architect",
      name: "Reality Architect",
      description: "Achieve 100% total mastery",
      icon: "🌌",
      color: "#ff0080",
      rarity: "mythic",
      unlocked: false,
      requirements: ["100% total mastery"],
    },
    {
      id: "consciousness_god",
      name: "Consciousness God",
      description: "Transcend all limitations of mastery",
      icon: "👁️",
      color: "#ff0080",
      rarity: "mythic",
      unlocked: false,
      requirements: ["Complete 60-day journey", "100% mastery", "All skills unlocked"],
    },
  ]

  useEffect(() => {
    setAchievements(masteryAchievements)
  }, [])

  useEffect(() => {
    checkAchievements()
  }, [unlockedSkills, totalMasteryLevel, completedDays])

  const checkAchievements = () => {
    setAchievements((prev) =>
      prev.map((achievement) => {
        if (achievement.unlocked) return achievement

        let shouldUnlock = false

        switch (achievement.id) {
          case "first_skill":
            shouldUnlock = unlockedSkills.length >= 1
            break
          case "skill_collector":
            shouldUnlock = unlockedSkills.length >= 5
            break
          case "skill_master":
            shouldUnlock = unlockedSkills.length >= 10
            break
          case "skill_virtuoso":
            shouldUnlock = unlockedSkills.length >= 15
            break
          case "skill_transcendent":
            shouldUnlock = unlockedSkills.length >= 20 // Assuming 20 total skills
            break
          case "dedicated_student":
            shouldUnlock = totalMasteryLevel >= 25
            break
          case "advanced_practitioner":
            shouldUnlock = totalMasteryLevel >= 50
            break
          case "consciousness_adept":
            shouldUnlock = totalMasteryLevel >= 75
            break
          case "consciousness_master":
            shouldUnlock = totalMasteryLevel >= 90
            break
          case "reality_architect":
            shouldUnlock = totalMasteryLevel >= 100
            break
          case "consciousness_god":
            shouldUnlock = totalMasteryLevel >= 100 && completedDays >= 60 && unlockedSkills.length >= 20
            break
          // Add more achievement checks as needed
        }

        if (shouldUnlock) {
          const unlockedAchievement = { ...achievement, unlocked: true, unlockedAt: new Date() }
          onAchievementUnlock(unlockedAchievement)
          return unlockedAchievement
        }

        return achievement
      }),
    )
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "#00ff88"
      case "rare":
        return "#00d4ff"
      case "epic":
        return "#8b5cf6"
      case "legendary":
        return "#ffaa00"
      case "mythic":
        return "#ff0080"
      default:
        return "#8888aa"
    }
  }

  const getRarityGlow = (rarity: string) => {
    const color = getRarityColor(rarity)
    return `0 0 20px ${color}`
  }

  const unlockedAchievements = achievements.filter((a) => a.unlocked)
  const totalAchievements = achievements.length

  return (
    <div className="mastery-achievements glass-card p-6 mb-8 border-2 border-[#ffaa00]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full border-2 border-[#ffaa00] bg-[rgba(255,170,0,0.22)] flex items-center justify-center text-xl animate-pulse">
            🏆
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#ffaa00]">MASTERY ACHIEVEMENTS</h3>
            <div className="text-sm text-[#8888aa]">
              {archetype.charAt(0).toUpperCase() + archetype.slice(1)} Accomplishments
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-[#ffaa00]">
            {unlockedAchievements.length}/{totalAchievements}
          </div>
          <div className="text-xs text-[#8888aa]">Unlocked</div>
          <button
            onClick={() => setShowAchievements(!showAchievements)}
            className="text-sm text-[#00d4ff] hover:text-[#00ff88] transition-colors mt-1"
          >
            {showAchievements ? "Hide All" : "Show All"}
          </button>
        </div>
      </div>

      {/* Achievement Progress */}
      <div className="mb-6">
        <div className="w-full bg-[rgba(136,136,170,0.2)] rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-1000"
            style={{
              width: `${(unlockedAchievements.length / totalAchievements) * 100}%`,
              background: "linear-gradient(90deg, #00ff88, #00d4ff, #8b5cf6, #ffaa00, #ff0080)",
            }}
          />
        </div>
        <div className="text-xs text-[#8888aa] text-center mt-1">
          Achievement Progress: {Math.round((unlockedAchievements.length / totalAchievements) * 100)}%
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="mb-6">
        <h4 className="font-bold text-[#00d4ff] mb-3">Recent Unlocks:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {unlockedAchievements
            .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())
            .slice(0, 4)
            .map((achievement) => (
              <div
                key={achievement.id}
                className="text-center p-3 rounded-xl border-2 transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: getRarityColor(achievement.rarity),
                  backgroundColor: `${getRarityColor(achievement.rarity)}11`,
                  boxShadow: getRarityGlow(achievement.rarity),
                }}
              >
                <div className="text-2xl mb-1">{achievement.icon}</div>
                <div className="font-bold text-xs" style={{ color: getRarityColor(achievement.rarity) }}>
                  {achievement.name}
                </div>
                <div className="text-xs text-[#8888aa] capitalize">{achievement.rarity}</div>
              </div>
            ))}
        </div>
      </div>

      {/* All Achievements (when expanded) */}
      {showAchievements && (
        <div>
          <h4 className="font-bold text-[#00d4ff] mb-3">All Achievements:</h4>
          <div className="grid md:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`border-2 rounded-xl p-4 transition-all duration-300 ${
                  achievement.unlocked ? "opacity-100" : "opacity-50"
                }`}
                style={{
                  borderColor: achievement.unlocked ? getRarityColor(achievement.rarity) : "rgba(136,136,170,0.3)",
                  backgroundColor: achievement.unlocked
                    ? `${getRarityColor(achievement.rarity)}11`
                    : "rgba(20,20,32,0.5)",
                  boxShadow: achievement.unlocked ? getRarityGlow(achievement.rarity) : "none",
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <div className="font-bold text-[#e8e8ff]">{achievement.name}</div>
                      <div className="text-sm text-[#8888aa]">{achievement.description}</div>
                      <div
                        className="text-xs font-bold capitalize mt-1"
                        style={{ color: getRarityColor(achievement.rarity) }}
                      >
                        {achievement.rarity}
                      </div>
                    </div>
                  </div>
                  {achievement.unlocked ? (
                    <span className="text-[#00ff88] text-xl">✅</span>
                  ) : (
                    <span className="text-[#8888aa] text-xl">🔒</span>
                  )}
                </div>

                {!achievement.unlocked && (
                  <div className="mt-3 pt-3 border-t border-[rgba(136,136,170,0.3)]">
                    <div className="text-xs text-[#8888aa]">
                      <strong>Requirements:</strong> {achievement.requirements.join(", ")}
                    </div>
                  </div>
                )}

                {achievement.unlocked && achievement.unlockedAt && (
                  <div className="mt-3 pt-3 border-t border-[rgba(136,136,170,0.3)]">
                    <div className="text-xs text-[#8888aa]">
                      Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
