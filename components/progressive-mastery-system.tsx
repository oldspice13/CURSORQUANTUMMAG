"use client"

import { useState, useEffect } from "react"

interface MasterySkill {
  id: string
  name: string
  description: string
  category: string
  level: number
  maxLevel: number
  experience: number
  experienceRequired: number
  unlocked: boolean
  prerequisites: string[]
  abilities: string[]
  icon: string
  color: string
}

interface MasteryTree {
  [category: string]: {
    name: string
    icon: string
    color: string
    skills: MasterySkill[]
  }
}

interface ProgressiveMasterySystemProps {
  archetype: string
  currentDay: number
  totalRmu: number
  completedSessions: number
  realWorldActions: number
  evidenceCount: number
  onSkillUnlock: (skillId: string, skillName: string) => void
}

export function ProgressiveMasterySystem({
  archetype,
  currentDay,
  totalRmu,
  completedSessions,
  realWorldActions,
  evidenceCount,
  onSkillUnlock,
}: ProgressiveMasterySystemProps) {
  const [masteryData, setMasteryData] = useState<MasteryTree>({})
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [showSkillModal, setShowSkillModal] = useState(false)

  const archetypeMasteryTrees: Record<string, MasteryTree> = {
    visionary: {
      "Future Sight": {
        name: "Future Sight",
        icon: "🔮",
        color: "#8b5cf6",
        skills: [
          {
            id: "intuitive_knowing",
            name: "Intuitive Knowing",
            description: "Access information beyond normal perception",
            category: "Future Sight",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 100,
            unlocked: true,
            prerequisites: [],
            abilities: ["Enhanced intuition", "Pattern recognition", "Gut feeling accuracy"],
            icon: "👁️",
            color: "#8b5cf6",
          },
          {
            id: "timeline_perception",
            name: "Timeline Perception",
            description: "See multiple possible futures simultaneously",
            category: "Future Sight",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 200,
            unlocked: false,
            prerequisites: ["intuitive_knowing"],
            abilities: ["Future glimpses", "Probability sensing", "Timeline awareness"],
            icon: "🌀",
            color: "#8b5cf6",
          },
          {
            id: "prophetic_dreams",
            name: "Prophetic Dreams",
            description: "Receive guidance and visions through dreams",
            category: "Future Sight",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 300,
            unlocked: false,
            prerequisites: ["timeline_perception"],
            abilities: ["Dream recall", "Symbolic interpretation", "Future memory"],
            icon: "🌙",
            color: "#8b5cf6",
          },
          {
            id: "reality_architecture",
            name: "Reality Architecture",
            description: "Design and influence probable futures",
            category: "Future Sight",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 500,
            unlocked: false,
            prerequisites: ["prophetic_dreams"],
            abilities: ["Timeline shifting", "Reality design", "Quantum influence"],
            icon: "🏗️",
            color: "#8b5cf6",
          },
        ],
      },
      "Dimensional Awareness": {
        name: "Dimensional Awareness",
        icon: "🌌",
        color: "#00d4ff",
        skills: [
          {
            id: "energy_sensing",
            name: "Energy Sensing",
            description: "Feel the energy fields of people, places, and situations",
            category: "Dimensional Awareness",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 150,
            unlocked: true,
            prerequisites: [],
            abilities: ["Aura reading", "Energy field detection", "Vibrational awareness"],
            icon: "⚡",
            color: "#00d4ff",
          },
          {
            id: "astral_projection",
            name: "Astral Projection",
            description: "Consciously travel beyond physical limitations",
            category: "Dimensional Awareness",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 400,
            unlocked: false,
            prerequisites: ["energy_sensing"],
            abilities: ["Out-of-body travel", "Remote viewing", "Dimensional exploration"],
            icon: "👻",
            color: "#00d4ff",
          },
          {
            id: "quantum_consciousness",
            name: "Quantum Consciousness",
            description: "Operate from multiple dimensional perspectives",
            category: "Dimensional Awareness",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 600,
            unlocked: false,
            prerequisites: ["astral_projection"],
            abilities: ["Multi-dimensional awareness", "Quantum superposition", "Reality bridging"],
            icon: "🌟",
            color: "#00d4ff",
          },
        ],
      },
      "Manifestation Mastery": {
        name: "Manifestation Mastery",
        icon: "✨",
        color: "#ff0080",
        skills: [
          {
            id: "intention_setting",
            name: "Intention Setting",
            description: "Focus your will to influence reality",
            category: "Manifestation Mastery",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 120,
            unlocked: true,
            prerequisites: [],
            abilities: ["Clear intention", "Focused will", "Goal manifestation"],
            icon: "🎯",
            color: "#ff0080",
          },
          {
            id: "synchronicity_mastery",
            name: "Synchronicity Mastery",
            description: "Orchestrate meaningful coincidences",
            category: "Manifestation Mastery",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 250,
            unlocked: false,
            prerequisites: ["intention_setting"],
            abilities: ["Synchronicity creation", "Meaningful coincidences", "Universal communication"],
            icon: "🎲",
            color: "#ff0080",
          },
          {
            id: "reality_manipulation",
            name: "Reality Manipulation",
            description: "Directly influence physical reality through consciousness",
            category: "Manifestation Mastery",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 800,
            unlocked: false,
            prerequisites: ["synchronicity_mastery"],
            abilities: ["Matter influence", "Probability shifting", "Reality bending"],
            icon: "🌀",
            color: "#ff0080",
          },
        ],
      },
    },
    creator: {
      "Creative Flow": {
        name: "Creative Flow",
        icon: "🌊",
        color: "#00ff88",
        skills: [
          {
            id: "flow_state_access",
            name: "Flow State Access",
            description: "Enter deep creative flow at will",
            category: "Creative Flow",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 100,
            unlocked: true,
            prerequisites: [],
            abilities: ["Instant flow entry", "Time dilation", "Effortless creation"],
            icon: "🌊",
            color: "#00ff88",
          },
          {
            id: "inspiration_channeling",
            name: "Inspiration Channeling",
            description: "Channel divine creativity through your being",
            category: "Creative Flow",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 200,
            unlocked: false,
            prerequisites: ["flow_state_access"],
            abilities: ["Divine inspiration", "Creative downloads", "Artistic channeling"],
            icon: "💫",
            color: "#00ff88",
          },
          {
            id: "reality_crafting",
            name: "Reality Crafting",
            description: "Sculpt reality through creative expression",
            category: "Creative Flow",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 400,
            unlocked: false,
            prerequisites: ["inspiration_channeling"],
            abilities: ["Reality sculpting", "Dimensional creation", "Universe building"],
            icon: "🏗️",
            color: "#00ff88",
          },
        ],
      },
      "Innovation Mastery": {
        name: "Innovation Mastery",
        icon: "💡",
        color: "#ffaa00",
        skills: [
          {
            id: "problem_solving",
            name: "Creative Problem Solving",
            description: "Find innovative solutions to any challenge",
            category: "Innovation Mastery",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 150,
            unlocked: true,
            prerequisites: [],
            abilities: ["Lateral thinking", "Solution synthesis", "Creative breakthroughs"],
            icon: "🧩",
            color: "#ffaa00",
          },
          {
            id: "invention_mastery",
            name: "Invention Mastery",
            description: "Create new technologies and systems",
            category: "Innovation Mastery",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 300,
            unlocked: false,
            prerequisites: ["problem_solving"],
            abilities: ["Technology creation", "System design", "Innovation acceleration"],
            icon: "⚙️",
            color: "#ffaa00",
          },
          {
            id: "paradigm_shifting",
            name: "Paradigm Shifting",
            description: "Transform entire fields of understanding",
            category: "Innovation Mastery",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 600,
            unlocked: false,
            prerequisites: ["invention_mastery"],
            abilities: ["Paradigm creation", "Reality revolution", "Consciousness evolution"],
            icon: "🌍",
            color: "#ffaa00",
          },
        ],
      },
      "Artistic Transcendence": {
        name: "Artistic Transcendence",
        icon: "🎨",
        color: "#ff0080",
        skills: [
          {
            id: "beauty_creation",
            name: "Beauty Creation",
            description: "Manifest pure beauty in all forms",
            category: "Artistic Transcendence",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 120,
            unlocked: true,
            prerequisites: [],
            abilities: ["Aesthetic mastery", "Beauty manifestation", "Harmony creation"],
            icon: "🌸",
            color: "#ff0080",
          },
          {
            id: "emotional_alchemy",
            name: "Emotional Alchemy",
            description: "Transform emotions into transcendent art",
            category: "Artistic Transcendence",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 250,
            unlocked: false,
            prerequisites: ["beauty_creation"],
            abilities: ["Emotion transformation", "Feeling expression", "Cathartic creation"],
            icon: "💖",
            color: "#ff0080",
          },
          {
            id: "consciousness_art",
            name: "Consciousness Art",
            description: "Create art that awakens consciousness in others",
            category: "Artistic Transcendence",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 500,
            unlocked: false,
            prerequisites: ["emotional_alchemy"],
            abilities: ["Awakening art", "Consciousness transmission", "Transformative beauty"],
            icon: "🎭",
            color: "#ff0080",
          },
        ],
      },
    },
    warrior: {
      "Courage Mastery": {
        name: "Courage Mastery",
        icon: "⚔️",
        color: "#ff0080",
        skills: [
          {
            id: "fear_dissolution",
            name: "Fear Dissolution",
            description: "Transform fear into power and wisdom",
            category: "Courage Mastery",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 100,
            unlocked: true,
            prerequisites: [],
            abilities: ["Fear transformation", "Courage cultivation", "Bravery embodiment"],
            icon: "🔥",
            color: "#ff0080",
          },
          {
            id: "boundary_breaking",
            name: "Boundary Breaking",
            description: "Shatter limitations and expand possibilities",
            category: "Courage Mastery",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 200,
            unlocked: false,
            prerequisites: ["fear_dissolution"],
            abilities: ["Limitation breaking", "Boundary expansion", "Impossible achievement"],
            icon: "💥",
            color: "#ff0080",
          },
          {
            id: "unstoppable_force",
            name: "Unstoppable Force",
            description: "Become an irresistible force for positive change",
            category: "Courage Mastery",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 400,
            unlocked: false,
            prerequisites: ["boundary_breaking"],
            abilities: ["Unstoppable momentum", "Irresistible force", "Change catalyst"],
            icon: "🌪️",
            color: "#ff0080",
          },
        ],
      },
      "Leadership Power": {
        name: "Leadership Power",
        icon: "👑",
        color: "#ffaa00",
        skills: [
          {
            id: "influence_mastery",
            name: "Influence Mastery",
            description: "Inspire and guide others toward their highest potential",
            category: "Leadership Power",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 150,
            unlocked: true,
            prerequisites: [],
            abilities: ["Positive influence", "Inspiration creation", "Leadership presence"],
            icon: "🌟",
            color: "#ffaa00",
          },
          {
            id: "collective_empowerment",
            name: "Collective Empowerment",
            description: "Empower groups to achieve impossible goals",
            category: "Leadership Power",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 300,
            unlocked: false,
            prerequisites: ["influence_mastery"],
            abilities: ["Group empowerment", "Collective strength", "Team transcendence"],
            icon: "👥",
            color: "#ffaa00",
          },
          {
            id: "revolutionary_leadership",
            name: "Revolutionary Leadership",
            description: "Lead transformational change in the world",
            category: "Leadership Power",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 600,
            unlocked: false,
            prerequisites: ["collective_empowerment"],
            abilities: ["Revolutionary change", "World transformation", "Consciousness revolution"],
            icon: "🌍",
            color: "#ffaa00",
          },
        ],
      },
      "Justice Embodiment": {
        name: "Justice Embodiment",
        icon: "⚖️",
        color: "#00d4ff",
        skills: [
          {
            id: "truth_speaking",
            name: "Truth Speaking",
            description: "Speak truth with power and compassion",
            category: "Justice Embodiment",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 120,
            unlocked: true,
            prerequisites: [],
            abilities: ["Truth embodiment", "Honest communication", "Authentic expression"],
            icon: "📢",
            color: "#00d4ff",
          },
          {
            id: "protection_mastery",
            name: "Protection Mastery",
            description: "Shield and defend those who cannot protect themselves",
            category: "Justice Embodiment",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 250,
            unlocked: false,
            prerequisites: ["truth_speaking"],
            abilities: ["Protective presence", "Shield creation", "Guardian energy"],
            icon: "🛡️",
            color: "#00d4ff",
          },
          {
            id: "cosmic_justice",
            name: "Cosmic Justice",
            description: "Serve as an agent of universal balance and harmony",
            category: "Justice Embodiment",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 500,
            unlocked: false,
            prerequisites: ["protection_mastery"],
            abilities: ["Universal balance", "Cosmic harmony", "Divine justice"],
            icon: "⚖️",
            color: "#00d4ff",
          },
        ],
      },
    },
    mystic: {
      "Divine Connection": {
        name: "Divine Connection",
        icon: "🙏",
        color: "#00d4ff",
        skills: [
          {
            id: "meditation_mastery",
            name: "Meditation Mastery",
            description: "Access deep states of consciousness at will",
            category: "Divine Connection",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 100,
            unlocked: true,
            prerequisites: [],
            abilities: ["Deep meditation", "Consciousness expansion", "Inner peace"],
            icon: "🧘",
            color: "#00d4ff",
          },
          {
            id: "divine_channeling",
            name: "Divine Channeling",
            description: "Channel wisdom and healing from higher dimensions",
            category: "Divine Connection",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 200,
            unlocked: false,
            prerequisites: ["meditation_mastery"],
            abilities: ["Divine wisdom", "Healing channeling", "Higher guidance"],
            icon: "📡",
            color: "#00d4ff",
          },
          {
            id: "cosmic_consciousness",
            name: "Cosmic Consciousness",
            description: "Merge with universal consciousness",
            category: "Divine Connection",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 400,
            unlocked: false,
            prerequisites: ["divine_channeling"],
            abilities: ["Universal oneness", "Cosmic awareness", "Divine unity"],
            icon: "🌌",
            color: "#00d4ff",
          },
        ],
      },
      "Healing Arts": {
        name: "Healing Arts",
        icon: "💖",
        color: "#00ff88",
        skills: [
          {
            id: "energy_healing",
            name: "Energy Healing",
            description: "Heal others through pure energy transmission",
            category: "Healing Arts",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 150,
            unlocked: true,
            prerequisites: [],
            abilities: ["Energy transmission", "Chakra balancing", "Aura cleansing"],
            icon: "✨",
            color: "#00ff88",
          },
          {
            id: "emotional_healing",
            name: "Emotional Healing",
            description: "Transform emotional wounds into wisdom",
            category: "Healing Arts",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 300,
            unlocked: false,
            prerequisites: ["energy_healing"],
            abilities: ["Trauma healing", "Emotional alchemy", "Heart opening"],
            icon: "💝",
            color: "#00ff88",
          },
          {
            id: "collective_healing",
            name: "Collective Healing",
            description: "Heal groups, communities, and the planet",
            category: "Healing Arts",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 600,
            unlocked: false,
            prerequisites: ["emotional_healing"],
            abilities: ["Group healing", "Planetary healing", "Collective transformation"],
            icon: "🌍",
            color: "#00ff88",
          },
        ],
      },
      "Sacred Service": {
        name: "Sacred Service",
        icon: "🕯️",
        color: "#8b5cf6",
        skills: [
          {
            id: "compassion_embodiment",
            name: "Compassion Embodiment",
            description: "Become a living expression of divine love",
            category: "Sacred Service",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 120,
            unlocked: true,
            prerequisites: [],
            abilities: ["Unconditional love", "Compassionate presence", "Heart opening"],
            icon: "💖",
            color: "#8b5cf6",
          },
          {
            id: "wisdom_teaching",
            name: "Wisdom Teaching",
            description: "Share sacred knowledge to awaken others",
            category: "Sacred Service",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 250,
            unlocked: false,
            prerequisites: ["compassion_embodiment"],
            abilities: ["Sacred teaching", "Wisdom transmission", "Consciousness awakening"],
            icon: "📚",
            color: "#8b5cf6",
          },
          {
            id: "divine_service",
            name: "Divine Service",
            description: "Serve as an instrument of divine will",
            category: "Sacred Service",
            level: 0,
            maxLevel: 5,
            experience: 0,
            experienceRequired: 500,
            unlocked: false,
            prerequisites: ["wisdom_teaching"],
            abilities: ["Divine instrument", "Sacred service", "Universal love"],
            icon: "🌟",
            color: "#8b5cf6",
          },
        ],
      },
    },
  }

  useEffect(() => {
    const currentTree = archetypeMasteryTrees[archetype] || archetypeMasteryTrees.visionary
    setMasteryData(currentTree)
    setSelectedCategory(Object.keys(currentTree)[0])
  }, [archetype])

  useEffect(() => {
    // Calculate experience gains and level ups
    updateMasteryProgress()
  }, [totalRmu, completedSessions, realWorldActions, evidenceCount])

  const updateMasteryProgress = () => {
    const experienceGains = {
      sessions: completedSessions * 10,
      realWorld: realWorldActions * 15,
      evidence: evidenceCount * 5,
      rmu: Math.floor(totalRmu / 100),
    }

    const totalExperience = Object.values(experienceGains).reduce((sum, exp) => sum + exp, 0)

    setMasteryData((prev) => {
      const updated = { ...prev }
      Object.keys(updated).forEach((category) => {
        updated[category].skills = updated[category].skills.map((skill) => {
          if (!skill.unlocked) {
            // Check prerequisites
            const prereqsMet = skill.prerequisites.every(
              (prereqId) =>
                Object.values(updated)
                  .flatMap((cat) => cat.skills)
                  .find((s) => s.id === prereqId)?.level > 0,
            )
            if (prereqsMet) {
              skill.unlocked = true
            }
          }

          if (skill.unlocked && skill.level < skill.maxLevel) {
            // Distribute experience based on usage patterns
            const categoryMultiplier = getCategoryMultiplier(skill.category)
            const experienceGain = Math.floor(totalExperience * categoryMultiplier * 0.1)

            skill.experience += experienceGain

            // Level up if enough experience
            while (skill.experience >= skill.experienceRequired && skill.level < skill.maxLevel) {
              skill.experience -= skill.experienceRequired
              skill.level++
              skill.experienceRequired = Math.floor(skill.experienceRequired * 1.5)

              // Trigger skill unlock notification
              onSkillUnlock(skill.id, skill.name)
            }
          }

          return skill
        })
      })
      return updated
    })
  }

  const getCategoryMultiplier = (category: string) => {
    // Different activities contribute more to different skill categories
    const multipliers: Record<string, number> = {
      "Future Sight": 0.8,
      "Dimensional Awareness": 0.6,
      "Manifestation Mastery": 1.0,
      "Creative Flow": 1.2,
      "Innovation Mastery": 0.9,
      "Artistic Transcendence": 0.7,
      "Courage Mastery": 1.1,
      "Leadership Power": 0.8,
      "Justice Embodiment": 0.9,
      "Divine Connection": 1.0,
      "Healing Arts": 0.8,
      "Sacred Service": 0.9,
    }
    return multipliers[category] || 1.0
  }

  const getSkillProgress = (skill: MasterySkill) => {
    if (!skill.unlocked) return 0
    if (skill.level >= skill.maxLevel) return 100
    return (skill.experience / skill.experienceRequired) * 100
  }

  const getTotalMasteryLevel = () => {
    const allSkills = Object.values(masteryData).flatMap((category) => category.skills)
    const totalLevels = allSkills.reduce((sum, skill) => sum + skill.level, 0)
    const maxPossibleLevels = allSkills.length * 5
    return Math.floor((totalLevels / maxPossibleLevels) * 100)
  }

  const getUnlockedSkillsCount = () => {
    return Object.values(masteryData)
      .flatMap((category) => category.skills)
      .filter((skill) => skill.unlocked).length
  }

  const selectedCategoryData = masteryData[selectedCategory]

  return (
    <div className="progressive-mastery glass-card p-6 mb-8 border-2 border-[#8b5cf6]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full border-2 border-[#8b5cf6] bg-[rgba(139,92,246,0.22)] flex items-center justify-center text-xl animate-pulse">
            🏆
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#8b5cf6]">PROGRESSIVE MASTERY SYSTEM</h3>
            <div className="text-sm text-[#8888aa]">
              {archetype.charAt(0).toUpperCase() + archetype.slice(1)} Skill Tree • Day {currentDay}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-[#8b5cf6]">{getTotalMasteryLevel()}%</div>
          <div className="text-xs text-[#8888aa]">Mastery</div>
          <div className="text-sm font-bold text-[#00ff88]">{getUnlockedSkillsCount()} Skills</div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {Object.entries(masteryData).map(([categoryKey, category]) => (
          <button
            key={categoryKey}
            onClick={() => setSelectedCategory(categoryKey)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-bold transition-all duration-200 whitespace-nowrap ${
              selectedCategory === categoryKey ? "scale-105" : "hover:scale-105"
            }`}
            style={{
              background:
                selectedCategory === categoryKey
                  ? `linear-gradient(135deg, ${category.color}, #00d4ff)`
                  : "rgba(20,20,32,0.8)",
              color: selectedCategory === categoryKey ? "#0a0a0f" : "#e8e8ff",
              border: `2px solid ${selectedCategory === categoryKey ? category.color : "rgba(136,136,170,0.3)"}`,
            }}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      {selectedCategoryData && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedCategoryData.skills.map((skill) => (
            <div
              key={skill.id}
              className={`border-2 rounded-xl p-4 transition-all duration-300 cursor-pointer ${
                skill.unlocked ? "hover:scale-105" : "opacity-50"
              }`}
              style={{
                borderColor: skill.unlocked ? skill.color : "rgba(136,136,170,0.3)",
                backgroundColor: skill.unlocked ? `${skill.color}11` : "rgba(20,20,32,0.5)",
              }}
              onClick={() => {
                if (skill.unlocked) {
                  setSelectedSkill(skill.id)
                  setShowSkillModal(true)
                }
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{skill.icon}</span>
                  <div>
                    <div className="font-bold text-[#e8e8ff]">{skill.name}</div>
                    <div className="text-xs text-[#8888aa]">
                      Level {skill.level}/{skill.maxLevel}
                    </div>
                  </div>
                </div>
                {!skill.unlocked && <span className="text-[#8888aa]">🔒</span>}
              </div>

              <div className="text-sm text-[#8888aa] mb-3">{skill.description}</div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="w-full bg-[rgba(136,136,170,0.2)] rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${getSkillProgress(skill)}%`,
                      backgroundColor: skill.unlocked ? skill.color : "rgba(136,136,170,0.3)",
                    }}
                  />
                </div>
                {skill.unlocked && skill.level < skill.maxLevel && (
                  <div className="text-xs text-[#8888aa] mt-1">
                    {skill.experience}/{skill.experienceRequired} XP
                  </div>
                )}
              </div>

              {/* Prerequisites */}
              {skill.prerequisites.length > 0 && !skill.unlocked && (
                <div className="text-xs text-[#8888aa]">Requires: {skill.prerequisites.join(", ")}</div>
              )}

              {/* Current Abilities */}
              {skill.unlocked && skill.level > 0 && (
                <div className="text-xs">
                  <div className="text-[#00ff88] font-bold mb-1">Active Abilities:</div>
                  <div className="text-[#8888aa]">{skill.abilities.slice(0, skill.level).join(" • ")}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skill Detail Modal */}
      {showSkillModal && selectedSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="glass-card border-2 border-[#8b5cf6] rounded-3xl p-6 max-w-lg w-full">
            {(() => {
              const skill = Object.values(masteryData)
                .flatMap((cat) => cat.skills)
                .find((s) => s.id === selectedSkill)
              if (!skill) return null

              return (
                <>
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{skill.icon}</div>
                    <h3 className="text-xl font-bold" style={{ color: skill.color }}>
                      {skill.name}
                    </h3>
                    <div className="text-sm text-[#8888aa]">
                      Level {skill.level}/{skill.maxLevel} • {skill.category}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-[#e8e8ff] mb-4">{skill.description}</div>

                    <div className="mb-4">
                      <div className="text-sm font-bold text-[#00d4ff] mb-2">All Abilities:</div>
                      <div className="space-y-1">
                        {skill.abilities.map((ability, index) => (
                          <div
                            key={index}
                            className={`text-sm flex items-center ${
                              index < skill.level ? "text-[#00ff88]" : "text-[#8888aa]"
                            }`}
                          >
                            <span className="mr-2">{index < skill.level ? "✓" : "○"}</span>
                            {ability}
                          </div>
                        ))}
                      </div>
                    </div>

                    {skill.level < skill.maxLevel && (
                      <div className="mb-4">
                        <div className="text-sm font-bold text-[#ff0080] mb-2">Next Level Unlocks:</div>
                        <div className="text-sm text-[#8888aa]">
                          {skill.abilities[skill.level] || "Maximum level reached"}
                        </div>
                      </div>
                    )}

                    <div className="w-full bg-[rgba(136,136,170,0.2)] rounded-full h-3 mb-2">
                      <div
                        className="h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${getSkillProgress(skill)}%`,
                          backgroundColor: skill.color,
                        }}
                      />
                    </div>
                    {skill.level < skill.maxLevel && (
                      <div className="text-xs text-[#8888aa] text-center">
                        {skill.experience}/{skill.experienceRequired} XP to next level
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setShowSkillModal(false)}
                    className="w-full bg-gradient-to-r from-[#8b5cf6] to-[#00d4ff] text-[#0a0a0f] py-3 px-6 rounded-xl font-bold hover:scale-105 transition-all duration-200"
                  >
                    Close
                  </button>
                </>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}
