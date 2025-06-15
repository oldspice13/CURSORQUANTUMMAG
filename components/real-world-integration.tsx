"use client"

import { useState, useEffect } from "react"

interface RealWorldAction {
  id: string
  archetype: string
  category: string
  action: string
  timeframe: string
  difficulty: number
  impact: string
  completed: boolean
  timestamp?: Date
}

interface RealWorldIntegrationProps {
  archetype: string
  currentDay: number
  coherenceLevel: number
  onActionComplete: (actionId: string, evidence: string) => void
}

export function RealWorldIntegration({
  archetype,
  currentDay,
  coherenceLevel,
  onActionComplete,
}: RealWorldIntegrationProps) {
  const [dailyActions, setDailyActions] = useState<RealWorldAction[]>([])
  const [completedToday, setCompletedToday] = useState<string[]>([])
  const [showActionModal, setShowActionModal] = useState<string | null>(null)
  const [evidence, setEvidence] = useState("")

  const archetypeActions = {
    visionary: {
      morning: [
        {
          category: "Vision Work",
          actions: [
            "Spend 5 minutes visualizing your ideal day in vivid detail",
            "Write down 3 'impossible' goals and feel them as already achieved",
            "Look for patterns others miss in your environment today",
            "Ask 'What if?' about something everyone accepts as unchangeable",
            "Practice seeing the potential in a challenging situation",
          ],
        },
        {
          category: "Future Sensing",
          actions: [
            "Meditate on tomorrow and notice what insights arise",
            "Practice 'future memory' - remember an event before it happens",
            "Set an intention to notice synchronicities today",
            "Visualize yourself successfully completing today's biggest challenge",
            "Connect with your future self for guidance on a current decision",
          ],
        },
      ],
      midday: [
        {
          category: "Reality Perception",
          actions: [
            "Notice 3 things others are overlooking in your current environment",
            "Practice seeing multiple possible outcomes for an upcoming situation",
            "Look for hidden connections between seemingly unrelated events",
            "Identify one limiting belief someone around you holds",
            "Practice seeing the bigger picture in a current conflict or challenge",
          ],
        },
      ],
      evening: [
        {
          category: "Vision Integration",
          actions: [
            "Review the day for signs your morning vision is manifesting",
            "Document any intuitive hits or 'knowing' you experienced",
            "Visualize tomorrow's success before sleep",
            "Notice how your expanded perspective affected your interactions",
            "Set an intention for prophetic dreams tonight",
          ],
        },
      ],
    },
    creator: {
      morning: [
        {
          category: "Creative Expression",
          actions: [
            "Create something beautiful with your hands for 10 minutes",
            "Transform an ordinary object into something artistic",
            "Write, draw, or build something that didn't exist yesterday",
            "Find a creative solution to a mundane problem",
            "Express an emotion through art, music, or movement",
          ],
        },
        {
          category: "Innovation",
          actions: [
            "Combine two unrelated ideas into something new",
            "Redesign something in your environment to be more beautiful",
            "Create a new way to do a routine task",
            "Make something useful from materials others would discard",
            "Invent a solution to help someone in your life",
          ],
        },
      ],
      midday: [
        {
          category: "Creative Flow",
          actions: [
            "Enter flow state through any creative activity for 15 minutes",
            "Collaborate with someone to create something neither could alone",
            "Turn a problem into an opportunity through creative thinking",
            "Add beauty to a space others will experience",
            "Create something that makes someone smile",
          ],
        },
      ],
      evening: [
        {
          category: "Creative Integration",
          actions: [
            "Reflect on how creativity flowed through you today",
            "Share something you created with someone who would appreciate it",
            "Plan tomorrow's creative expression before sleep",
            "Notice how creating affected your energy and mood",
            "Set intention to dream creative solutions tonight",
          ],
        },
      ],
    },
    warrior: {
      morning: [
        {
          category: "Courage Building",
          actions: [
            "Do one thing that scares you but serves your growth",
            "Stand up for something you believe in, even if unpopular",
            "Take action on a goal that requires you to become someone new",
            "Face a fear you've been avoiding",
            "Defend someone who cannot defend themselves",
          ],
        },
        {
          category: "Strength Training",
          actions: [
            "Push through a physical or mental comfort zone boundary",
            "Take on a challenge others say is too difficult for you",
            "Practice saying 'no' to something that doesn't serve you",
            "Confront a situation you've been avoiding",
            "Choose the harder path that leads to greater growth",
          ],
        },
      ],
      midday: [
        {
          category: "Warrior Action",
          actions: [
            "Take decisive action on something you've been procrastinating",
            "Have a difficult conversation you've been avoiding",
            "Break through a limitation you've accepted about yourself",
            "Lead by example in a situation requiring courage",
            "Protect or support someone who needs your strength",
          ],
        },
      ],
      evening: [
        {
          category: "Victory Integration",
          actions: [
            "Acknowledge the courage you demonstrated today",
            "Reflect on how you overcame fear or resistance",
            "Celebrate a boundary you pushed through",
            "Notice how your warrior energy affected others",
            "Set intention to be even braver tomorrow",
          ],
        },
      ],
    },
    mystic: {
      morning: [
        {
          category: "Divine Connection",
          actions: [
            "Spend 10 minutes in silent communion with your higher self",
            "Practice feeling the energy of people and places around you",
            "Ask for guidance and trust the first answer that comes",
            "Send love and light to someone who needs healing",
            "Connect with nature as a form of prayer",
          ],
        },
        {
          category: "Spiritual Service",
          actions: [
            "Hold space for someone going through difficulty",
            "Practice seeing the divine in everyone you encounter",
            "Offer a silent blessing to strangers you pass",
            "Channel healing energy to a person, place, or situation",
            "Serve as a bridge between someone and their own divine nature",
          ],
        },
      ],
      midday: [
        {
          category: "Sacred Presence",
          actions: [
            "Practice being fully present in one interaction",
            "Find the sacred in an ordinary moment",
            "Listen to someone with your whole being",
            "Offer compassion to someone who is struggling",
            "Be a calming presence in a stressful situation",
          ],
        },
      ],
      evening: [
        {
          category: "Divine Integration",
          actions: [
            "Reflect on how you served as love in the world today",
            "Send gratitude to all beings who supported you",
            "Practice forgiveness for any judgments you held",
            "Connect with the divine presence within before sleep",
            "Set intention to be an even clearer channel tomorrow",
          ],
        },
      ],
    },
  }

  const generateDailyActions = () => {
    const currentArchetype = archetypeActions[archetype as keyof typeof archetypeActions]
    if (!currentArchetype) return

    const actions: RealWorldAction[] = []
    const timeframes = ["morning", "midday", "evening"] as const

    timeframes.forEach((timeframe) => {
      const categories = currentArchetype[timeframe] || []
      categories.forEach((category) => {
        // Select 1-2 actions per category based on coherence level
        const numActions = coherenceLevel > 70 ? 2 : 1
        const selectedActions = category.actions.sort(() => Math.random() - 0.5).slice(0, numActions)

        selectedActions.forEach((action, index) => {
          actions.push({
            id: `${timeframe}-${category.category}-${index}-${Date.now()}`,
            archetype,
            category: category.category,
            action,
            timeframe,
            difficulty: Math.floor(Math.random() * 3) + 1, // 1-3
            impact: ["Personal Growth", "Service to Others", "Reality Shifting"][Math.floor(Math.random() * 3)],
            completed: false,
          })
        })
      })
    })

    setDailyActions(actions)
  }

  useEffect(() => {
    generateDailyActions()
  }, [archetype, currentDay, coherenceLevel])

  const completeAction = (actionId: string) => {
    if (!evidence.trim()) return

    setDailyActions((prev) =>
      prev.map((action) => (action.id === actionId ? { ...action, completed: true, timestamp: new Date() } : action)),
    )

    setCompletedToday((prev) => [...prev, actionId])
    onActionComplete(actionId, evidence)
    setShowActionModal(null)
    setEvidence("")
  }

  const getTimeframeIcon = (timeframe: string) => {
    switch (timeframe) {
      case "morning":
        return "🌅"
      case "midday":
        return "☀️"
      case "evening":
        return "🌙"
      default:
        return "⭐"
    }
  }

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return "#00ff88"
      case 2:
        return "#ffaa00"
      case 3:
        return "#ff0080"
      default:
        return "#00d4ff"
    }
  }

  const getArchetypeColor = () => {
    switch (archetype) {
      case "visionary":
        return "#8b5cf6"
      case "creator":
        return "#00ff88"
      case "warrior":
        return "#ff0080"
      case "mystic":
        return "#00d4ff"
      default:
        return "#00ff88"
    }
  }

  const groupedActions = dailyActions.reduce(
    (acc, action) => {
      if (!acc[action.timeframe]) acc[action.timeframe] = []
      acc[action.timeframe].push(action)
      return acc
    },
    {} as Record<string, RealWorldAction[]>,
  )

  const completionRate = dailyActions.length > 0 ? (completedToday.length / dailyActions.length) * 100 : 0

  return (
    <div className="real-world-integration glass-card p-6 mb-8 border-2" style={{ borderColor: getArchetypeColor() }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div
            className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl"
            style={{
              borderColor: getArchetypeColor(),
              backgroundColor: `${getArchetypeColor()}22`,
              boxShadow: `0 0 20px ${getArchetypeColor()}`,
            }}
          >
            🎯
          </div>
          <div>
            <h3 className="text-xl font-bold" style={{ color: getArchetypeColor() }}>
              REAL-WORLD INTEGRATION
            </h3>
            <div className="text-sm text-[#8888aa]">
              {archetype.charAt(0).toUpperCase() + archetype.slice(1)} Actions • Day {currentDay}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold" style={{ color: getArchetypeColor() }}>
            {Math.round(completionRate)}%
          </div>
          <div className="text-xs text-[#8888aa]">Complete</div>
          <div className="w-20 bg-[rgba(136,136,170,0.2)] rounded-full h-2 mt-1">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: `${completionRate}%`,
                backgroundColor: getArchetypeColor(),
              }}
            />
          </div>
        </div>
      </div>

      {/* Daily Actions by Timeframe */}
      <div className="space-y-6">
        {Object.entries(groupedActions).map(([timeframe, actions]) => (
          <div key={timeframe}>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl">{getTimeframeIcon(timeframe)}</span>
              <h4 className="font-bold text-[#00d4ff] capitalize">{timeframe} Actions</h4>
              <div className="text-sm text-[#8888aa]">
                ({actions.filter((a) => a.completed).length}/{actions.length} complete)
              </div>
            </div>

            <div className="grid gap-3">
              {actions.map((action) => (
                <div
                  key={action.id}
                  className={`border-2 rounded-xl p-4 transition-all duration-300 ${
                    action.completed
                      ? "opacity-60 bg-[rgba(0,255,136,0.1)] border-[#00ff88]"
                      : "hover:scale-[1.02] cursor-pointer"
                  }`}
                  style={{
                    borderColor: action.completed ? "#00ff88" : getArchetypeColor(),
                    backgroundColor: action.completed ? "rgba(0,255,136,0.1)" : `${getArchetypeColor()}11`,
                  }}
                  onClick={() => !action.completed && setShowActionModal(action.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span
                          className="text-xs px-2 py-1 rounded-full font-bold"
                          style={{ color: getArchetypeColor(), backgroundColor: `${getArchetypeColor()}22` }}
                        >
                          {action.category}
                        </span>
                        <span
                          className="text-xs px-2 py-1 rounded-full font-bold"
                          style={{
                            color: getDifficultyColor(action.difficulty),
                            backgroundColor: `${getDifficultyColor(action.difficulty)}22`,
                          }}
                        >
                          Level {action.difficulty}
                        </span>
                      </div>
                      <div className="text-[#e8e8ff] font-semibold mb-2">{action.action}</div>
                      <div className="text-xs text-[#8888aa]">Impact: {action.impact}</div>
                    </div>

                    <div className="text-right">
                      {action.completed ? (
                        <div className="text-[#00ff88] text-xl">✅</div>
                      ) : (
                        <button
                          className="px-3 py-1 rounded-lg font-bold text-sm transition-all duration-200 hover:scale-105"
                          style={{
                            background: `linear-gradient(135deg, ${getArchetypeColor()}, #00d4ff)`,
                            color: "#0a0a0f",
                          }}
                        >
                          Take Action
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action Completion Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="glass-card border-2 rounded-3xl p-6 max-w-lg w-full"
            style={{ borderColor: getArchetypeColor() }}
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🎯</div>
              <h3 className="text-xl font-bold" style={{ color: getArchetypeColor() }}>
                Complete Action
              </h3>
              <p className="text-[#8888aa] text-sm">
                How did this action impact your reality? What evidence do you have of growth or change?
              </p>
            </div>

            <div className="mb-4">
              <div className="text-sm font-bold text-[#00d4ff] mb-2">Action:</div>
              <div className="text-[#e8e8ff] bg-[rgba(20,20,32,0.8)] rounded-lg p-3">
                {dailyActions.find((a) => a.id === showActionModal)?.action}
              </div>
            </div>

            <textarea
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
              placeholder="Describe what happened, how you felt, what changed, any synchronicities or insights..."
              className="w-full h-32 p-3 bg-[rgba(20,20,32,0.8)] border rounded-xl text-[#e8e8ff] placeholder-[#8888aa] mb-4 resize-none"
              style={{ borderColor: getArchetypeColor() }}
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowActionModal(null)}
                className="flex-1 bg-transparent border-2 border-[#8888aa] text-[#8888aa] rounded-xl px-4 py-2 font-bold hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => completeAction(showActionModal)}
                disabled={!evidence.trim()}
                className="flex-1 border-none rounded-xl px-4 py-2 font-bold cursor-pointer transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: evidence.trim()
                    ? `linear-gradient(135deg, ${getArchetypeColor()}, #00d4ff)`
                    : "rgba(136,136,170,0.3)",
                  color: evidence.trim() ? "#0a0a0f" : "#8888aa",
                }}
              >
                ✅ Complete Action
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Daily Integration Summary */}
      {completedToday.length > 0 && (
        <div className="mt-6 pt-6 border-t border-[rgba(136,136,170,0.3)]">
          <div className="text-center">
            <div className="text-lg font-bold" style={{ color: getArchetypeColor() }}>
              🌟 Integration Active: {completedToday.length} Real-World Actions Complete
            </div>
            <div className="text-sm text-[#8888aa] mt-1">
              Your consciousness work is manifesting in physical reality
            </div>
          </div>
        </div>
      )}

      {/* Refresh Actions Button */}
      <div className="mt-4 text-center">
        <button
          onClick={generateDailyActions}
          className="text-sm px-4 py-2 border rounded-xl text-[#8888aa] border-[#8888aa] hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all duration-200"
        >
          🔄 Generate New Actions
        </button>
      </div>
    </div>
  )
}
