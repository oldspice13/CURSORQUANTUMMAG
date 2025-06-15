"use client"

import { useState, useEffect } from "react"
import { Trophy, Music, Zap, Star } from "lucide-react"

interface AudioAchievementsProps {
  archetype: string
  totalListeningTime: number
  audioAchievements: string[]
  coherenceLevel: number
  onAchievementUnlock: (achievement: AudioAchievement) => void
}

interface AudioAchievement {
  id: string
  name: string
  description: string
  icon: string
  requirement: {
    listeningTime?: number
    coherenceLevel?: number
    specificFrequency?: string
    sessionCount?: number
  }
  reward: {
    rmu: number
    coherenceBonus: number
    unlockFeature?: string
  }
  rarity: "common" | "rare" | "epic" | "legendary"
}

const AUDIO_ACHIEVEMENTS: AudioAchievement[] = [
  {
    id: "first_frequency",
    name: "Frequency Pioneer",
    description: "Complete your first binaural beat session",
    icon: "🎵",
    requirement: { sessionCount: 1 },
    reward: { rmu: 500, coherenceBonus: 5 },
    rarity: "common",
  },
  {
    id: "hour_master",
    name: "Hour of Power",
    description: "Listen to consciousness-enhancing audio for 1 hour total",
    icon: "⏰",
    requirement: { listeningTime: 3600 },
    reward: { rmu: 1000, coherenceBonus: 10 },
    rarity: "common",
  },
  {
    id: "coherence_conductor",
    name: "Coherence Conductor",
    description: "Achieve 90% coherence while listening to binaural beats",
    icon: "🎼",
    requirement: { coherenceLevel: 90 },
    reward: { rmu: 2500, coherenceBonus: 15, unlockFeature: "Advanced Frequencies" },
    rarity: "rare",
  },
  {
    id: "frequency_master",
    name: "Frequency Master",
    description: "Experience all sacred frequencies (432Hz, 528Hz, 741Hz, 963Hz)",
    icon: "🌟",
    requirement: { sessionCount: 20 },
    reward: { rmu: 5000, coherenceBonus: 25, unlockFeature: "Custom Frequency Generator" },
    rarity: "epic",
  },
  {
    id: "consciousness_composer",
    name: "Consciousness Composer",
    description: "Listen for 10 hours total and maintain 95% average coherence",
    icon: "👑",
    requirement: { listeningTime: 36000, coherenceLevel: 95 },
    reward: { rmu: 10000, coherenceBonus: 50, unlockFeature: "Quantum Audio Synthesis" },
    rarity: "legendary",
  },
]

