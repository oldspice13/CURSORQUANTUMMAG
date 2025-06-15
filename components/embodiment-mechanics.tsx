"use client"

import { useState, useEffect } from "react"

interface EmbodimentMechanicsProps {
  archetype: string
  currentDay: number
  totalRmu: number
  coherenceLevel: number
  completedSessions: number
  onEmbodimentComplete: (practice: string, intensity: number, insights: string) => void
}

interface EmbodimentPractice {
  id: string
  name: string
  category: "breathwork" | "movement" | "energy" | "grounding" | "integration"
  duration: number
  intensity: number
  description: string
  instructions: string[]
  benefits: string[]
  archetypeVariation?: Record<
    string,
    {
      name?: string
      instructions?: string[]
      benefits?: string[]
    }
  >
  unlockRequirement: {
    day?: number
    rmu?: number
    coherence?: number
    sessions?: number
  }
}

const EMBODIMENT_PRACTICES: EmbodimentPractice[] = [
  // BREATHWORK PRACTICES
  {
    id: "quantum_breath",
    name: "Quantum Coherence Breathing",
    category: "breathwork",
    duration: 5,
    intensity: 3,
    description: "Synchronize your breath with quantum field fluctuations to enhance consciousness coherence.",
    instructions: [
      "Sit comfortably with spine straight",
      "Breathe in for 4 counts, hold for 4, out for 4",
      "Visualize quantum particles aligning with each breath",
      "Feel your consciousness expanding with each cycle",
    ],
    benefits: [
      "Increases quantum field coherence",
      "Enhances mental clarity",
      "Balances nervous system",
      "Amplifies manifestation power",
    ],
    archetypeVariation: {
      visionary: {
        name: "Future-Sight Breathing",
        instructions: [
          "Breathe in future possibilities, breathe out limitations",
          "With each inhale, see timelines converging",
          "Feel your visionary abilities expanding",
          "Anchor future visions in present moment",
        ],
      },
      creator: {
        name: "Creative Flow Breathing",
        instructions: [
          "Breathe in creative inspiration, breathe out blocks",
          "Feel artistic energy flowing through your body",
          "Visualize colors and forms with each breath",
          "Let creativity move through you naturally",
        ],
      },
      warrior: {
        name: "Courage Activation Breathing",
        instructions: [
          "Breathe in strength and courage",
          "Feel warrior energy building in your core",
          "Exhale fear and doubt completely",
          "Embody unshakeable inner power",
        ],
      },
      mystic: {
        name: "Divine Connection Breathing",
        instructions: [
          "Breathe in divine light and love",
          "Feel connection to cosmic consciousness",
          "Exhale separation and ego",
          "Merge with universal awareness",
        ],
      },
    },
    unlockRequirement: { day: 1 },
  },
  {
    id: "elemental_breath",
    name: "Elemental Mastery Breathing",
    category: "breathwork",
    duration: 8,
    intensity: 4,
    description: "Channel the power of the elements through conscious breathing patterns.",
    instructions: [
      "Begin with earth breathing - slow, deep, grounding",
      "Transition to fire breathing - quick, energizing",
      "Flow into water breathing - fluid, rhythmic",
      "Complete with air breathing - light, expansive",
    ],
    benefits: [
      "Masters elemental energies",
      "Balances all energy centers",
      "Enhances elemental consciousness",
      "Integrates opposing forces",
    ],
    unlockRequirement: { day: 7, rmu: 1000 },
  },

  // MOVEMENT PRACTICES
  {
    id: "energy_flow_movement",
    name: "Consciousness Flow Movement",
    category: "movement",
    duration: 10,
    intensity: 5,
    description: "Move energy through your body to activate dormant consciousness pathways.",
    instructions: [
      "Stand with feet hip-width apart",
      "Begin slow, flowing movements",
      "Feel energy moving through your spine",
      "Let your body move as consciousness guides",
    ],
    benefits: [
      "Activates energy pathways",
      "Releases physical tension",
      "Enhances body awareness",
      "Integrates consciousness in cells",
    ],
    archetypeVariation: {
      visionary: {
        name: "Timeline Dancing",
        instructions: [
          "Move as if dancing between timelines",
          "Feel future possibilities in your movements",
          "Let your body express visionary insights",
          "Dance your visions into reality",
        ],
      },
      creator: {
        name: "Creative Expression Movement",
        instructions: [
          "Let your body become art in motion",
          "Express creativity through every gesture",
          "Feel artistic energy flowing through limbs",
          "Create beauty with your movement",
        ],
      },
      warrior: {
        name: "Power Activation Movement",
        instructions: [
          "Move with strength and purpose",
          "Feel warrior energy in every muscle",
          "Practice movements of power and grace",
          "Embody unstoppable force",
        ],
      },
      mystic: {
        name: "Sacred Dance Movement",
        instructions: [
          "Move as if in sacred ceremony",
          "Feel divine energy flowing through you",
          "Let your body become a prayer",
          "Dance with cosmic consciousness",
        ],
      },
    },
    unlockRequirement: { day: 3, sessions: 5 },
  },
  {
    id: "quantum_tai_chi",
    name: "Quantum Field Tai Chi",
    category: "movement",
    duration: 15,
    intensity: 6,
    description: "Practice ancient movements enhanced with quantum consciousness principles.",
    instructions: [
      "Begin in standing meditation",
      "Move slowly, feeling quantum field resistance",
      "Each movement shifts reality patterns",
      "End in stillness, feeling field coherence",
    ],
    benefits: [
      "Masters quantum field manipulation",
      "Develops supernatural balance",
      "Enhances reality influence",
      "Integrates ancient wisdom with quantum science",
    ],
    unlockRequirement: { day: 14, coherence: 60 },
  },

  // ENERGY WORK PRACTICES
  {
    id: "chakra_activation",
    name: "Consciousness Center Activation",
    category: "energy",
    duration: 12,
    intensity: 7,
    description: "Systematically activate and balance all consciousness centers in your body.",
    instructions: [
      "Focus on root center - feel grounding energy",
      "Move to sacral center - activate creative power",
      "Energize solar plexus - build personal power",
      "Open heart center - expand love and connection",
      "Activate throat center - express truth",
      "Open third eye - enhance intuition",
      "Connect crown center - access cosmic consciousness",
    ],
    benefits: [
      "Balances all energy centers",
      "Activates dormant abilities",
      "Enhances psychic perception",
      "Integrates consciousness levels",
    ],
    unlockRequirement: { day: 10, rmu: 2000 },
  },
  {
    id: "aura_expansion",
    name: "Consciousness Field Expansion",
    category: "energy",
    duration: 8,
    intensity: 5,
    description: "Expand your consciousness field to influence larger areas of reality.",
    instructions: [
      "Feel your energy field around your body",
      "Gradually expand it beyond your physical form",
      "Sense the boundaries of your consciousness",
      "Practice expanding to fill the room, then beyond",
    ],
    benefits: [
      "Expands consciousness influence",
      "Enhances environmental sensitivity",
      "Develops remote influence abilities",
      "Increases manifestation range",
    ],
    unlockRequirement: { day: 21, coherence: 70 },
  },

  // GROUNDING PRACTICES
  {
    id: "earth_connection",
    name: "Quantum Earth Grounding",
    category: "grounding",
    duration: 6,
    intensity: 3,
    description: "Connect with Earth's quantum field to stabilize your consciousness expansion.",
    instructions: [
      "Sit or stand in contact with earth",
      "Feel roots growing from your body into the ground",
      "Exchange energy with Earth's consciousness",
      "Feel supported and stabilized",
    ],
    benefits: [
      "Stabilizes consciousness expansion",
      "Prevents spiritual bypassing",
      "Enhances physical vitality",
      "Connects to planetary consciousness",
    ],
    unlockRequirement: { day: 1 },
  },
  {
    id: "reality_anchoring",
    name: "Reality Anchor Integration",
    category: "grounding",
    duration: 10,
    intensity: 6,
    description: "Anchor your expanded consciousness in physical reality for practical application.",
    instructions: [
      "Feel your expanded consciousness",
      "Gradually bring awareness back to physical body",
      "Anchor insights in practical reality",
      "Set intentions for real-world application",
    ],
    benefits: [
      "Integrates spiritual insights practically",
      "Prevents consciousness fragmentation",
      "Enhances real-world effectiveness",
      "Balances transcendence with embodiment",
    ],
    unlockRequirement: { day: 28, sessions: 50 },
  },

  // INTEGRATION PRACTICES
  {
    id: "cellular_reprogramming",
    name: "Consciousness-Cell Integration",
    category: "integration",
    duration: 20,
    intensity: 8,
    description: "Program your cells with expanded consciousness patterns for permanent transformation.",
    instructions: [
      "Enter deep meditative state",
      "Visualize consciousness entering each cell",
      "Feel cells upgrading to higher frequencies",
      "Program cells with new consciousness patterns",
    ],
    benefits: [
      "Creates permanent consciousness changes",
      "Upgrades cellular intelligence",
      "Enhances physical health",
      "Integrates consciousness at DNA level",
    ],
    unlockRequirement: { day: 35, rmu: 10000, coherence: 80 },
  },
  {
    id: "quantum_embodiment",
    name: "Full Quantum Embodiment",
    category: "integration",
    duration: 30,
    intensity: 10,
    description: "Achieve complete integration of quantum consciousness with physical form.",
    instructions: [
      "Enter transcendent consciousness state",
      "Feel quantum field merging with physical body",
      "Experience body as conscious quantum system",
      "Embody unlimited consciousness in form",
    ],
    benefits: [
      "Achieves full consciousness embodiment",
      "Transcends physical limitations",
      "Enables reality manipulation",
      "Completes consciousness evolution",
    ],
    unlockRequirement: { day: 50, rmu: 25000, coherence: 95, sessions: 100 },
  },
]

