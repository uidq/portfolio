"use client"
import Image from "next/image"
import { Github, Heart, User2 } from "lucide-react"
import { Card, CardContent } from "@/components/pre-made/card"

interface Project {
  name: string
  description: string
  link: string
}

interface Friend {
  name: string
  avatar: string
  role: string
  link: string
  projects: Project[]
}

interface FriendsProps {
  friends: Friend[]
}

export function Friends({ friends }: FriendsProps) {
  return (
    <div className="bg-[#ffdeeb]/10 backdrop-blur-sm border border-zinc-800/25 rounded-xl p-4 hover:border-[#ffdeeb]/15 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#ffdeeb]/10 flex items-center justify-center">
            <Heart size={16} className="text-[#ffdeeb]" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Friends</h3>
          </div>
        </div>

        <hr className="border-0 h-px bg-gradient-to-r from-transparent via-[#ffdeeb]/10 to-transparent mb-6" />

        <div className="space-y-6">
          {friends.map((friend, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-zinc-700/50 group-hover:ring-[#ffdeeb]/30 transition-all duration-300">
                    {friend.avatar ? (
                      <Image
                        src={friend.avatar}
                        alt={friend.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        unoptimized={true}
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-800/50 flex items-center justify-center">
                        <User2 size={24} className="text-[#ffdeeb]" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-lg group-hover:text-[#ffdeeb] transition-colors duration-300">
                    {friend.name}
                  </h4>
                  <p className="text-zinc-400 text-sm">{friend.role}</p>
                </div>
              </div>

              <div className="space-y-3 ml-20">
                {friend.projects.map((project) => (
                  <div
                    key={project.name}
                    className="group/project bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-4 hover:border-[#ffdeeb]/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 rounded-lg bg-[#ffdeeb]/10 flex items-center justify-center">
                        <Github size={12} className="text-[#ffdeeb]" />
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-medium hover:text-[#ffdeeb] transition-colors duration-300"
                      >
                        {project.name}
                      </a>
                    </div>
                    <p className="text-zinc-400 text-sm ml-9">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}