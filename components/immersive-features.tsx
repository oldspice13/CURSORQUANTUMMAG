"use client"

import { useState, useEffect, useRef } from "react"

// Add this prop to the component interface:
interface QuantumSoundSystemProps {
  onFrequencyChange?: (frequency: string) => void
  coherenceLevel?: number
}

// 🎵 BINAURAL BEATS & SOUND HEALING
export function QuantumSoundSystem({ onFrequencyChange, coherenceLevel = 0 }: QuantumSoundSystemProps) {
  const [activeFrequency, setActiveFrequency] = useState("432Hz")
  const [isPlaying, setIsPlaying] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorsRef = useRef<{ left: OscillatorNode; right: OscillatorNode } | null>(null)

  const frequencies = {
    "432Hz": { freq: 432, name: "Universal Harmony", color: "#00ff88" },
    "528Hz": { freq: 528, name: "Love & DNA Repair", color: "#ff0080" },
    "741Hz": { freq: 741, name: "Consciousness Expansion", color: "#00d4ff" },
    "963Hz": { freq: 963, name: "Pineal Activation", color: "#8b5cf6" },
  }

  // Add coherence-based frequency recommendations
  const getRecommendedFrequency = () => {
    if (coherenceLevel > 80) return "963Hz"
    if (coherenceLevel > 60) return "741Hz"
    if (coherenceLevel > 40) return "528Hz"
    return "432Hz"
  }

  // Update the frequency selection to be coherence-aware
  const recommendedFreq = getRecommendedFrequency()

  const startSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    const ctx = audioContextRef.current
    const frequency = frequencies[activeFrequency].freq

    // Create binaural beat
    const leftOsc = ctx.createOscillator()
    const rightOsc = ctx.createOscillator()
    const leftGain = ctx.createGain()
    const rightGain = ctx.createGain()
    const merger = ctx.createChannelMerger(2)

    leftOsc.frequency.value = frequency
    rightOsc.frequency.value = frequency + 10 // 10Hz binaural beat

    leftGain.gain.value = 0.1
    rightGain.gain.value = 0.1

    leftOsc.connect(leftGain)
    rightOsc.connect(rightGain)
    leftGain.connect(merger, 0, 0)
    rightGain.connect(merger, 0, 1)
    merger.connect(ctx.destination)

    leftOsc.start()
    rightOsc.start()

    oscillatorsRef.current = { left: leftOsc, right: rightOsc }
    setIsPlaying(true)
  }

  const stopSound = () => {
    if (oscillatorsRef.current) {
      oscillatorsRef.current.left.stop()
      oscillatorsRef.current.right.stop()
      oscillatorsRef.current = null
    }
    setIsPlaying(false)
  }

  const toggleSound = () => {
    if (isPlaying) {
      stopSound()
    } else {
      startSound()
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (oscillatorsRef.current) {
        stopSound()
      }
    }
  }, [])

  return (
    <div className="quantum-sound glass-card p-6 mb-6">
      <h3 className="text-xl font-bold text-[#00d4ff] mb-4">🎵 Quantum Sound Healing</h3>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {Object.entries(frequencies).map(([key, freq]) => (
          <button
            key={key}
            onClick={() => {
              if (isPlaying) {
                stopSound()
              }
              setActiveFrequency(key)
            }}
            className={`p-3 rounded-xl border-2 transition-all duration-200 ${
              activeFrequency === key
                ? `border-[${freq.color}] bg-[rgba(0,255,136,0.2)]`
                : "border-[rgba(136,136,170,0.3)] hover:border-[#00d4ff]"
            }`}
          >
            <div className="font-bold" style={{ color: freq.color }}>
              {key}
            </div>
            <div className="text-xs text-[#8888aa]">{freq.name}</div>
          </button>
        ))}
      </div>

      <button
        onClick={toggleSound}
        className="w-full bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] text-[#0a0a0f] rounded-xl py-3 font-bold hover:scale-105 transition-all duration-200"
      >
        {isPlaying ? "⏸️ Stop Healing" : "▶️ Start Quantum Healing"}
      </button>

      {isPlaying && (
        <div className="mt-4 text-center">
          <div className="animate-pulse text-[#00d4ff]">🌊 Entraining brainwaves to {activeFrequency} 🌊</div>
          <div className="text-xs text-[#8888aa] mt-1">Use headphones for optimal binaural beat experience</div>
          <div className="mt-2">
            <div className="w-full bg-[rgba(136,136,170,0.2)] rounded-full h-1">
              <div className="bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] h-1 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {coherenceLevel > 60 && (
        <div className="mt-2 p-2 bg-[rgba(0,255,136,0.1)] border border-[#00ff88] rounded-xl">
          <div className="text-xs text-[#00ff88]">
            ✨ High coherence detected! {recommendedFreq} frequency now optimal for your state.
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-[#8888aa] text-center">
        💡 Tip: Each frequency targets different aspects of consciousness. Experiment to find your resonance!
      </div>
    </div>
  )
}

// 📱 HAPTIC FEEDBACK SYSTEM
export function HapticCoherenceSystem() {
  const [hapticEnabled, setHapticEnabled] = useState(false)
  const [coherenceLevel, setCoherenceLevel] = useState(0)

  useEffect(() => {
    if (hapticEnabled && "vibrate" in navigator) {
      // Vibrate in sync with coherence level
      const pattern =
        coherenceLevel > 80 ? [100, 50, 100] : coherenceLevel > 60 ? [200] : coherenceLevel > 40 ? [50, 100, 50] : []

      if (pattern.length > 0) {
        navigator.vibrate(pattern)
      }
    }
  }, [coherenceLevel, hapticEnabled])

  return (
    <div className="haptic-system glass-card p-6 mb-6">
      <h3 className="text-xl font-bold text-[#00ff88] mb-4">📱 Haptic Coherence Feedback</h3>

      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[#e8e8ff]">Feel your coherence</div>
          <div className="text-sm text-[#8888aa]">Vibration patterns sync with your state</div>
        </div>
        <button
          onClick={() => setHapticEnabled(!hapticEnabled)}
          className={`px-4 py-2 rounded-xl font-bold transition-all duration-200 ${
            hapticEnabled ? "bg-[#00ff88] text-[#0a0a0f]" : "border border-[#00ff88] text-[#00ff88]"
          }`}
        >
          {hapticEnabled ? "ON" : "OFF"}
        </button>
      </div>

      {hapticEnabled && (
        <div className="text-center text-sm text-[#00d4ff]">📳 Haptic feedback active - feel the quantum field!</div>
      )}
    </div>
  )
}

// 🌍 ENVIRONMENTAL INTEGRATION
export function EnvironmentalSync() {
  const [location, setLocation] = useState({ lat: 0, lng: 0 })
  const [solarActivity, setSolarActivity] = useState("moderate")
  const [lunarPhase, setLunarPhase] = useState("waxing_gibbous")
  const [schumann, setSchumann] = useState(7.83)

  return (
    <div className="environmental-sync glass-card p-6 mb-6">
      <h3 className="text-xl font-bold text-[#8b5cf6] mb-4">🌍 Cosmic Alignment</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl mb-1">☀️</div>
          <div className="text-sm text-[#8888aa]">Solar Activity</div>
          <div className="text-[#ffaa00] font-bold capitalize">{solarActivity}</div>
        </div>

        <div className="text-center">
          <div className="text-2xl mb-1">🌙</div>
          <div className="text-sm text-[#8888aa]">Lunar Phase</div>
          <div className="text-[#00d4ff] font-bold">
            {lunarPhase.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl mb-1">🌊</div>
          <div className="text-sm text-[#8888aa]">Schumann Resonance</div>
          <div className="text-[#00ff88] font-bold">{schumann} Hz</div>
        </div>

        <div className="text-center">
          <div className="text-2xl mb-1">⚡</div>
          <div className="text-sm text-[#8888aa]">Optimal Practice</div>
          <div className="text-[#ff0080] font-bold">Now!</div>
        </div>
      </div>

      <div className="mt-4 bg-[rgba(139,92,246,0.1)] border border-[#8b5cf6] rounded-xl p-3">
        <div className="text-sm text-[#8b5cf6] font-bold mb-1">Cosmic Insight:</div>
        <div className="text-xs text-[#e8e8ff]">
          Current solar-lunar alignment amplifies manifestation power by 23%. Perfect time for intention setting! 🌟
        </div>
      </div>
    </div>
  )
}

// Helper function
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? `${Number.parseInt(result[1], 16)},${Number.parseInt(result[2], 16)},${Number.parseInt(result[3], 16)}`
    : "0,0,0"
}
