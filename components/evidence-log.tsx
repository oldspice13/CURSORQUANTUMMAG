"use client"

import { useState } from "react"

interface Evidence {
  id: string
  timestamp: Date
  type: string
  description: string
  significance: number
}

interface EvidenceLogProps {
  evidenceLog: Evidence[]
  onLogEvidence: (type: string, description: string, significance: number) => void
  quantumField: any
}

export function EvidenceLog({ evidenceLog, onLogEvidence, quantumField }: EvidenceLogProps) {
  const [showLogger, setShowLogger] = useState(false)
  const [newEvidence, setNewEvidence] = useState({
    type: "synchronicity",
    description: "",
    significance: 5,
  })

  const evidenceTypes = [
    { id: "synchronicity", name: "Synchronicity", icon: "🎲", color: "#ff0080" },
    { id: "manifestation", name: "Manifestation", icon: "🌟", color: "#00ff88" },
    { id: "insight", name: "Insight", icon: "💡", color: "#00d4ff" },
    { id: "energy_shift", name: "Energy Shift", icon: "⚡", color: "#ffaa00" },
    { id: "reality_glitch", name: "Reality Glitch", icon: "🌀", color: "#8b5cf6" },
  ]

  const handleSubmit = () => {
    if (newEvidence.description.trim()) {
      onLogEvidence(newEvidence.type, newEvidence.description, newEvidence.significance)
      setNewEvidence({ type: "synchronicity", description: "", significance: 5 })
      setShowLogger(false)
    }
  }

  const getTypeData = (type: string) => {
    return evidenceTypes.find((t) => t.id === type) || evidenceTypes[0]
  }

  return (
    <div className="evidence-log glass-card p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-[#00ff88]">📊 Reality Evidence Log</h3>
        <button
          onClick={() => setShowLogger(!showLogger)}
          className="bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-[#0a0a0f] px-4 py-2 rounded-xl font-bold hover:scale-105 transition-all duration-200"
        >
          + Log Evidence
        </button>
      </div>

      {/* Quantum Field Status */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-[rgba(0,255,136,0.1)] border border-[#00ff88] rounded-xl">
        <div className="text-center">
          <div className="text-sm text-[#8888aa]">Field Coherence</div>
          <div className="text-lg font-bold text-[#00ff88]">{Math.round(quantumField.coherenceLevel)}%</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-[#8888aa]">Sync Amplification</div>
          <div className="text-lg font-bold text-[#00d4ff]">{quantumField.synchronicityAmplification.toFixed(1)}x</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-[#8888aa]">Evidence Count</div>
          <div className="text-lg font-bold text-[#ff0080]">{evidenceLog.length}</div>
        </div>
      </div>

      {/* Evidence Logger */}
      {showLogger && (
        <div className="bg-[rgba(20,20,32,0.8)] border border-[#00d4ff] rounded-xl p-4 mb-4">
          <h4 className="font-bold text-[#00d4ff] mb-3">Log New Evidence</h4>

          {/* Evidence Type Selection */}
          <div className="grid grid-cols-5 gap-2 mb-3">
            {evidenceTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setNewEvidence({ ...newEvidence, type: type.id })}
                className={`p-2 rounded-xl border-2 transition-all duration-200 ${
                  newEvidence.type === type.id
                    ? `border-[${type.color}] bg-[${type.color}22]`
                    : "border-[rgba(136,136,170,0.3)] hover:border-[#00d4ff]"
                }`}
              >
                <div className="text-lg">{type.icon}</div>
                <div className="text-xs" style={{ color: type.color }}>
                  {type.name}
                </div>
              </button>
            ))}
          </div>

          {/* Description Input */}
          <textarea
            value={newEvidence.description}
            onChange={(e) => setNewEvidence({ ...newEvidence, description: e.target.value })}
            placeholder="Describe what happened... be specific about the details"
            className="w-full h-24 p-3 bg-[rgba(20,20,32,0.8)] border border-[#00ff88] rounded-xl text-[#e8e8ff] placeholder-[#8888aa] mb-3 resize-none"
          />

          {/* Significance Slider */}
          <div className="mb-3">
            <div className="flex justify-between text-sm text-[#8888aa] mb-2">
              <span>Significance Level</span>
              <span>{newEvidence.significance}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={newEvidence.significance}
              onChange={(e) => setNewEvidence({ ...newEvidence, significance: Number.parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-[#8888aa] mt-1">
              <span>Minor</span>
              <span>Life-Changing</span>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-[#0a0a0f] py-2 px-4 rounded-xl font-bold hover:scale-105 transition-all duration-200"
            >
              📊 Log Evidence
            </button>
            <button
              onClick={() => setShowLogger(false)}
              className="px-4 py-2 border border-[#8888aa] text-[#8888aa] rounded-xl hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Evidence List */}
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {evidenceLog.map((evidence) => {
          const typeData = getTypeData(evidence.type)
          return (
            <div
              key={evidence.id}
              className="border rounded-xl p-3"
              style={{
                borderColor: typeData.color,
                backgroundColor: `${typeData.color}11`,
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{typeData.icon}</span>
                  <span className="font-bold text-sm" style={{ color: typeData.color }}>
                    {typeData.name}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold" style={{ color: typeData.color }}>
                    {evidence.significance}/10
                  </div>
                  <div className="text-xs text-[#8888aa]">{new Date(evidence.timestamp).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="text-[#e8e8ff] text-sm leading-relaxed">{evidence.description}</div>
            </div>
          )
        })}
      </div>

      {evidenceLog.length === 0 && (
        <div className="text-center text-[#8888aa] py-8">
          <div className="text-4xl mb-2">📊</div>
          <div>Start documenting your reality shifts...</div>
          <div className="text-sm">Every piece of evidence strengthens the quantum field</div>
        </div>
      )}
    </div>
  )
}
