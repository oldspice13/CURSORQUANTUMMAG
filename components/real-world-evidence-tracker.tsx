"use client"

import { useState } from "react"

interface RealWorldEvidence {
  id: string
  actionId: string
  archetype: string
  category: string
  evidence: string
  timestamp: Date
  impactLevel: number
  synchronicities: string[]
  insights: string[]
}

interface RealWorldEvidenceTrackerProps {
  evidenceLog: RealWorldEvidence[]
  archetype: string
}

export function RealWorldEvidenceTracker({ evidenceLog, archetype }: RealWorldEvidenceTrackerProps) {
  const [expandedEvidence, setExpandedEvidence] = useState<string | null>(null)

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

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      "Vision Work": "🔮",
      "Future Sensing": "🌟",
      "Reality Perception": "👁️",
      "Vision Integration": "✨",
      "Creative Expression": "🎨",
      Innovation: "💡",
      "Creative Flow": "🌊",
      "Creative Integration": "🔥",
      "Courage Building": "⚔️",
      "Strength Training": "💪",
      "Warrior Action": "🏹",
      "Victory Integration": "👑",
      "Divine Connection": "🙏",
      "Spiritual Service": "💖",
      "Sacred Presence": "🕯️",
      "Divine Integration": "🌸",
    }
    return icons[category] || "⭐"
  }

  const getImpactColor = (level: number) => {
    if (level >= 8) return "#ff0080"
    if (level >= 6) return "#ffaa00"
    if (level >= 4) return "#00d4ff"
    return "#00ff88"
  }

  const recentEvidence = evidenceLog
    .filter((e) => Date.now() - new Date(e.timestamp).getTime() < 7 * 24 * 60 * 60 * 1000)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const totalImpact = recentEvidence.reduce((sum, e) => sum + e.impactLevel, 0)
  const averageImpact = recentEvidence.length > 0 ? totalImpact / recentEvidence.length : 0

  return (
    <div className="real-world-evidence glass-card p-6 mb-8 border-2" style={{ borderColor: getArchetypeColor() }}>
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
            📊
          </div>
          <div>
            <h3 className="text-xl font-bold" style={{ color: getArchetypeColor() }}>
              REAL-WORLD EVIDENCE TRACKER
            </h3>
            <div className="text-sm text-[#8888aa]">
              {archetype.charAt(0).toUpperCase() + archetype.slice(1)} Impact • Last 7 Days
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold" style={{ color: getArchetypeColor() }}>
            {recentEvidence.length}
          </div>
          <div className="text-xs text-[#8888aa]">Actions</div>
          <div className="text-sm font-bold" style={{ color: getImpactColor(averageImpact) }}>
            {averageImpact.toFixed(1)}/10 Impact
          </div>
        </div>
      </div>

      {/* Evidence Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-[rgba(0,255,136,0.1)] border border-[#00ff88] rounded-xl">
          <div className="text-lg font-bold text-[#00ff88]">
            {recentEvidence.filter((e) => e.impactLevel >= 7).length}
          </div>
          <div className="text-xs text-[#8888aa]">High Impact</div>
        </div>
        <div className="text-center p-3 bg-[rgba(0,212,255,0.1)] border border-[#00d4ff] rounded-xl">
          <div className="text-lg font-bold text-[#00d4ff]">
            {recentEvidence.reduce((sum, e) => sum + e.synchronicities.length, 0)}
          </div>
          <div className="text-xs text-[#8888aa]">Synchronicities</div>
        </div>
        <div className="text-center p-3 bg-[rgba(255,0,128,0.1)] border border-[#ff0080] rounded-xl">
          <div className="text-lg font-bold text-[#ff0080]">
            {recentEvidence.reduce((sum, e) => sum + e.insights.length, 0)}
          </div>
          <div className="text-xs text-[#8888aa]">Insights</div>
        </div>
      </div>

      {/* Evidence List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {recentEvidence.map((evidence) => (
          <div
            key={evidence.id}
            className="border rounded-xl overflow-hidden transition-all duration-300"
            style={{
              borderColor: expandedEvidence === evidence.id ? getArchetypeColor() : "rgba(136,136,170,0.3)",
              backgroundColor: expandedEvidence === evidence.id ? `${getArchetypeColor()}11` : "rgba(20,20,32,0.5)",
            }}
          >
            <div
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => setExpandedEvidence(expandedEvidence === evidence.id ? null : evidence.id)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{getCategoryIcon(evidence.category)}</span>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-bold text-[#e8e8ff]">{evidence.category}</span>
                    <span
                      className="text-xs px-2 py-1 rounded-full font-bold"
                      style={{
                        color: getImpactColor(evidence.impactLevel),
                        backgroundColor: `${getImpactColor(evidence.impactLevel)}22`,
                      }}
                    >
                      Impact {evidence.impactLevel}/10
                    </span>
                  </div>
                  <div className="text-sm text-[#8888aa]">
                    {new Date(evidence.timestamp).toLocaleDateString()} •{" "}
                    {evidence.synchronicities.length + evidence.insights.length} insights
                  </div>
                </div>
              </div>
              <div className="text-[#8888aa]">{expandedEvidence === evidence.id ? "−" : "+"}</div>
            </div>

            {expandedEvidence === evidence.id && (
              <div className="px-4 pb-4 space-y-4">
                {/* Evidence Description */}
                <div>
                  <h5 className="font-bold text-sm mb-2" style={{ color: getArchetypeColor() }}>
                    Evidence:
                  </h5>
                  <div className="text-[#e8e8ff] text-sm bg-[rgba(20,20,32,0.8)] rounded-lg p-3">
                    {evidence.evidence}
                  </div>
                </div>

                {/* Synchronicities */}
                {evidence.synchronicities.length > 0 && (
                  <div>
                    <h5 className="font-bold text-sm mb-2 text-[#00d4ff]">Synchronicities:</h5>
                    <ul className="text-[#e8e8ff] text-sm space-y-1">
                      {evidence.synchronicities.map((sync, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-[#00d4ff] mr-2">🎲</span>
                          {sync}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Insights */}
                {evidence.insights.length > 0 && (
                  <div>
                    <h5 className="font-bold text-sm mb-2 text-[#ff0080]">Insights:</h5>
                    <ul className="text-[#e8e8ff] text-sm space-y-1">
                      {evidence.insights.map((insight, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-[#ff0080] mr-2">💡</span>
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {recentEvidence.length === 0 && (
        <div className="text-center text-[#8888aa] py-8">
          <div className="text-4xl mb-2">🎯</div>
          <div>Complete real-world actions to see evidence here...</div>
          <div className="text-sm">Your consciousness work manifesting in physical reality</div>
        </div>
      )}
    </div>
  )
}
