"use client"

interface DaySelectorProps {
  currentDay: number
  completedDays: number[]
  onDayChange: (day: number) => void
}

export function DaySelector({ currentDay, completedDays, onDayChange }: DaySelectorProps) {
  const weeks = []
  for (let week = 0; week < 9; week++) {
    const days = []
    for (let day = 1; day <= 7; day++) {
      const dayNumber = week * 7 + day
      if (dayNumber <= 60) {
        days.push(dayNumber)
      }
    }
    if (days.length > 0) {
      weeks.push({ weekNumber: week + 1, days })
    }
  }

  const getWeekPhase = (weekNum: number) => {
    if (weekNum <= 2) return { name: "Foundation", color: "#00ff88", icon: "🌱" }
    if (weekNum <= 4) return { name: "Activation", color: "#00d4ff", icon: "⚡" }
    if (weekNum <= 6) return { name: "Integration", color: "#ff0080", icon: "🔥" }
    if (weekNum <= 8) return { name: "Mastery", color: "#ffaa00", icon: "👑" }
    return { name: "Transcendence", color: "#8b5cf6", icon: "🌟" }
  }

  const getDayStatus = (day: number) => {
    if (currentDay === day) return "current"
    if (completedDays.includes(day)) return "completed"
    if (day <= currentDay) return "available"
    return "locked"
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-center mb-6 text-[#00ff88]">60-Day Consciousness Evolution Journey</h3>

      <div className="space-y-6 max-w-5xl mx-auto">
        {weeks.map(({ weekNumber, days }) => {
          const phase = getWeekPhase(weekNumber)
          return (
            <div key={weekNumber} className="glass-card p-4 rounded-2xl border" style={{ borderColor: phase.color }}>
              <div className="flex items-center justify-center mb-3">
                <span className="text-lg mr-2">{phase.icon}</span>
                <h4 className="font-bold" style={{ color: phase.color }}>
                  Week {weekNumber}: {phase.name}
                </h4>
              </div>

              <div className="flex gap-2 justify-center flex-wrap">
                {days.map((day) => {
                  const status = getDayStatus(day)
                  return (
                    <button
                      key={day}
                      onClick={() => status !== "locked" && onDayChange(day)}
                      disabled={status === "locked"}
                      className={`
                        w-10 h-10 rounded-xl text-sm font-bold transition-all duration-200 relative
                        ${
                          status === "current"
                            ? `scale-110 shadow-[0_0_20px_${phase.color}]`
                            : status === "completed"
                              ? "bg-[rgba(0,255,136,0.2)] border border-[#00ff88] hover:scale-105"
                              : status === "available"
                                ? "bg-[rgba(20,20,32,0.8)] border border-[rgba(136,136,170,0.3)] hover:border-[#00d4ff] hover:text-[#00d4ff] hover:scale-105"
                                : "opacity-30 cursor-not-allowed bg-[rgba(20,20,32,0.5)] border border-[rgba(136,136,170,0.2)]"
                        }
                      `}
                      style={
                        status === "current"
                          ? {
                              background: `linear-gradient(135deg, ${phase.color}, #00d4ff)`,
                              color: "#0a0a0f",
                            }
                          : status === "completed"
                            ? { color: "#00ff88" }
                            : status === "available"
                              ? { color: "#8888aa" }
                              : { color: "#444" }
                      }
                    >
                      {day}
                      {status === "completed" && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00ff88] rounded-full" />
                      )}
                      {status === "current" && (
                        <div
                          className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse"
                          style={{ backgroundColor: phase.color }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Week completion indicator */}
              {weekNumber <= Math.ceil(currentDay / 7) && (
                <div className="mt-3 text-center">
                  <div className="text-xs text-[#8888aa] mb-1">Week Progress</div>
                  <div className="w-full bg-[rgba(136,136,170,0.2)] rounded-full h-1">
                    <div
                      className="h-1 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((days.filter((d) => completedDays.includes(d)).length / days.length) * 100, 100)}%`,
                        backgroundColor: phase.color,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="text-center mt-6 text-sm text-[#8888aa]">
        <div className="flex justify-center items-center space-x-6">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-[#00ff88] rounded-full" />
            <span>Completed</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] rounded-full" />
            <span>Current</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-[rgba(136,136,170,0.3)] border border-[#8888aa] rounded-full" />
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-[rgba(136,136,170,0.2)] rounded-full" />
            <span>Locked</span>
          </div>
        </div>
      </div>
    </div>
  )
}
