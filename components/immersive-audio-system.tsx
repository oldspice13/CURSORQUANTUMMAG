"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Play, Pause, Volume2, VolumeX, Settings, Headphones, Waves } from "lucide-react"

interface ImmersiveAudioSystemProps {
  archetype: string
  currentDay: number
  coherenceLevel: number
  masteryLevel: string
  sessionType?: "morning" | "midday" | "evening" | null
  isSessionActive: boolean
  onAudioStateChange: (isPlaying: boolean, currentTrack: string) => void
}

interface AudioTrack {
  id: string
  name: string
  category: "binaural" | "guided" | "ambient" | "healing" | "activation"
  frequency?: number
  binauralBeat?: number
  duration: number
  description: string
  masteryLevel: string[]
  archetypeBonus: Record<string, number>
  coherenceEffect: number
  url?: string // In real app, would be actual audio URLs
}

interface SpatialAudioNode {
  id: string
  x: number
  y: number
  z: number
  intensity: number
  frequency: number
  type: "carrier" | "binaural" | "ambient"
}

const AUDIO_LIBRARY: AudioTrack[] = [
  // BINAURAL BEATS
  {
    id: "quantum_coherence_432",
    name: "Quantum Coherence Field (432Hz)",
    category: "binaural",
    frequency: 432,
    binauralBeat: 8,
    duration: 600, // 10 minutes
    description: "Alpha wave entrainment with 432Hz carrier for quantum field alignment",
    masteryLevel: ["foundation", "activation", "integration", "mastery", "transcendence"],
    archetypeBonus: { visionary: 1.3, mystic: 1.5, creator: 1.2, warrior: 1.1 },
    coherenceEffect: 15,
  },
  {
    id: "dna_activation_528",
    name: "DNA Activation Frequency (528Hz)",
    category: "healing",
    frequency: 528,
    binauralBeat: 6,
    duration: 900,
    description: "Love frequency with theta entrainment for cellular healing and DNA repair",
    masteryLevel: ["activation", "integration", "mastery", "transcendence"],
    archetypeBonus: { mystic: 1.4, creator: 1.3, visionary: 1.2, warrior: 1.1 },
    coherenceEffect: 20,
  },
  {
    id: "pineal_activation_963",
    name: "Pineal Gland Activation (963Hz)",
    category: "activation",
    frequency: 963,
    binauralBeat: 4,
    duration: 1200,
    description: "Crown chakra activation frequency with delta entrainment for consciousness expansion",
    masteryLevel: ["integration", "mastery", "transcendence"],
    archetypeBonus: { mystic: 1.6, visionary: 1.4, creator: 1.2, warrior: 1.1 },
    coherenceEffect: 25,
  },

  // GUIDED SESSIONS
  {
    id: "morning_activation_guided",
    name: "Morning Consciousness Activation",
    category: "guided",
    duration: 1800, // 30 minutes
    description: "Guided morning practice with archetype-specific affirmations and visualizations",
    masteryLevel: ["foundation", "activation", "integration", "mastery", "transcendence"],
    archetypeBonus: { visionary: 1.2, creator: 1.2, warrior: 1.3, mystic: 1.1 },
    coherenceEffect: 18,
  },
  {
    id: "evening_integration_guided",
    name: "Evening Integration & Manifestation",
    category: "guided",
    duration: 2100,
    description: "Deep integration practice with reality manifestation protocols",
    masteryLevel: ["activation", "integration", "mastery", "transcendence"],
    archetypeBonus: { mystic: 1.3, visionary: 1.4, creator: 1.2, warrior: 1.1 },
    coherenceEffect: 22,
  },

  // AMBIENT SOUNDSCAPES
  {
    id: "quantum_forest",
    name: "Quantum Forest Resonance",
    category: "ambient",
    duration: 3600, // 1 hour
    description: "Nature sounds enhanced with quantum field frequencies for grounding",
    masteryLevel: ["foundation", "activation", "integration", "mastery", "transcendence"],
    archetypeBonus: { warrior: 1.2, creator: 1.3, visionary: 1.1, mystic: 1.2 },
    coherenceEffect: 12,
  },
  {
    id: "cosmic_ocean",
    name: "Cosmic Ocean Depths",
    category: "ambient",
    duration: 3600,
    description: "Deep space ambience with ocean waves for transcendent meditation",
    masteryLevel: ["integration", "mastery", "transcendence"],
    archetypeBonus: { mystic: 1.4, visionary: 1.3, creator: 1.1, warrior: 1.0 },
    coherenceEffect: 16,
  },
]

