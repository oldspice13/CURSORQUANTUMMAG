"use client"

import { useState, useEffect } from "react"
import { X, ArrowRight, ArrowLeft } from "lucide-react"

interface TourStep {
  id: string
  title: string
  description: string
  target: string
  position: "top" | "bottom" | "left" | "right"
  icon: string
}

interface GuidedTourProps {
  show: boolean
  onComplete: () => void
  onSkip: () => void
}

const tourSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to Quantum Magnetism! 🌟",
    description:
      "This is your 60-day consciousness evolution journey. Each section helps you track and accelerate your transformation. Let's explore what everything means!",
    target: "main-container",
    position: "top",
    icon: "🚀",
  },
  {
    id: "oracle",
    title: "Meet Your Oracle Guide 🔮",
    description:
      "This is your AI consciousness coach. It monitors your progress, provides personalized guidance, and responds to your quantum field changes. Think of it as your wise inner voice made visible!",
    target: "oracle-engine",
    position: "bottom",
    icon: "🧠",
  },
  {
    id: "progress-ring",
    title: "Your Evolution Progress Ring ⭕",
    description:
      "This shows your overall journey progress. The ring fills as you complete days, and the center displays your current day, streak, and total RMU (Reality Manipulation Units) - your consciousness power level!",
    target: "progress-ring",
    position: "top",
    icon: "📊",
  },
  {
    id: "day-selector",
    title: "60-Day Journey Navigator 📅",
    description:
      "Each day has a unique theme and practices. Green dots = completed days, blue = current day, gray = future days. You can revisit any completed day or preview upcoming ones!",
    target: "day-selector",
    position: "top",
    icon: "🗓️",
  },
  {
    id: "day-overview",
    title: "Daily Practice Sessions 🧘‍♀️",
    description:
      "Each day has 3 sessions: Morning (activation), Midday (maintenance), Evening (integration). Complete all 3 to master the day and unlock maximum RMU rewards!",
    target: "day-overview",
    position: "top",
    icon: "⚡",
  },
  {
    id: "real-world-integration",
    title: "Real-World Action Missions 🎯",
    description:
      "Consciousness work isn't just meditation! These are specific actions to practice your new abilities in daily life. Complete them to bridge your inner work with outer reality.",
    target: "real-world-integration",
    position: "top",
    icon: "🌍",
  },
  {
    id: "evidence-log",
    title: "Reality Shift Documentation 📝",
    description:
      "Track synchronicities, manifestations, and insights here. This helps you notice patterns and see how your consciousness work is changing your reality. The more you log, the stronger your quantum field becomes!",
    target: "evidence-log",
    position: "top",
    icon: "🔍",
  },
  {
    id: "stats-panel",
    title: "Your Consciousness Metrics 📈",
    description:
      "Track your evolution with key metrics: Streak (consistency), RMU (power level), Achievements (milestones), and overall progress. These numbers reflect your growing mastery!",
    target: "stats-panel",
    position: "top",
    icon: "📊",
  },
]

export function GuidedTour({ show, onComplete, onSkip }: GuidedTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
    }
  }, [show])

  if (!show || !isVisible) return null

  const step = tourSteps[currentStep]
  const isLastStep = currentStep === tourSteps.length - 1
  const isFirstStep = currentStep === 0

  const handleNext = () => {
    if (isLastStep) {
      onComplete()
      setIsVisible(false)
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onSkip()
    setIsVisible(false)
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-60 z-[200]" />

      {/* Tour Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[201] max-w-lg w-full mx-4">
        <div className="glass-card border-2 border-[#00d4ff] rounded-3xl p-6 shadow-[0_0_64px_8px_#00d4ff]">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{step.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-[#00d4ff]">{step.title}</h3>
                <div className="text-sm text-[#8888aa]">
                  Step {currentStep + 1} of {tourSteps.length}
                </div>
              </div>
            </div>
            <button onClick={handleSkip} className="text-[#8888aa] hover:text-[#e8e8ff] transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="text-[#e8e8ff] leading-relaxed">{step.description}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full bg-[rgba(136,136,170,0.2)] rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#00ff88] transition-all duration-300"
                style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={isFirstStep}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl border-2 border-[#8888aa] text-[#8888aa] font-bold hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="text-center">
              <button onClick={handleSkip} className="text-sm text-[#8888aa] hover:text-[#e8e8ff] transition-colors">
                Skip Tour
              </button>
            </div>

            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-2 rounded-xl font-bold transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #00d4ff, #00ff88)",
                color: "#0a0a0f",
              }}
            >
              <span>{isLastStep ? "Start Journey!" : "Next"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
