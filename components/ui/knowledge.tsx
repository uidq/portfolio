"use client"
import { Code2, Type, Goal, Database, Code2Icon, FileCode, Palette, Server, Terminal } from "lucide-react"

interface TechStackItem {
  name: string
  icon: React.ReactNode
}

interface KnowledgeProps {
  techStack: TechStackItem[]
  currentFocus: string
}

export function Knowledge({ techStack, currentFocus }: KnowledgeProps) {
  return (
    <div className="bg-[#ffdeeb]/10 backdrop-blur-sm border border-zinc-800/25 rounded-xl p-2 hover:border-[#ffdeeb]/15 transition-all duration-300">
      <div className="p-2 relative">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-4" data-aos="fade-right" data-aos-delay="1000">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#ffdeeb]/10 flex items-center justify-center">
                <Code2 size={18} className="text-[#ffdeeb]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">My Knowledge</h3>
              </div>
            </div>

            <hr className="border-0 h-px bg-gradient-to-r from-transparent via-[#ffdeeb]/10 to-transparent mb-6" />

            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <span
                  key={tech.name}
                  className="px-3 py-1.5 text-sm rounded-lg bg-zinc-900/60 border border-zinc-700/50 text-zinc-300 hover:border-[#ffdeeb]/40 hover:text-[#ffdeeb] hover:bg-zinc-800/60 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
                  data-aos="flip-left"
                  data-aos-delay={1100 + index * 50}
                >
                  <span className="text-[#ffdeeb]">{tech.icon}</span>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4" data-aos="fade-left" data-aos-delay="1000">
            <h3 className="text-white font-semibold text-lg">Current Focus</h3>
            <p className="text-zinc-300 leading-relaxed">{currentFocus}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
