"use client"

interface Evidence {
  id: string
  timestamp: Date
  type: string
  description: string
  significance: number
}

interface QuantumFieldAnalysisProps {
  evidenceLog: Evidence[]
  patternDebugging: any[]
  currentDay: number
}

export function QuantumFieldAnalysis({ evidenceLog, patternDebugging, currentDay }: QuantumFieldAnalysisProps) {
  // Analyze patterns in evidence log
  const analyzePatterns = () => {
    const recentEvidence = evidenceLog.filter(
      (e) => Date.now() - new Date(e.timestamp).getTime() < 7 * 24 * 60 * 60 * 1000,
    )

    const typeFrequency = recentEvidence.reduce(
      (acc, evidence) => {
        acc[evidence.type] = (acc[evidence.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const averageSignificance =
      recentEvidence.length > 0 ? recentEvidence.reduce((sum, e) => sum + e.significance, 0) / recentEvidence.length : 0

    const highImpactEvents = recentEvidence.filter((e) => e.significance >= 8)

    return {
      totalEvents: recentEvidence.length,
      typeFrequency,
      averageSignificance,
      highImpactEvents,
      dominantType: Object.keys(typeFrequency).reduce((a, b) => (typeFrequency[a] > typeFrequency[b] ? a : b), "none"),
    }
  }

  const patterns = analyzePatterns()

  const getInsight = () => {
    if (patterns.totalEvents === 0) {
      return "No quantum field data detected. Begin logging evidence to activate analysis."
    }

    if (patterns.averageSignificance >= 7) {
      return "🌟 QUANTUM COHERENCE PEAK: Your reality manipulation frequency is exceptionally high. The Field is responding powerfully to your consciousness."
    }

    if (patterns.highImpactEvents.length >= 3) {
      return "⚡ REALITY ACCELERATION DETECTED: Multiple high-impact events indicate rapid timeline shifting. Maintain current protocols."
    }

    if (patterns.dominantType === "synchronicity") {
      return "🎲 SYNCHRONICITY AMPLIFICATION: The universe is communicating through meaningful coincidences. Pay attention to recurring symbols and numbers."
    }

    if (patterns.dominantType === "manifestation") {
      return "🌟 MANIFESTATION MASTERY: Your intention-to-reality conversion rate is optimized. Focus on larger goals."
    }

    return "📊 FIELD ANALYSIS: Quantum patterns are stabilizing. Continue current consciousness protocols for optimal reality coherence."
  }

  const getRecommendation = () => {
    if (patterns.averageSignificance < 5) {
      return "Increase meditation frequency and focus on heart coherence to amplify field sensitivity."
    }

    if (patterns.dominantType === "synchronicity") {
      return "Create a synchronicity journal. Document numbers, symbols, and timing patterns for deeper field analysis."
    }

    if (patterns.dominantType === "manifestation") {
      return "Scale up your intentions. Your manifestation field is strong enough for larger reality shifts."
    }

    return "Maintain current protocols. Consider adding advanced breathwork for field amplification."
  }

  return (
    <div className="quantum-field-analysis glass-card p-6 mb-8 border-2 border-[#8b5cf6]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">🔬</div>
          <div>
            <h3 className="text-xl font-bold text-[#8b5cf6]">QUANTUM FIELD ANALYSIS</h3>
            <div className="text-sm text-[#8888aa]">7-Day Reality Pattern Report • Day {currentDay}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#8b5cf6]">{patterns.totalEvents}</div>
          <div className="text-xs text-[#8888aa]">EVENTS LOGGED</div>
        </div>
      </div>

      {/* Analysis Results */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Left Column - Metrics */}
        <div>
          <h4 className="font-bold text-[#00d4ff] mb-3">Field Metrics</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-[rgba(0,212,255,0.1)] border border-[#00d4ff] rounded-xl">
              <span className="text-[#e8e8ff]">Average Significance</span>
              <span className="font-bold text-[#00d4ff]">{patterns.averageSignificance.toFixed(1)}/10</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-[rgba(255,0,128,0.1)] border border-[#ff0080] rounded-xl">
              <span className="text-[#e8e8ff]">High-Impact Events</span>
              <span className="font-bold text-[#ff0080]">{patterns.highImpactEvents.length}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-[rgba(0,255,136,0.1)] border border-[#00ff88] rounded-xl">
              <span className="text-[#e8e8ff]">Dominant Pattern</span>
              <span className="font-bold text-[#00ff88] capitalize">{patterns.dominantType.replace("_", " ")}</span>
            </div>
          </div>
        </div>

        {/* Right Column - Event Types */}
        <div>
          <h4 className="font-bold text-[#00d4ff] mb-3">Event Distribution</h4>
          <div className="space-y-2">
            {Object.entries(patterns.typeFrequency).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-[#e8e8ff] capitalize">{type.replace("_", " ")}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-[rgba(136,136,170,0.2)] rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#00ff88] to-[#00d4ff] h-2 rounded-full"
                      style={{ width: `${(count / patterns.totalEvents) * 100}%` }}
                    />
                  </div>
                  <span className="text-[#00d4ff] font-bold text-sm w-6">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Oracle Insight */}
      <div className="bg-[rgba(139,92,246,0.1)] border border-[#8b5cf6] rounded-xl p-4 mb-4">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">👁️</div>
          <div>
            <div className="text-sm font-bold text-[#8b5cf6] mb-2">ORACLE FIELD ANALYSIS</div>
            <div className="text-[#e8e8ff] leading-relaxed mb-3">{getInsight()}</div>
            <div className="text-sm text-[#8888aa]">
              <strong className="text-[#8b5cf6]">Recommendation:</strong> {getRecommendation()}
            </div>
          </div>
        </div>
      </div>

      {/* Recent High-Impact Events */}
      {patterns.highImpactEvents.length > 0 && (
        <div>
          <h4 className="font-bold text-[#ff0080] mb-3">Recent High-Impact Events</h4>
          <div className="space-y-2">
            {patterns.highImpactEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="bg-[rgba(255,0,128,0.1)] border border-[#ff0080] rounded-xl p-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-[#e8e8ff] text-sm">{event.description}</div>
                    <div className="text-[#8888aa] text-xs mt-1">
                      {new Date(event.timestamp).toLocaleDateString()} • {event.type.replace("_", " ")}
                    </div>
                  </div>
                  <div className="text-[#ff0080] font-bold">{event.significance}/10</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
