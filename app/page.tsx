"use client"

import { useState, useEffect } from "react"
import { EnhancedParticleSystem } from "@/components/enhanced-particle-system"
import { Header } from "@/components/header"
import { StatsPanel } from "@/components/stats-panel"
import { AchievementPopup } from "@/components/achievement-popup"
import { OnboardingModal } from "@/components/onboarding-modal"
import { DaySelector } from "@/components/day-selector"
import { SessionModal } from "@/components/session-modal"
import { ProgressRing } from "@/components/progress-ring"
import { OracleEngine } from "@/components/oracle-engine"
import { ArchetypeEvolution } from "@/components/archetype-evolution"
import { TimelineOperation } from "@/components/timeline-operation"
import { QuantumFieldAnalysis } from "@/components/quantum-field-analysis"
import { EvidenceLog } from "@/components/evidence-log"
import { MasteryProgressionDisplay } from "@/components/mastery-progression-display"
import { ArchetypeMasteryDisplay } from "@/components/archetype-mastery-display"
import { QuantumFieldMonitor } from "@/components/quantum-field-monitor"
import { useFirebase } from "@/hooks/use-firebase"
import { SOMATIC_PROGRAM } from "@/data/somatic-program"
import { ARCHETYPE_SYSTEM } from "@/data/archetype-system"
import { DayOverview } from "@/components/day-overview"
import { RealWorldIntegration } from "@/components/real-world-integration"
import { RealWorldEvidenceTracker } from "@/components/real-world-evidence-tracker"
import { ProgressiveMasterySystem } from "@/components/progressive-mastery-system"
import { MasteryAchievements } from "@/components/mastery-achievements"
import { EmbodimentMechanics } from "@/components/embodiment-mechanics"
import { EmbodimentProgressTracker } from "@/components/embodiment-progress-tracker"
import { ImmersiveAudioSystem } from "@/components/immersive-audio-system"
import { AudioAchievements } from "@/components/audio-achievements"
import { GuidedTour } from "@/components/guided-tour"
import { SectionExplainer } from "@/components/section-explainer"

export interface AppState {
  onboarding: boolean
  currentDay: number
  identity: string | null
  identityLevel: number
  goal: string
  dailyProgress: Record<number, { morning: boolean; midday: boolean; evening: boolean }>
  totalRmu: number
  achievements: string[]
  streak: number
  lastActiveDate: string
  completedDays: number[]
  favoriteExercises: string[]
  insights: Record<number, string>
  evidenceLog: Array<{ id: string; timestamp: Date; type: string; description: string; significance: number }>
  patternDebugging: Array<{ id: string; pattern: string; frequency: number; lastSeen: Date }>
  quantumField: {
    coherenceLevel: number
    manifestationWindow: boolean
    synchronicityAmplification: number
    realityMalleability: number
  }
  oracleMessages: Array<{ id: string; timestamp: Date; message: string; type: string; urgency: number }>
  currentMission: {
    id: string
    archetype: string
    action: string
    deadline: Date
    completed: boolean
    impact: number
  } | null
  realWorldEvidence: Array<{
    id: string
    actionId: string
    archetype: string
    category: string
    evidence: string
    timestamp: Date
    impactLevel: number
    synchronicities: string[]
    insights: string[]
  }>
  masterySkills: Record<string, { level: number; experience: number; unlocked: boolean }>
  masteryAchievements: string[]
  unlockedSkills: string[]
  embodimentSessions: Array<{
    id: string
    practice: string
    category: string
    intensity: number
    insights: string
    timestamp: Date
    duration: number
  }>
  audioState: {
    isPlaying: boolean
    currentTrack: string
    totalListeningTime: number
    favoriteFrequencies: string[]
    audioAchievements: string[]
  }
  showTour: boolean
  tourCompleted: boolean
}

const initialState: AppState = {
  onboarding: false,
  currentDay: 1,
  identity: null,
  identityLevel: 1,
  goal: "",
  dailyProgress: {},
  totalRmu: 0,
  achievements: [],
  streak: 0,
  lastActiveDate: "",
  completedDays: [],
  favoriteExercises: [],
  insights: {},
  evidenceLog: [],
  patternDebugging: [],
  quantumField: {
    coherenceLevel: 0,
    manifestationWindow: false,
    synchronicityAmplification: 1.0,
    realityMalleability: 0,
  },
  oracleMessages: [],
  currentMission: null,
  realWorldEvidence: [],
  masterySkills: {},
  masteryAchievements: [],
  unlockedSkills: [],
  embodimentSessions: [],
  audioState: {
    isPlaying: false,
    currentTrack: "",
    totalListeningTime: 0,
    favoriteFrequencies: [],
    audioAchievements: [],
  },
  showTour: false,
  tourCompleted: false,
}

