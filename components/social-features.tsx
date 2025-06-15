"use client"

import { useState } from "react"

// 👥 SOCIAL CONSCIOUSNESS FEATURES
export function ConsciousCommunity() {
  const [friends, setFriends] = useState([
    { id: 1, name: "Sarah ✨", level: 12, status: "In deep meditation", coherence: 94 },
    { id: 2, name: "Marcus 🔥", level: 8, status: "Morning breathwork", coherence: 87 },
    { id: 3, name: "Luna 🌙", level: 15, status: "Manifesting abundance", coherence: 91 },
  ])

  return (
    <div className="conscious-community glass-card p-6 mb-6">
      <h3 className="text-xl font-bold text-[#00ff88] mb-4">👥 Soul Tribe</h3>

      <div className="space-y-3">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center justify-between bg-[rgba(0,255,136,0.1)] border border-[#00ff88] rounded-xl p-3"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] rounded-full flex items-center justify-center text-[#0a0a0f] font-bold">
                {friend.name.charAt(0)}
              </div>
              <div>
                <div className="text-[#e8e8ff] font-semibold">{friend.name}</div>
                <div className="text-xs text-[#8888aa]">{friend.status}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#00ff88] font-bold">L{friend.level}</div>
              <div className="text-xs text-[#00d4ff]">{friend.coherence}%</div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-[#0a0a0f] rounded-xl py-3 font-bold hover:scale-105 transition-all duration-200">
        🔗 Send Coherence Boost to Tribe
      </button>
    </div>
  )
}

// 🏆 LEADERBOARDS & CHALLENGES
export function QuantumLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: "Quantum_Master_777", coherence: 98, streak: 127, rmu: 45000 },
    { rank: 2, name: "LightWorker_Sarah", coherence: 96, streak: 89, rmu: 38000 },
    { rank: 3, name: "CosmicHealer_Mike", coherence: 94, streak: 156, rmu: 52000 },
    { rank: 4, name: "You ✨", coherence: 87, streak: 23, rmu: 15000 },
  ])

  return (
    <div className="quantum-leaderboard glass-card p-6 mb-6">
      <h3 className="text-xl font-bold text-[#ff0080] mb-4">🏆 Consciousness Leaderboard</h3>

      <div className="space-y-2">
        {leaderboard.map((player) => (
          <div
            key={player.rank}
            className={`flex items-center justify-between p-3 rounded-xl ${
              player.name.includes("You")
                ? "bg-[rgba(255,0,128,0.2)] border border-[#ff0080]"
                : "bg-[rgba(20,20,32,0.5)]"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  player.rank === 1
                    ? "bg-[#ffaa00] text-[#0a0a0f]"
                    : player.rank === 2
                      ? "bg-[#c0c0c0] text-[#0a0a0f]"
                      : player.rank === 3
                        ? "bg-[#cd7f32] text-[#0a0a0f]"
                        : "bg-[rgba(136,136,170,0.3)] text-[#8888aa]"
                }`}
              >
                {player.rank}
              </div>
              <div>
                <div className="text-[#e8e8ff] font-semibold">{player.name}</div>
                <div className="text-xs text-[#8888aa]">{player.streak} day streak</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#00ff88] font-bold">{player.coherence}%</div>
              <div className="text-xs text-[#00d4ff]">{player.rmu.toLocaleString()} RMU</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-[rgba(255,0,128,0.1)] border border-[#ff0080] rounded-xl p-3">
        <div className="text-sm text-[#ff0080] font-bold mb-1">Weekly Challenge:</div>
        <div className="text-xs text-[#e8e8ff]">
          Maintain 85%+ coherence for 7 days straight • Reward: 5000 RMU + Quantum Crown 👑
        </div>
      </div>
    </div>
  )
}