export function AudioAchievements({
  archetype,
  totalListeningTime,
  audioAchievements,
  coherenceLevel,
  onAchievementUnlock,
}: AudioAchievementsProps) {
  const [newAchievements, setNewAchievements] = useState<string[]>([])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "#00ff88"
      case "rare":
        return "#00d4ff"
      case "epic":
        return "#ff0080"
      case "legendary":
        return "#ffaa00"
      default:
        return "#8888aa"
    }
  }

  const checkAchievements = () => {
    AUDIO_ACHIEVEMENTS.forEach((achievement) => {
      if (audioAchievements.includes(achievement.id)) return

      let unlocked = true
      const req = achievement.requirement

      if (req.listeningTime && totalListeningTime < req.listeningTime) unlocked = false
      if (req.coherenceLevel && coherenceLevel < req.coherenceLevel) unlocked = false
      if (req.sessionCount && audioAchievements.length < req.sessionCount) unlocked = false

      if (unlocked) {
        onAchievementUnlock(achievement)
        setNewAchievements((prev) => [...prev, achievement.id])
      }
    })
  }

  useEffect(() => {
    checkAchievements()
  }, [totalListeningTime, coherenceLevel, audioAchievements])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  const getProgress = (achievement: AudioAchievement) => {
    const req = achievement.requirement
    if (req.listeningTime) {
      return Math.min((totalListeningTime / req.listeningTime) * 100, 100)
    }
    if (req.coherenceLevel) {
      return Math.min((coherenceLevel / req.coherenceLevel) * 100, 100)
    }
    return 0
  }

  return (
    <div className="audio-achievements glass-card p-6 mb-6 border-2 border-[#8b5cf6]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#8b5cf6] mb-2">🏆 Audio Mastery Achievements</h2>
          <p className="text-[#8888aa]">Unlock rewards through consciousness-enhancing audio practice</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-[#8888aa]">Unlocked</div>
          <div className="text-2xl font-bold text-[#8b5cf6]">
            {audioAchievements.length}/{AUDIO_ACHIEVEMENTS.length}
          </div>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="stat-card bg-[rgba(0,255,136,0.1)] border border-[#00ff88] rounded-xl p-4 text-center">
          <Music className="w-8 h-8 text-[#00ff88] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[#00ff88]">{formatTime(totalListeningTime)}</div>
          <div className="text-sm text-[#8888aa]">Total Listening</div>
        </div>

        <div className="stat-card bg-[rgba(0,212,255,0.1)] border border-[#00d4ff] rounded-xl p-4 text-center">
          <Zap className="w-8 h-8 text-[#00d4ff] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[#00d4ff]">{coherenceLevel}%</div>
          <div className="text-sm text-[#8888aa]">Peak Coherence</div>
        </div>

        <div className="stat-card bg-[rgba(255,170,0,0.1)] border border-[#ffaa00] rounded-xl p-4 text-center">
          <Star className="w-8 h-8 text-[#ffaa00] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[#ffaa00]">
            {AUDIO_ACHIEVEMENTS.filter((a) => audioAchievements.includes(a.id)).reduce(
              (sum, a) => sum + a.reward.rmu,
              0,
            )}
          </div>
          <div className="text-sm text-[#8888aa]">RMU Earned</div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {AUDIO_ACHIEVEMENTS.map((achievement) => {
          const isUnlocked = audioAchievements.includes(achievement.id)
          const isNew = newAchievements.includes(achievement.id)
          const progress = getProgress(achievement)
          const rarityColor = getRarityColor(achievement.rarity)

          return (
            <div
              key={achievement.id}
              className={`achievement-card border rounded-xl p-4 transition-all duration-300 ${
                isUnlocked ? "hover:scale-105" : "opacity-60"
              } ${isNew ? "animate-pulse ring-2 ring-[#ffaa00]" : ""}`}
              style={{
                borderColor: isUnlocked ? rarityColor : "rgba(136,136,170,0.3)",
                backgroundColor: isUnlocked ? `${rarityColor}11` : "rgba(20,20,32,0.5)",
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-2xl">{achievement.icon}</span>
                    <h3 className="font-bold text-[#e8e8ff]">{achievement.name}</h3>
                    {isNew && (
                      <span className="text-xs bg-[#ffaa00] text-[#0a0a0f] px-2 py-1 rounded-full font-bold">NEW!</span>
                    )}
                  </div>
                  <p className="text-sm text-[#8888aa]">{achievement.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#8888aa] capitalize">{achievement.rarity}</div>
                  {isUnlocked ? (
                    <Trophy className="w-6 h-6 mt-1" style={{ color: rarityColor }} />
                  ) : (
                    <div className="text-sm font-bold" style={{ color: rarityColor }}>
                      {Math.floor(progress)}%
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar for Locked Achievements */}
              {!isUnlocked && (
                <div className="mb-3">
                  <div className="w-full bg-[rgba(136,136,170,0.2)] rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: rarityColor,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Rewards */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <span className="text-[#00ff88]">+{achievement.reward.rmu} RMU</span>
                  <span className="text-[#00d4ff]">+{achievement.reward.coherenceBonus}% Coherence</span>
                </div>
                {achievement.reward.unlockFeature && (
                  <span className="text-[#ff0080]">Unlocks: {achievement.reward.unlockFeature}</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Next Achievement Preview */}
      {(() => {
        const nextAchievement = AUDIO_ACHIEVEMENTS.find((a) => !audioAchievements.includes(a.id))
        if (!nextAchievement) return null

        return (
          <div className="mt-6 p-4 bg-[rgba(139,92,246,0.1)] border border-[#8b5cf6] rounded-xl">
            <h4 className="font-bold text-[#8b5cf6] mb-2">🎯 Next Achievement:</h4>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg mr-2">{nextAchievement.icon}</span>
                <span className="font-bold text-[#e8e8ff]">{nextAchievement.name}</span>
              </div>
              <div className="text-sm text-[#8888aa]">{Math.floor(getProgress(nextAchievement))}% Complete</div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