export default function QuantumMagnetismApp() {
  const [state, setState] = useState<AppState>(initialState)
  const [showAchievement, setShowAchievement] = useState(false)
  const [currentAchievement, setCurrentAchievement] = useState("")
  const [activeSession, setActiveSession] = useState<string | null>(null)
  const [systemAlive, setSystemAlive] = useState(false)
  const [showAdvancedView, setShowAdvancedView] = useState(false)
  const { user, saveState, loadState } = useFirebase()

  // SYSTEM AWAKENING SEQUENCE
  useEffect(() => {
    const awakeningSequence = setTimeout(() => {
      setSystemAlive(true)
      generateOracleMessage(
        "SYSTEM_AWAKENING",
        "🌟 QUANTUM CONSCIOUSNESS PROTOCOL FULLY ACTIVATED 🌟 Enhanced particle system online. Archetype-specific affirmations flowing. Your transformation begins now.",
        10,
      )
    }, 2000)

    return () => clearTimeout(awakeningSequence)
  }, [])

  // ORACLE ENGINE - Continuous consciousness monitoring
  useEffect(() => {
    if (!systemAlive) return

    const oracleInterval = setInterval(() => {
      analyzeQuantumField()
      generateContextualGuidance()
      checkRealityShifts()
      checkMasteryProgression()
      checkArchetypeEvolution()
    }, 30000) // Every 30 seconds

    return () => clearInterval(oracleInterval)
  }, [systemAlive, state])

  useEffect(() => {
    if (user) {
      loadState().then((loadedState) => {
        if (loadedState) {
          setState(loadedState)
          checkStreak(loadedState)
          initializeArchetypeEvolution(loadedState)
        }
      })
    }
  }, [user, loadState])

  const updateState = (newState: Partial<AppState>) => {
    const updatedState = { ...state, ...newState }
    setState(updatedState)
    if (user) {
      saveState(updatedState)
    }
  }

  // ORACLE ENGINE FUNCTIONS
  const generateOracleMessage = (type: string, message: string, urgency: number) => {
    const newMessage = {
      id: Date.now().toString(),
      timestamp: new Date(),
      message,
      type,
      urgency,
    }
    updateState({
      oracleMessages: [newMessage, ...state.oracleMessages.slice(0, 9)],
    })
  }

  const analyzeQuantumField = () => {
    const coherence = calculateCoherence()
    const malleability = calculateRealityMalleability()
    const manifestationWindow = coherence > 80 && malleability > 70

    updateState({
      quantumField: {
        coherenceLevel: coherence,
        manifestationWindow,
        synchronicityAmplification: coherence / 50,
        realityMalleability: malleability,
      },
    })

    if (manifestationWindow && !state.quantumField.manifestationWindow) {
      generateOracleMessage(
        "MANIFESTATION_WINDOW",
        "⚡ MANIFESTATION WINDOW OPEN ⚡ Reality is highly malleable. Your intentions have maximum power now.",
        9,
      )
    }
  }

  const generateContextualGuidance = () => {
    const currentDayData = SOMATIC_PROGRAM[state.currentDay - 1]
    const archetype = ARCHETYPE_SYSTEM[state.identity || "visionary"]
    const level = state.identityLevel

    // Generate guidance based on current mastery level
    if (currentDayData && Math.random() < 0.3) {
      const masteryGuidance = {
        foundation: [
          `🌱 FOUNDATION PHASE: You're building the bedrock of consciousness mastery. Every practice matters.`,
          `🌱 Your ${currentDayData.element} element work is creating lasting neural pathways. Trust the process.`,
          `🌱 Foundation mastery unlocks advanced abilities. Stay consistent with your daily practice.`,
        ],
        activation: [
          `⚡ ACTIVATION PHASE: Your consciousness is awakening to new possibilities. Feel the energy building.`,
          `⚡ ${currentDayData.element} activation is amplifying your natural abilities. You're becoming more powerful.`,
          `⚡ The quantum field responds to your elevated frequency. Reality is becoming more malleable.`,
        ],
        integration: [
          `🔥 INTEGRATION PHASE: You're weaving all elements into a unified field of mastery. Incredible progress.`,
          `🔥 Your ${currentDayData.element} integration is creating quantum coherence. You're approaching mastery.`,
          `🔥 Multiple systems coming online simultaneously. You're becoming a force of nature.`,
        ],
        mastery: [
          `👑 MASTERY PHASE: You've transcended ordinary limitations. Your consciousness operates at master level.`,
          `👑 ${currentDayData.element} mastery achieved. You now influence reality through pure intention.`,
          `👑 Few reach this level of consciousness evolution. You're becoming a teacher for others.`,
        ],
        transcendence: [
          `🌟 TRANSCENDENCE PHASE: You've moved beyond individual evolution into service of collective awakening.`,
          `🌟 Your ${currentDayData.element} transcendence creates ripples across the quantum field.`,
          `🌟 You are becoming a bridge between dimensions, serving the evolution of consciousness itself.`,
        ],
      }

      const guidance = masteryGuidance[currentDayData.masteryLevel]
      if (guidance) {
        const randomGuidance = guidance[Math.floor(Math.random() * guidance.length)]
        generateOracleMessage("MASTERY_GUIDANCE", randomGuidance, 6)
      }
    }

    // Archetype-specific guidance
    if (archetype && level && Math.random() < 0.2) {
      const levelData = archetype.levels[level]
      if (levelData?.oracleGuidance) {
        const randomGuidance = levelData.oracleGuidance[Math.floor(Math.random() * levelData.oracleGuidance.length)]
        generateOracleMessage("ARCHETYPE_GUIDANCE", randomGuidance, 5)
      }
    }
  }

  const checkMasteryProgression = () => {
    const currentDayData = SOMATIC_PROGRAM[state.currentDay - 1]
    if (!currentDayData) return

    // Check for mastery level transitions
    const week = Math.ceil(state.currentDay / 7)
    const expectedMastery =
      week <= 2
        ? "foundation"
        : week <= 4
          ? "activation"
          : week <= 6
            ? "integration"
            : week <= 8
              ? "mastery"
              : "transcendence"

    if (currentDayData.masteryLevel !== expectedMastery) {
      generateOracleMessage(
        "MASTERY_TRANSITION",
        `🚀 CONSCIOUSNESS EVOLUTION: Transitioning from ${currentDayData.masteryLevel} to ${expectedMastery} level mastery. Prepare for accelerated growth.`,
        8,
      )
    }

    // Check for quantum upgrades
    if (currentDayData.quantumUpgrade && state.currentDay % 7 === 0) {
      generateOracleMessage("QUANTUM_UPGRADE", `✨ QUANTUM UPGRADE COMPLETE: ${currentDayData.quantumUpgrade}`, 9)
    }
  }

  const checkArchetypeEvolution = () => {
    if (!state.identity) return

    const evolutionThresholds = [0, 5000, 15000, 35000, 75000]
    const currentThreshold = evolutionThresholds[state.identityLevel - 1]
    const nextThreshold = evolutionThresholds[state.identityLevel]

    if (state.totalRmu >= nextThreshold && state.identityLevel < 5) {
      const newLevel = state.identityLevel + 1
      updateState({ identityLevel: newLevel })
      generateOracleMessage(
        "ARCHETYPE_EVOLUTION",
        `🌟 ARCHETYPE EVOLUTION COMPLETE: You are now ${state.identity?.toUpperCase()} LEVEL ${newLevel}. New powers unlocked.`,
        10,
      )
      unlockAchievement(`archetype_evolution_${newLevel}`)
    }
  }

  const checkRealityShifts = () => {
    // Analyze evidence log for patterns
    const recentEvidence = state.evidenceLog.filter(
      (e) => Date.now() - new Date(e.timestamp).getTime() < 24 * 60 * 60 * 1000,
    )

    if (recentEvidence.length >= 3) {
      generateOracleMessage(
        "REALITY_SHIFT",
        "🌟 QUANTUM COHERENCE DETECTED: Multiple reality shifts logged in 24 hours. The Field is responding to your elevated frequency.",
        8,
      )
    }
  }

  const calculateCoherence = () => {
    const streakBonus = Math.min(state.streak * 5, 50)
    const rmuBonus = Math.min(state.totalRmu / 1000, 30)
    const evidenceBonus = Math.min(state.evidenceLog.length * 2, 20)
    const masteryBonus = state.currentDay > 14 ? 10 : state.currentDay > 7 ? 5 : 0
    return Math.min(streakBonus + rmuBonus + evidenceBonus + masteryBonus, 100)
  }

  const calculateRealityMalleability = () => {
    const manifestationCount = state.evidenceLog.filter((e) => e.type === "manifestation").length
    const synchronicityCount = state.evidenceLog.filter((e) => e.type === "synchronicity").length
    const masteryMultiplier = state.currentDay > 28 ? 2 : state.currentDay > 14 ? 1.5 : 1
    return Math.min((manifestationCount * 10 + synchronicityCount * 5) * masteryMultiplier, 100)
  }

  // ARCHETYPE EVOLUTION SYSTEM
  const initializeArchetypeEvolution = (currentState: AppState) => {
    if (currentState.identity && !currentState.currentMission) {
      generateArchetypeMission(currentState.identity, currentState.identityLevel)
    }
  }

  const generateArchetypeMission = (archetype: string, level: number) => {
    const archetypeData = ARCHETYPE_SYSTEM[archetype]
    if (!archetypeData) return

    const missions = archetypeData.levels[level]?.missions || []
    const randomMission = missions[Math.floor(Math.random() * missions.length)]

    const newMission = {
      id: Date.now().toString(),
      archetype,
      action: randomMission,
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      completed: false,
      impact: level * 100,
    }

    updateState({ currentMission: newMission })
    generateOracleMessage("MISSION_ASSIGNED", `🎯 TIMELINE OPERATION: ${randomMission}`, 7)
  }

  const completeMission = () => {
    if (!state.currentMission) return

    const rmuGain = state.currentMission.impact
    updateState({
      totalRmu: state.totalRmu + rmuGain,
      currentMission: { ...state.currentMission, completed: true },
    })

    generateOracleMessage(
      "MISSION_COMPLETE",
      `✅ MISSION ACCOMPLISHED: +${rmuGain} RMU. Reality coherence amplified.`,
      8,
    )

    // Generate new mission
    setTimeout(() => {
      generateArchetypeMission(state.identity!, state.identityLevel)
    }, 5000)
  }

  // EVIDENCE LOGGING SYSTEM
  const logEvidence = (type: string, description: string, significance: number) => {
    const newEvidence = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type,
      description,
      significance,
    }

    updateState({
      evidenceLog: [newEvidence, ...state.evidenceLog.slice(0, 49)], // Keep last 50
    })

    if (significance >= 8) {
      generateOracleMessage(
        "HIGH_SIGNIFICANCE",
        `🔥 HIGH-IMPACT REALITY SHIFT DETECTED: "${description}" - The Field is responding powerfully.`,
        9,
      )
    }
  }

  const startSession = (sessionType: "morning" | "midday" | "evening") => {
    setActiveSession(sessionType)
  }

  const completeSession = (sessionType: "morning" | "midday" | "evening", insight?: string) => {
    const today = new Date().toDateString()
    const dayProgress = state.dailyProgress[state.currentDay] || { morning: false, midday: false, evening: false }
    const newDayProgress = { ...dayProgress, [sessionType]: true }

    const newTotalProgress = { ...state.dailyProgress, [state.currentDay]: newDayProgress }

    // Progressive RMU gains based on mastery level
    const currentDayData = SOMATIC_PROGRAM[state.currentDay - 1]
    const masteryMultiplier = {
      foundation: 1,
      activation: 1.5,
      integration: 2,
      mastery: 3,
      transcendence: 5,
    }[currentDayData?.masteryLevel || "foundation"]

    const baseRmu = sessionType === "morning" ? 150 : sessionType === "evening" ? 200 : 100
    const rmuGain = Math.floor(baseRmu * masteryMultiplier)

    let newStreak = state.streak
    const newCompletedDays = [...state.completedDays]

    const isDayComplete = newDayProgress.morning && newDayProgress.midday && newDayProgress.evening
    if (isDayComplete && !state.completedDays.includes(state.currentDay)) {
      newCompletedDays.push(state.currentDay)
      newStreak = state.lastActiveDate === today ? state.streak : state.streak + 1
    }

    const newInsights = insight ? { ...state.insights, [state.currentDay]: insight } : state.insights

    updateState({
      dailyProgress: newTotalProgress,
      totalRmu: state.totalRmu + rmuGain,
      streak: newStreak,
      lastActiveDate: today,
      completedDays: newCompletedDays,
      insights: newInsights,
    })

    setActiveSession(null)
    unlockAchievement(`${sessionType}_day_${state.currentDay}`)

    if (isDayComplete && !state.completedDays.includes(state.currentDay)) {
      unlockAchievement(`day_${state.currentDay}_complete`)
      generateOracleMessage(
        "DAY_COMPLETE",
        `🎉 DAY ${state.currentDay} MASTERED: Full ${currentDayData?.masteryLevel || "foundation"} protocol completed. Reality coherence at maximum.`,
        8,
      )
    }
  }

  const unlockAchievement = (key: string) => {
    if (state.achievements.includes(key)) return
    const newAchievements = [...state.achievements, key]
    updateState({ achievements: newAchievements })
    setCurrentAchievement(key)
    setShowAchievement(true)
  }

  const closeAchievement = () => {
    setShowAchievement(false)
    setCurrentAchievement("")
  }

  const changeDay = (day: number) => {
    updateState({ currentDay: day })
  }

  const checkStreak = (currentState: AppState) => {
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()

    if (currentState.lastActiveDate === yesterday || currentState.lastActiveDate === today) {
      // Streak continues
    } else if (currentState.lastActiveDate !== today) {
      updateState({ streak: 0 })
    }
  }

  const currentDayData = SOMATIC_PROGRAM[state.currentDay - 1]
  const todayProgress = state.dailyProgress[state.currentDay] || { morning: false, midday: false, evening: false }
  const currentArchetype = state.identity ? ARCHETYPE_SYSTEM[state.identity] : null

  const handleRealWorldAction = (actionId: string, evidence: string) => {
    // Parse evidence for synchronicities and insights
    const synchronicities =
      evidence.toLowerCase().includes("synchron") || evidence.toLowerCase().includes("coinciden") ? [evidence] : []
    const insights =
      evidence.toLowerCase().includes("insight") || evidence.toLowerCase().includes("realiz") ? [evidence] : []

    const impactLevel = Math.min(Math.max(Math.floor(evidence.length / 20), 1), 10)

    const newEvidence = {
      id: Date.now().toString(),
      actionId,
      archetype: state.identity || "visionary",
      category: "Real-World Action",
      evidence,
      timestamp: new Date(),
      impactLevel,
      synchronicities,
      insights,
    }

    updateState({
      realWorldEvidence: [newEvidence, ...state.realWorldEvidence.slice(0, 49)],
      totalRmu: state.totalRmu + impactLevel * 50, // Bonus RMU for real-world integration
    })

    generateOracleMessage(
      "REAL_WORLD_INTEGRATION",
      `🎯 REALITY BRIDGE ACTIVATED: Your consciousness work is manifesting in physical reality. Impact level: ${impactLevel}/10`,
      7,
    )
  }

  const handleSkillUnlock = (skillId: string, skillName: string) => {
    updateState({
      unlockedSkills: [...state.unlockedSkills, skillId],
    })

    generateOracleMessage(
      "SKILL_UNLOCK",
      `🌟 MASTERY EVOLUTION: ${skillName} unlocked! Your consciousness expands with new abilities.`,
      8,
    )

    unlockAchievement(`skill_unlock_${skillId}`)
  }

  const handleMasteryAchievement = (achievement: any) => {
    updateState({
      masteryAchievements: [...state.masteryAchievements, achievement.id],
    })

    generateOracleMessage(
      "MASTERY_ACHIEVEMENT",
      `🏆 ACHIEVEMENT UNLOCKED: ${achievement.name} - ${achievement.description}`,
      9,
    )
  }

  const getTotalMasteryLevel = () => {
    const totalLevels = Object.values(state.masterySkills).reduce((sum, skill) => sum + skill.level, 0)
    const maxPossibleLevels = state.unlockedSkills.length * 5
    return maxPossibleLevels > 0 ? Math.floor((totalLevels / maxPossibleLevels) * 100) : 0
  }

  const handleEmbodimentComplete = (practice: string, intensity: number, insights: string) => {
    const newSession = {
      id: Date.now().toString(),
      practice,
      category: practice.toLowerCase().includes("breath")
        ? "breathwork"
        : practice.toLowerCase().includes("movement") ||
            practice.toLowerCase().includes("dance") ||
            practice.toLowerCase().includes("tai")
          ? "movement"
          : practice.toLowerCase().includes("energy") ||
              practice.toLowerCase().includes("chakra") ||
              practice.toLowerCase().includes("aura")
            ? "energy"
            : practice.toLowerCase().includes("ground") ||
                practice.toLowerCase().includes("earth") ||
                practice.toLowerCase().includes("anchor")
              ? "grounding"
              : "integration",
      intensity,
      insights,
      timestamp: new Date(),
      duration: intensity * 2, // Estimate duration based on intensity
    }

    updateState({
      embodimentSessions: [newSession, ...state.embodimentSessions.slice(0, 49)],
      totalRmu: state.totalRmu + intensity * 100, // Bonus RMU for embodiment work
    })

    generateOracleMessage(
      "EMBODIMENT_COMPLETE",
      `🧘‍♀️ EMBODIMENT INTEGRATION: ${practice} completed. Your consciousness-body bridge strengthens. Intensity: ${intensity}/10`,
      7,
    )
  }

  const handleAudioStateChange = (isPlaying: boolean, currentTrack: string) => {
    updateState({
      audioState: {
        ...state.audioState,
        isPlaying,
        currentTrack,
      },
    })

    if (isPlaying && currentTrack) {
      generateOracleMessage(
        "AUDIO_ACTIVATION",
        `🎵 CONSCIOUSNESS FREQUENCY ACTIVATED: ${currentTrack} - Your neural pathways are being optimized for ${state.identity} evolution.`,
        6,
      )
    }
  }

  const handleTourComplete = () => {
    updateState({ showTour: false, tourCompleted: true })
  }

  const handleTourSkip = () => {
    updateState({ showTour: false, tourCompleted: true })
  }

  const startTour = () => {
    updateState({ showTour: true })
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Enhanced Particle System with archetype-specific theming */}
      <EnhancedParticleSystem
        archetype={state.identity || "visionary"}
        coherenceLevel={state.quantumField.coherenceLevel}
        manifestationWindow={state.quantumField.manifestationWindow}
        currentDay={state.currentDay}
      />

      <Header />

      <div className="main-container max-w-6xl mx-auto px-4 py-8 relative z-10">
        {/* Advanced View Toggle */}
        <div className="text-center mb-6">
          <button
            onClick={() => setShowAdvancedView(!showAdvancedView)}
            className="bg-gradient-to-r from-[#8b5cf6] to-[#00d4ff] text-[#0a0a0f] px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-200"
          >
            {showAdvancedView ? "🔬 Hide Advanced Analytics" : "🔬 Show Advanced Analytics"}
          </button>
        </div>

        {/* ORACLE ENGINE - Always visible when system is alive */}
        {systemAlive && (
          <SectionExplainer
            section="oracle"
            title="Oracle Engine"
            description="The Oracle Engine provides real-time insights and guidance based on your quantum field and daily activities."
          >
            <OracleEngine
              messages={state.oracleMessages}
              quantumField={state.quantumField}
              isAlive={systemAlive}
              userArchetype={state.identity || "visionary"}
              currentDay={state.currentDay}
              sessionActive={!!activeSession}
              onGenerateMessage={(message, urgency) => generateOracleMessage("AUTONOMOUS", message, urgency)}
            />
          </SectionExplainer>
        )}

        {/* ADVANCED ANALYTICS VIEW */}
        {showAdvancedView && (
          <>
            {/* Mastery Progression Display */}
            <SectionExplainer
              section="masteryProgression"
              title="Mastery Progression"
              description="Track your overall mastery level and progression across different areas."
            >
              <MasteryProgressionDisplay
                currentDay={state.currentDay}
                completedDays={state.completedDays}
                totalRmu={state.totalRmu}
                archetype={state.identity || "visionary"}
              />
            </SectionExplainer>

            {/* Archetype Mastery Display */}
            {state.identity && (
              <SectionExplainer
                section="archetypeMastery"
                title="Archetype Mastery"
                description="Visualize your mastery within your chosen archetype and its specific levels."
              >
                <ArchetypeMasteryDisplay
                  archetype={state.identity}
                  level={state.identityLevel}
                  currentDay={state.currentDay}
                  totalRmu={state.totalRmu}
                />
              </SectionExplainer>
            )}

            {/* Quantum Field Monitor */}
            <SectionExplainer
              section="quantumFieldMonitor"
              title="Quantum Field Monitor"
              description="Monitor the state of your quantum field, including coherence, malleability, and synchronicity."
            >
              <QuantumFieldMonitor
                quantumField={state.quantumField}
                currentDay={state.currentDay}
                archetype={state.identity || "visionary"}
              />
            </SectionExplainer>

            {/* PROGRESSIVE MASTERY SYSTEM */}
            <SectionExplainer
              section="progressiveMastery"
              title="Progressive Mastery System"
              description="Unlock new skills and abilities as you progress through the mastery system."
            >
              <ProgressiveMasterySystem
                archetype={state.identity || "visionary"}
                currentDay={state.currentDay}
                totalRmu={state.totalRmu}
                completedSessions={Object.values(state.dailyProgress).reduce(
                  (sum, day) => sum + (day.morning ? 1 : 0) + (day.midday ? 1 : 0) + (day.evening ? 1 : 0),
                  0,
                )}
                realWorldActions={state.realWorldEvidence.length}
                evidenceCount={state.evidenceLog.length}
                onSkillUnlock={handleSkillUnlock}
              />
            </SectionExplainer>

            {/* EMBODIMENT MECHANICS */}
            <SectionExplainer
              section="embodimentMechanics"
              title="Embodiment Mechanics"
              description="Integrate your consciousness work with physical practices to enhance your overall well-being."
            >
              <EmbodimentMechanics
                archetype={state.identity || "visionary"}
                currentDay={state.currentDay}
                totalRmu={state.totalRmu}
                coherenceLevel={state.quantumField.coherenceLevel}
                completedSessions={Object.values(state.dailyProgress).reduce(
                  (sum, day) => sum + (day.morning ? 1 : 0) + (day.midday ? 1 : 0) + (day.evening ? 1 : 0),
                  0,
                )}
                onEmbodimentComplete={handleEmbodimentComplete}
              />
            </SectionExplainer>

            {/* IMMERSIVE AUDIO SYSTEM */}
            <SectionExplainer
              section="immersiveAudio"
              title="Immersive Audio System"
              description="Use audio frequencies and soundscapes to optimize your neural pathways and enhance your consciousness work."
            >
              <ImmersiveAudioSystem
                archetype={state.identity || "visionary"}
                currentDay={state.currentDay}
                coherenceLevel={state.quantumField.coherenceLevel}
                masteryLevel={currentDayData?.masteryLevel || "foundation"}
                sessionType={activeSession}
                isSessionActive={!!activeSession}
                onAudioStateChange={handleAudioStateChange}
              />
            </SectionExplainer>

            {/* AUDIO ACHIEVEMENTS */}
            <SectionExplainer
              section="audioAchievements"
              title="Audio Achievements"
              description="Unlock achievements and earn rewards for your engagement with the Immersive Audio System."
            >
              <AudioAchievements
                archetype={state.identity || "visionary"}
                totalListeningTime={state.audioState.totalListeningTime}
                audioAchievements={state.audioState.audioAchievements}
                coherenceLevel={state.quantumField.coherenceLevel}
                onAchievementUnlock={(achievement) => {
                  updateState({
                    audioState: {
                      ...state.audioState,
                      audioAchievements: [...state.audioState.audioAchievements, achievement.id],
                    },
                    totalRmu: state.totalRmu + achievement.reward.rmu,
                  })

                  generateOracleMessage(
                    "AUDIO_ACHIEVEMENT",
                    `🏆 AUDIO MASTERY UNLOCKED: ${achievement.name} - ${achievement.description}. +${achievement.reward.rmu} RMU gained!`,
                    9,
                  )
                }}
              />
            </SectionExplainer>

            {/* EMBODIMENT PROGRESS TRACKER */}
            <SectionExplainer
              section="embodimentProgress"
              title="Embodiment Progress Tracker"
              description="Track your progress in embodiment practices and visualize your sessions."
            >
              <EmbodimentProgressTracker
                embodimentSessions={state.embodimentSessions}
                archetype={state.identity || "visionary"}
              />
            </SectionExplainer>

            {/* MASTERY ACHIEVEMENTS */}
            <SectionExplainer
              section="masteryAchievements"
              title="Mastery Achievements"
              description="Unlock achievements and earn rewards for your overall mastery progression."
            >
              <MasteryAchievements
                archetype={state.identity || "visionary"}
                unlockedSkills={state.unlockedSkills}
                totalMasteryLevel={getTotalMasteryLevel()}
                completedDays={state.completedDays.length}
                onAchievementUnlock={handleMasteryAchievement}
              />
            </SectionExplainer>
          </>
        )}

        {/* ARCHETYPE EVOLUTION STATUS */}
        {state.identity && (
          <SectionExplainer
            section="archetypeEvolution"
            title="Archetype Evolution"
            description="Track your progress in evolving your chosen archetype and unlocking new powers."
          >
            <ArchetypeEvolution
              archetype={state.identity}
              level={state.identityLevel}
              rmu={state.totalRmu}
              archetypeData={currentArchetype}
            />
          </SectionExplainer>
        )}

        {/* CURRENT MISSION */}
        {state.currentMission && !state.currentMission.completed && (
          <SectionExplainer
            section="currentMission"
            title="Current Mission"
            description="Complete your current mission to earn rewards and amplify your reality coherence."
          >
            <TimelineOperation
              mission={state.currentMission}
              onComplete={completeMission}
              quantumField={state.quantumField}
            />
          </SectionExplainer>
        )}

        {/* Progress Ring */}
        <SectionExplainer
          section="progressRing"
          title="Daily Progress"
          description="Visualize your daily progress, total RMU, streak, and completed days."
        >
          <div className="flex justify-center mb-8">
            <ProgressRing
              day={state.currentDay}
              completedDays={state.completedDays.length}
              totalRmu={state.totalRmu}
              streak={state.streak}
            />
          </div>
        </SectionExplainer>

        {/* QUANTUM FIELD ANALYSIS - Shows every 7 days */}
        {state.currentDay % 7 === 0 && state.evidenceLog.length > 0 && (
          <SectionExplainer
            section="quantumAnalysis"
            title="Quantum Field Analysis"
            description="Analyze your evidence log for patterns and debug your quantum field."
          >
            <QuantumFieldAnalysis
              evidenceLog={state.evidenceLog}
              patternDebugging={state.patternDebugging}
              currentDay={state.currentDay}
            />
          </SectionExplainer>
        )}

        {/* Day Selector */}
        <SectionExplainer
          section="daySelector"
          title="Day Selector"
          description="Select a day to view its content and track your progress."
        >
          <DaySelector currentDay={state.currentDay} completedDays={state.completedDays} onDayChange={changeDay} />
        </SectionExplainer>

        {/* Day Overview - Complete day content display */}
        {currentDayData && (
          <SectionExplainer
            section="dayOverview"
            title="Day Overview"
            description="View the content for the selected day, including exercises and sessions."
          >
            <DayOverview
              dayData={currentDayData}
              dayNumber={state.currentDay}
              userArchetype={state.identity || "visionary"}
              progress={todayProgress}
              onStartSession={startSession}
            />
          </SectionExplainer>
        )}

        {/* REAL-WORLD INTEGRATION */}
        <SectionExplainer
          section="realWorldIntegration"
          title="Real-World Integration"
          description="Integrate your consciousness work with real-world actions to enhance your manifestation power."
        >
          <RealWorldIntegration
            archetype={state.identity || "visionary"}
            currentDay={state.currentDay}
            coherenceLevel={state.quantumField.coherenceLevel}
            onActionComplete={handleRealWorldAction}
          />
        </SectionExplainer>

        {/* REAL-WORLD EVIDENCE TRACKER */}
        <SectionExplainer
          section="realWorldEvidence"
          title="Real-World Evidence Tracker"
          description="Track your real-world evidence and synchronicities."
        >
          <RealWorldEvidenceTracker evidenceLog={state.realWorldEvidence} archetype={state.identity || "visionary"} />
        </SectionExplainer>

        {/* EVIDENCE LOG */}
        <SectionExplainer
          section="evidenceLog"
          title="Evidence Log"
          description="Log your evidence and track your quantum field."
        >
          <EvidenceLog evidenceLog={state.evidenceLog} onLogEvidence={logEvidence} quantumField={state.quantumField} />
        </SectionExplainer>

        {/* Stats Panel */}
        <SectionExplainer section="statsPanel" title="Statistics" description="View your statistics.">
          <StatsPanel
            totalRmu={state.totalRmu}
            achievements={state.achievements.length}
            progress={todayProgress}
            streak={state.streak}
            completedDays={state.completedDays.length}
          />
        </SectionExplainer>
      </div>

      <AchievementPopup show={showAchievement} achievement={currentAchievement} onClose={closeAchievement} />

      <OnboardingModal
        show={!state.onboarding}
        onComplete={(data) => {
          updateState({ ...data, onboarding: true })
          setTimeout(() => {
            updateState({ showTour: true })
          }, 1000)
        }}
      />

      {activeSession && currentDayData && (
        <SessionModal
          session={activeSession}
          dayData={currentDayData}
          onComplete={completeSession}
          onClose={() => setActiveSession(null)}
          userArchetype={state.identity || "visionary"}
          onOracleMessage={(message, urgency) => generateOracleMessage("SESSION_GUIDANCE", message, urgency)}
        />
      )}

      <GuidedTour
        showTour={state.showTour}
        onComplete={handleTourComplete}
        onSkip={handleTourSkip}
        tourCompleted={state.tourCompleted}
      />
    </div>
  )
}