export function ImmersiveAudioSystem({
  archetype,
  currentDay,
  coherenceLevel,
  masteryLevel,
  sessionType,
  isSessionActive,
  onAudioStateChange,
}: ImmersiveAudioSystemProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [spatialAudioEnabled, setSpatialAudioEnabled] = useState(true)
  const [adaptiveMode, setAdaptiveMode] = useState(true)
  const [audioVisualization, setAudioVisualization] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [spatialNodes, setSpatialNodes] = useState<SpatialAudioNode[]>([])

  // Audio Context and Nodes
  const audioContextRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const spatialPannerRef = useRef<PannerNode | null>(null)
  const binauralOscillatorsRef = useRef<{ left: OscillatorNode; right: OscillatorNode } | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const visualizationCanvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()

  // Initialize Audio Context
  const initializeAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()

      // Create master gain node
      masterGainRef.current = audioContextRef.current.createGain()
      masterGainRef.current.connect(audioContextRef.current.destination)

      // Create spatial panner for 3D audio
      if (spatialAudioEnabled) {
        spatialPannerRef.current = audioContextRef.current.createPanner()
        spatialPannerRef.current.panningModel = "HRTF"
        spatialPannerRef.current.distanceModel = "inverse"
        spatialPannerRef.current.connect(masterGainRef.current)
      }

      // Create analyser for visualization
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 256
      analyserRef.current.connect(masterGainRef.current)
    }
  }, [spatialAudioEnabled])

  // Get recommended tracks based on current state
  const getRecommendedTracks = useCallback(() => {
    return AUDIO_LIBRARY.filter((track) => {
      // Filter by mastery level
      if (!track.masteryLevel.includes(masteryLevel)) return false

      // Session-specific recommendations
      if (sessionType === "morning" && track.category === "guided" && track.id.includes("morning")) return true
      if (sessionType === "evening" && track.category === "guided" && track.id.includes("evening")) return true
      if (isSessionActive && (track.category === "binaural" || track.category === "healing")) return true
      if (!isSessionActive && track.category === "ambient") return true

      return track.masteryLevel.includes(masteryLevel)
    }).sort((a, b) => {
      // Sort by archetype bonus
      const aBonus = a.archetypeBonus[archetype] || 1
      const bBonus = b.archetypeBonus[archetype] || 1
      return bBonus - aBonus
    })
  }, [archetype, masteryLevel, sessionType, isSessionActive])

  // Start binaural beat generation
  const startBinauralBeat = useCallback(
    (track: AudioTrack) => {
      if (!audioContextRef.current || !track.frequency || !track.binauralBeat) return

      const ctx = audioContextRef.current
      const leftOsc = ctx.createOscillator()
      const rightOsc = ctx.createOscillator()
      const leftGain = ctx.createGain()
      const rightGain = ctx.createGain()
      const merger = ctx.createChannelMerger(2)

      // Set frequencies for binaural beat
      leftOsc.frequency.value = track.frequency
      rightOsc.frequency.value = track.frequency + track.binauralBeat

      // Set volume
      const trackVolume = (volume * (track.archetypeBonus[archetype] || 1)) / 2
      leftGain.gain.value = trackVolume
      rightGain.gain.value = trackVolume

      // Connect nodes
      leftOsc.connect(leftGain)
      rightOsc.connect(rightGain)
      leftGain.connect(merger, 0, 0)
      rightGain.connect(merger, 0, 1)

      if (spatialPannerRef.current) {
        merger.connect(spatialPannerRef.current)
      } else {
        merger.connect(masterGainRef.current!)
      }

      // Connect to analyser for visualization
      if (analyserRef.current) {
        merger.connect(analyserRef.current)
      }

      leftOsc.start()
      rightOsc.start()

      binauralOscillatorsRef.current = { left: leftOsc, right: rightOsc }
    },
    [volume, archetype, spatialPannerRef],
  )

  // Stop audio
  const stopAudio = useCallback(() => {
    if (binauralOscillatorsRef.current) {
      binauralOscillatorsRef.current.left.stop()
      binauralOscillatorsRef.current.right.stop()
      binauralOscillatorsRef.current = null
    }
    setIsPlaying(false)
    setCurrentTime(0)
    onAudioStateChange(false, "")
  }, [onAudioStateChange])

  // Play track
  const playTrack = useCallback(
    (track: AudioTrack) => {
      if (isPlaying) {
        stopAudio()
      }

      initializeAudioContext()
      setCurrentTrack(track)
      setIsPlaying(true)
      onAudioStateChange(true, track.name)

      if (track.category === "binaural" || track.category === "healing" || track.category === "activation") {
        startBinauralBeat(track)
      }

      // Start timer
      const startTime = Date.now()
      const updateTimer = () => {
        if (isPlaying) {
          const elapsed = Math.floor((Date.now() - startTime) / 1000)
          setCurrentTime(elapsed)
          if (elapsed < track.duration) {
            requestAnimationFrame(updateTimer)
          } else {
            stopAudio()
          }
        }
      }
      updateTimer()
    },
    [isPlaying, stopAudio, initializeAudioContext, startBinauralBeat, onAudioStateChange],
  )

  // Adaptive audio adjustment based on coherence
  useEffect(() => {
    if (adaptiveMode && isPlaying && currentTrack && masterGainRef.current) {
      // Adjust volume based on coherence level
      const coherenceMultiplier = 0.5 + (coherenceLevel / 100) * 0.5
      const adaptiveVolume = volume * coherenceMultiplier * (currentTrack.archetypeBonus[archetype] || 1)
      masterGainRef.current.gain.setValueAtTime(adaptiveVolume, audioContextRef.current!.currentTime)
    }
  }, [coherenceLevel, adaptiveMode, isPlaying, currentTrack, volume, archetype])

  // Spatial audio positioning
  useEffect(() => {
    if (spatialAudioEnabled && spatialPannerRef.current && isPlaying) {
      // Position audio based on coherence level and archetype
      const x = Math.sin((coherenceLevel / 100) * Math.PI * 2) * 2
      const y = 0
      const z = Math.cos((coherenceLevel / 100) * Math.PI * 2) * 2

      spatialPannerRef.current.setPosition(x, y, z)
    }
  }, [coherenceLevel, spatialAudioEnabled, isPlaying])

  // Audio visualization
  useEffect(() => {
    if (!audioVisualization || !analyserRef.current || !visualizationCanvasRef.current) return

    const canvas = visualizationCanvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const analyser = analyserRef.current
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      if (!isPlaying) return

      analyser.getByteFrequencyData(dataArray)

      ctx.fillStyle = "rgba(10, 10, 15, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const barWidth = (canvas.width / bufferLength) * 2.5
      let barHeight
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.8

        // Color based on frequency and archetype
        const hue = (i / bufferLength) * 360
        const saturation = 70 + (coherenceLevel / 100) * 30
        const lightness = 40 + (dataArray[i] / 255) * 40

        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)

        x += barWidth + 1
      }

      animationFrameRef.current = requestAnimationFrame(draw)
    }

    if (isPlaying) {
      draw()
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, audioVisualization, coherenceLevel])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [stopAudio])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getArchetypeColor = () => {
    const colors = {
      visionary: "#00d4ff",
      creator: "#ff0080",
      warrior: "#ffaa00",
      mystic: "#8b5cf6",
    }
    return colors[archetype as keyof typeof colors] || "#00d4ff"
  }

  const recommendedTracks = getRecommendedTracks()

  return (
    <div className="immersive-audio-system glass-card p-6 mb-6 border-2" style={{ borderColor: getArchetypeColor() }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: getArchetypeColor() }}>
            🎵 Immersive Audio System
          </h2>
          <p className="text-[#8888aa]">Consciousness-enhancing audio tailored to your {archetype} archetype</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-xl border border-[rgba(136,136,170,0.3)] hover:border-[#00d4ff] transition-all duration-200"
          >
            <Settings className="w-5 h-5 text-[#8888aa]" />
          </button>
          <div className="text-right">
            <div className="text-sm text-[#8888aa]">Coherence Boost</div>
            <div className="text-lg font-bold" style={{ color: getArchetypeColor() }}>
              +
              {currentTrack
                ? Math.floor(currentTrack.coherenceEffect * (currentTrack.archetypeBonus[archetype] || 1))
                : 0}
              %
            </div>
          </div>
        </div>
      </div>

      {/* Audio Settings Panel */}
      {showSettings && (
        <div
          className="mb-6 p-4 border rounded-xl"
          style={{
            borderColor: getArchetypeColor(),
            backgroundColor: `${getArchetypeColor()}11`,
          }}
        >
          <h3 className="font-bold mb-4" style={{ color: getArchetypeColor() }}>
            Audio Settings
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={spatialAudioEnabled}
                  onChange={(e) => setSpatialAudioEnabled(e.target.checked)}
                  className="rounded"
                />
                <span className="text-[#e8e8ff]">3D Spatial Audio</span>
              </label>
              <p className="text-xs text-[#8888aa]">Immersive positioning based on coherence</p>
            </div>

            <div>
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={adaptiveMode}
                  onChange={(e) => setAdaptiveMode(e.target.checked)}
                  className="rounded"
                />
                <span className="text-[#e8e8ff]">Adaptive Audio</span>
              </label>
              <p className="text-xs text-[#8888aa]">Auto-adjust based on your state</p>
            </div>

            <div>
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={audioVisualization}
                  onChange={(e) => setAudioVisualization(e.target.checked)}
                  className="rounded"
                />
                <span className="text-[#e8e8ff]">Audio Visualization</span>
              </label>
              <p className="text-xs text-[#8888aa]">Visual frequency display</p>
            </div>

            <div>
              <label className="block text-[#e8e8ff] mb-2">Master Volume</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Current Track Display */}
      {currentTrack && (
        <div
          className="mb-6 p-4 border rounded-xl"
          style={{
            borderColor: getArchetypeColor(),
            backgroundColor: `${getArchetypeColor()}22`,
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-[#e8e8ff]">{currentTrack.name}</h3>
              <p className="text-sm text-[#8888aa]">{currentTrack.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-xl hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <button
                onClick={() => (isPlaying ? stopAudio() : playTrack(currentTrack))}
                className="p-3 rounded-xl font-bold transition-all duration-200 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${getArchetypeColor()}, #8b5cf6)`,
                  color: "#0a0a0f",
                }}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between text-sm text-[#8888aa] mb-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(currentTrack.duration)}</span>
            </div>
            <div className="w-full bg-[rgba(136,136,170,0.2)] rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-1000"
                style={{
                  width: `${(currentTime / currentTrack.duration) * 100}%`,
                  backgroundColor: getArchetypeColor(),
                }}
              />
            </div>
          </div>

          {/* Audio Visualization */}
          {audioVisualization && (
            <canvas
              ref={visualizationCanvasRef}
              width={400}
              height={100}
              className="w-full h-20 rounded-xl border"
              style={{ borderColor: getArchetypeColor() }}
            />
          )}
        </div>
      )}

      {/* Recommended Tracks */}
      <div>
        <h3 className="text-lg font-bold text-[#e8e8ff] mb-4">
          🎯 Recommended for {archetype.charAt(0).toUpperCase() + archetype.slice(1)} • {masteryLevel.toUpperCase()}
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {recommendedTracks.slice(0, 6).map((track) => (
            <div
              key={track.id}
              className={`track-card border rounded-xl p-4 transition-all duration-300 hover:scale-105 cursor-pointer ${
                currentTrack?.id === track.id ? "ring-2" : ""
              }`}
              style={{
                borderColor: currentTrack?.id === track.id ? getArchetypeColor() : "rgba(136,136,170,0.3)",
                backgroundColor: currentTrack?.id === track.id ? `${getArchetypeColor()}11` : "rgba(20,20,32,0.5)",
                ringColor: getArchetypeColor(),
              }}
              onClick={() => playTrack(track)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-[#e8e8ff] mb-1">{track.name}</h4>
                  <div className="flex items-center space-x-2 text-xs text-[#8888aa]">
                    <span>{formatTime(track.duration)}</span>
                    <span>•</span>
                    <span className="capitalize">{track.category}</span>
                    {track.frequency && (
                      <>
                        <span>•</span>
                        <span>{track.frequency}Hz</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#8888aa]">Archetype Bonus</div>
                  <div className="font-bold" style={{ color: getArchetypeColor() }}>
                    +{Math.floor((track.archetypeBonus[archetype] || 1) * 100 - 100)}%
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#8888aa] mb-3">{track.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Headphones className="w-4 h-4 text-[#00d4ff]" />
                  <span className="text-xs text-[#00d4ff]">+{track.coherenceEffect}% Coherence</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Waves className="w-4 h-4" style={{ color: getArchetypeColor() }} />
                  <span className="text-xs" style={{ color: getArchetypeColor() }}>
                    {track.binauralBeat ? `${track.binauralBeat}Hz Beat` : "Guided"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Tips */}
      <div className="mt-6 p-4 bg-[rgba(139,92,246,0.1)] border border-[#8b5cf6] rounded-xl">
        <h4 className="font-bold text-[#8b5cf6] mb-2">🎧 Audio Enhancement Tips:</h4>
        <ul className="text-sm text-[#e8e8ff] space-y-1">
          <li>• Use quality headphones for optimal binaural beat experience</li>
          <li>• Enable 3D Spatial Audio for immersive consciousness expansion</li>
          <li>• Let Adaptive Mode adjust audio to your real-time coherence level</li>
          <li>• Higher coherence unlocks more powerful frequency combinations</li>
          <li>
            • {archetype.charAt(0).toUpperCase() + archetype.slice(1)} archetype receives bonus effects from certain
            frequencies
          </li>
        </ul>
      </div>
    </div>
  )
}
