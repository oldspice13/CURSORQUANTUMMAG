"use client"

interface ArchetypeEvolutionProps {
  archetype: string
  level: number
  rmu: number
  archetypeData: any
}

export function ArchetypeEvolution({ archetype, level, rmu, archetypeData }: ArchetypeEvolutionProps) {
  if (!archetypeData) return null

  const currentLevelData = archetypeData.levels[level]
  const nextLevelData = archetypeData.levels[level + 1]
  const evolutionThreshold = level * 5000
  const progressToNext = nextLevelData ? ((rmu - evolutionThreshold) / 5000) * 100 : 100

  return (
    <div className="archetype-evolution glass-card p-6 mb-8 border-2 border-[#00ff88]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">{archetypeData.icon}</div>
          <div>
            <h3 className="text-2xl font-bold text-[#00ff88]">
              {archetype.toUpperCase()} LEVEL {level}
            </h3>
            <div className="text-[#8888aa]">{currentLevelData?.title}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-[#8888aa]">Power Level</div>
          <div className="text-2xl font-bold text-[#00ff88]">{rmu.toLocaleString()} RMU</div>
        </div>
      </div>

      {/* Evolution Progress */}
      {nextLevelData && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-[#8888aa] mb-2">
            <span>Evolution Progress</span>
            <span>
              {Math.round(progressToNext)}% to Level {level + 1}
            </span>
          </div>
          <div className="w-full bg-[rgba(136,136,170,0.2)] rounded-full h-3">
            <div
              className="bg-gradient-to-r from-[#00ff88] to-[#00d4ff] h-3 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(progressToNext, 100)}%` }}
            />
          </div>
          {progressToNext >= 100 && (
            <div className="text-center mt-2 text-[#00ff88] animate-pulse">
              🌟 EVOLUTION READY - Complete next session to ascend! 🌟
            </div>
          )}
        </div>
      )}

      {/* Current Abilities */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold text-[#00d4ff] mb-2">Current Abilities:</h4>
          <ul className="text-sm text-[#e8e8ff] space-y-1">
            {currentLevelData?.abilities?.map((ability: string, index: number) => (
              <li key={index} className="flex items-center">
                <span className="text-[#00ff88] mr-2">✓</span>
                {ability}
              </li>
            ))}
          </ul>
        </div>

        {nextLevelData && (
          <div>
            <h4 className="font-bold text-[#ff0080] mb-2">Next Level Unlocks:</h4>
            <ul className="text-sm text-[#8888aa] space-y-1">
              {nextLevelData.abilities?.map((ability: string, index: number) => (
                <li key={index} className="flex items-center">
                  <span className="text-[#ff0080] mr-2">🔒</span>
                  {ability}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