export function EmbodimentMechanics({
  archetype,
  currentDay,
  totalRmu,
  coherenceLevel,
  completedSessions,
  onEmbodimentComplete,
}: EmbodimentMechanicsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("breathwork")
  const [activePractice, setActivePractice] = useState<EmbodimentPractice | null>(null)
  const [practiceTimer, setPracticeTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [practiceInsights, setPracticeInsights] = useState("")

  const categories = [
    { id: "breathwork", name: "Breathwork", icon: "🌬️", color: "#00d4ff" },
    { id: "movement", name: "Movement", icon: "💃", color: "#ff0080" },
    { id: "energy", name: "Energy Work", icon: "⚡", color: "#ffaa00" },
    { id: "grounding", name: "Grounding", icon: "🌍", color: "#00ff88" },
    { id: "integration", name: "Integration", icon: "🌟", color: "#8b5cf6" },
  ]

  const getAvailablePractices = () => {
    return EMBODIMENT_PRACTICES.filter((practice) => {
      const req = practice.unlockRequirement
      return (
        (!req.day || currentDay >= req.day) &&
        (!req.rmu || totalRmu >= req.rmu) &&
        (!req.coherence || coherenceLevel >= req.coherence) &&
        (!req.sessions || completedSessions >= req.sessions)
      )
    })
  }

  const getPracticesByCategory = (category: string) => {
    return getAvailablePractices().filter((practice) => practice.category === category)
  }

  const getArchetypeContent = (practice: EmbodimentPractice, field: string) => {
    if (
      practice.archetypeVariation &&
      practice.archetypeVariation[archetype] &&
      practice.archetypeVariation[archetype][field]
    ) {
      return practice.archetypeVariation[archetype][field]
    }
    return practice[field]
  }

  const startPractice = (practice: EmbodimentPractice) => {
    setActivePractice(practice)
    setPracticeTimer(practice.duration * 60) // Convert to seconds
    setIsActive(true)
  }

  const completePractice = () => {
    if (!activePractice) return

    onEmbodimentComplete(activePractice.name, activePractice.intensity, practiceInsights)
    setActivePractice(null)
    setIsActive(false)
    setPracticeTimer(0)
    setPracticeInsights("")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Timer effect
  useEffect(() => {
    if (isActive && practiceTimer > 0) {
      const interval = setInterval(() => {
        setPracticeTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else if (practiceTimer === 0 && isActive) {
      setIsActive(false)
    }
  }, [isActive, practiceTimer])

  const getIntensityColor = (intensity: number) => {
    if (intensity <= 3) return "#00ff88"
    if (intensity <= 6) return "#ffaa00"
    return "#ff0080"
  }

  const getCategoryProgress = (category: string) => {
    const categoryPractices = EMBODIMENT_PRACTICES.filter((p) => p.category === category)
    const availablePractices = getAvailablePractices().filter((p) => p.category === category)
    return categoryPractices.length > 0 ? Math.round((availablePractices.length / categoryPractices.length) * 100) : 0
  }

  return (
    <div className="embodiment-mechanics glass-card p-6 mb-6 border-2 border-[#8b5cf6]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#8b5cf6] mb-2">🧘‍♀️ Embodiment Mechanics</h2>
          <p className="text-[#8888aa]">Bridge consciousness and body through somatic practices</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-[#8888aa]">Available Practices</div>
          <div className="text-2xl font-bold text-[#8b5cf6]">
            {getAvailablePractices().length}/{EMBODIMENT_PRACTICES.length}
          </div>
        </div>
      </div>

      {/* Active Practice Modal */}
      {activePractice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="glass-card border-2 border-[#8b5cf6] rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-[#8b5cf6] mb-2">
                {getArchetypeContent(activePractice, "name") || activePractice.name}
              </h3>
              <div className="text-6xl font-bold text-[#00d4ff] mb-4">{formatTime(practiceTimer)}</div>
              <div className="text-[#8888aa]">{isActive ? "Practice in progress..." : "Practice complete!"}</div>
            </div>

            {isActive ? (
              <div className="space-y-4">
                <div className="bg-[rgba(139,92,246,0.1)] border border-[#8b5cf6] rounded-xl p-4">
                  <h4 className="font-bold text-[#8b5cf6] mb-2">Instructions:</h4>
                  <ul className="text-[#e8e8ff] space-y-1">
                    {(getArchetypeContent(activePractice, "instructions") || activePractice.instructions).map(
                      (instruction: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-[#8b5cf6] mr-2">•</span>
                          {instruction}
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <div className="w-full bg-[rgba(136,136,170,0.2)] rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-1000"
                    style={{
                      width: `${((activePractice.duration * 60 - practiceTimer) / (activePractice.duration * 60)) * 100}%`,
                      backgroundColor: "#8b5cf6",
                    }}
                  />
                </div>

                <button
                  onClick={() => {
                    setIsActive(false)
                    setActivePractice(null)
                    setPracticeTimer(0)
                  }}
                  className="w-full bg-[rgba(136,136,170,0.2)] border border-[#8888aa] text-[#8888aa] rounded-xl px-6 py-3 font-bold hover:border-[#8b5cf6] hover:text-[#8b5cf6] transition-all duration-200"
                >
                  End Practice
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center text-4xl mb-4">✨</div>
                <div className="text-center text-[#8888aa] mb-4">
                  How do you feel? What insights emerged from this embodiment practice?
                </div>

                <textarea
                  value={practiceInsights}
                  onChange={(e) => setPracticeInsights(e.target.value)}
                  placeholder="Share your embodiment insights... What did you feel in your body? What shifted?"
                  className="w-full h-32 p-4 bg-[rgba(20,20,32,0.8)] border border-[#8b5cf6] rounded-xl text-[#e8e8ff] placeholder-[#8888aa] resize-none"
                />

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setActivePractice(null)
                      setPracticeInsights("")
                    }}
                    className="flex-1 bg-transparent border-2 border-[#8888aa] text-[#8888aa] rounded-xl px-6 py-3 font-bold hover:border-[#8b5cf6] hover:text-[#8b5cf6] transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={completePractice}
                    className="flex-1 bg-gradient-to-r from-[#8b5cf6] to-[#00d4ff] text-[#0a0a0f] rounded-xl px-6 py-3 font-bold hover:scale-105 transition-all duration-200"
                  >
                    Complete Practice
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Category Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-bold transition-all duration-200 ${
              selectedCategory === category.id ? "scale-105" : "hover:scale-105"
            }`}
            style={{
              background:
                selectedCategory === category.id
                  ? `linear-gradient(135deg, ${category.color}, #8b5cf6)`
                  : "rgba(20,20,32,0.8)",
              color: selectedCategory === category.id ? "#0a0a0f" : "#e8e8ff",
              border: `2px solid ${selectedCategory === category.id ? category.color : "rgba(136,136,170,0.3)"}`,
            }}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
            <div className="text-xs bg-black bg-opacity-30 px-2 py-1 rounded">{getCategoryProgress(category.id)}%</div>
          </button>
        ))}
      </div>

      {/* Practices Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {getPracticesByCategory(selectedCategory).map((practice) => (
          <div
            key={practice.id}
            className="practice-card border rounded-xl p-4 transition-all duration-300 hover:scale-105"
            style={{
              borderColor: categories.find((c) => c.id === practice.category)?.color,
              backgroundColor: `${categories.find((c) => c.id === practice.category)?.color}11`,
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-bold text-[#e8e8ff] mb-1">
                  {getArchetypeContent(practice, "name") || practice.name}
                </h4>
                <div className="flex items-center space-x-3 text-sm text-[#8888aa]">
                  <span>{practice.duration} min</span>
                  <span>•</span>
                  <span className="font-bold" style={{ color: getIntensityColor(practice.intensity) }}>
                    Intensity {practice.intensity}/10
                  </span>
                </div>
              </div>
              <span className="text-2xl">{categories.find((c) => c.id === practice.category)?.icon}</span>
            </div>

            <p className="text-[#8888aa] text-sm mb-4">{practice.description}</p>

            {/* Benefits */}
            <div className="mb-4">
              <h5 className="font-bold text-xs text-[#00d4ff] mb-2">BENEFITS:</h5>
              <div className="flex flex-wrap gap-1">
                {(getArchetypeContent(practice, "benefits") || practice.benefits)
                  .slice(0, 2)
                  .map((benefit: string, index: number) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${categories.find((c) => c.id === practice.category)?.color}22`,
                        color: categories.find((c) => c.id === practice.category)?.color,
                      }}
                    >
                      {benefit}
                    </span>
                  ))}
              </div>
            </div>

            <button
              onClick={() => startPractice(practice)}
              className="w-full rounded-xl px-4 py-3 font-bold transition-all duration-200 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${categories.find((c) => c.id === practice.category)?.color}, #8b5cf6)`,
                color: "#0a0a0f",
              }}
            >
              Begin Practice
            </button>
          </div>
        ))}
      </div>

      {/* Locked Practices Preview */}
      {EMBODIMENT_PRACTICES.filter((p) => !getAvailablePractices().includes(p)).length > 0 && (
        <div className="mt-8 pt-6 border-t border-[rgba(136,136,170,0.3)]">
          <h3 className="text-lg font-bold text-[#8888aa] mb-4">🔒 Locked Practices</h3>
          <div className="grid md:grid-cols-3 gap-3">
            {EMBODIMENT_PRACTICES.filter((p) => !getAvailablePractices().includes(p))
              .slice(0, 6)
              .map((practice) => (
                <div
                  key={practice.id}
                  className="locked-practice border rounded-xl p-3 opacity-50"
                  style={{
                    borderColor: "rgba(136,136,170,0.3)",
                    backgroundColor: "rgba(20,20,32,0.5)",
                  }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span>🔒</span>
                    <h5 className="font-bold text-[#8888aa] text-sm">{practice.name}</h5>
                  </div>
                  <div className="text-xs text-[#666677]">
                    Unlock: {practice.unlockRequirement.day && `Day ${practice.unlockRequirement.day}`}
                    {practice.unlockRequirement.rmu && ` • ${practice.unlockRequirement.rmu} RMU`}
                    {practice.unlockRequirement.coherence && ` • ${practice.unlockRequirement.coherence}% Coherence`}
                    {practice.unlockRequirement.sessions && ` • ${practice.unlockRequirement.sessions} Sessions`}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
