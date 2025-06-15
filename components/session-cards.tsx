"use client"

import type { AppState } from "@/app/page"
import type { SomaticDay } from "@/data/somatic-program"

interface SessionCardsProps {
  progress: AppState["dailyProgress"][number]
  onStartSession: (key: "morning" | "midday" | "evening") => void
  dayData: SomaticDay
}

export function SessionCards({ progress, onStartSession, dayData }: SessionCardsProps) {
  const sessions = [
    {
      key: "morning" as const,
      icon: "🌅",
      title: dayData.sessions.morning.title,
      desc: "Activate your consciousness and set sacred intention",
      duration: dayData.sessions.morning.duration,
    },
    {
      key: "midday" as const,
      icon: "⚡",
      title: dayData.sessions.midday.title,
      desc: "Recalibrate your frequency and maintain coherence",
      duration: dayData.sessions.midday.duration,
    },
    {
      key: "evening" as const,
      icon: "🌌",
      title: dayData.sessions.evening.title,
      desc: "Integrate wisdom and prepare for regeneration",
      duration: dayData.sessions.evening.duration,
    },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {sessions.map((session, index) => {
        let status = "locked"
        let statusText = "Locked"

        if (index === 0 || progress?.[sessions[index - 1].key]) {
          status = progress?.[session.key] ? "completed" : "ready"
          statusText = progress?.[session.key] ? "✨ Complete" : "🚀 Ready to Launch"
        }

        return (
          <div
            key={session.key}
            className={`
              glass-card border-2 rounded-2xl p-6 cursor-pointer
              transition-all duration-300 hover:scale-105 relative overflow-hidden
              ${
                status === "completed"
                  ? "border-[#00ff66] bg-[rgba(0,255,136,0.08)] shadow-[0_0_24px_4px_#00ff66]"
                  : status === "ready"
                    ? "border-[#00d4ff] bg-[rgba(20,20,32,0.8)] shadow-[0_8px_32px_rgba(0,255,136,0.2)] hover:shadow-[0_0_32px_8px_#00d4ff]"
                    : "opacity-50 cursor-not-allowed border-[#8888aa]"
              }
            `}
            onClick={() => status !== "locked" && onStartSession(session.key)}
          >
            <div className="text-4xl mb-4">{session.icon}</div>
            <div className="text-lg font-bold text-[#00ff88] mb-2 tracking-wide">{session.title}</div>
            <div className="text-[#8888aa] mb-3 text-sm leading-relaxed">{session.desc}</div>
            <div className="text-[#00d4ff] font-mono font-semibold mb-3">{session.duration}</div>
            <div
              className={`
              inline-block px-3 py-1 rounded-xl text-xs font-semibold border
              ${status === "ready" ? "bg-[rgba(0,255,136,0.13)] text-[#00ff88] border-[#00ff88]" : ""}
              ${status === "completed" ? "bg-[rgba(0,255,136,0.18)] text-[#00ff66] border-[#00ff66]" : ""}
              ${status === "locked" ? "bg-[rgba(136,136,170,0.13)] text-[#8888aa] border-[#8888aa]" : ""}
            `}
            >
              {statusText}
            </div>
          </div>
        )
      })}
    </div>
  )
}
