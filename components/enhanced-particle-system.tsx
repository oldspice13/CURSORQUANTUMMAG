"use client"

import { useEffect, useState } from "react"

interface EnhancedParticleSystemProps {
  archetype: string
  coherenceLevel: number
  manifestationWindow: boolean
  currentDay: number
}

export function EnhancedParticleSystem({
  archetype,
  coherenceLevel,
  manifestationWindow,
  currentDay,
}: EnhancedParticleSystemProps) {
  const [affirmationIndex, setAffirmationIndex] = useState(0)

  const archetypeThemes = {
    visionary: {
      colors: ["#8b5cf6", "#00d4ff", "#ff0080"],
      patterns: "spiral",
      affirmations: [
        "I see infinite possibilities",
        "The future flows through me",
        "I am a bridge between dimensions",
        "Reality bends to my vision",
        "I perceive what others cannot",
        "Time reveals its secrets to me",
        "I architect new realities",
        "My sight transcends limitations",
      ],
    },
    creator: {
      colors: ["#00ff88", "#ffaa00", "#ff0080"],
      patterns: "mandala",
      affirmations: [
        "I create beauty from nothing",
        "The universe flows through my hands",
        "I am infinite creative potential",
        "My art transforms reality",
        "I birth new worlds daily",
        "Creation is my natural state",
        "I manifest through pure expression",
        "Beauty radiates from my being",
      ],
    },
    warrior: {
      colors: ["#ff0080", "#ffaa00", "#00d4ff"],
      patterns: "lightning",
      affirmations: [
        "I am unstoppable force",
        "Fear dissolves before my courage",
        "I break through all limitations",
        "My will shapes reality",
        "I am the change I seek",
        "Obstacles become opportunities",
        "I fight for what matters",
        "Victory flows through me",
      ],
    },
    mystic: {
      colors: ["#00d4ff", "#8b5cf6", "#00ff88"],
      patterns: "lotus",
      affirmations: [
        "I am one with all existence",
        "Divine wisdom flows through me",
        "I channel cosmic consciousness",
        "Love is my true nature",
        "I bridge earth and heaven",
        "Sacred presence fills me",
        "I am the universe experiencing itself",
        "Infinite love radiates from me",
      ],
    },
  }

  const currentTheme = archetypeThemes[archetype as keyof typeof archetypeThemes] || archetypeThemes.visionary

  useEffect(() => {
    const container = document.getElementById("enhanced-neural-particles")
    if (!container) return

    const spawnEnhancedParticles = () => {
      const randomBetween = (a: number, b: number) => a + Math.random() * (b - a)

      const interval = setInterval(
        () => {
          // Spawn regular particles with archetype colors
          const particle = document.createElement("div")
          particle.className = "enhanced-particle"
          particle.style.left = randomBetween(0, 98) + "vw"
          particle.style.top = randomBetween(0, 98) + "vh"
          particle.style.opacity = String(Math.random() * 0.7 + 0.3)
          particle.style.animationDuration = randomBetween(8, 16) + "s"

          // Use archetype colors
          const colorIndex = Math.floor(Math.random() * currentTheme.colors.length)
          particle.style.background = currentTheme.colors[colorIndex]

          // Coherence affects particle intensity
          const intensity = coherenceLevel / 100
          particle.style.boxShadow = `0 0 ${10 + intensity * 20}px ${currentTheme.colors[colorIndex]}`

          container.appendChild(particle)
          setTimeout(() => particle.remove(), 16000)

          // Spawn affirmation particles (less frequent)
          if (Math.random() < 0.15) {
            const affirmationParticle = document.createElement("div")
            affirmationParticle.className = "affirmation-particle"
            affirmationParticle.style.left = randomBetween(5, 85) + "vw"
            affirmationParticle.style.top = randomBetween(10, 80) + "vh"
            affirmationParticle.textContent = currentTheme.affirmations[affirmationIndex]
            affirmationParticle.style.color = currentTheme.colors[0]
            affirmationParticle.style.textShadow = `0 0 10px ${currentTheme.colors[0]}`

            container.appendChild(affirmationParticle)
            setTimeout(() => affirmationParticle.remove(), 8000)

            // Cycle through affirmations
            setAffirmationIndex((prev) => (prev + 1) % currentTheme.affirmations.length)
          }

          // Spawn quantum field indicators during manifestation window
          if (manifestationWindow && Math.random() < 0.3) {
            const quantumField = document.createElement("div")
            quantumField.className = "quantum-field-indicator"
            quantumField.style.left = randomBetween(10, 80) + "vw"
            quantumField.style.top = randomBetween(10, 80) + "vh"
            quantumField.style.background = `radial-gradient(circle, ${currentTheme.colors[0]}44, transparent)`
            quantumField.style.animation = "quantum-pulse 3s ease-in-out infinite"

            container.appendChild(quantumField)
            setTimeout(() => quantumField.remove(), 6000)
          }

          // Spawn archetype-specific pattern particles
          if (Math.random() < 0.08) {
            const patternParticle = document.createElement("div")
            patternParticle.className = `pattern-particle pattern-${currentTheme.patterns}`
            patternParticle.style.left = randomBetween(5, 90) + "vw"
            patternParticle.style.top = randomBetween(5, 90) + "vh"
            patternParticle.style.borderColor =
              currentTheme.colors[Math.floor(Math.random() * currentTheme.colors.length)]

            container.appendChild(patternParticle)
            setTimeout(() => patternParticle.remove(), 12000)
          }
        },
        400 + (100 - coherenceLevel) * 10,
      ) // Higher coherence = more frequent particles

      return () => clearInterval(interval)
    }

    const cleanup = spawnEnhancedParticles()
    return cleanup
  }, [archetype, coherenceLevel, manifestationWindow, affirmationIndex, currentTheme])

  return (
    <>
      <div
        className="enhanced-neural-particles fixed top-0 left-0 w-screen h-screen pointer-events-none z-[1] overflow-hidden"
        id="enhanced-neural-particles"
      />

      {/* Enhanced SVG Patterns */}
      <svg className="hidden">
        <symbol id="spiral-pattern" viewBox="0 0 100 100">
          <path
            d="M50,50 m-40,0 a40,40 0 1,1 80,0 a35,35 0 1,1 -70,0 a30,30 0 1,1 60,0 a25,25 0 1,1 -50,0 a20,20 0 1,1 40,0 a15,15 0 1,1 -30,0 a10,10 0 1,1 20,0 a5,5 0 1,1 -10,0"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </symbol>

        <symbol id="mandala-pattern" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" fill="none" />
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="5"
              x2="50"
              y2="95"
              stroke="currentColor"
              strokeWidth="1"
              transform={`rotate(${i * 45} 50 50)`}
            />
          ))}
        </symbol>

        <symbol id="lightning-pattern" viewBox="0 0 100 100">
          <path d="M30,10 L45,40 L35,40 L55,90 L40,60 L50,60 Z" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M70,15 L80,35 L75,35 L90,75 L80,55 L85,55 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </symbol>

        <symbol id="lotus-pattern" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={i}
              cx="50"
              cy="20"
              rx="8"
              ry="20"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              transform={`rotate(${i * 45} 50 50)`}
            />
          ))}
          <circle cx="50" cy="50" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
        </symbol>
      </svg>
    </>
  )
}
