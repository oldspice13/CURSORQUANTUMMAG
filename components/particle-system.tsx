"use client"

import { useEffect } from "react"

export function ParticleSystem() {
  useEffect(() => {
    const container = document.getElementById("neural-particles")
    if (!container) return

    const spawnParticlesAndSigils = () => {
      const randomBetween = (a: number, b: number) => a + Math.random() * (b - a)

      const interval = setInterval(() => {
        // Spawn particle
        const particle = document.createElement("div")
        particle.className = "particle"
        particle.style.left = randomBetween(0, 98) + "vw"
        particle.style.top = randomBetween(0, 98) + "vh"
        particle.style.opacity = String(Math.random() * 0.5 + 0.3)
        particle.style.animationDuration = randomBetween(7, 14) + "s"
        container.appendChild(particle)

        setTimeout(() => particle.remove(), 14000)

        // Occasionally spawn a sigil
        if (Math.random() < 0.13) {
          const sigil = document.createElementNS("http://www.w3.org/2000/svg", "svg")
          sigil.classList.add("sigil")
          sigil.style.left = randomBetween(0, 92) + "vw"
          sigil.style.top = randomBetween(0, 92) + "vh"
          sigil.style.width = sigil.style.height = randomBetween(60, 120) + "px"

          const sigilIds = ["solomon1", "solomon2", "merkaba"]
          const use = document.createElementNS("http://www.w3.org/2000/svg", "use")
          use.setAttributeNS(
            "http://www.w3.org/1999/xlink",
            "href",
            "#" + sigilIds[Math.floor(Math.random() * sigilIds.length)],
          )
          sigil.appendChild(use)
          container.appendChild(sigil)

          setTimeout(() => sigil.remove(), 30000)
        }
      }, 600)

      return () => clearInterval(interval)
    }

    const cleanup = spawnParticlesAndSigils()
    return cleanup
  }, [])

  return (
    <>
      <div
        className="neural-particles fixed top-0 left-0 w-screen h-screen pointer-events-none z-[1] overflow-hidden"
        id="neural-particles"
      />

      {/* Hidden SVG Sigils */}
      <svg className="hidden">
        <symbol id="solomon1" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" stroke="#00d4ff" strokeWidth="2" fill="none" />
          <polygon points="50,10 90,90 10,90" stroke="#ff0080" strokeWidth="2" fill="none" />
          <polygon points="50,90 90,10 10,10" stroke="#00ff88" strokeWidth="2" fill="none" />
          <text x="50" y="55" fontSize="18" textAnchor="middle" fill="#8b5cf6" fontFamily="JetBrains Mono">
            יהוה
          </text>
        </symbol>
        <symbol id="solomon2" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" stroke="#8b5cf6" strokeWidth="2" fill="none" />
          <rect x="20" y="20" width="60" height="60" stroke="#ffaa00" strokeWidth="2" fill="none" />
          <text x="50" y="55" fontSize="18" textAnchor="middle" fill="#ff0080" fontFamily="JetBrains Mono">
            אל שדי
          </text>
        </symbol>
        <symbol id="merkaba" viewBox="0 0 100 100">
          <polygon points="50,10 90,80 10,80" stroke="#00d4ff" strokeWidth="2" fill="none" />
          <polygon points="50,90 90,20 10,20" stroke="#ff0080" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="40" stroke="#00ff88" strokeWidth="1.5" fill="none" />
        </symbol>
      </svg>
    </>
  )
}
