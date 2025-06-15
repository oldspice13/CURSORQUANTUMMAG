"use client"

import type React from "react"

import { useState } from "react"
import { HelpCircle, X } from "lucide-react"

interface SectionExplainerProps {
  title: string
  description: string
  icon: string
  children: React.ReactNode
  helpContent?: {
    whatIs: string
    howToUse: string
    whyImportant: string
    tips?: string[]
  }
}

export function SectionExplainer({ title, description, icon, children, helpContent }: SectionExplainerProps) {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <div className="section-explainer mb-8">
      {/* Section Header with Help */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{icon}</div>
          <div>
            <h2 className="text-xl font-bold text-[#e8e8ff]">{title}</h2>
            <p className="text-sm text-[#8888aa]">{description}</p>
          </div>
        </div>

        {helpContent && (
          <button
            onClick={() => setShowHelp(true)}
            className="flex items-center space-x-2 px-3 py-2 rounded-xl border border-[#00d4ff] text-[#00d4ff] hover:bg-[rgba(0,212,255,0.1)] transition-all duration-200"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm">Help</span>
          </button>
        )}
      </div>

      {/* Section Content */}
      {children}

      {/* Help Modal */}
      {showHelp && helpContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="glass-card border-2 border-[#00d4ff] rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{icon}</div>
                <h3 className="text-2xl font-bold text-[#00d4ff]">{title}</h3>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="text-[#8888aa] hover:text-[#e8e8ff] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-[#00ff88] mb-2">🤔 What is this?</h4>
                <p className="text-[#e8e8ff] leading-relaxed">{helpContent.whatIs}</p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-[#00d4ff] mb-2">🎯 How to use it</h4>
                <p className="text-[#e8e8ff] leading-relaxed">{helpContent.howToUse}</p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-[#ff0080] mb-2">⚡ Why it's important</h4>
                <p className="text-[#e8e8ff] leading-relaxed">{helpContent.whyImportant}</p>
              </div>

              {helpContent.tips && (
                <div>
                  <h4 className="text-lg font-bold text-[#ffaa00] mb-2">💡 Pro Tips</h4>
                  <ul className="space-y-2">
                    {helpContent.tips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-[#ffaa00] mt-1">•</span>
                        <span className="text-[#e8e8ff]">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowHelp(false)}
                className="px-6 py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #00ff88)",
                  color: "#0a0a0f",
                }}
              >
                Got it! 👍
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
