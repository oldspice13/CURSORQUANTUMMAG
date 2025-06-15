"use client"

import { useState } from "react"
import { Menu, X, Zap, User, Settings } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-[rgba(136,136,170,0.3)]">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#ff0080] flex items-center justify-center">
              <Zap className="w-6 h-6 text-[#0a0a0f]" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#ff0080] bg-clip-text text-transparent">
                Quantum Magnetism
              </h1>
              <div className="text-xs text-[#8888aa]">Consciousness Evolution Protocol</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#journey" className="text-[#e8e8ff] hover:text-[#00ff88] transition-colors duration-200">
              Journey
            </a>
            <a href="#mastery" className="text-[#e8e8ff] hover:text-[#00d4ff] transition-colors duration-200">
              Mastery
            </a>
            <a href="#evidence" className="text-[#e8e8ff] hover:text-[#ff0080] transition-colors duration-200">
              Evidence
            </a>
            <a href="#community" className="text-[#e8e8ff] hover:text-[#ffaa00] transition-colors duration-200">
              Community
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-xl border border-[rgba(136,136,170,0.3)] hover:border-[#00d4ff] transition-all duration-200">
              <User className="w-5 h-5 text-[#8888aa]" />
            </button>
            <button className="p-2 rounded-xl border border-[rgba(136,136,170,0.3)] hover:border-[#00d4ff] transition-all duration-200">
              <Settings className="w-5 h-5 text-[#8888aa]" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-xl border border-[rgba(136,136,170,0.3)] hover:border-[#00d4ff] transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5 text-[#8888aa]" /> : <Menu className="w-5 h-5 text-[#8888aa]" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-[rgba(136,136,170,0.3)]">
            <div className="flex flex-col space-y-3">
              <a
                href="#journey"
                className="text-[#e8e8ff] hover:text-[#00ff88] transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Journey
              </a>
              <a
                href="#mastery"
                className="text-[#e8e8ff] hover:text-[#00d4ff] transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Mastery
              </a>
              <a
                href="#evidence"
                className="text-[#e8e8ff] hover:text-[#ff0080] transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Evidence
              </a>
              <a
                href="#community"
                className="text-[#e8e8ff] hover:text-[#ffaa00] transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
